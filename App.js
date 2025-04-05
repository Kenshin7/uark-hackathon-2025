//https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/

import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WeightTracker from "./components/WeightTracker";
import GamblingGames from "./components/GamblingGames";
import RewardShop from "./components/RewardShop";


export default function App() {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "weight", title: "Weight Tracker", focusedIcon: "weight", unfocusedIcon: "weight" },
		{ key: "gamble", title: "Fun Games", focusedIcon: "gamepad-variant", unfocusedIcon: "gamepad-variant-outline" },
		{ key: "reward", title: "Reward Shop", focusedIcon: "shopping", unfocusedIcon: "shopping-outline" }
	]);

	const renderScene = BottomNavigation.SceneMap({
		weight: WeightTracker,
		gamble: GamblingGames,
		reward: RewardShop
	});

	return (
		<SafeAreaProvider>
			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}/>
		</SafeAreaProvider>
	);
};

