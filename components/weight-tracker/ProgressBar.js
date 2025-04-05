import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { clamp, round } from "../../utils/Utilities";

const loopDelay = 1000;
const fn = 1000 * 60 * 60 * 24 * 7;
const progressBarWidth = 300;

export default function ProgressBar(props) {
	//rerender second (for demo)
	//https://stackoverflow.com/a/59861536
	const [time, setTime] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => { setTime(Date.now()); }, 1000);
		return () => { clearInterval(interval); };
	});

	//access
	const [goalEndWeight, goalEndDate, goalStartDate] = props.goal;
	const goalStartWeight = props.weightHistory[0],
		  currentWeight = props.weightHistory[props.weightHistory.length - 1];

	//computations
	const goalSlope = (goalEndWeight - goalStartWeight) / (goalEndDate - goalStartDate);

	const ckptEndDate = goalEndDate - Math.floor((goalEndDate - time) / fn) * fn;
	const ckptStartDate = ckptEndDate - fn;

	const ckptEndWeight = goalEndWeight - goalSlope * (goalEndDate - ckptEndDate);
	const ckptStartWeight = Math.min(goalEndWeight - goalSlope * (goalEndDate - ckptStartDate), goalStartWeight);
		//need to keep track of this
		//TODO: weightHistory.find(ckptStartWeight) || (ckptEndWeight + goalSlope * fn);

	const ckptSlope = (ckptEndWeight - ckptStartWeight) / (ckptEndDate - ckptStartDate);

	const target = ckptSlope * (time - ckptStartDate) + ckptStartWeight;

	//display
	const actualProgress = clamp(0, 1, (currentWeight - ckptStartWeight) / (ckptEndWeight - ckptStartWeight)),
		  targetProgress = clamp(0, 1, (target - ckptStartWeight) / (ckptEndWeight - ckptStartWeight));

	return (
		<View>
			<Text>Currently at {round(currentWeight, 2)} today</Text>
			<Text>Should be at {round(target, 2)} today</Text>
			<Text>Should be at {round(ckptEndWeight, 2)} by {(new Date(ckptEndDate)).toDateString()}</Text>
			<Text>Want to be at {round(goalEndWeight, 2)} by {(new Date(goalEndDate)).toDateString()}</Text>
			<View style={styles.bar}>
				<View style={[
					styles.actual,
					{ width: Math.round(actualProgress * progressBarWidth) }
				]}/>
				<View style={[
					styles.target,
					{ width: Math.round(Math.max(0, (targetProgress - actualProgress)) * progressBarWidth) }
				]}/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bar: {
		backgroundColor: "#808080",
		width: 300,
		height: 30,
		display: "flex",
		flexDirection: "row"
	},
	actual: {
		backgroundColor: "#80ff80",
		height: 30
	},
	target: {
		backgroundColor: "#ff8080",
		height: 30
	}
});

