import { createStore,applyMiddleware,compose } from 'redux'
import reducer from './reducer'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import mySagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

//增强函数(API,如果有,直接执行方法[接收一个空对象];如果没有,就直接传compose来组成增强函数)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
// const enhancer = composeEnhancers(applyMiddleware(thunk)) 
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware)) 
    
// const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //reducer注入

const store = createStore(reducer, enhancer) //enhancer作为变量,两个函数一起执行
sagaMiddleware.run(mySagas)
export default store