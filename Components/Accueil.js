import React, { Component, useState } from 'react';
import { Image, View, StyleSheet, ImageBackground, Text } from "react-native";
import { MultiTouchView } from "expo-multi-touch";
import Profile from "../Helpers/Profile";
import * as Font from "expo-font";

class Accueil extends React.Component {
  state = {
    touches: {},
  };
  account;
  
  constructor(props) {
    super(props);
    this.account = new Profile("Alexandre", "Baron", 22);
  }

  touchProps = {
    onTouchBegan: (event) => {
      const { identifier } = event;
      this.setState((previous) => ({
        touches: {
          ...previous.touches,
          [identifier]: event,
        },
      }));
    },
    onTouchEnded: (event) => {
      this.account.points++;
      this.setState((previous) => ({
        touches: {
          ...previous.touches,
        },
      }));
    },
    onTouchesBegan: () => {},
    onTouchesEnded: () => {
      this.state.touches = undefined;
    },
  };

  componentDidMount() {
    this.loadAssetsAsync()
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      'Minecraft': require('../assets/fonts/Minecraft.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render() {
    var { touches } = this.state;
    var nbTouches = Object.keys(touches).length;

    if (!this.state.fontLoaded) {
      return <View><Text>Yo</Text></View>
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={styles.backgroundImage}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf:'flex-end',
              marginTop: 50,
              marginRight: 20,
              backgroundColor: '#4F4F4FCC',
              borderWidth: 5,
              borderRadius: 20,
              borderColor: '#1B1B1B',
              paddingRight: 50,
              paddingVertical: 5
            }}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../assets/coin.png")}
            />
            <View
              style={{
                flexDirection: "column"
              }}
            >
              <Text style={styles.text}>Points</Text>
              <Text style={styles.text}>{this.account.points}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <MultiTouchView style={{ flex: 1, justifyContent:'center' }} {...this.touchProps}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                  }}
                >
                  <Image
                    source={
                      nbTouches > 0
                        ? require("../assets/pressed_player.png")
                        : require("../assets/player.png")
                    }
                  />
                  <Image
                    style={nbTouches > 0 ? styles.pressed : styles.released}
                    source={require("../assets/items/wooden_pickaxe.png")}
                  />
                </View>
                <View
                  style={
                    nbTouches > 0 ? styles.ore_pressed : styles.ore_released
                  }
                >
                  <Image source={require("../assets/items/cobblestone.png")} />
                  <Image source={require("../assets/items/cobblestone.png")} />
                  <Image
                    style={{
                      marginTop: -127,
                      marginLeft: -128,
                    }}
                    source={require("../assets/items/cobblestone.png")}
                  />
                </View>
              </View>
            </MultiTouchView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  pressed: {
    marginLeft: -40,
    marginTop: 175,
    transform: [
      {
        rotate: "60deg",
      },
    ],
  },
  released: {
    marginLeft: -55,
    marginTop: 20,
  },
  ore_pressed: {
    flexDirection: "row",
    marginTop: 275,
    marginLeft: -108,
  },
  ore_released: {
    flexDirection: "row",
    marginTop: 275,
    marginLeft: -93,
  },
  text: {
    fontFamily: 'Minecraft', 
    fontSize:25,
    color: '#FFFFFF'
  }
});
export default Accueil;
