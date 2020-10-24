/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './src/reducers/index';
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas/rootSaga';

import { CONTROL, HOME, LIGHTCONTROL, LOGIN, POSITION } from './src/containers/index'
import { Navigation } from 'react-native-navigation';
import { composeWithDevTools } from 'redux-devtools-extension';
import HomeContainer from './src/containers/HomeContainer';
import ControlContainer from './src/containers/ControlContainer';
import PositionModal from './src/components/widgets/PositionModal';
import LightOverlay from './src/components/widgets/LightOverlay';
import SelectModal from './src/components/widgets/SelectModal';
import LoginContainer from './src/containers/LoginContainer';


declare const global: { HermesInternal: null | {} };
//Middleware
const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export const withReduxProvider = (C: React.FC) => (props: any) => (
  <Provider store={store}>
    <C {...props} />
  </Provider>
);

const Screens = new Map<string, React.FC<any>>();

Screens.set(HOME, HomeContainer);
Screens.set(CONTROL, ControlContainer);
Screens.set(LOGIN, LoginContainer);
// Register screens
Screens.forEach((C, key) => {
  Navigation.registerComponent(
    key,
    () => withReduxProvider(C),
    () => C,
  );
});

Navigation.registerComponent(POSITION, () => PositionModal);
Navigation.registerComponent(LIGHTCONTROL, () => LightOverlay);
Navigation.registerComponent('PICKER', () => SelectModal);

export const startApp = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: LOGIN,
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: {
                  visible: true,
                  style: 'dark',
                  backgroundColor: 'white'
                },
              },
              // passProps: {
              //   items: [1999, 2000, 2001, 2002],
              //   onCancel: () => { },
              //   title: 'abc',
              //   onSave: (val: any) => { },
              // }
            },
          },
        ],
      },
    },
  });
}