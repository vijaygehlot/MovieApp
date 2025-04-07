import createSagaMiddleWare from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';

import {reducer} from '../reducer';
import {handler} from '../saga/handler';

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(sagaMiddleWare),
});

sagaMiddleWare.run(handler);
