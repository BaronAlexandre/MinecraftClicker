import React, { Component } from "react";
import Profile from "../Helpers/Profile";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Items from "../Helpers/Items";
import * as Font from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';

var toClass = function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

const pickaxes = Items.PICKAXES;
const ressources = Items.RESSOURCES;

export default class Store extends Component {
  state = {};
  account;
  
  buyPickaxe = (prix) => {
    if(this.account.points >= prix){
      console.log('oui');
      this.showAlertBuyPickaxe();
    }else{
      console.log('non');
      this.showAlertCantBuyPickaxe();
    }
  }
  
  buyRessource = (prix) => {
    if(this.account.points >= prix){
      this.showAlertBuyRessource();
    }else{
      this.showAlertCantBuyRessource();
    }
  }

  constructor(props) {
    super(props);
    this.account = new Profile("Alexandre", "Baron", 22);
    this.account.points = 8000;
    this.state = { showAlertBuyPickaxe: false, showAlertCantBuyPickaxe: false, showAlertCantBuyRessource: false, showAlertBuyRessource: false };
  }

  componentDidMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      Minecraft: require("../assets/fonts/Minecraft.ttf"),
      MinecraftTitle: require("../assets/fonts/Minecrafter.Alt.ttf"),
    });
    await AsyncStorage.getItem("minecraftProfile").then((value) => {
      profile = toClass(JSON.parse(value), Profile.prototype);
      if(!profile){
        profile = new Profile("Jeb", "Bergensten", 41);
        AsyncStorage.setItem("minecraftProfile", JSON.stringify(profile));
      }
      this.setState({account : profile})
    });
    this.account = profile;
    this.setState({ fontLoaded: true });
  };


  showAlertCantBuyPickaxe = () => {
    this.setState({
      showAlertBuyPickaxe: false,
      showAlertCantBuyPickaxe: true,
      showAlertCantBuyRessource: false,
      showAlertBuyRessource: false,
    });
  };
  showAlertBuyPickaxe = () => {
    this.setState({
      showAlertBuyPickaxe: true,
      showAlertCantBuyPickaxe: false,
      showAlertCantBuyRessource: false,
      showAlertBuyRessource: false,
    });
  };

  hideAlertCantBuyPickaxe = () => {
    this.setState({
      showAlertBuyPickaxe: false,
      showAlertCantBuyPickaxe: false,
      showAlertCantBuyRessource: false,
      showAlertBuyRessource: false,
    });
  };
  hideAlertBuyPickaxe = () => {
    this.setState({
      showAlertBuyPickaxe: false,
      showAlertCantBuyPickaxe: false,
      showAlertCantBuyRessource: false,
      showAlertBuyRessource: false,
    });
  };


  showAlertCantBuyRessource = () => {
    this.setState({
      showAlertBuyPickaxe: false,
      showAlertCantBuyPickaxe: false,
      showAlertCantBuyRessource: true,
      showAlertBuyRessource: false,
    });
  };
  showAlertBuyRessource = () => {
    this.setState({
      showAlertBuyPickaxe: false,
      showAlertCantBuyPickaxe: false,
      showAlertCantBuyRessource: false,
      showAlertBuyRessource: true,
    });
  };

  hideAlertCantBuyRessource = () => {
    this.setState({
      showAlertBuyPickaxe: false,
      showAlertCantBuyPickaxe: false,
      showAlertCantBuyRessource: false,
      showAlertBuyRessource: false,
    });
  };
  hideAlertBuyRessource = () => {
    this.setState({
      showAlertBuyPickaxe: false,
      showAlertCantBuyPickaxe: false,
      showAlertCantBuyRessource: false,
      showAlertBuyRessource: false,
    });
  };

  render() {
    const {showAlertCantBuyPickaxe, showAlertBuyPickaxe, showAlertCantBuyRessource, showAlertBuyRessource} = this.state;

    if (!this.state.fontLoaded) {
      return (
        <View>
          <Text>Yo</Text>
        </View>
      );
    }

    var pickaxesLayout = pickaxes.map((pickaxe) => (
      <TouchableOpacity 
        key={pickaxe.Label}
        onPress={() => this.buyPickaxe(pickaxe.Prix)}
        >
        <View style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#C7C7C7",
                borderWidth: 7.5,
                borderTopColor: "#8C8C8C",
                borderLeftColor: "#8C8C8C",
                borderRightColor: "#373737",
                borderBottomColor: "#373737",
                padding: 10,
                justifyContent: "space-between",
              }}>
          <View>
            <Text style={{
              fontSize: 26,
              marginBottom: 5,          
              fontFamily: "Minecraft",
              color: this.account.points >= pickaxe.Prix ? 'black' : 'grey',
            }}>{pickaxe.Label}</Text>
            <Text style={{
              fontFamily: "Minecraft",
              color: this.account.points >= pickaxe.Prix ? 'black' : 'grey',
              fontSize: 20
            }}>
              {pickaxe.Points} pts/sec
            </Text>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}
            >
              <Text style={{
                fontFamily: "Minecraft",
                color: this.account.points >= pickaxe.Prix ? 'black' : 'grey',
                fontSize: 20
              }}>
                {pickaxe.Prix}
              </Text>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("../assets/coin.png")}
              />
            </View>
          </View>
          <Image
            style={{ height: 100, width: 100, alignSelf: "flex-end" }}
            source={pickaxe.Image}
          />
        </View>
      </TouchableOpacity>
    ));

    var ressourcesLayout = ressources.map((ressource) => (
      <TouchableOpacity 
        key={ressource.Label}
        onPress={() => this.buyRessource(ressource.Prix)}
        >
        <View style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#C7C7C7",
                borderWidth: 7.5,
                borderTopColor: "#8C8C8C",
                borderLeftColor: "#8C8C8C",
                borderRightColor: "#373737",
                borderBottomColor: "#373737",
                padding: 10,
                justifyContent: "space-between",
              }}>
          <View>
            <Text style={{
              fontSize: 26,
              marginBottom: 5,          
              fontFamily: "Minecraft",
              color: this.account.points >= ressource.Prix ? 'black' : 'grey',
            }}>{ressource.Label}</Text>
            <Text style={{
              fontFamily: "Minecraft",
              color: this.account.points >= ressource.Prix ? 'black' : 'grey',
              fontSize: 20
            }}>
              {ressource.Multiplicateur} pts/clic
            </Text>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}
            >
              <Text style={{
                fontFamily: "Minecraft",
                color: this.account.points >= ressource.Prix ? 'black' : 'grey',
                fontSize: 20
              }}>
                {ressource.Prix}
              </Text>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("../assets/coin.png")}
              />
            </View>
          </View>
          <Image
            style={{ height: 100, width: 100, alignSelf: "flex-end" }}
            source={ressource.Image}
          />
        </View>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: "MinecraftTitle",
            fontSize: 50,
            alignSelf: "center",
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          Magasin
        </Text>
        <ScrollView style={{ marginHorizontal: 10 }}>
          <Text style={[styles.text, styles.h2]}>
            Augmenter le nombre de points par clic
          </Text>
          {pickaxesLayout}
          <Text style={[styles.text, styles.h2]}>
            Augmenter le nombre de points par secondes
          </Text>
          {ressourcesLayout}
        </ScrollView>
        <AwesomeAlert
          show={showAlertCantBuyPickaxe}
          showProgress={false}
          title="Pas assez de points !"
          message="Désolé mais tu n'as pas assez de points pour acheter cette pioche"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          titleStyle = {{color: 'red', fontFamily: "Minecraft"}}
          messageStyle = {{fontFamily: "Minecraft"}}
        />
        <AwesomeAlert
          show={showAlertBuyPickaxe}
          showProgress={false}
          title="Tu est sur de vouloir acheter cette pioche ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Non"
          confirmText="Oui"
          cancelButtonColor="#C82333"
          confirmButtonColor="#0069D9"
          titleStyle = {{color: 'green', fontFamily: "Minecraft"}}
          onCancelPressed={() => {
            this.hideAlertBuyPickaxe();
          }}
          onConfirmPressed={() => {
            this.hideAlertBuyPickaxe();
          }}
        />
        <AwesomeAlert
          show={showAlertCantBuyRessource}
          showProgress={false}
          title="Pas assez de points !"
          message="Désolé mais tu n'as pas assez de points pour augmenter la valeur des ressources"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          titleStyle = {{color: 'red', fontFamily: "Minecraft"}}
          messageStyle = {{fontFamily: "Minecraft"}}
        />
        <AwesomeAlert
          show={showAlertBuyRessource}
          showProgress={false}
          title="Tu est sur de vouloir augmenter la valeur des ressources ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Non"
          confirmText="Oui"
          cancelButtonColor="#C82333"
          confirmButtonColor="#0069D9"
          titleStyle = {{color: 'green', fontFamily: "Minecraft"}}
          onCancelPressed={() => {
            this.hideAlertBuyRessource();
          }}
          onConfirmPressed={() => {
            this.hideAlertBuyRessource();
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#C7C7C7",
  },
  text: {
    fontFamily: "Minecraft",
  },
  center: {
    alignSelf: "center",
  },
  h1: {
    fontSize: 26,
    marginBottom: 5,
  },
  h2: {
    fontSize: 20,
    marginVertical: 20,
    alignSelf: "center",
  },
  h3: {
    fontSize: 17,
  },
  h4: {
    fontSize: 15,
  },
});
