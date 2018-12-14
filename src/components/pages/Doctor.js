import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Platform,
    StatusBar,
    ScrollView
} from 'react-native'
import {
    Icon,
    Flex,
    WingBlank,
    ActivityIndicator,
    WhiteSpace,
    Tag
} from 'antd-mobile-rn';
import Image from 'react-native-image-progress';
import {Actions} from 'react-native-router-flux'
import {ifIphoneX, screenW} from '../../Util'
import Split from '../Split'
import Http from '../../Http';
import Config from '../../Config'
import LinearGradient from 'react-native-linear-gradient';
import Svg from '../../svg/Svg';

export default class PageDoctor extends Component {
    static defaultProps = {
        category: 'all'
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.PageDoctor
            ? true
            : false;
    }
    componentDidMount() {
        Http
            .get('/professor/department/list.json')
            .then(result => {
                this.setState({
                    PageDoctor: true,
                    selected: result.data[0],
                    category: [
                        {
                            title: '我的关注'
                        }
                    ].concat(result.data.map(i => {
                        return {title: i}
                    }))
                });
                this._switch(result.data[0]);
            });
    }
    renderItem(item, index) {
        return <TouchableOpacity
            activeOpacity={1}
            onPress={() => Actions.web({url: item.externalUrl})}>
            <Flex>
                <Image
                    indicator={() =>< ActivityIndicator />}
                    resizeMode='cover'
                    imageStyle={{
                    borderRadius: screenW / 8
                }}
                    style={{
                    width: screenW / 4,
                    height: screenW / 4,
                    marginRight: 10
                }}
                    source={{
                    uri: Config.imageBaseUrl + item.picUrl
                }}></Image>
                <View>
                    <Text style={styles.text}>{item.name}</Text>
                    <Flex>
                        {item.level
                            ? <Tag style={styles.tag} small>{item.level}</Tag>
                            : null}
                        <Tag style={styles.tag} small>{item.position}</Tag>
                    </Flex>
                </View>
            </Flex>
            <Text numberOfLines={3} style={styles.descript}>{item.descript}</Text>
        </TouchableOpacity>
    }
    _switch(selected) {
        Http
            .get('/professor/list.json?page=1&limit=10&department=' + selected)
            .then(result => {
                this.setState({
                    selected: selected,
                    PageDoctor: true,
                    sums: result.data.list,
                    ...result.data
                });
            });
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
            <Flex style={{
                flex: 1
            }}>
                <Flex.Item
                    style={{
                    paddingRight: 10,
                    flex: 0
                }}>
                    {this.state.category
                        ? this
                            .state
                            .category
                            .map(element => {
                                return <Text
                                    key={element.title}
                                    onPress={() => {
                                    this._switch(element.title);
                                }}
                                    style={[
                                    styles.title, this.state.selected == element.title
                                        ? {
                                            color: '#FF4F37'
                                        }
                                        : {
                                            color: 'gray'
                                        }
                                ]}>{element.title}</Text>
                            })
                        : null}
                </Flex.Item>
                <LinearGradient
                    start={{
                    x: 0,
                    y: 0
                }}
                    end={{
                    x: 0,
                    y: 1
                }}
                    style={{
                    width: 1,
                    marginRight: 10,
                    height: '100%',
                    marginBottom: 10
                }}
                    colors={['#FFF', '#FF6F57', '#FF6F57', '#FFF']}></LinearGradient>
                <Flex.Item>
                    <FlatList
                        data={this.state.sums}
                        ListEmptyComponent={ActivityIndicator}
                        ItemSeparatorComponent={Split}
                        ListFooterComponent={footer}
                        onEndReachedThreshold={0.5}
                        onEndReached={(info) => {
                        if (!this.state.isLastPage && !this.state.loading) {
                            this.setState({loading: true});
                            Http
                                .get('/professor/list.json?page=' + this.state.nextPage + '&limit=' + this.state.pageSize + '&department=' + this.state.selected)
                                .then(result => {
                                    this.setState({
                                        PageReport: true,
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
                </Flex.Item>
            </Flex>
        </View>
    }
}
const styles = StyleSheet.create({
    tag: {
        marginRight: 5,
        marginTop: 5
    },
    title: {
        lineHeight: 20,
        textAlign:'right',
        paddingBottom: 10,
        fontSize: 16
    },
    descript: {
        color: 'gray',
        fontSize: 12,
        marginTop: 10
    },
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
        fontSize: 12
    }
});