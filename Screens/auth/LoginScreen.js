import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Button,
} from "react-native";
import { theme } from "../../constans/theme";

const initialState = {
  email: "",
  password: "",
};
export const LoginScreen = ({ navigation }) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const [state, setState] = useState({ ...initialState });

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const onEmailChange = (value) => {
    setState((prevState) => ({ ...prevState, email: value }));
  };
  const onPasswordChange = (value) => {
    setState((prevState) => ({ ...prevState, password: value }));
  };

  const onInputFocus = () => {
    setIsKeyboardShown(true);
  };

  const onSubmit = () => {
    hideKeyboard();
    setState(initialState);
  };

  const { email, password } = state;

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bgImage.png")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <View
              style={{
                ...styles.form,
                // marginBottom: isKeyboardShown ? 20 : 100,
              }}
            >
              <View style={styles.title}>
                <Text style={styles.titleText}>Вхід</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={onEmailChange}
                value={email}
                onFocus={onInputFocus}
                placeholder="Email"
                placeholderTextColor={theme.colors.placeholder}
              />
              <TextInput
                style={{ ...styles.input, marginBottom: 20 }}
                onChangeText={onPasswordChange}
                value={password}
                onFocus={onInputFocus}
                secureTextEntry={true}
                placeholder="password"
                placeholderTextColor={theme.colors.placeholder}
              />
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                onPress={onSubmit}
              >
                <Text style={styles.buttonTitle}>Вхід</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Register")}
                style={styles.link}
              >
                <Text style={styles.linkText}>
                  New to application?{"   "}
                  <Text style={{ fontSize: 17, color: "#ff6347" }}>
                    Sign up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${theme.colors.mainBackground}`,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },

  form: {
    backgroundColor: `${theme.colors.mainBackground}`,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 45,
    paddingTop: 92,
  },

  title: {
    alignItems: "center",
    marginBottom: 32,
  },
  titleText: {
    fontSize: 30,
  },

  input: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: `${theme.colors.inputBackground}`,
    borderColor: `${theme.colors.border}`,
  },

  button: {
    backgroundColor: `${theme.colors.accent}`,
    padding: 12,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonTitle: {
    color: `${theme.colors.mainBackground}`,
    fontSize: 16,
  },

  link: {
    backgroundColor: "transparent",
  },

  linkText: {
    color: `${theme.colors.secondaryText}`,
    textAlign: "center",
    fontSize: 16,
  },
});
