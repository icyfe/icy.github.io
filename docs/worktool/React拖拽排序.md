# React 拖拽排序

```js
import React, { Component } from "react";
import { DragSource, DropTarget, DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

function Item(props) {
  const {
    // 这些 props 由 React DnD注入，参考`collect`函数定义
    isDragging,
    connectDragSource,
    connectDragPreview,
    connectDropTarget,
    ItemNode,
    // 这些是组件收到的 props
    item,
    style = {},
    find,
    move,
    change,
    remove,
    ...restProps
  } = props;
  const opacity = isDragging ? 0.5 : 1;
  // const onRemove = event => {
  //   event.stopPropagation();
  //   remove(item);
  // };
  return connectDropTarget(
    // 列表项本身作为 Drop 对象
    connectDragPreview(
      // 整个列表项作为跟随拖动的影像
      <div {...restProps} style={Object.assign(style, { opacity })}>
        {/* <p className="title">{item.title || "任务标题"}</p> */}

        {connectDragSource(ItemNode(item)) // 拖动图标作为 Drag 对象
        }
      </div>
    )
  );
}

const type = "item";
const dragSpec = {
  // 拖动开始时，返回描述 source 数据。后续通过 monitor.getItem() 获得
  beginDrag: props => ({
    id: props.id,
    originalIndex: props.find(props.id).index
  }),
  // 拖动停止时，处理 source 数据
  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    // source 是否已经 drop 到 target
    if (!didDrop) {
      return props.move(droppedId, originalIndex);
    }
    return props.change(droppedId, originalIndex);
  }
};
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(), // 用于包装需要拖动的组件
  connectDragPreview: connect.dragPreview(), // 用于包装需要拖动跟随预览的组件
  isDragging: monitor.isDragging() // 用于判断是否处于拖动状态
});
const dropSpec = {
  canDrop: () => false, // item 不处理 drop
  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;
    // 如果 source item 与 target item 不同，则交换位置并重新排序
    if (draggedId !== overId) {
      const { index: overIndex } = props.find(overId);
      props.move(draggedId, overIndex);
    }
  }
};
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget() // 用于包装需接收拖拽的组件
});

const DndItem = DropTarget(type, dropSpec, dropCollect)(
  DragSource(type, dragSpec, dragCollect)(Item)
);
class List extends Component {
  state = {
    data: this.props.list
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: [...nextProps.list]
    });
  }
  // shouldComponentUpdate() {}
  componentDidMount() {

    const list = this.props.list.map(item => {
      const isActive = this.props.activeItem.id === item.id;
      item = isActive ? this.props.activeItem : item;
      item.active = isActive;
      return item;
    });
    this.setState({
      data: [...list]
    });
  }
  find = id => {
    const item = this.state.data.find(c => `${c.id}` === id);
    return {
      item,
      index: this.state.data.indexOf(item)
    };
  };
  move = (id, toIndex) => {
    const { item, index } = this.find(id);
    this.state.data.splice(index, 1);
    this.state.data.splice(toIndex, 0, item);
    this.setState({
      data: this.state.data
    });
  };
  change = (id, fromIndex) => {
    const { index: toIndex } = this.find(id);
    this.props.onDropEnd(this.state.data, fromIndex, toIndex);
  };
  remove = item => {
    const newList = this.state.data.filter(it => it.id !== item.id);
    this.setState({
      data: newList
    });

    this.props.onDelete(newList);
  };
  onClick = event => {
    const { id } = event.currentTarget;
    const { item } = this.find(id);
    this.props.onClick(item);
  };
  render() {
    let { ItemNode, connectDropTarget } = this.props;
    return connectDropTarget(
      <div>
        {this.state.data.map((item, index) => (
          <DndItem
            className="info"
            ItemNode={ItemNode}
            id={`${item.id}`}
            item={item}
            find={this.find}
            move={this.move}
            change={this.change}
            remove={this.remove}
            onClick={this.onClick}
            key={index}
          />
        ))}
      </div>
    );
  }
}

const DndList = DropTarget(type, {}, connect => ({
  connectDropTarget: connect.dropTarget()
}))(List);

// 将 HTMLBackend 作为参数传给 DragDropContext
export default DragDropContext(HTML5Backend)(DndList);
   "react-dnd": "7.4.5",
    "react-dnd-html5-backend": "7.4.4",
```
