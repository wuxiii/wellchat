import React, {Component} from 'react'
import {StyleSheet, DeviceEventEmitter, Image, Platform} from 'react-native'
import {Router, Scene, Modal, Lightbox,Stack} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import configureStore from './store/index'

import LoginScreen from './components/LoginScreen';
import SecondScreen from './components/SecondScreen';
import CustomNavBar from './components/CustomNavBar';
import ChartView from './components/ChatView'

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
                    <Scene key="root"  back>
                        <Scene key="secondScreen"
                                title="Friends"
                                component={SecondScreen}
                                animation='fade'
                                navigationBarStyle={{backgroundColor:'#F035E0'}}
                                />
                        <Scene key="loginScreen"
                            component={LoginScreen}
                            animation='fade'
                            hideNavBar={true}
                            initial={true}
                            />  

                        <Scene key="chatView"
                                component={ChartView}
                                animation='fade'
                                title="Chat"
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}