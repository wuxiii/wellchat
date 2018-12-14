import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
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
import Split from '../Split'
import Http from '../../Http';
import Config from '../../Config'
import moment from 'moment';

export default class HomeNews extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.HomeNews) {
            return true;
        }
        return false;
    }
    componentDidMount() {
        Http
            .get('/dataNews/top.json?count=5')
            .then(result => {
                this.setState({
                    HomeNews: true,
                    ...result.data
                });
            });
    }
    renderItem(item, index) {
        return <TouchableOpacity
            activeOpacity={1}
            onPress={() => Actions.web({url: item.externalUrl})}>
            <Image
                indicator={() =>< ActivityIndicator />}
                resizeMode='cover'
                imageStyle={{
                borderRadius: 5
            }}
                style={{
                width: screenW - 20,
                height: screenW / 2
            }}
                source={{
                uri: Config.imageBaseUrl + item.videoUrl
            }}></Image>
            <Flex
                style={{
                justifyContent: 'flex-end',
                marginTop: -20
            }}>
            <Text style={styles.count}>{moment(item.publishTime).format('YYYY年M月D日')}
                <Text style={styles.small}></Text>
            </Text>
            <Text style={styles.count}>{item.readCount}
                <Text style={styles.small}>阅读</Text>
            </Text>
            </Flex>
            <View>
                <Text style={styles.text}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    }
    render() {
        return <View
            style={{
            backgroundColor: '#FFF',
            padding: 10
        }}>
            <FlatList
                data={this.state.list}
                ListEmptyComponent={ActivityIndicator}
                ItemSeparatorComponent={Split}
                keyExtractor=
                { (item, index) => item .id .toString() }
                renderItem=
                { ({item}) => this.renderItem(item) }></FlatList>
        </View>
    }
}
const styles = StyleSheet.create({
    text: {
        textShadowOffset: {
            width: 2,
            hegith: 2
        },
        textShadowRadius: 5,
        textShadowColor: 'grey',
        lineHeight: 20,
        marginTop: 10,
        fontSize: 16
    },
    count: {
        textShadowOffset: {
            width: 2,
            hegith: 2
        },
        textShadowRadius: 5,
        textShadowColor: 'black',
        textAlign: 'right',
        flex: 0,
        color: '#FFF',
        marginRight: 10,
        fontSize: 14
    },
    small: {
        fontSize: 10
    }
});