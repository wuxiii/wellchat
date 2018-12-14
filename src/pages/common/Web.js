import React, {Component} from 'react';
import {
    WebView,
    View,
    Text,
    StyleSheet,
    DeviceEventEmitter,
    InteractionManager
} from 'react-native';
import {Icon, Flex, ActivityIndicator, WhiteSpace, Toast} from 'antd-mobile-rn';
import {Actions} from 'react-native-router-flux'
import {ifIphoneX} from '../../Util'
import Svg from '../../svg/Svg';

const patchJsCode = `
(function () {
    var originalPostMessage = window.postMessage;
    var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    window.postMessage = patchedPostMessage;
})();

var url = '';
function urlChanged() {
    if (window.location.href != url) {
        url = window.location.href;
        if (window.postMessage) {
            window.postMessage(JSON.stringify({type: 'navigate', url: url}))
        }
    }
}
window.addEventListener("hashchange", urlChanged);

`;

export default class Web extends Component {
    static defaultProps = {
        embed: false,
        url: '',
        onNavigate: null,
        height: 0
    }
    constructor(props) {
        super(props);
        this.state = {
            init: false,
            title: '',
            loading: false,
            home_url: props.url,
            current_url: props.url
        };
    }
    resetUrl(url) {
        this
            ._web
            .stopLoading();
        this.setState({current_url: url, home_url: url});
    }
    _setLoading(value) {
        this.setState(previousState => {
            return {loading: value};
        });
    }
    _handleBack() {
        if (this.state.current_url == this.state.home_url) {
            Actions.pop();
        } else {
            this
                ._web
                .goBack();
        }
    }
    _navigate(event) {
        if (event.url.indexOf("react-js-navigation") != -1) {
            return;
        }
        console.log(event.url);
        if (event.title) {
            this.setState({title: event.title})
        };
        this.setState({current_url: event.url});
        if (this.props.onNavigate) {
            this
                .props
                .onNavigate(this.state.home_url == event.url);
        }
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            if (this.props.url) {
                this.setState(previousState => {
                    return {init: true};
                });
            } else {
                Toast.fail('地址不正确', 1);
                Actions.pop();
            }
        });
        this.listener = DeviceEventEmitter.addListener('login', (e) => {
            console.log('login event:' + e);
        });
    }
    componentWillUnmount() {
        this
            .listener
            .remove();
    }
    onMessage(event) {
        try {
            const action = JSON.parse(event.nativeEvent.data)
            console.log(action);
            switch (action.type) {
                case 'navigate':
                    this._navigate(action);
                    break;
                case 'jump':
                    Actions.web({url: action.url});
                    break;
            }
        } catch (error) {}
    }
    render() {
        let nav = !this.props.embed || this.state.current_url != this.state.home_url
            ? <Flex style={styles.topBar}>
                    <Flex.Item
                        onPress={(event) => {
                        this._handleBack(event)
                    }}
                        style={{
                        paddingLeft: 10,
                        paddingTop: 2,
                        flex: 0
                    }}>
                        <Icon type={'\ue620'} size="md" color="#FF4F37"/>
                    </Flex.Item>
                    <Flex.Item
                        style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                            color: '#FF4F37',
                            fontSize: 16,
                            fontWeight: "500"
                        }}
                            ellipsizeMode='middle'
                            numberOfLines={1}>{this.state.title}</Text>
                    </Flex.Item>
                    <Flex.Item
                        style={{
                        paddingRight: 10,
                        paddingTop: 2,
                        flex: 0
                    }}><Icon type={'\ue613'} size="md" color="#FF4F37"/></Flex.Item>
                </Flex>
            : null;
        return (
            <View
                style={this.props.height
                ? {
                    height: this.props.height
                }
                : {
                    flex: 1
                }}>
                {nav}
                {!this.state.init
                    ? <View><WhiteSpace size="lg"/><ActivityIndicator/></View>
                    : <WebView
                        originWhitelist={['*']}
                        ref={(e) => this._web = e}
                        style={{
                        flex: 1
                    }}
                        injectedJavaScript={patchJsCode}
                        thirdPartyCookiesEnabled={true}
                        javaScriptEnabled={true}
                        onMessage={this
                        .onMessage
                        .bind(this)}
                        onLoadStart={(event) => {
                        this._setLoading(true)
                    }}
                        startInLoadingState={true}
                        renderLoading={() => {
                        return (
                            <View
                                style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}><WhiteSpace size="lg"/>
                                <ActivityIndicator color="#FF4F37"/></View>
                        );
                    }}
                        renderError={() => {
                        return (
                            <View
                                style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}><WhiteSpace size="lg"/>
                                <Svg icon="error" size="60"/></View>
                        );
                    }}
                        onLoadEnd={(event) => {
                        this._setLoading(false)
                    }}
                        onNavigationStateChange={(event) => {
                        this._navigate(event)
                    }}
                        source={{
                        uri: this.state.home_url
                    }}></WebView>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: '#FFF',
        paddingBottom: 10,
        ...ifIphoneX({
            paddingTop: 40
        }, {
            paddingTop: 25
        }, {paddingTop: 10})
    }
});