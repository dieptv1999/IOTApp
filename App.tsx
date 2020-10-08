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

import { CONVERSATION, HOME } from './src/containers/index'
import { Navigation } from 'react-native-navigation';
import { composeWithDevTools } from 'redux-devtools-extension';
import HomeContainer from './src/containers/HomeContainer';
import Avatar from './src/components/widgets/Avatar';
import ConversationContainer from './src/containers/ConversationContainer';


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
Screens.set(CONVERSATION, ConversationContainer);

// Register screens
Screens.forEach((C, key) => {
  Navigation.registerComponent(
    key,
    () => withReduxProvider(C),
    () => C,
  );
});

Navigation.registerComponent('avatar', () => Avatar);

export const startApp = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: HOME,
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: {
                  visible: true,
                  style: 'dark',
                  backgroundColor: 'white'
                }
              },
            },
          },
        ],
      },
    },
  });
}