import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native"
import React, { useLayoutEffect, useEffect, useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, AntDesign } from "@expo/vector-icons"
import axios from "axios"
import { UserType } from "../context/UserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native-safe-area-context"

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 200, height: 120, resizeMode: "contain" }}
          source={require("../../assets/Logo.png")}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    })
  }, [])
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/profile/${userId}`
        )
        const { user } = response.data
        setUser(user)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchUserProfile()
  }, [])

  const logout = () => {
    clearAuthToken()
  }

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken")
    console.log("auth token cleared")
    navigation.replace("Login")
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/orders/${userId}`
        )
        const orders = response.data.orders
        setOrders(orders)

        setLoading(false)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchOrders()
  }, [])

  console.log("orders", orders)
  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: "black" }}>
      <ScrollView>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
          Welcome {user?.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Cart")}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Your orders</Text>
          </Pressable>

          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Your Account</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Buy Again</Text>
          </Pressable>

          <Pressable
            onPress={logout}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
