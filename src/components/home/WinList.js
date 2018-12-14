import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Easing,
    Animated
} from 'react-native'
import {
    Icon,
    Flex,
    Grid,
    ActivityIndicator,
    Carousel,
    List
} from 'antd-mobile-rn';
import {Actions} from 'react-native-router-flux'
import {ifIphoneX, screenW} from '../../Util'
import Split from '../Split'
import Http from '../../Http';
import Config from '../../Config'
import Svg from '../../svg/Svg';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class HomeWinList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0)
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.HomeWinList) {
            return true;
        }
        return false;
    }
    componentDidMount() {
        Http
            .get('/raffle/win/user.json?page=1&limit=40&type=all')
            .then(result => {
                this.setState({
                    HomeWinList: true,
                    ...result.data
                });
                var newList = result
                    .data
                    .list
                    .concat(result.data.list.filter(function (v, i) {
                        if (i < 10) 
                            return v;
                        }
                    ));
                this.setState({list: newList});
                this.animation = Animated.loop(Animated.timing(this.state.anim, {
                    toValue: -1200,
                    duration: 90000,
                    easing: Easing.ease,
                    isInteraction: true
                }), {iterations: 99})
                this
                    .animation
                    .start();
            });
    }
    renderItem(item, index) {
        return <Flex
            style={{
            justifyContent: 'space-between',
            height: 30,
            alignItems: "center",
            overflow: "hidden"
        }}>
            <Flex>
                <Image
                    resizeMode='cover'
                    style={{
                    borderRadius: 10,
                    marginRight: 5,
                    width: 20,
                    height: 20
                }}
                    source={item.user_avatar
                    ? {
                        uri: Config.imageBaseUrl + item.user_avatar
                    }
                    : require('../../image/user.png')}></Image>
                <Text
                    style={[
                    styles.text, {
                        width: 80
                    }
                ]}
                    ellipsizeMode='middle'
                    numberOfLines={1}>{item.userName}</Text>
            </Flex>
            <Text style={styles.text}>{item.name}</Text>
        </Flex>
    }
    render() {
        return <View style={{
            backgroundColor: '#FFF'
        }}>
            <View
                pointerEvents="none"
                style={{
                overflow: 'hidden',
                height: 300,
                margin: 10
            }}>
                <AnimatedFlatList
                    ListEmptyComponent={ActivityIndicator}
                    style={{
                    marginTop: this.state.anim
                }}
                    data={this.state.list}
                    keyExtractor=
                    { (item, index) => index.toString() }
                    renderItem=
                    { ({item}) => this.renderItem(item) }></AnimatedFlatList>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    text: {
        lineHeight: 18,
        fontSize: 16
    }
});