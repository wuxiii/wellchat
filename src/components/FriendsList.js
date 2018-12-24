import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,ImageBackground } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import bgSrc from '../images/wallpaper.png';

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingLeft:15
  },
  items:{
    flexDirection:'row',
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:'#999',
    
  },
  avator:{
    height:50,
    width:50,
    marginHorizontal:10,
  },
  username:{
    fontSize:17,
    marginHorizontal:10,
    marginTop:10
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default class FriendList extends React.Component {
  constructor(props) {
    super(props)
  }

  data=[
    {id:'1',account:'user1',name:'first_user'},
    {id:'2',account:'user2',name:'secend_user'},
    {id:'3',account:'user3',name:'third_user'},
    {id:'4',account:'user4',name:'fourth_user'}, 
  ]

  _onPress=(data)=>{
    console.log(data),
    Actions.chatView({data});
  }

  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        <View style={styles.container}>
          {this.data.map((data,index)=>{
              return(
                  <TouchableOpacity key={index} style={styles.items}  onPress={this._onPress.bind(this,data)}>
                      <Image source={{uri:'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}} style={styles.avator}/>
                      <Text style={styles.username}>{data.name}</Text>
                  </TouchableOpacity>
              )
          })}
        </View>
      </ImageBackground>
    );
  }
}