import React, { Component } from 'react';
import { Input,Button,List } from 'antd'
import 'antd/dist/antd.css'
import store from './store'
// import { CHANGE_VALUE, ADD_ITEM, DELETE_ITEM } from './store/actionTypes'
import { changeInputAction, addItemAction, deleteItemAction} from './store/actionCreators'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        this.handleClick = this.handleClick.bind(this)
        // this.deleteItem = this.deleteItem.bind(this)
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange) //订阅之后,state发生变化了,调用方法,使组件更新
    }
    render() { 
        return (  
            <div style={{margin:'10px'}}>
                <div>
                    <Input
                        placeholder={this.state.inputValue}
                        style={{ width: '250px', marginRight: '10px' }}
                        onChange={this.changeInputValue}
                        value={this.state.inputValue}
                    />
                    <Button type='primary' onClick={this.handleClick}>Add</Button>
                </div>
                <div style={{margin:'10px 10px 10px 0',width:'300px'}}>
                    <List
                        bordered
                        size='small'
                        dataSource={this.state.list}
                        renderItem={(item,index) => <List.Item onClick={this.deleteItem.bind(this,index)}>{item}</List.Item>}
                        
                    />
                </div>
            </div>
        );
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