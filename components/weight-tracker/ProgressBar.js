import * as React from 'react';
import { useState } from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

export default function WeightBar(props) {
		
	// Safely calculate progress, default to 0 if invalid
	const progress = () => {
		if (!props.goal || !props.weightHistory || 
			isNaN(props.goal) || isNaN(props.weightHistory) ||
			props.weightHistory === 0) {
			return 0;
		}
		return Math.min(1, Math.max(0, props.weightHistory / props.goal));
	};
	const Currentweight = progress();
	
	return (
		<View style={styles.bottomText}>
	  <ProgressBar progress={Currentweight} theme={{ colors: { primary: 'red' } }} width ={300} style={{margin: 1}} />
    </View>
	
	)
}
	 
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	bottomText: {
	  position: 'absolute',
	  bottom: 200,
	  left: 45,
	  right: 0,
	  textAlign: 'center',
	},

  });
  


  