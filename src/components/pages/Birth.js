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
import Carousel from 'react-native-snap-carousel';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import BirthData from '../../data/Birth'

LocaleConfig.locales['fr'] = {
    monthNames: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
    ],
    monthNamesShort: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
    ],
    dayNames: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7'
    ],
    dayNamesShort: [
        '周日',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六'
    ]
};

LocaleConfig.defaultLocale = 'fr';

export default class PageBirth extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.PageBirth
            ? true
            : false;
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({PageBirth: true, list: BirthData});
        }, 500)
    }
    renderItem({item, index}) {
        return <View
            style={{
            borderWidth: 1,
            borderColor: '#FF4F37',
            borderRadius: 20,
            height: 250,
            marginBottom: 10,
            backgroundColor: '#FFF',
            shadowColor: '#FF4F37',
            shadowOffset: {
                h: 20,
                w: 20
            },
            shadowRadius: 5,
            shadowOpacity: 0.8,
            padding: 10,
            paddingBottom: 5,
            justifyContent: 'space-between'
        }}>
            <Flex style={{
                justifyContent: 'space-between'
            }}>
                <Text
                    style={{
                    textAlign: "left",
                    fontSize: 12,
                    color: '#17abe3'
                }}>距离预产期123天<Text
                    style={{
            color: '#ccc',
            textAlign: "left",
            fontSize: 8
        }}>[重新设置]</Text>
                </Text>
                <Text
                    style={{
                    textAlign: "right",
                    fontSize: 12,
                    color: '#FF4F37'
                }}>宝宝体重{item.weight}克</Text>
            </Flex>
            <Text style={{
                color: '#FF4F37'
            }}>
                <Text
                    style={{
                    color: '#ccc',
                    textAlign: "left"
                }}>[宝宝的变化] </Text>{item.text}</Text>
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
                height: 1
            }}
                colors={['#FFF', '#FF6F57', '#FF6F57', '#FFF']}></LinearGradient>
            <View>
                <Text style={{
                    color: '#FF4F37'
                }}>
                    <Text
                        style={{
                        color: '#ccc',
                        textAlign: "left"
                    }}>[妈妈的变化] </Text>{item.mother}</Text>
            </View>
            <Text
                style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
                color: '#FF4F37'
            }}>第{index + 1}周</Text>
        </View>
    }
    render() {
        let tip = <View style={{
            flex: 1
        }}>
            <Text
                style={{
                fontSize: 10,
                textAlign: 'center',
                color: '#dbdbdb'
            }}>下拉选择日期</Text>
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Svg icon="riji" size="50"></Svg>
            </View>
        </View>
        return <View style={{
            flex: 1
        }}>
            <View
                style={{
                flex: 0,
                backgroundColor: '#FFF',
                padding: 10,
                paddingBottom: 0
            }}>
                {this.state.list
                    ? <Carousel
                            firstItem={2}
                            sliderWidth={screenW - 20}
                            itemWidth={screenW * 3 / 4}
                            data={this.state.list}
                            renderItem={this.renderItem}></Carousel>
                    : <ActivityIndicator/>}
            </View>
            {this.state.list
                ? <View style={{
                        flex: 1
                    }}>
                        <Agenda
                            renderItem={(item, firstItemInDay) => {
                            return (
                                <View
                                    style={{
                                    flex: 1,
                                    padding: 5,
                                    justifyContent: 'flex-end'
                                }}>
                                    <Text>{item.text}</Text>
                                </View>
                            );
                        }}
                            rowHasChanged={(r1, r2) => {
                            return r1.text !== r2.text
                        }}
                            renderEmptyData={() => tip}
                            theme={{
                            agendaKnobColor: '#FFCFB7',
                            backgroundColor: '#FFF',
                            dotColor: '#FF4F37',
                            selectedDayBackgroundColor: '#FF4F37'
                        }}
                            items={{
                            '2018-09-04': [
                                {
                                    text: '今天的日记'
                                }
                            ],
                            '2018-09-08': [
                                {
                                    text: '今天的日记++'
                                }
                            ],
                            '2018-09-09': [
                                {
                                    text: '日记+++++'
                                }
                            ]
                        }}></Agenda>
                    </View>
                : null}
        </View>
    }
}
const styles = StyleSheet.create({
    text: {
        color: '#FF4F37'
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