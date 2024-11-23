import { all } from 'redux-saga/effects';
import { fetchMasters } from './masterdata';


export default function* rootSaga() {

    yield all([
        fetchMasters()
    ])
}

