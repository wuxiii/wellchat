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

export default class PageNews extends Component {
    static defaultProps = {
        category: 'all'
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.PageNews
            ? true
            : false;
    }
    componentDidMount() {
        Http
            .get('/dataNews/list.json?page=1&limit=10&category=' + this.props.category)
            .then(result => {
                this.setState({
                    PageNews: true,
                    sums: result.data.list,
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
                uri: Config.imageBaseUrl + (item.videoUrl
                    ? item.videoUrl
                    : item.source)
            }}></Image>
            <Flex
                style={{
                justifyContent: 'flex-end',
                marginTop: -20
            }}>
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
                data={this.state.sums}
                ListEmptyComponent={ActivityIndicator}
                ItemSeparatorComponent={Split}
                ListFooterComponent={footer}
                onEndReachedThreshold={0.5}
                onEndReached={(info) => {
                if (!this.state.isLastPage) {
                    this.setState({loading: true});
                    Http
                        .get('/dataNews/list.json?page=' + this.state.nextPage + '&limit=' + this.state.pageSize + '&category=' + this.props.category)
                        .then(result => {
                            this.setState({
                                PageNews: true,
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