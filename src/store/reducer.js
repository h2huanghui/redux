import { CHANGE_VALUE, ADD_ITEM, DELETE_ITEM } from './actionTypes'
const defaultState = {
    inputValue: 'Write Something',
    list: [
        '开会',
        '写代码',
        '学习react'
    ]
}
/* 纯函数由我们传递的参数来决定 */
export default (state = defaultState, action) => {
    //reducer里只能接受state,不能修改state
    if (action.type === CHANGE_VALUE) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    if (action.type === ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue) //可以实时获取到inputValue
        newState.inputValue = '' //每次push完之后,把inputValue置为空
        return newState
    }

    if (action.type === DELETE_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    }
    return state
}