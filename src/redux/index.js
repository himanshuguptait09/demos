// import { createStore, applyMiddleware, compose, } from "redux";
// import rootreducer from "./Reducers/index.js"
// // import thunk from "redux-thunk";
// import rootSaga from "./Saga/index";
// import createSagaMiddleware from 'redux-saga';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// // import { composeWithDevTools } from "redux-devtools-extension";
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// const persistConfig = {
//   key: 'root',
//   storage,
//   stateReconciler: hardSet
// }
// const persistedReducer = persistReducer(persistConfig, rootreducer)

// const composeEnhancers =  compose;
// const sagaMiddleware = createSagaMiddleware();


// const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
// let persistor = persistStore(store)
// sagaMiddleware.run(rootSaga);

// export {persistor}
// export default store;





import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // Use sessionStorage
import createSagaMiddleware from 'redux-saga';
import rootReducer from './Reducers/index'; // Your root reducer
import rootSaga from './Saga/index'; // Your root saga
import CryptoJS from 'crypto-js';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

// Secret key for encryption (store securely in environment variables)
const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'your-secret-key';

// Encryptor function for persisting state
const encryptor = (inboundState) => {
  const encryptedState = CryptoJS.AES.encrypt(JSON.stringify(inboundState), SECRET_KEY).toString();
  return encryptedState;
};

// Decryptor function for retrieving state
const decryptor = (outboundState) => {
  const bytes = CryptoJS.AES.decrypt(outboundState, SECRET_KEY);
  const decryptedState = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedState);
};

// Persist Config with encryption and sessionStorage
const persistConfig = {
  key: 'root',
  storage: sessionStorage,  // Use sessionStorage instead of localStorage
  stateReconciler: hardSet,
  transforms: [
    {
      // Transform for encrypting data before saving
      in: (inboundState) => encryptor(inboundState),
      // Transform for decrypting data when loading
      out: (outboundState) => decryptor(outboundState),
    },
  ],
};

// Apply persisted reducer with the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with Redux Toolkit
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(sagaMiddleware), // Add saga middleware
});

// Persistor for Redux Persist
let persistor = persistStore(store);

// Run your root saga
sagaMiddleware.run(rootSaga);

export { persistor };
export default store;
