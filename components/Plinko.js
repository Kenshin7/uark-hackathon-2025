import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PEG_RADIUS = 8;
const BALL_RADIUS = 12;
const ROWS = 10;
const COL_SPACING = 41;
const BET_AMOUNT = 100;

const slotMultipliers = [8, 4, 1, .25, .25, 1, 4, 8];
const SLOTS_CONTAINER_WIDTH = SCREEN_WIDTH * 0.85; // Use 80% of screen width
const SLOT_COUNT = slotMultipliers.length;
let currentBall = null;
let accumulatedWinnings = 0;

const Physics = (entities, { time, dispatch }) => {
  const engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  if (currentBall) {
    const velocity = Matter.Vector.magnitude(currentBall.velocity);
    
    // Check if ball has settled at the bottom
    if (velocity < 0.3 && currentBall.position.y > 370) {
      const xPos = currentBall.position.x;
      const slotWidth = COL_SPACING;
      const slotIndex = Math.min(slotMultipliers.length - 1, Math.floor(xPos / slotWidth));
      
      dispatch({ type: 'ballStopped', multiplier: slotMultipliers[slotIndex] });
      currentBall = null;
    }
  }
  
  return entities;
};

const setupWorld = () => {
  const engine = Matter.Engine.create({ 
    enableSleeping: false,
    gravity: { x: 0, y: 0.8 } // Increased gravity for faster falling
  });
  const world = engine.world;

  // Create triangular starting pegs (3 pegs)
  const pegs = [];
  const startY = SCREEN_HEIGHT*0.1;
  


  // Create main peg grid
  for (let row = 3; row < ROWS; row++) {
    const cols = row;
    const totalWidth = (cols) * COL_SPACING;
    const startX = (SCREEN_WIDTH - totalWidth) / 2 + 5;
    
    for (let col = 0; col < cols; col++) {
      pegs.push(
        Matter.Bodies.circle(
          startX + col * COL_SPACING,
          startY + (row - 2) * COL_SPACING,
          PEG_RADIUS,
          { 
            isStatic: true,
            restitution: 0.7,
            collisionFilter: { category: 0x0002 }
          }
        )
      );
    }
  }

  
  const angle = Math.PI / 6.75
  // Create boundaries
  const wallColor = '#FFA500'; 
  const leftWall = Matter.Bodies.rectangle(
    -70, SCREEN_HEIGHT / 2 + 60,
    50, SCREEN_HEIGHT,
    {
      isStatic: true,
      angle: angle, // Apply rotation
      width: 50, // custom
      height: SCREEN_HEIGHT, // custom
      render: { fillStyle: wallColor },
      label: 'left-wall',
      collisionFilter: { category: 0x0001 }
    }
  );
  const rightWall = Matter.Bodies.rectangle(
    SCREEN_WIDTH+40, SCREEN_HEIGHT / 2 + 60,
    50, SCREEN_HEIGHT,
    {
      isStatic: true,
      angle: -angle, // Tilt opposite direction
      width: 50, // custom
      height: SCREEN_HEIGHT, // custom
      render: { fillStyle: wallColor },
      label: 'right-wall',
      collisionFilter: { category: 0x0001 }
    }
  );
  const bottomWall = Matter.Bodies.rectangle(
    SCREEN_WIDTH / 2, 410,
    SCREEN_WIDTH, 50,
    {
      isStatic: true,
      render: { fillStyle: wallColor },
      width: SCREEN_WIDTH, // custom
      height: 50, // custom
      label: 'bottom-wall',
      collisionFilter: { category: 0x0001 }
    }
  );
    Matter.World.add(world, [...pegs, rightWall, leftWall, bottomWall]);
    return engine;
};

