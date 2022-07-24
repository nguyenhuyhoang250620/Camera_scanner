/**
 * @format
 */

 import Scanner from './src/Scanner';
 import RectangleOverlay from './src/RectangleOverlay';
 import Filters from './src/Filters';
 import FlashAnimation from './src/FlashAnimation';
 import { AppRegistry } from "react-native";
  import App from "./App";
  import { name as appName } from "./app.json";  

 export default Scanner;
 export {
   RectangleOverlay,
   Filters,
   FlashAnimation,
 };
 AppRegistry.registerComponent(appName, () => App);
 export const CACHE_FOLDER_NAME = 'RNRectangleScanner';