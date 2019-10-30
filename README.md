

## 1. 安装antd

### `npm install antd --save`

## 2. 引入样式以及组件

### 
```
import { Input,Button,List } from 'antd'
import 'antd/dist/antd.css'
```

## 3. 安装redux

### `npm i --save redux`

## 4. 首先创建store文件夹,建立index.js(相当于图书馆的角色)

### 
```
import { createStore } from 'redux'
const store = createStore()
export default store
```

## 5. 创建reducer.js(reducer相当于图书管理员的角色)

### 
```
const defaultState = {}
export default (state = defaultState, action) => {
    return state
}
```

## 6. store中index.js中注入reducer

```
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer) //reducer注入
export default store
```

## 7. TodoList.js中引入store下的index.js,通过store.getState获取到reducer.js下返回的state

```
this.state = store.getState()
```

## 8. 安装Redux DevTool(Chrome商店)

## 9. TodoList中,input值发生变化,定义action(有两个值,一个是type[这个值自定义],一个是value[把变化的值赋给value]),通过store.dispatch(action),store会把action给reducer,这样在reducer.js中可以获取到action

```
  changeInputValue(e) {
        const action = {
            type: 'changeValue',
            value: e.target.value
        }
        store.dispatch(action)
    }

```
## 10. reducer.js(这里可以获取到store.dispatch(action)中的action。通过action.type来判断,获取到最新的value值并进行返回)
注意：reducer里只能接受state,不能修改state,所以需要对state进行深拷贝

```
export default (state = defaultState, action) => {
    console.log(state, action)
    //reducer里只能接受state,不能修改state
    if (action.type === 'changeValue') {
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    return state
}
```

## 11. 存在问题1:当action type比较多时,写错了控制代码没有报错<br>
## 存在问题2:复用性不高 <br>
## 解决方案:建立actionTypes.js文件,用的时候直接用变量
```
export const CHANGE_VALUE = 'changeValue'
export const ADD_ITEM = 'addItem'
export const DELETE_ITEM = 'deleteItem'
```

## 12.存在问题3:一个组件中,action定义的地方很多
## 解决方案:建立actionCreators.js
```
import { CHANGE_VALUE, ADD_ITEM, DELETE_ITEM } from './actionTypes'

export const changeInputAction = (value) => ({
    type: CHANGE_VALUE,
    value
})

export const addItemAction = () => ({
    type: ADD_ITEM
})

export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index
})

```

## 13. 注意！！！
store必须唯一 <br>
只有store可以更改state,Reducer不可以 <br>
Reducer必须是纯函数 (不能用'1'或者new Date()来直接赋值,必须由传递的参数来决定,也不能直接在reducer中使用ajax请求)

## 代码优化：UI和业务抽离
TodoListUI.js

## 无状态组件(其实就是一个函数)
对于纯UI,没有业务逻辑的组件可以不用改造成无状态组件。不用引入从react引入{Component} 不需要引入state,从而提高性能


