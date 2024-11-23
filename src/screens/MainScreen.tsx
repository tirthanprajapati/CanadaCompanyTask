import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, TextInput, ActivityIndicator } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodEntry } from '../types';
import { storeMoodEntry, getMoodInsight } from '../services/moodService';
import MoodHistory from '../components/MoodHistory';

export default function MainScreen() {
  const [moodScale, setMoodScale] = useState(5);
  const [description, setDescription] = useState('');
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError('Please enter a mood description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const moodEntry: MoodEntry = {
        scale: moodScale,
        description,
        timestamp: new Date().toISOString(),
      };

      await storeMoodEntry(moodEntry);
      const aiInsight = await getMoodInsight(moodEntry);
      setInsight(aiInsight);
      setDescription('');
    } catch (err) {
      setError('Failed to process your mood entry. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={styles.title}>
          Mood Tracker AI
        </Text>

        <View style={styles.inputContainer}>
          <Text variant="titleMedium">How are you feeling? ({moodScale}/10)</Text>
          <Slider
            value={moodScale}
            onValueChange={setMoodScale}
            minimumValue={1}
            maximumValue={10}
            step={1}
            style={styles.slider}
          />

          <TextInput
            label="Describe your mood"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={loading}
            style={styles.button}
          >
            Get AI Insight
          </Button>

          {loading && <ActivityIndicator style={styles.loading} />}

          {insight ? (
            <View style={styles.insightContainer}>
              <Text variant="titleMedium">AI Insight:</Text>
              <Text style={styles.insight}>{insight}</Text>
            </View>
          ) : null}
        </View>

        <MoodHistory />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  slider: {
    height: 40,
    marginVertical: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 16,
  },
  loading: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  insightContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  insight: {
    marginTop: 8,
    lineHeight: 20,
  },
});