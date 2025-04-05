import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Plinko from "./gambling-games/Plinko";
import Slots from "./gambling-games/Slots";
import Blackjack from "./gambling-games/Blackjack";

function GameMenu({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.backgroundPattern} />
			<Text style={styles.title}>GAMBLE</Text>
			<TouchableOpacity
				style={[styles.button, styles.plinkoButton]}
				onPress={() => { navigation.navigate("Plinko"); }}>
				<Text style={styles.buttonText}>🍕 Plinko</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.button, styles.slotsButton]}
				onPress={() => { navigation.navigate("Slots"); }}>
				<Text style={styles.buttonText}>🍒 Slots</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.button, styles.blackjackButton]}
				onPress={() => { navigation.navigate("Blackjack"); }}>
				<Text style={styles.buttonText}>🃏 Blackjack</Text>
			</TouchableOpacity>
		</View>
	);
}

export default function GamblingGames() {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen
				name="Game Menu"
				component={GameMenu}/>
			
			<Stack.Screen
				name="Plinko"
				component={Plinko}/>

			<Stack.Screen
				name="Slots"
				component={Slots}/>

			<Stack.Screen
				name="Blackjack"
				component={Blackjack}/>

		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#600000',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflow: 'hidden',
	},
	backgroundPattern: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'transparent',
		backgroundImage: `
			radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.2) 1px, transparent 1px),
			radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.2) 1px, transparent 1px),
			linear-gradient(45deg, transparent 48%, rgba(255, 215, 0, 0.2) 48%, rgba(255, 215, 0, 0.2) 52%, transparent 52%),
			linear-gradient(-45deg, transparent 48%, rgba(255, 215, 0, 0.2) 48%, rgba(255, 215, 0, 0.2) 52%, transparent 52%),
			url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="10" y="30" font-family="Arial" font-size="20" fill="%23FFD700" opacity="0.3">♠</text><text x="70" y="80" font-family="Arial" font-size="20" fill="%23FFD700" opacity="0.3">♥</text><text x="30" y="60" font-family="Arial" font-size="20" fill="%23FFD700" opacity="0.3">♦</text><text x="80" y="30" font-family="Arial" font-size="20" fill="%23FFD700" opacity="0.3">♣</text></svg>')
		`,
		backgroundSize: '100px 100px, 100px 100px, 100px 100px, 100px 100px, 100px 100px',
	},
	button: {
		paddingVertical: 25,
		paddingHorizontal: 40,
		borderRadius: 20,
		marginVertical: 15,
		width: '90%',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	title: {
		fontSize: 64,
		fontWeight: 'bold',
		color: '#FFD700',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: {width: 3, height: 3},
		textShadowRadius: 15,
		marginBottom: 40,
		marginTop: 20,
		letterSpacing: 8,
		textAlign: 'center',
		width: '100%',
	},
	buttonText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	plinkoButton: {
		backgroundColor: '#4CAF50',
		borderWidth: 3,
		borderColor: '#2E7D32',
	},
	slotsButton: {
		backgroundColor: '#F44336', 
		borderWidth: 3,
		borderColor: '#C62828',
	},
	blackjackButton: {
		backgroundColor: '#2196F3',
		borderWidth: 3,
		borderColor: '#1565C0',
	},
});
