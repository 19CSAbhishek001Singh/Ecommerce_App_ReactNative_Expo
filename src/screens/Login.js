import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email or Password");
        console.log(error);
      });
  };
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            style={{ width: 200, height: 180 }}
            source={require("../../assets/Logo.png")}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "#7B8788",
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
              }}
            >
              Login to your Account
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
                backgroundColor: "#A4B0BD",
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 10 }}
                name="email"
                size={30}
                color="black"
              />
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  marginVertical: 10,
                  width: 300,
                  color: "#2C3335",
                  fontWeight: "bold",
                  fontSize: email ? 16 : 16,
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                  backgroundColor: "#A4B0BD",
                }}
              >
                <AntDesign
                  name="lock"
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  placeholder="Enter your password"
                  style={{
                    marginVertical: 10,
                    width: 300,
                    color: "#2C3335",
                    fontWeight: "bold",
                    fontSize: password ? 16 : 16,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#7B8788" }}>Keep me logged in</Text>
            <Text style={{ color: "#74B9FF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <Pressable
              onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: "#192A56",
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>

            <Pressable
              style={{ marginTop: 10 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#6A89CC",
                }}
              >
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
