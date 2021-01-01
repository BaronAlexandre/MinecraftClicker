import React from "react";
import { StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Store from "./Components/Store";
import Accueil from "./Components/Accueil";
import Profile from "./Components/Profile";

const MinecraftClicker = createBottomTabNavigator(
  {
    Accueil: {
      screen: Accueil,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("./assets/grass.png")}
              style={styles.icon}
            />
          );
        },
      },
    },
    Store: {
      screen: Store,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("./assets/crafting_table.png")}
              style={styles.icon}
            />
          );
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("./assets/profile.png")}
              style={styles.icon}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#DDDDDD",
      inactiveBackgroundColor: "#FFFFFF",
      showLabel: false,
      showIcon: true,
    },
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default createAppContainer(MinecraftClicker);
