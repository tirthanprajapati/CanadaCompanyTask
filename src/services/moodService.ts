import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodEntry } from '../types';

const MOOD_HISTORY_KEY = 'mood_history';

// Simulated API call to ChatGPT
export const getMoodInsight = async (moodEntry: MoodEntry): Promise<string> => {
  // In a real app, this would make an API call to your backend
  // which would then interact with the ChatGPT API
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

  const moodLevel = moodEntry.scale <= 3 ? 'low' : 
                    moodEntry.scale <= 7 ? 'moderate' : 'high';

  const insights = {
    low: 'I notice you\'re not feeling your best. Remember that it\'s okay to have down days. Consider talking to someone you trust or trying some self-care activities.',
    moderate: 'You seem to be doing okay. This is a good time to maintain positive habits and perhaps try something new that brings you joy.',
    high: 'It\'s great to see you\'re feeling positive! Try to note what contributed to this good mood - it can help during future challenging times.'
  };

  return insights[moodLevel];
};

export const storeMoodEntry = async (entry: MoodEntry): Promise<void> => {
  try {
    const history = await getMoodHistory();
    history.push(entry);
    await AsyncStorage.setItem(MOOD_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error storing mood entry:', error);
    throw error;
  }
};

export const getMoodHistory = async (): Promise<MoodEntry[]> => {
  try {
    const history = await AsyncStorage.getItem(MOOD_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting mood history:', error);
    return [];
  }
};