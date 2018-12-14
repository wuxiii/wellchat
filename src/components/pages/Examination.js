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

export default class PageExamination extends Component {
    static defaultProps = {
        classify: 'common'
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.PageExamination
            ? true
            : false;
    }
    componentDidMount() {
        Http
            .get('/commodity/examination/list.json?page=1&limit=10&classify=' + this.props.classify)
            .then(result => {
                this.setState({
                    sums: result.data.list,
                    PageExamination: true,
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
                uri: Config.imageBaseUrl + item.url
            }}></Image>
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
                data={this.state.sums}
                ListEmptyComponent={ActivityIndicator}
                ItemSeparatorComponent={Split}
                ListFooterComponent={footer}
                onEndReachedThreshold={0.5}
                onEndReached={(info) => {
                if (!this.state.isLastPage) {
                    this.setState({loading: true});
                    Http
                        .get('/commodity/examination/list.json?classify=common&page=' + this.state.nextPage + '&limit=' + this.state.pageSize + '&classify=' + this.props.classify)
                        .then(result => {
                            this.setState({
                                PageExamination: true,
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
    }
});