import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { PaperProvider, Dialog, Portal, Button, Text } from 'react-native-paper';
import { getRewards } from '../services/RewardsService.js';
import { Reward } from '../components/Reward.js';

const RewardShop = ({ balance, setBalance }) => {
  const [visible, setVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [giftCode, setGiftCode] = useState(null);

  const showDialog = (reward) => {
    setSelectedReward(reward);
	setGiftCode(generateGiftCode());
    setVisible(true);
  };

  const hideDialog = () => { setVisible(false); 	setBalance(prevBalance => prevBalance - selectedReward.price); }

  useEffect(() => {
    setRewards(getRewards());
  }, []);

  function renderReward({ item }) {
    return (
      <Reward
        {...item}
		balance={balance}
        onPress={() => showDialog(item)}
      />
    );
  }

  return (
    <PaperProvider>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.container}
        data={rewards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReward}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Redeem Reward</Dialog.Title>
          <Dialog.Content>
            <Text>You selected: {selectedReward?.name}</Text>
			<Text style={{ marginTop: 8 }}>
				Your gift card code: {"\n"}
				<Text style={{ fontWeight: 'bold' }}>{giftCode}</Text>
			</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const generateGiftCode = () => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let code = '';
	for (let i = 0; i < 16; i++) {
		if (i > 0 && i % 4 === 0) code += '-'; // Format like XXXX-XXXX-XXXX-XXXX
		code += chars[Math.floor(Math.random() * chars.length)];
	}
	return code;
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eeeeee',
  },
  container: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});

export default RewardShop;