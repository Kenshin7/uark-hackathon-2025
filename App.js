//https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/

import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { Appbar, PaperProvider, Portal } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WeightTracker from "./components/WeightTracker";
import GamblingGames from "./components/GamblingGames";
import RewardShop from "./components/RewardShop";


export default function App() {
	const [balance, setBalance] = useState(3500);

	const Tab = createMaterialBottomTabNavigator();

	return (
		<PaperProvider>
			<SafeAreaProvider>
				<Portal>
					<Appbar.Header mode="center-aligned">
						<Appbar.Content title={<Text>{balance}</Text>}/>
					</Appbar.Header>

					<NavigationContainer>
						<Tab.Navigator
							initialRouteName="weight"
							activeColor="#30c0b0"
							barStyle={{ backgroundColor: "#e090c0" }}>

							<Tab.Screen
								name="weight"
								component={WeightTracker}
								options={{
									tabBarLabel: "Weight Tracker",
									tabBarIcon: ({ color }) => (
										<MaterialCommunityIcons name="weight" color={color} size={26}/>
									)
								}}/>

							<Tab.Screen
								name="gamble"
								component={GamblingGames}
								options={{
									tabBarLabel: "Fun Games!",
									tabBarIcon: ({ color }) => (
										<MaterialCommunityIcons name="gamepad-variant" color={color} size={26}/>
									)
								}}/>

							<Tab.Screen
								name="reward"
								component={RewardShop}
								options={{
									tabBarLabel: "Reward Shop",
									tabBarIcon: ({ color }) => (
										<MaterialCommunityIcons name="shopping" color={color} size={26}/>
									)
								}}/>

						</Tab.Navigator>
					</NavigationContainer>

				</Portal>
			</SafeAreaProvider>
		</PaperProvider>
	);
};

