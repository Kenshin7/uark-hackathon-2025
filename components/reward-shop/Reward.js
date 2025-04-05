import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button, PaperProvider, Dialog, Portal, Text } from 'react-native-paper';

export function Reward({name, price, image, onPress, balance, setBalance}) {
	const [visible, setVisible] = React.useState(false);
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);
	const isDisabled = price > balance;
	return (
		<PaperProvider>
			<Card styles={styles.card}>
				<Card.Cover source={image} style={styles.cover}/>
				<Card.Title
					title={name}
					subtitle={price + ' kalz'}
					right={(props) => <Button {...props} mode="contained" disabled={isDisabled} onPress={showDialog} style={styles.button}>Buy</Button>	}
				/>
			</Card>
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>{name}</Dialog.Title>
					<Dialog.Content>
					<Text variant="bodyMedium">Are you sure you want to purchase this?</Text>
					<Text variant="bodyMedium">This will leave you with {balance-price} kalz.</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Cancel</Button>
						<Button onPress={() => { hideDialog(); onPress(); }}>Buy</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</PaperProvider>
	);
};

const styles = StyleSheet.create({
	card: {
		margin: 16,
		padding: 8,
		borderRadius: 12,
		backgroundColor: '#f9f9f9',
		elevation: 4, // for Android shadow
	  },
	cover: {
		height: 300,
	},
	button: {
		marginRight: 10,
	},
});
