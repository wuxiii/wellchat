import React, {Component} from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    DeviceEventEmitter
} from 'react-native'
import {
    Icon,
    Flex,
    Grid,
    ActivityIndicator,
    Carousel,
    List
} from 'antd-mobile-rn';
import Image from 'react-native-image-progress';
import {Actions} from 'react-native-router-flux'
import {ifIphoneX, screenW} from '../../Util'
import Http from '../../Http';

export default class HomeCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: false
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.init) {
            return false;
        } else {
            return true;
        }
    }
    componentDidMount() {
        Http
            .get('/home/pic/list')
            .then(result => {
                this.setState({
                    init: true,
                    ...result
                });
            });
    }
    renderItem(item, index) {
        return <View key={item} style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => Actions.web({url: this.state.action_urls[index]})}>
                <Image
                    indicator={() =>< ActivityIndicator />}
                    resizeMode='cover'
                    style={{
                    width: screenW,
                    height: screenW / 2
                }}
                    source={{
                    uri: item
                }}></Image>
            </TouchableOpacity>
        </View>
    }
    render() {
        return <Carousel autoplayInterval={6000} autoplay infinite>
            {!this.state.data
                ? <View/>
                : this
                    .state
                    .data
                    .map((item, index) => this.renderItem(item, index))}
        </Carousel>
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});