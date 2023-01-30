import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import Screen from "./Screen";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInformation,
} from "../slices/navSlice";

const data = [
  {
    id: "Uber-Auto",
    title: "Uber Auto",
    multiplier: 0.75,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1648432113/assets/6e/86fff4-a82a-49b9-8b0b-54b341ea0790/original/Uber_Auto_312x208_pixels_Mobile.png",
  },
  {
    id: "Uber-Bike",
    title: "Uber Bike",
    multiplier: 0.50,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
  },

  {
    id: "Uber-X",
    title: "Uber X",
    multiplier: 1,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png",
  },
  {
    id: "Uber-XL",
    title: "Uber XL",
    multiplier: 1.25,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png",
  },
  {
    id: "Uber-LUX",
    title: "Uber LUX",
    multiplier: 1.5,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png",
  },
];

const SEARCH_CHARGE_RATE = 1.75;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  useEffect(() => {
    if (!origin || !destination) navigation.navigate("NavigateCard");
  }, [origin, destination]);

  const travelConst = (item) => {
    return (
      (travelTimeInformation?.duration?.value *
        SEARCH_CHARGE_RATE *
        item?.multiplier) /
      100
    ).toFixed(2);
  };

  const onChoose = () => {
    if (!selected) return Alert.alert("Please select a ride option");
    navigation.navigate("SuccessScreen", {
      data: {
        ...selected,
        distance: travelTimeInformation?.distance?.text,
        time: travelTimeInformation?.duration.text,
        price: travelConst(selected),
      },
    });
  };

  return (
    <Screen style={tw`bg-white h-full`}>
      <View style={tw`items-center flex-row justify-center mb-3`}>
        <TouchableOpacity
          style={{ left: 10, position: "absolute", zIndex: 100 }}
          onPress={() =>  navigation.navigate("NavigatorCard")}
        >
          <Icon
            type="antdesign"
            name="arrowleft"
            color="black"
            size={23}
            style={tw`p-3`}
          />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl font-bold`}>
          Select a ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <View style={tw`flex-1 mt-2`}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`flex-row items-center justify-between px-5 ${
                selected?.id === item.id && "bg-gray-100"
              }`}
              onPress={() => setSelected(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={tw`flex-row items-center justify-between flex-1`}>
                <View>
                  <Text style={tw`text-xl font-bold text-black`}>
                    {item.title}
                  </Text>
                  <Text style={tw`text-gray-600`}>
                    {travelTimeInformation?.duration?.text} Travel time
                  </Text>
                </View>
                <Text style={tw`text-gray-800 text-lg`}>
                  ₹{travelConst(item)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 rounded-lg ${!selected && "bg-gray-300"}`}
          // disabled={!selected}
          onPress={onChoose}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Confirm {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
