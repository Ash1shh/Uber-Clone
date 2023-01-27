import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "../components/NavFavourites";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
const NavigatorCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning, Pluto Fam!</Text>
      <View
        style={tw`border-t border-gray-100 flex-shrink relative z-20 bg-white`}
      >
        <View style={tw`bg-white pb-2`}>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  loaction: details.geometry.location,
                  description: data.description,
                })
              );
            }}
            minLength={2}
            fetchDetails={true}
            returnKeyType={"search"}
            onFail={(error) => console.error(error)}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            styles={toInputBoxStyles}
            enablePoweredByContainer={false}
          />
        </View>

        <NavFavourites />

        <View
          style={tw`mt-auto flex-row justify-evenly py-2 border-t border-gray-100`}
        >
          <TouchableOpacity
            style={tw`flex-row bg-black w-24 px-4 py-3 rounded-full border border-black`}
            onPress={() => navigation.push("RideOptionsCard")}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center pl-3`}>Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row bg-white w-24 px-4 py-3 rounded-full border border-black`}
          >
            <Icon
              name="fast-food-outline"
              type="ionicon"
              color="black"
              size={16}
            />
            <Text style={tw`text-black text-center pl-3`}>Food</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigatorCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
    paddingTop: 20,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 5,
    borderEndWidth: 1,
    borderColor: "#ddd",
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
