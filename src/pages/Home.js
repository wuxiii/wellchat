import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    ScrollView,
    Platform,
    StatusBar,
    DeviceEventEmitter
} from 'react-native'
import {
    Icon,
    Flex,
    Grid,
    NoticeBar,
    Carousel,
    List
} from 'antd-mobile-rn';
import {Actions} from 'react-native-router-flux'
import Svg from '../svg/Svg';
import Web from './common/Web'
import {ifIphoneX, screenW} from '../Util'
import Storage from '../Storage'
import UserCommand from '../actions/UserCommand'
import {connect} from 'react-redux'
import HomeGrid from '../data/HomeGrid'
import HomeNews from '../components/home/News'
import HomeCarousel from '../components/home/Carousel'
import HomeCommodity from '../components/home/Commodity'
import WinList from '../components/home/WinList'
import LinearGradient from 'react-native-linear-gradient';

const Item = List.Item;
const Brief = Item.Brief;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWebHome: true
        };
    }
    componentDidMount() {
        Storage
            .get('user')
            .then((user) => {
                if (user && user.token) {
                    UserCommand.token_login(this.props.dispatch, {
                        phone: user.phone,
                        token: user.token
                    });
                }
            });
        // listener
        this.styleListener = DeviceEventEmitter.addListener('changeStatusBar', (e) => {
            this
                ._winList
                .animation
                .reset();
            if (Platform.OS === "ios") {
                StatusBar.setBarStyle(e, false);
            } else {
                StatusBar.setHidden(e == 'dark-content', 'slide');
            }
        });
        this.homeListener = DeviceEventEmitter.addListener('returnHome', () => {
            this
                ._winList
                .animation
                .start();
            Platform.OS === "ios"
                ? StatusBar.setBarStyle('light-content', false)
                : StatusBar.setHidden(false, 'slide');
        });
    }
    componentWillUnmount() {
        this
            .listener
            .remove();
        this
            .homeListener
            .remove();
    }
    renderTitle(text) {
        return <View style={styles.title}>
            <Text
                style={{
                textShadowOffset: {
                    width: 2,
                    hegith: 2
                },
                textShadowRadius: 5,
                textShadowColor: 'grey',
                fontSize: 18,
                marginBottom: 3
            }}>{text}</Text>
            <LinearGradient
                start={{
                x: 0,
                y: 0
            }}
                end={{
                x: 1,
                y: 0
            }}
                style={{
                width: 100,
                height: 1
            }}
                colors={['#FFF', '#FF4F37', '#FFF']}></LinearGradient>
        </View>
    }
    renderGridItem(item, index) {
        return <View
            style={{
            backgroundColor: '#FFF',
            flex: 1,
            paddingBottom: 10
        }}><Svg
            onPress={() => Actions.web({url: item.url})}
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}
            icon={item.icon}
            size="45"/>
            <Text
                style={{
                textAlign: 'center',
                flex: 0
            }}>{item.text}</Text>
        </View>;
    }
    render() {
        return (
            <View
                style={{
                backgroundColor: '#EEE',
                flex: 1
            }}>
                <StatusBar
                    ref={(e) => this._bar = e}
                    backgroundColor='#FF4F37'
                    barStyle="light-content"/>
                <View style={styles.topBar}>
                    <Flex
                        style={{
                        backgroundColor: '#FF4F37',
                        paddingTop: 4,
                        paddingBottom: 8
                    }}>
                        <Svg
                            style={{
                            paddingLeft: 10,
                            flex: 0
                        }}
                            onPress={() => Actions.scan()}
                            icon="qr"
                            size="25"/>
                        <View
                            style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginLeft: 5,
                            marginRight: 5,
                            backgroundColor: '#FF7F77',
                            borderRadius: 25
                        }}>
                            <Svg
                                style={{
                                flex: 0,
                                marginLeft: 8,
                                marginTop: 5
                            }}
                                icon="search"
                                size="20"/>
                            <TextInput
                                spellCheck={false}
                                autoCorrect={false}
                                returnKeyType='search'
                                enablesReturnKeyAutomatically={true}
                                placeholderTextColor='#fff'
                                autoCapitalize='none'
                                style={{
                                flex: 1,
                                marginLeft: 5,
                                height: 30,
                                color: '#FFF'
                            }}></TextInput>
                        </View>
                        <Svg
                            style={{
                            paddingRight: 10,
                            flex: 0
                        }}
                            icon="kefu"
                            size="25"/>
                    </Flex>
                </View>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View>
                        <HomeCarousel/>
                        <NoticeBar
                            onClick={() => alert('click')}
                            marqueeProps={{
                            loop: true,
                            style: {
                                fontSize: 12,
                                color: 'red'
                            }
                        }}>
                            积分每月底清零，请您及时抢购！
                        </NoticeBar>
                        <Grid
                            data={HomeGrid}
                            columnNum={4}
                            isCarousel
                            hasLine={false}
                            renderItem={(item, index) => this.renderGridItem(item, index)}></Grid>
                        {this.renderTitle('摇奖活动')}
                        {this.renderTitle('中奖动态')}
                        <WinList ref={(e) => this._winList = e}></WinList>
                        {this.renderTitle('积分商城')}
                        <HomeCommodity></HomeCommodity>
                        {this.renderTitle('热点新闻')}
                        <HomeNews/>
                    </View>
                </ScrollView>
            </View>
        );
    }
    onSelectedIndexChange(index) {}
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
    text: {
        color: '#FFF',
        fontSize: 36
    },
    title: {
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        textAlign: 'center'
    }
});

function select(store) {
    return {user: store.default.userStore, status: store.default.userStore.status}
}

export default connect(select)(Home);
