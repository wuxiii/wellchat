import React, {PropTypes, Component} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    split: {
        height: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        marginBottom: 10
    }
});
export default Split = (props) => {
    return (
        <View style={styles.split}></View>
    );
};
