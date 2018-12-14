import React, {Component} from 'react'
import {StyleSheet, DeviceEventEmitter, Image, Platform} from 'react-native'
import {Router, Scene, Modal, Lightbox} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import configureStore from './store/index'

import LoginScreen from './components/LoginScreen';
import SecondScreen from './components/SecondScreen'

let store = configureStore();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center"
    },
    navigationBar: {
        backgroundColor: '#fff'
    },
    tabBarContainer: {
        backgroundColor: '#fff'
    }
});

const getSceneStyle = () => ({backgroundColor: '#fff', shadowOpacity: 1, shadowRadius: 3});
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router getSceneStyle={getSceneStyle}>
                    <Scene key="root">
                        <Scene key="loginScreen"
                            component={LoginScreen}
                                animation='fade'
                            hideNavBar={true}
                            initial={true}
                            />
                            <Scene key="secondScreen"
                            component={SecondScreen}
                            animation='fade'
                            hideNavBar={true}
                            />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}