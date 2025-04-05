import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Blackjack = ({ balance, setBalance }) => {
  const [money, setMoney] = useState(balance);
  const [bet, setBet] = useState(0);
  const [gameStatus, setGameStatus] = useState('place_bet');
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [message, setMessage] = useState('Place your bet to start!');

  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const createDeck = () => {
    const deck = [];
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
    return deck.sort(() => Math.random() - 0.5);
  };

  const calculateScore = (hand) => {
    let score = 0;
    let aces = 0;
    
    for (let card of hand) {
      if (card.value === 'A') {
        aces++;
        score += 11;
      } else if (['K', 'Q', 'J'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    }

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  const dealCards = () => {
    const deck = createDeck();
    const newPlayerHand = [deck.pop(), deck.pop()];
    const newDealerHand = [deck.pop(), deck.pop()];
    
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setPlayerScore(calculateScore(newPlayerHand));
    setDealerScore(calculateScore([newDealerHand[0]])); // Only show dealer's first card
    
    if (calculateScore(newPlayerHand) === 21) {
      checkBlackjack();
    } else {
      setGameStatus('player_turn');
      setMessage('Hit or Stand?');
    }
  };

  const checkBlackjack = () => {
    if (playerScore === 21) {
      const newMoney = money + bet + bet * 1.5;
      setMoney(Math.floor(newMoney));
      setGameStatus('game_over');
      setMessage('Blackjack! You win $' + (bet * 1.5));
    }
  };

  const hit = () => {
    const deck = createDeck();
    const newPlayerHand = [...playerHand, deck.pop()];
    const newScore = calculateScore(newPlayerHand);
    
    setPlayerHand(newPlayerHand);
    setPlayerScore(newScore);
    
    if (newScore > 21) {
      setGameStatus('game_over');
      setMessage('Bust! You lose $' + bet);
    }
  };

  const stand = () => {
    const deck = createDeck();
    let newDealerHand = [...dealerHand];
    let newDealerScore = calculateScore(newDealerHand);
    
    // Dealer draws until score >= 17
    while (newDealerScore < 17) {
      newDealerHand = [...newDealerHand, deck.pop()];
      newDealerScore = calculateScore(newDealerHand);
    }
    
    setDealerHand(newDealerHand);
    setDealerScore(newDealerScore);
    setGameStatus('game_over');
    
    if (newDealerScore > 21) {
      const newMoney = money + 2*bet;
      setMoney(newMoney);
      setMessage('Dealer busts! You win $' + bet);
    } else if (newDealerScore > playerScore) {
      setMessage('Dealer wins! You lose $' + bet);
    } else if (newDealerScore < playerScore) {
      const newMoney = money + 2*bet;
      setMoney(newMoney);
      setMessage('You win $' + bet);
    } else {
      setMoney(money + bet);
      setMessage('Push! Your bet is returned');
    }
  };
  setBalance(money);

  const placeBet = (amount) => {
    if (money >= amount) {
      setBet(amount);
      setMoney(money - amount);
      dealCards();
    }
  };

  const resetGame = () => {
    if (money > 0) {
      setGameStatus('place_bet');
      setMessage('Place your bet to start!');
    } else {
      setMessage('Game over - you ran out of money!');
    }
  };

  const renderCard = (card, index) => (
    <View key={index} style={styles.card}>
      <Text style={styles.cardValue}>{card.value}</Text>
      <Text style={styles.cardSuit}>{card.suit}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>
      
      <View style={styles.moneyContainer}>
        <Text style={styles.moneyText}>Money: ${money}</Text>
        {gameStatus === 'place_bet' && money > 0 && (
          <View style={styles.betButtons}>
            <TouchableOpacity style={styles.betButton} onPress={() => placeBet(10)}>
              <Text style={styles.betButtonText}>$10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.betButton} onPress={() => placeBet(25)}>
              <Text style={styles.betButtonText}>$25</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.betButton} onPress={() => placeBet(50)}>
              <Text style={styles.betButtonText}>$50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.betButton} onPress={() => placeBet(100)}>
              <Text style={styles.betButtonText}>$100</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.gameArea}>
        <View style={styles.handContainer}>
          <Text style={styles.handTitle}>Dealer's Hand: {gameStatus !== 'player_turn' ? dealerScore : '?'}</Text>
          <View style={styles.cards}>
            {dealerHand.map((card, index) => (
              index === 0 || gameStatus !== 'player_turn' 
                ? renderCard(card, index) 
                : <View key={index} style={[styles.card, styles.hiddenCard]} />
            ))}
          </View>
        </View>

        <View style={styles.handContainer}>
          <Text style={styles.handTitle}>Your Hand: {playerScore}</Text>
          <View style={styles.cards}>
            {playerHand.map(renderCard)}
          </View>
        </View>

        <Text style={styles.message}>{message}</Text>

        {gameStatus === 'player_turn' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.hitButton]} onPress={hit}>
              <Text style={styles.actionButtonText}>Hit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.standButton]} onPress={stand}>
              <Text style={styles.actionButtonText}>Stand</Text>
            </TouchableOpacity>
          </View>
        )}

        {gameStatus === 'game_over' && (
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Play Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B0000',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  moneyContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  moneyText: {
    fontSize: 20,
    color: '#D4AF37',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  betButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  betButton: {
    backgroundColor: '#13563B',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: 60,
  },
  betButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  handContainer: {
    marginBottom: 20,
  },
  handTitle: {
    fontSize: 18,
    color: '#ecf0f1',
    marginBottom: 10,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: 60,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  hiddenCard: {
    backgroundColor: '#D4AF37',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardSuit: {
    fontSize: 24,
  },
  message: {
    fontSize: 18,
    color: '#ecf0f1',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  actionButton: {
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    minWidth: 100,
  },
  hitButton: {
    backgroundColor: '#e74c3c',
  },
  standButton: {
    backgroundColor: '#2ecc71',
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: '#9b59b6',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    minWidth: 150,
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Blackjack;
