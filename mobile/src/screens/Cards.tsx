import React from "react";
import { Text, View } from "react-native";
import pokemon from '../configs/pokemon';


function Cards() {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Cards Screen</Text>
		<Text>Collection</Text>
	  </View>
	);
  }

export default Cards;