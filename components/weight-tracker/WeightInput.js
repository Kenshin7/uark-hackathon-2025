//https://callstack.github.io/react-native-paper/docs/components/Modal
//https://callstack.github.io/react-native-paper/docs/components/TextInput/

import { useState } from "react";
import { Platform, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { validate } from "../../utils/Utilities.js";

export default function WeightInput(props) {
	const [weightInput, setWeightInput] = useState("");
	
	return (
		<View>
			<TextInput
				label="Today's Weight (lbs.)"
				value={weightInput}
				onChangeText={(t) => { setWeightInput(validate(t.toString())); }}
				keyboardType={(Platform.OS == "android") ? "numeric" : "number-pad"}/>

			<Button
				onPress={() => { props.pushFunction(Number(weightInput)); }}>
				Record Weight
			</Button>
		</View>
	);
};

