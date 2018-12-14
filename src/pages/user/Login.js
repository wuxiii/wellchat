import React, {Component} from 'react'
import {View, DeviceEventEmitter, Text, StyleSheet, TextInput} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Button, InputItem, Flex, Toast} from 'antd-mobile-rn';
import {connect} from 'react-redux'
import ActionTypes from '../../actions'
import UserCommand from '../../actions/UserCommand'
import {screenH} from '../../Util'
import Http from '../../Http';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smsCounter: 0,
            phone: '',
            sms: ''
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        switch (nextProps.env.status) {
            case ActionTypes.USER_LOGIN_SUCCESS:
                DeviceEventEmitter.emit('login', nextState);
                Actions.pop();
        }
        return true;
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    getSms() {
        if (this.state.smsCounter == 0) {
            var tester = /^[1][3,4,5,6,7,8][0-9]{9}$/;
            if (!tester.test(this.state.phone)) {
                Toast.fail('手机号错误!', 1);
            } else {
                // start sms counter
                this.setState({smsCounter: 30});
                var counter = () => {
                    console.log("sms counter: " + this.state.smsCounter);
                    if (this.state.smsCounter > 0) {
                        this.setState({
                            smsCounter: this.state.smsCounter - 1
                        });
                        this.timer = setTimeout(counter, 1000)
                    }
                };
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(counter, 1000);
                // network request
                var request = {}
                request.phone = this.state.phone
                Http
                    .post('/user/sms', request)
                    .then(result => {
                        this.setState({result: result});
                    });
            }
        }
    }
    userLogin() {
        UserCommand.login(this.props.dispatch, {
            phone: this.state.phone,
            sms_code: this.state.sms
        });
    }
    render() {
        return (
            <View
                style={{
                paddingHorizontal: 20,
                marginTop: 40
            }}>
                <Text
                    onPress={() => Actions.pop()}
                    style={{
                    paddingTop: 10,
                    height: 40,
                    color: '#AAA',
                    marginBottom: screenH / 10,
                    textAlign: 'right'
                }}>{'先去逛逛️ >'}</Text>
                <Text
                    style={{
                    fontSize: 30,
                    marginBottom: 10,
                    textAlign: 'center'
                }}>登录注册</Text>
                <Text
                    style={{
                    color: '#AAA',
                    marginBottom: 30,
                    textAlign: 'center'
                }}>未注册的手机，登陆后即完成注册</Text>
                <View
                    style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#EEE',
                    marginBottom: 15
                }}>
                    <Flex
                        style={{
                        borderBottomColor: '#EEE',
                        borderBottomWidth: 1,
                        ...styles.input
                    }}>
                        <Text
                            style={{
                            textAlign: 'left'
                        }}>+86</Text>
                        <Text
                            style={{
                            width: 30,
                            textAlign: 'center',
                            color: '#CCC'
                        }}>|</Text>
                        <TextInput
                            keyboardType='number-pad'
                            returnKeyType='next'
                            maxLength={11}
                            underlineColorAndroid='transparent'
                            style={{
                            padding: 0,
                            flex: 1,
                            height: 25
                        }}
                            value={this.state.phone}
                            onChangeText={(text) => this.setState({phone: text})}
                            placeholder="手机号"></TextInput>
                    </Flex>
                    <Flex style={{
                        ...styles.input
                    }}>
                        <TextInput
                            keyboardType='number-pad'
                            returnKeyType='go'
                            maxLength={6}
                            underlineColorAndroid='transparent'
                            style={{
                            padding: 0,
                            flex: 1,
                            height: 25
                        }}
                            value={this.state.sms}
                            onChangeText={(text) => this.setState({sms: text})}
                            placeholder="验证码"></TextInput>
                        <Text
                            onPress={() => this.getSms()}
                            style={{
                            flex: 0,
                            color: this.state.smsCounter == 0
                                ? '#FF4F37'
                                : '#AAA',
                            textAlign: 'right'
                        }}>{this.state.smsCounter > 0
                                ? this.state.smsCounter + '秒后重新获取'
                                : '获取验证码'}</Text>
                    </Flex>
                </View>
                <Button
                    type='warning'
                    onClick={() => this.userLogin()}
                    style={{
                    backgroundColor: '#FF4F37',
                    borderColor: '#FF4F37'
                }}>登录</Button>
                <Text
                    style={{
                    marginTop: 15,
                    color: '#AAA',
                    textAlign: 'right'
                }}>收不到验证码？</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        height: 50
    }
});

function select(store) {
    return {user: store.default.userStore, env: store.default.envStore}
}

export default connect(select)(Login);
