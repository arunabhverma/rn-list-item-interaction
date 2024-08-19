import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "@react-navigation/native";

const Main = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Link href={"/InteractionList"}>
        <Text style={{ color: theme.colors.text }}>Interaction List</Text>
      </Link>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
