import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Slots = () => {
  const [slots, setSlots] = useState(['🍒', '🍒', '🍒']);
  const [spinning, setSpinning] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [balance, setBalance] = useState(100);
  const [winMessage, setWinMessage] = useState('');

  const spin = () => {
    if (spinning || balance < 10) return;
    
    setSpinning(true);
    setBalance(balance - 10);
    
    // Simple spin animation
    let spins = 0;
    setAnimationComplete(false);
    const spinInterval = setInterval(() => {
      setSlots([
        ['🍒', '🍊', '🍋', '💰', '🎰'][Math.floor(Math.random() * 5)],
        ['🍒', '🍊', '🍋', '💰', '🎰'][Math.floor(Math.random() * 5)],
        ['🍒', '🍊', '🍋', '💰', '🎰'][Math.floor(Math.random() * 5)]
      ]);
      spins++;
      
      if (spins > 5) {
        clearInterval(spinInterval);
        setSpinning(false);
        setAnimationComplete(true); // Mark animation as complete
      }
    }, 200);
  };

  // Only check for wins when animation is complete
  React.useEffect(() => {
    if (animationComplete) {
      checkWin();
      setAnimationComplete(false); // Reset for next spin
    }
  }, [animationComplete]);

  const checkWin = () => {
    console.log('Current slots:', slots); // Debug logging
    
    // Check for 3 matching symbols (jackpot)
    if (slots[0] === slots[1] && slots[1] === slots[2]) {
      const winAmount = 50;
      setBalance(balance + winAmount);
      setWinMessage(`JACKPOT! +$${winAmount} (${slots[0]} ${slots[1]} ${slots[2]})`);
      return;
    }
    
    // Check for 2 matching symbols (left and middle)
    if (slots[0] === slots[1]) {
      const winAmount = 5;
      setBalance(balance + winAmount);
      setWinMessage(`WIN! +$${winAmount} (Two ${slots[0]} on left)`);
      return;
    }
    
    // Check for 2 matching symbols (middle and right)
    if (slots[1] === slots[2]) {
      const winAmount = 5;
      setBalance(balance + winAmount);
      setWinMessage(`WIN! +$${winAmount} (Two ${slots[1]} on right)`);
      return;
    }
    
    // Check for 2 matching symbols (left and right)
    if (slots[0] === slots[2]) {
      const winAmount = 5;
      setBalance(balance + winAmount);
      setWinMessage(`WIN! +$${winAmount} (Two ${slots[0]} on ends)`);
      return;
    }
    
    setWinMessage('No win - Try again!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: ${balance}</Text>
      {winMessage ? (
        <Text style={styles.winMessage}>{winMessage}</Text>
      ) : null}
      
      <View style={styles.slots}>
        {slots.map((slot, i) => (
          <Text key={i} style={styles.slot}>{slot}</Text>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[styles.button, (spinning || balance < 10) && styles.disabled]}
        onPress={spin}
        disabled={spinning || balance < 10}
      >
        <Text style={styles.buttonText}>
          {spinning ? 'Spinning...' : 'SPIN ($10)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B0000',
    padding: 20
  },
  balance: {
    fontSize: 24,
    color: '#D4AF37',
    marginBottom: 30
  },
  slots: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#13563B',
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#D4AF37'
  },
  slot: {
    fontSize: 60,
    width: 80,
    height: 80,
    marginHorizontal: 10,
    backgroundColor: '#13563B',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4AF37'
  },
  button: {
    backgroundColor: '#13563B',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center'
  },
  buttonText: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold'
  },
  disabled: {
    opacity: 0.5
  },
  winMessage: {
    fontSize: 18,
    color: '#D4AF37',
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default Slots;
