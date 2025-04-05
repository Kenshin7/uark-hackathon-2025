import { useState } from "react";
import { Text } from "react-native";
import WeightInput from "./weight-tracker/WeightInput";
import GoalInput from "./weight-tracker/GoalInput";
import WeightBar from "./weight-tracker/ProgressBar";
import WeightStats from "./weight-tracker/WeightStats";

export default function WeightTracker() {
	const [weightHistory, setWeightHistory] = useState([]);
	const [goal, setGoal] = useState([]);

	const pushFunction = (weight) => {
		setWeightHistory(weightHistory.concat([weight]));
	};

	return (
		<>
			<WeightInput
				visible={true}
				pushFunction={pushFunction}/>
			
			<GoalInput
				visible={true}
				setFunction={setGoal}/>

			<WeightBar
				weightHistory = {weightHistory[0]}
				goal = {goal[0]}/>

			<WeightStats
				weightHistory={weightHistory}/>
		</>
	);
};

