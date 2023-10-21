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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    // send post request to backend
    axios
      .post("http://localhost:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registeration Successful",
          "You have registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Registeration Error",
          "An error occured during registeration"
        );
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
            style={{ width: 200, height: 150 }}
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
                marginTop: 10,
              }}
            >
              Register to your Account
            </Text>
          </View>
          <View style={{ marginTop: 5 }}>
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
              <Ionicons
                name="person-sharp"
                size={30}
                color="black"
                style={{ marginLeft: 10 }}
              />
              <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  marginVertical: 10,
                  width: 300,
                  color: "#2C3335",
                  fontWeight: "bold",
                  fontSize: name ? 16 : 16,
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
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
            <View style={{ marginTop: 5 }}>
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
              onPress={handleRegister}
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
                Register
              </Text>
            </Pressable>

            <Pressable
              style={{ marginTop: 10 }}
              onPress={() => navigation.goBack("Login")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#6A89CC",
                }}
              >
                Already have an account? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
