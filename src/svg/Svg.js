// Svg.js
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native'
import SvgUri from './SvgUri';
import svgs from './List';

export default class Svg extends Component {
    static defaultProps = {
        icon: '',
        color: '',
        size: 0,
        onPress: undefined,
        style: null
    }
    constructor(props) {
        super(props);
    }
    render() {
        let svgXmlData = svgs[this.props.icon];

        if (!svgXmlData) {
            let err_msg = `can not find svg "${this.props.icon}", use node getSvg.js `;
            throw new Error(err_msg);
        }
        return <TouchableOpacity
            style={this.props.style}
            onPress={() => {
            this.props.onPress && this
                .props
                .onPress()
        }}><SvgUri
            width={this.props.size}
            height={this.props.size}
            svgXmlData={svgXmlData}
            fill={this.props.color}/></TouchableOpacity>
    }
}
