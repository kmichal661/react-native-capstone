import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import { useEffect, useState } from "react";
import { retrieveData } from "../helpers/asyncStorage";

export function HeaderNoImage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/Images/Logo.png")}
      />
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Avatar.Text style={styles.avatar} size={30} label="JD" />
      </Pressable>
    </View>
  );
}
export function HeaderImage({ navigation, image }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/Images/Logo.png")}
      />
      <Pressable onPress={navigation.navigate("Profile")}>
        <Avatar.Image style={styles.avatar} size={30} source={{ uri: image }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
  },
  avatar: {
    marginLeft: "auto",
    marginRight: 10,
    marginTop: 15,
  },
  image: {
    marginLeft: 90,
    marginRight: "auto",
    marginTop: 10,
  },
});
