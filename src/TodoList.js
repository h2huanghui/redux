import React, { Component } from 'react';
import store from './store'
import TodoListUI from './TodoListUI'
import { getMyListAction, changeInputAction, addItemAction, deleteItemAction} from './store/actionCreators'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange) //订阅之后,state发生变化了,调用方法,使组件更新
    }
    render() { 
        return (  
            <TodoListUI
                inputValue={this.state.inputValue}
                changeInputValue={this.changeInputValue}
                handleClick={this.handleClick}
                list={this.state.list}
                deleteItem={this.deleteItem}
            />
        );
    }
    componentDidMount() {
        // const action = getTodoList()
        // store.dispatch(action)
        const action = getMyListAction()
        store.dispatch(action)
        console.log(action)
    }
    /* 组件更新 */
    storeChange() {
        this.setState(store.getState())
    }
    changeInputValue(e) {
        // const action = {
        //     type: CHANGE_VALUE,
        //     value: e.target.value
        // }
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }
    /* 新加list */
    handleClick() {
        // const action = {
        //     type: ADD_ITEM
        // }
        const action = addItemAction()
        store.dispatch(action)
    }
    /* 删除list */
    deleteItem(index) {
        // const action = {
        //     type: DELETE_ITEM,
        //     index
        // }
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
}
 
export default TodoList;