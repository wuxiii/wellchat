import {
    AppRegistry,
    YellowBox
} from 'react-native';
import {
    name as appName
} from './app.json';
import App from './src/App'
YellowBox.ignoreWarnings([
    'Remote debugger',
    'Module RCTBarcodeManager',
    'Task orphaned'
  ])
AppRegistry.registerComponent(appName, () => App);