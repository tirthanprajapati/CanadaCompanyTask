import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { getMoodHistory } from '../services/moodService';
import { MoodEntry } from '../types';

export default function MoodHistory() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = async () => {
    try {
      const history = await getMoodHistory();
      setMoodHistory(history);
    } catch (error) {
      console.error('Failed to load mood history:', error);
    }
  };

  if (moodHistory.length === 0) {
    return null;
  }

  const chartData = {
    labels: moodHistory.slice(-7).map(() => ''),
    datasets: [{
      data: moodHistory.slice(-7).map(entry => entry.scale)
    }]
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Your Mood History</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});