import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    View,
    Text,
    Platform,
    StyleSheet
} from 'react-native';
import {List, Flex, WhiteSpace, Carousel} from 'antd-mobile-rn';
import Svg from '../../svg/Svg';
import {ifIphoneX, screenW} from '../../Util'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import Config from '../../Config'
import LinearGradient from 'react-native-linear-gradient';

const Item = List.Item;

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentWillUnmount() {}
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <LinearGradient colors={['#FF4F37', '#FF7F67']} style={styles.topBar}>
                    <Flex>
                        <Flex.Item><Svg style={styles.icon} icon="help" size="25"/></Flex.Item>
                        <Flex.Item
                            style={{
                            alignItems: 'flex-end'
                        }}><Svg style={styles.icon} icon="settings" size="25"/></Flex.Item>
                    </Flex>
                    <Flex
                        style={{
                        justifyContent: 'center'
                    }}>
                        <Image
                            style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40
                        }}
                            roundAsCircle={true}
                            source={this.props.user.avatar
                            ? {
                                uri: Config.imageBaseUrl + this.props.user.avatar
                            }
                            : require('../../image/unlogin.png')}></Image>
                    </Flex>
                    <Text onPress={() => Actions.login({target: ''})} style={styles.username}>
                        {this.props.user.nickname
                            ? this.props.user.nickname
                            : '登陆 / 注册'}
                    </Text>
                    {this.props.user.point
                        ? <LinearGradient
                                start={{
                                x: 0,
                                y: 0
                            }}
                                end={{
                                x: 1,
                                y: 0
                            }}
                                style={{
                                width: screenW,
                                height: 1,
                                marginBottom: 10
                            }}
                                colors={['#FF6F57', '#FFF', '#FF6F57']}></LinearGradient>
                        : <View/>}
                    {this.props.user.point
                        ? <Flex
                                style={{
                                paddingBottom: 10
                            }}>
                                <Flex.Item>
                                    <View
                                        style={{
                                        alignItems: 'center',
                                        borderRightWidth: 1,
                                        borderRightColor: '#FFF'
                                    }}><Svg icon="yaoqinghaoyou" size="25"/>
                                        <Text style={styles.text}>邀请好友</Text>
                                    </View>
                                </Flex.Item>
                                <Flex.Item>
                                    <Carousel
                                        vertical={true}
                                        dots={false}
                                        autoplayInterval={3000}
                                        autoplay
                                        infinite>
                                        <View style={styles.center}>
                                            <Svg icon="points" size="25"></Svg>
                                            <Text style={styles.text}>当前积分:{this.props.user.point.current}</Text>
                                        </View>
                                        <View style={styles.center}>
                                            <Svg icon="points" size="25"></Svg>
                                            <Text style={styles.text}>累计积分:{this.props.user.point.total}</Text>
                                        </View>
                                        <View style={styles.center}>
                                            <Svg icon="points" size="25"></Svg>
                                            <Text style={styles.text}>邀请奖励积分:{this.props.user.point.total_invite}</Text>
                                        </View>
                                        <View style={styles.center}>
                                            <Svg icon="points" size="25"></Svg>
                                            <Text style={styles.text}>签到奖励积分:{this.props.user.point.total_sign}</Text>
                                        </View>
                                    </Carousel>
                                </Flex.Item>
                                <Flex.Item
                                    style={{
                                    alignItems: 'center',
                                    borderLeftWidth: 1,
                                    borderLeftColor: '#FFF'
                                }}>
                                    <View
                                        style={{
                                        alignItems: 'center'
                                    }}><Svg icon="qiandao" size="25"/>
                                        <Text style={styles.text}>连续签到1天</Text>
                                    </View>
                                </Flex.Item>
                            </Flex>
                        : <View/>}
                </LinearGradient>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.title}>我的订单</Text>
                    </View>
                    <List>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "yuyue" size = "25" />}>
                            我的预约
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "tijiantaocan" size = "25" />}>
                            体检套餐
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "fuli" size = "25" />}>
                            一元福利
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "jifendingdan" size = "25" />}>
                            积分订单
                        </Item>
                    </List>
                    <WhiteSpace style={styles.space}/>
                    <View>
                        <Text style={styles.title}>活动参与</Text>
                    </View>
                    <List>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "yaoqingren" size = "25" />}>
                            我的邀请人
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "xideyijiayi" size = "25" />}>
                            喜得1+1
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "yaohaohuodong" size = "25" />}>
                            摇号活动
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "baomingba" size = "25" />}>
                            报名吧
                        </Item>
                    </List>
                    <WhiteSpace style={styles.space}/>
                    <View>
                        <Text style={styles.title}>我的检查</Text>
                    </View>
                    <List>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "tijianbaogao" size = "25" />}>
                            体检报告
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "yunchanbaogao" size = "25" />}>
                            孕产报告
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb={< Svg style = {
                            styles.listIcon
                        }
                        icon = "zigepucha" size = "25" />}>
                            普查资格
                        </Item>
                    </List>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    topBar: {
        backgroundColor: '#FF4F37',
        ...ifIphoneX({
            paddingTop: 35
        }, {
            paddingTop: 20
        }, {paddingTop: 0})
    },
    listIcon: {
        marginRight: 10
    },
    icon: {
        margin: 10
    },
    title: {
        fontSize: 16,
        margin: 10,
        color: '#888'
    },
    space: {
        backgroundColor: '#EEEEEE'
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10
    },
    center: {
        alignItems: 'center'
    },
    username: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    }
});

function select(store) {
    return {user: store.default.userStore}
}

export default connect(select)(Info);
