import React from 'react';
import { View, ImageBackground, Text, TextInput } from "react-native";
import ProfileHelper from "../Helpers/Profile";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-community/async-storage';

var toClass = function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

class Profile extends React.Component {
  state = {
    touches: {},
  };
  account;
  
  constructor(props) {
    super(props);
    this.account = new ProfileHelper("Alexandre", "Baron", 22);
  }

  componentDidMount() {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    await AsyncStorage.getItem("minecraftProfile").then((value) => {
      profile = toClass(JSON.parse(value), Profile.prototype);
    });
    this.account = profile;
    this.setState({account : profile})

    await Font.loadAsync({
      'Minecraft': require('../assets/fonts/Minecraft.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render() {

    if (!this.state.fontLoaded) {
      return <View><Text>Yo</Text></View>
    }

    return (
      <ImageBackground
      style={{flex:1, resizeMode:'cover'}}
          source={require("../assets/profile.jpg")}
        >
          <View style={{marginTop:50}}>
            <TextInput 
              style={{ 
                backgroundColor: "#C7C7C7",
                borderWidth: 7.5,
                borderTopColor: "#8C8C8C",
                borderLeftColor: "#8C8C8C",
                borderRightColor: "#373737",
                borderBottomColor: "#373737",
                padding: 10,
                fontFamily: 'Minecraft', 
                fontSize:25, }} value={this.account.nom} />
            <TextInput 
              style={{ 
                backgroundColor: "#C7C7C7",
                borderWidth: 7.5,
                borderTopColor: "#8C8C8C",
                borderLeftColor: "#8C8C8C",
                borderRightColor: "#373737",
                borderBottomColor: "#373737",
                padding: 10,
                fontFamily: 'Minecraft', 
                fontSize:25
                }} value={this.account.prenom} />
          </View>          
      </ImageBackground>
    );
  }
}

export default (Profile);
