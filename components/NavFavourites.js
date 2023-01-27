import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import tw from "twrnc";

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    destination: "Hyderabad, Telangana, India",
  },
  {
    id: "2",
    icon: "briefcase",
    location: "Work",
    destination: "CBIT, Gandipet, Telangana, India",
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();

  const handlePress = () => {};

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`flex-row items-center py-3`}
          onPress={handlePress}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={item.icon}
            type="feather"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-bold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
