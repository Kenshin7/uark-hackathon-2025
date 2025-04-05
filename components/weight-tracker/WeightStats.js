import { Text } from "react-native";

export default function WeightStats(props) {
	return (<Text>max: {Math.max(...props.weightHistory)}, min: {Math.min(...props.weightHistory)}</Text>);
};

