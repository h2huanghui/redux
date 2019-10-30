import { takeEvery, put } from 'redux-saga/effects'
import { GET_MY_LIST} from './actionTypes'
import { getListAction } from './actionCreators'
import axios from 'axios'

//generator
function* mySaga() {
    yield takeEvery(GET_MY_LIST, getList) //监听GET_MY_LIST

}

function* getList() {
    //成功捕获,执行方法
    // axios.get('https://www.easy-mock.com/mock/5cf8da0af595656092d12a91/example/getStudyList')
    //     .then((res) => {
    //         const data = res.data
    //         const action = getListAction(data)
    //         put(action)
    //     })
    const res = yield axios.get('https://www.easy-mock.com/mock/5cf8da0af595656092d12a91/example/getStudyList')

    const action = getListAction(res.data)
    yield put(action)
}
export default mySaga