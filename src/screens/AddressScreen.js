import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../context/UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  console.log(userId);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    if (name && mobileNo && postalCode && landmark && houseNo && street) {
      axios
        .post("http://localhost:8000/addresses", { userId, address })
        .then((response) => {
          Alert.alert("Success", "Addresses added successfully");
          setName("");
          setMobileNo("");
          setHouseNo("");
          setStreet("");
          setLandmark("");
          setPostalCode("");

          setTimeout(() => {
            navigation.goBack();
          }, 500);
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to add address");
          console.log("error", error);
        });
    } else {
      Alert.alert("Enter all Details");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView style={{ marginTop: 5 }}>
        <View style={{ height: 50 }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "grey" }}>
            Add a new Address
          </Text>

          <TextInput
            placeholderTextColor={"black"}
            placeholder="India"
            style={{
              padding: 10,
              borderColor: "#2F363F",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "black",
              backgroundColor: "#8395A7",
            }}
          />

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
              Full Name
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#2F363F",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                backgroundColor: "#8395A7",
              }}
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
              Mobile number
            </Text>

            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#2F363F",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                backgroundColor: "#8395A7",
              }}
              placeholder="Mobile No"
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
              Flat,House No,Building,Company
            </Text>

            <TextInput
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
              style={{
                padding: 10,
                borderColor: "#2F363F",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                backgroundColor: "#8395A7",
              }}
              placeholder=""
            />
          </View>

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
              Area,Street,Sector,Village
            </Text>
            <TextInput
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#2F363F",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                backgroundColor: "#8395A7",
              }}
              placeholder=""
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
              Landmark
            </Text>
            <TextInput
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#2F363F",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                backgroundColor: "#8395A7",
              }}
              placeholder=""
            />
          </View>

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
              Pincode
            </Text>

            <TextInput
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              placeholderTextColor={"black"}
              style={{
                padding: 10,
                borderColor: "#2F363F",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                backgroundColor: "#8395A7",
              }}
              placeholder="Enter Pincode"
            />
          </View>

          <Pressable
            onPress={handleAddAddress}
            style={{
              backgroundColor: "#8B78E6",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
