//https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/

import { useState } from "react";
import { Text } from "react-native";
import { Appbar, BottomNavigation, PaperProvider, Portal } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WeightTracker from "./components/WeightTracker";
import GamblingGames from "./components/GamblingGames";
import RewardShop from "./components/RewardShop";


export default function App() {
	const [balance, setBalance] = useState(3500);

	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "weight", title: "Weight Tracker", focusedIcon: "weight", unfocusedIcon: "weight" },
		{ key: "gamble", title: "Fun Games", focusedIcon: "gamepad-variant", unfocusedIcon: "gamepad-variant-outline" },
		{ key: "reward", title: "Reward Shop", focusedIcon: "shopping", unfocusedIcon: "shopping-outline" },
	]);

	const renderScene = BottomNavigation.SceneMap({
		weight: WeightTracker,
		gamble: GamblingGames,
		reward: RewardShop,
	});

	return (
		<PaperProvider>
			<SafeAreaProvider>
				<Portal>
					<Appbar.Header mode="center-aligned">
						<Appbar.Content title={<Text>{balance}</Text>}/>
					</Appbar.Header>
					<BottomNavigation
						navigationState={{ index, routes }}
						onIndexChange={setIndex}
						renderScene={renderScene}/>
				</Portal>
			</SafeAreaProvider>
		</PaperProvider>
	);
};

