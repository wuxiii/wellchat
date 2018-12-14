import React, {Component} from 'react'
import {View, Platform, StyleSheet} from 'react-native'
import {SegmentedControl, WhiteSpace, ActivityIndicator, Flex, Icon} from 'antd-mobile-rn';
import {Actions} from 'react-native-router-flux'
import {ifIphoneX} from '../../Util'
import PageReport from '../../components/pages/Report'
import PageBirth from '../../components/pages/Birth'
import PageNews from '../../components/pages/News'

export default class Birth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1
        };
    }
    tabs = [
        {
            title: '报喜'
        }, {
            title: '喜得'
        }, {
            title: '亲友团'
        }
    ]
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
                onChange={this.onChange}/></View>;
        return (
            <View style={{
                flex: 1
            }}>
                {nav}
                {this.state.selectedIndex == 1
                    ? <PageBirth/>
                    : this.state.selectedIndex == 0
                        ? <PageReport/>
                        : <PageNews category='maiden'/>}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    topBar: {
        paddingHorizontal: 30,
        ...ifIphoneX({
            paddingTop: 40
        }, {
            paddingTop: 25
        }, {paddingTop: 10})
    }
});