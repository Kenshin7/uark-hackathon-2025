import { useState } from "react";
import { Platform, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { validate } from "../../utils/Utilities.js";

const goalDateOptions = [
	{ label: "1 Month", value: "1" },
	{ label: "2 Month", value: "2" },
	{ label: "3 Month", value: "3" },
	{ label: "6 Month", value: "6" },
	{ label: "9 Month", value: "9" },
	{ label: "1 Year", value: "12" }
];

const mn = 1000 * 60 * 60 * 24 * 30;

export default function GoalInput(props) {
	const [weightInput, setWeightInput] = useState("");
	const [deadlineInput, setDeadlineInput] = useState("12");

	return (
		<View>
			<Dropdown
				label="Deadline"
				placeholder="1"
				options={goalDateOptions}
				value={deadlineInput}
				onSelect={setDeadlineInput}/>

			<TextInput
				label="Goal Weight (lbs.)"
				value={weightInput}
				onChangeText={(t) => { setWeightInput(validate(t.toString())); }}
				keyboardType={(Platform.OS == "android") ? "numeric" : "number-pad"}/>

			<Button
				onPress={() => {
					props.setFunction([
						Number(weightInput),
						Date.now() + (Number(deadlineInput) * mn),
						Date.now()
					]);
				}}>
				Set Goal
			</Button>
		</View>
	);
};

