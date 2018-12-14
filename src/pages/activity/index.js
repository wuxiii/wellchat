import React, {Component} from 'react'
import {View, Platform, StyleSheet} from 'react-native'
import {SegmentedControl, Flex, Card, WingBlank} from 'antd-mobile-rn';
import {ifIphoneX} from '../../Util'
import PageActivity from '../../components/pages/Activity'
import PageDoctor from '../../components/pages/Doctor'

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1
        };
    }
    tabs = [
        {
            title: '客户管理'
        }, {
            title: '报名吧'
        }, {
            title: '私人医生'
        }
    ];
    onChange = (e) => {
        let selectedSegmentIndex = e.nativeEvent.selectedSegmentIndex
        this.setState(previousState => {
            return {selectedIndex: selectedSegmentIndex};
        });
    }
    render() {
        let nav = <View style={styles.topBar}>
                    <SegmentedControl
                        values={this
                        .tabs
                        .map(function (tab) {
                            return tab.title
                        })}
                        tintColor='#FF4F37'
                        selectedIndex={this.state.selectedIndex}
                        onChange={this.onChange}/>
                </View>;
        return (
            <View style={{
                flex: 1
            }}>
                {nav}
                {this.state.selectedIndex == 1
                    ? <PageActivity/>
                    : this.state.selectedIndex == 0
                        ? <PageDoctor/>
                        : <PageDoctor/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        backgroundColor: '#FF4F37',
        height: 3,
        marginBottom: 4,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBar: {
        paddingHorizontal: 30,
        ...ifIphoneX({
            paddingTop: 40
        }, {
            paddingTop: 25
        }, {paddingTop: 10})
    }
});