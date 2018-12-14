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
    WhiteSpace,
    List
} from 'antd-mobile-rn';
import Image from 'react-native-image-progress';
import {Actions} from 'react-native-router-flux'
import {ifIphoneX, screenW} from '../../Util'
import Split from '../Split'
import Http from '../../Http';
import Config from '../../Config'
import Svg from '../../svg/Svg';

export default class PageCommodity extends Component {
    static defaultProps = {
        category: 'all'
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.PageCommodity
            ? true
            : false;
    }
    componentDidMount() {
        Http
            .get('/commodity/points/list.json?page=1&limit=10')
            .then(result => {
                this.setState({
                    PageCommodity: true,
                    sums: result.data.list,
                    ...result.data
                });
            });
    }
    renderItem(item, index) {
        return <TouchableOpacity
            style={{
            marginRight: 10
        }}
            activeOpacity={1}
            onPress={() => Actions.web({url: item.externalUrl})}>
            <Image
                indicator={() =>< ActivityIndicator />}
                resizeMode='cover'
                imageStyle={{
                borderRadius: 5
            }}
                style={{
                width: screenW / 2 - 15,
                height: screenW * 2 / 3
            }}
                source={{
                uri: Config.imageBaseUrl + item.url
            }}></Image>
            <Flex
                style={{
                justifyContent: 'flex-end',
                marginTop: -20,
                marginBottom: 5
            }}>
                <Text style={styles.count}>{item.inventory}
                    <Text style={styles.small}>库存</Text>
                </Text>
            </Flex>
            <Flex style={{
                justifyContent: 'space-between'
            }}>
                <Text style={styles.price}>{item.price}
                    <Text style={styles.small}>￥</Text>
                </Text>
                <Text style={styles.point}>{item.point}
                    <Text style={styles.small}>积分</Text>
                </Text>
            </Flex>
            <View>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    }
    render() {
        let footer = this.state.loading
            ? <View><WhiteSpace/><ActivityIndicator/><WhiteSpace/></View>
            : <WhiteSpace/>
        return <View
            style={{
            flex: 1,
            backgroundColor: '#FFF',
            padding: 10,
            paddingBottom: 0
        }}>
            <FlatList
                horizontal={false}
                numColumns={2}
                data={this.state.sums}
                ListEmptyComponent={ActivityIndicator}
                ItemSeparatorComponent={Split}
                ListFooterComponent={footer}
                onEndReachedThreshold={0.5}
                onEndReached={(info) => {
                if (!this.state.isLastPage) {
                    this.setState({loading: true});
                    Http
                        .get('/commodity/points/list.json?page=' + this.state.nextPage + '&limit=' + this.state.pageSize)
                        .then(result => {
                            this.setState({
                                PageCommodity: true,
                                loading: false,
                                sums: this
                                    .state
                                    .sums
                                    .concat(result.data.list),
                                ...result.data
                            });
                        });
                }
            }}
                keyExtractor=
                { (item, index) => index.toString() }
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
        marginTop: 5,
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
        marginRight: 6,
        fontSize: 14
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