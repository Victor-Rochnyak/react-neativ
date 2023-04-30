import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PostScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>PostScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ marginRight: 10 }}
      >
        <MaterialCommunityIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostScreen;
