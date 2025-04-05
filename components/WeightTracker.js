import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import ProgressBar from "./weight-tracker/ProgressBar";
import WeightInput from "./weight-tracker/WeightInput";
import GoalInput from "./weight-tracker/GoalInput";

const defaultWeight = 200;
const daytime = 1000 * 60 * 60 * 24;

export default function WeightTracker() {
	const [weightHistory, setWeightHistory] = useState([defaultWeight]);
	const [goal, setGoal] = useState([]);

	const pushFunction = (weight) => {
		setWeightHistory(weightHistory.concat([weight]));
	};

	const setFunction = (goal) => {
		setGoal(goal);
		setWeightHistory([weightHistory[weightHistory.length - 1]]);
	};

	return (
		<View
			style={styles.main}>
			<ProgressBar
				weightHistory={weightHistory}
				goal={goal}/>

			<View
				style={styles.bottomHalf}>
				<GoalInput
					setFunction={setFunction}/>

				<WeightInput
					pushFunction={pushFunction}/>
			</View>

			<Button
				onPress={() => { setGoal([goal[0], goal[1] - daytime, goal[2] - daytime]); }}>
				(Demo Only) Fast-Forward a Day
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around"
	},
	bottomHalf: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly"
	}
});

