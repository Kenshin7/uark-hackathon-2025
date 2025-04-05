import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import ProgressBar from "./weight-tracker/ProgressBar";
import WeightInput from "./weight-tracker/WeightInput";
import GoalInput from "./weight-tracker/GoalInput";
import { findWeightOfDay } from "../utils/Utilities";

const defaultWeight = 200;
const daytime = 1000 * 60 * 60 * 24;
const fn = 1000 * 60 * 60 * 24 * 7;
const bonus = 1.05;

export default function WeightTracker({ balance, setBalance }) {
	const [time_offset, set_time_offset] = useState(0);

	const [weightHistory, setWeightHistory]
		  = useState([defaultWeight, Math.floor((Date.now() + time_offset) / daytime) * daytime]);
	const [goal, setGoal] = useState([]);

	const pushFunction = (weight) => {
		setWeightHistory(weightHistory.concat([[weight, Math.floor((Date.now() + time_offset) / daytime) * daytime]]));
	};

	const setFunction = (goal) => {
		setGoal(goal);
		setWeightHistory([weightHistory[weightHistory.length - 1]]);
	};

	const checkConvert = () => {
		const time = Date.now() + time_offset;

		const goalEndDate = goal[1];

		const ckptEndDate = goalEndDate - Math.floor((goalEndDate - time) / fn + 1) * fn;
		const ckptStartDate = ckptEndDate - fn;
		
		const currentWeight = weightHistory[weightHistory.length - 1][0];
		
		const ckptEndWeight = findWeightOfDay(weightHistory, ckptEndDate),
			  ckptStartWeight = findWeightOfDay(weightHistory, ckptStartDate);

		const weightLost = ckptStartWeight - currentWeight;

		console.log(new Date(time).toDateString(), new Date(ckptEndDate).toDateString());
		//if(time >= ckptEndDate - daytime && time < ckptEndDate + daytime) {
		if(new Date(time).toDateString() == new Date(ckptEndDate).toDateString()) {
			//if on last day of checkpoint
			if(weightLost >= ckptStartWeight - goal[0]) {
				//if met goal, give some bonus
				setBalance(balance + 250 * weightLost * bonus);
			}
			else {
				//just give how much weight was lost
				setBalance(balance + 250 * weightLost);
			}
		}
	};

	return (
		<View
			style={styles.main}>
			<ProgressBar
				weightHistory={weightHistory}
				goal={goal}
				time_offset={time_offset}/>

			<View
				style={styles.bottomHalf}>
				<GoalInput
					setFunction={setFunction}/>

				<WeightInput
					pushFunction={pushFunction}/>
			</View>

			<Button
				onPress={() => { set_time_offset(time_offset + daytime); checkConvert(); }}>
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

