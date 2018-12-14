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
    WingBlank,
    List
} from 'antd-mobile-rn';
import Image from 'react-native-image-progress';
import {Actions} from 'react-native-router-flux'
import {ifIphoneX, screenW} from '../../Util'
import Split from '../Split'
import Http from '../../Http';
import Config from '../../Config'

export default class HomeCommodity extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.HomeCommodity) {
            return true;
        }
        return false;
    }
    componentDidMount() {
        Http
            .get('/commodity/points/list.json?page=1&limit=8')
            .then(result => {
                this.setState({
                    HomeCommodity: true,
                    ...result.data
                });
            });
    }
    renderItem(item, index) {
        return <TouchableOpacity activeOpacity={1}>
            <WingBlank size='md'>
                <Image
                    indicator={() =>< ActivityIndicator />}
                    resizeMode='cover'
                    imageStyle={{
                    borderRadius: 5
                }}
                    style={{
                    width: screenW / 3,
                    height: screenW / 2
                }}
                    source={{
                    uri: Config.imageBaseUrl + item.url
                }}></Image>
                <View>
                    <Flex
                        style={{
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.price}>{item.price}
                            <Text style={styles.small}>￥</Text>
                        </Text>
                        <Text style={styles.point}>{item.point}
                            <Text style={styles.small}>积分</Text>
                        </Text>
                    </Flex>
                    <Text ellipsizeMode='middle' numberOfLines={1} style={styles.text}>{item.name}</Text>
                </View>
            </WingBlank>
        </TouchableOpacity>
    }
    render() {
        return <View
            style={{
            backgroundColor: '#FFF',
            padding: 10,
            paddingBottom: 0
        }}>
            <FlatList
                horizontal={true}
                data={this.state.list}
                ListEmptyComponent={ActivityIndicator}
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
        textAlign: 'center',
        width: screenW / 3,
        lineHeight: 20,
        marginTop: 2,
        fontSize: 16,
        marginBottom: 10
    },
    price: {
        padding: 3,
        color: 'gray'
    },
    point: {
        padding: 3,
        color: '#FF4F37'
    },
    small: {
        fontSize: 10
    }
});