const PlinkoGame = ({ balance, setBalance }) => {
  const [entities, setEntities] = useState(null);
  const [gameBalance, setGameBalance] = useState(balance);
  const [result, setResult] = useState(null);
  const [canPlay, setCanPlay] = useState(true);
  const [physicsReady, setPhysicsReady] = useState(false); // Add loading state
  const ballPos = useRef(new Animated.ValueXY({ x: -100, y: -100 })).current; // Start off-screen
  const engineRef = useRef(null);

  useEffect(() => {
    const engine = setupWorld();
    setEntities({
      physics: { engine, world: engine.world },
      ball: { body: null }
    });
    setPhysicsReady(true); // Mark physics as ready
    
    return () => {
      if (accumulatedWinnings !== 0) {
        setBalance(prev => prev + accumulatedWinnings);
        accumulatedWinnings = 0;
      }
      Matter.Engine.clear(engine);
    };
  }, []);

  const resetBall = useCallback(() => {
    if (!canPlay || gameBalance < BET_AMOUNT) return;

    setCanPlay(false);
    setGameBalance(prev => prev - BET_AMOUNT);

    // Remove previous ball
    if (entities?.ball.body) {
      Matter.World.remove(entities.physics.world, entities.ball.body);
    }

    // Random spawn position between top pegs
    const spawnX = SCREEN_WIDTH/2 - COL_SPACING * 0.6 + (Math.random() - 0.5) * COL_SPACING * 1.5;
    const spawnY = 70;

    const ball = Matter.Bodies.circle(
      spawnX,
      spawnY,
      BALL_RADIUS,
      { 
        label: 'ball',
        restitution: 0.7,
        friction: 0.01,
        frictionAir: 0.02,
        density: 0.04,
        collisionFilter: { 
          category: 0x0001,
          mask: 0x0002 | 0x0001 
        },
        isStatic: false // Ensure it's dynamic
      }
    );

    // Add velocity to ensure movement
    Matter.Body.setVelocity(ball, { x: 0, y: 2 });
    
    Matter.World.add(entities.physics.world, ball);
    currentBall = ball;

    // Animation loop
    const animate = () => {
      if (currentBall) {
        ballPos.setValue({
          x: currentBall.position.x - BALL_RADIUS,
          y: currentBall.position.y - BALL_RADIUS
        });
        requestAnimationFrame(animate);
      }
    };
    animate();

    setEntities(prev => ({ ...prev, ball: { body: ball } }));
  }, [entities, canPlay, gameBalance, ballPos]);

  const handleEvent = useCallback((e) => {
    if (e.type === 'ballStopped') {
      const winnings = BET_AMOUNT * e.multiplier;
      accumulatedWinnings += winnings - BET_AMOUNT;
      setResult(`${e.multiplier}x ($${winnings})`);
      setGameBalance(prev => prev + winnings);
      setCanPlay(true);
    }
  }, []);

  if (!entities) {
    return (
      <View style={styles.container}>
        <Text>Initializing game...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: ${gameBalance}</Text>
       
      <GameEngine
        ref={engineRef}
        systems={[Physics]}
        entities={entities}
        onEvent={handleEvent}
        style={styles.game}
      >
        {entities.physics.world.bodies.map((body) => {
            // // Render walls
            // if (body.label.includes('wall')) {
            // return (
            //     <View
            //     key={`wall-${body.id}`}
            //     style={[
            //         styles.wall,
            //         {
            //             width: body.width,
            //             height: body.height,
            //             left: body.position.x - body.width / 2,
            //            I would lik top: body.position.y - body.height / 2,
            //             transform: [{ rotate: `${body.angle}rad` }],
            //         }
            //     ]}
            //     />
            // );
            // }
            
            // Render pegs
            if (body.label.includes('Circle') && body.label !== 'ball') {
            return (
                <View
                key={`peg-${body.id}`}
                style={[
                    styles.peg,
                    {
                    left: body.position.x - PEG_RADIUS,
                    top: body.position.y - PEG_RADIUS,
                    }
                ]}
                />
            );
            }
            
            return null;
        })}
        
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [
                { translateX: ballPos.x },
                { translateY: ballPos.y }
              ],
              opacity: entities?.ball.body ? 1 : 0 // Hide when no ball
            }
          ]}
        />
      </GameEngine>

      <TouchableOpacity
        style={[styles.button, (!canPlay || gameBalance < BET_AMOUNT) && styles.disabled]}
        onPress={resetBall}
        disabled={!canPlay || gameBalance < BET_AMOUNT}
      >
        <Text style={styles.buttonText}>
          {canPlay ? `Drop Ball ($${BET_AMOUNT})` : 'Ball in Play...'}
        </Text>
      </TouchableOpacity>
          

      {result && <Text style={styles.result}>{result}</Text>}



        <View style={[styles.slotsContainer, { 
            width: SLOTS_CONTAINER_WIDTH,
            left: (SCREEN_WIDTH - SLOTS_CONTAINER_WIDTH) / 2 // Center the container
            }]}>
            {slotMultipliers.map((multiplier, index) => {
                const slotWidth = SLOTS_CONTAINER_WIDTH / SLOT_COUNT;
                let slotColor;
                
                // Color coding
                if (multiplier >= 5) slotColor = '#4CAF50';      // Green
                else if (multiplier >= 2) slotColor = '#2196F3'; // Blue
                else slotColor = '#F44336';                      // Red

                return (
                <View 
                    key={`slot-${index}`}
                    style={[
                    styles.multiplierSlot,
                    { 
                        backgroundColor: slotColor,
                        width: slotWidth,
                    }
                    ]}
                >
                    <Text style={styles.multiplierText}>{multiplier}x</Text>
                </View>
                );
            })}
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  game: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  peg: {
    position: 'absolute',
    backgroundColor: '#666',
    width: PEG_RADIUS * 2,
    height: PEG_RADIUS * 2,
    borderRadius: PEG_RADIUS,
  },
  ball: {
    position: 'absolute',
    backgroundColor: '#e91e63',
    width: BALL_RADIUS * 2,
    height: BALL_RADIUS * 2,
    borderRadius: BALL_RADIUS,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  wall: {
    position: 'absolute',
    backgroundColor: '#FFA500', // Orange color
  },
  slotsContainer: {
    position: 'absolute',
    bottom: 145,
    height: 20,
    flexDirection: 'row',
  },
  multiplierSlot: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  multiplierText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default PlinkoGame;