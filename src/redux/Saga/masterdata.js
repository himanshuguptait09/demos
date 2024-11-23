import { call, takeEvery, put } from "redux-saga/effects";
import * as type from "../Actions/masterdata"
import * as loaderAction from '../Actions/loader'
import _, { result } from "lodash";
import Axios from "../../api/axiosInterceptor";

function* fetchAllMasterData() {
    try {
        yield put({ type: loaderAction?.SHOW_LOADER, payload:true})
        console.log('hello');
        let response = yield Axios.get('/allMasterList', {}).catch(function (er) {
            throw (er)
        })
        if (response && response.data && response?.data) {
            let datas = {};
            Object.entries(response.data).forEach(function ([key, records]) {
                if (records?.length) {
                    let fieldKey = key.replace("Details", "").concat("_name");
                    let formatData = records.map(val => {
                        if (val && val[fieldKey]) {
                            return {
                                ...val,
                                ["label"]: val[fieldKey],
                                ["value"]: val["_id"]
                            }
                        } else return val
                    })
                    datas[key] = _.sortBy(formatData,[(val)=>val["label"]]);
                }
                else {
                    datas[key] = records
                }
            })

            yield put({ type: type.SET_MASTER_DATA, payload: datas })
            yield put({ type: loaderAction?.HIDE_LOADER, payload:false})
        }
    }
    catch (er) {
        yield put({ type: type.GET_MASTERS_DATA_REQUEST_ERROR, payload: er })
        yield put({ type: loaderAction?.HIDE_LOADER, payload:false})
    }
}

export function* fetchMasters() {
    yield takeEvery(type.GET_MASTERS_DATA_REQUEST, fetchAllMasterData)
}