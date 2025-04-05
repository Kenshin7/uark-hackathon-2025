import { useState } from "react";
import { Text } from "react-native";
import WeightInput from "./weight-tracker/WeightInput";
import ProgressBar from "./weight-tracker/ProgressBar";
import WeightStats from "./weight-tracker/WeightStats";

export default function WeightTracker() {
	const [weightHistory, setWeightHistory] = useState([]);

	const pushFunction = (weight) => {
		setWeightHistory(weightHistory.concat([weight]));
	};

	return (
		<>
			<WeightInput
				visible={true}
				pushFunction={pushFunction}/>

			<ProgressBar
				weightHistory={weightHistory}/>

			<WeightStats
				weightHistory={weightHistory}/>
		</>
	);
};

