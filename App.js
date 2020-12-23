// Navigation/Navigation.js

import React from "react"; // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image !
import { StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Store from "./Components/Store";
import Accueil from "./Components/Accueil";

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
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
    Accueil: {
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
      screen: Store,
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

export default createAppContainer(MoviesTabNavigator);
