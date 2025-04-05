//https://callstack.github.io/react-native-paper/docs/components/Modal
//https://callstack.github.io/react-native-paper/docs/components/TextInput/

import { useState } from "react";
import { Button, Modal, TextInput } from "react-native-paper";

function validate(s) {
	//remove all characters but digits and the first decimal point; also remove leading 0s and following decimal points
	return s.replaceAll(/[^\d\.]/g, "").replaceAll(/^0+(?=\d)/g, "").replaceAll(/\.(?<!^\d*\.\d*)/g, "");
}

export default function WeightInput(props) {
	const [visible, setVisible] = useState(props.visible);
	const [weightInput, setWeightInput] = useState("");
	
	return (
		<Modal
			visible={visible}
			onDismiss={() => { setVisible(false); }}>

			<TextInput
				label="Today's Weight (lbs.)"
				value={weightInput}
				onChangeText={(t) => { setWeightInput(validate(t.toString())); }}/>

			<Button
				onPress={() => { props.pushFunction(Number(weightInput)); setVisible(false); }}>
				Okay
			</Button>

		</Modal>
	);
};

