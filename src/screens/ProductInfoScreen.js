import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15 }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "#EAF0F1",
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={24}
              color="black"
            />
            <TextInput placeholder="Search items" style={{ fontSize: 16 }} />
          </Pressable>
          <FontAwesome name="microphone" size={24} color="white" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params.carouselImages.map((item) => (
            <ImageBackground
              style={{ width, height, marginTop: 25, resizeMode: "contain" }}
              source={{ uri: item }}
              key={item.id}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#C60C30",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {route?.params?.offer}
                  </Text>
                </View>

                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "grey" }}>
            {route?.params?.title}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginTop: 6,
              color: "white",
            }}
          >
            ₹{route?.params?.price}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text style={{ color: "white" }}>Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
            {route?.params?.color}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text style={{ color: "white" }}>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
            {route?.params?.size}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 5,
              color: "white",
            }}
          >
            Total : ₹{route.params.price}
          </Text>
          <Text style={{ color: "#01CBC6" }}>
            FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="grey" />

            <Text style={{ fontSize: 15, fontWeight: "500", color: "#EAF0F1" }}>
              Deliver To Sujan - Bangalore 560019
            </Text>
          </View>
        </View>

        <Text
          style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}
        >
          IN Stock
        </Text>

        <Pressable
          onPress={() => addItemToCart(route?.params?.item)}
          style={{
            backgroundColor: "#0A79DF",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          {addedToCart ? (
            <View>
              <Text>Added to Cart</Text>
            </View>
          ) : (
            <Text>Add to Cart</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            addItemToCart(route?.params?.item);
            navigation.navigate("Cart")
          }}
          style={{
            backgroundColor: "#8B78E6",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Text>Buy Now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
