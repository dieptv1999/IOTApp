/**
 * @format
 */
import './global';
import { Navigation } from 'react-native-navigation';
import App, { startApp } from './App';
import { name as appName } from './app.json';

Navigation.events().registerAppLaunchedListener(() => {
  startApp();
});
function isLoggedIn() {
  // TODO: your business logic goes here
  return true
}