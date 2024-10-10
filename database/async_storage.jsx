import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';


// Fonction pour sauvegarder une session de travail
export const storeSession = async (newSession) => {
  try {
    const sessionId = randomUUID().toString(); // Utiliser un uuid comme clé unique
    const jsonValue = JSON.stringify(newSession);
    await AsyncStorage.setItem(`@session_${sessionId}`, jsonValue);
    console.log('New session added');
  } catch (e) {
    console.error('Error adding new session', e);
  }
};

// Fonction pour récupérer toutes les sessions de travail
export const getAllSessions = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const sessionKeys = keys.filter(key => key.startsWith('@session_')); // Filtrer uniquement les clés des sessions

    const sessions = await AsyncStorage.multiGet(sessionKeys); // Récupérer toutes les valeurs associées aux clés
    return sessions.map(session => JSON.parse(session[1])); // Retourner le tableau des sessions
  } catch (e) {
    console.error('Error retrieving all sessions', e);
    return [];
  }
};

// Fonction pour supprimer toutes les sessions de travail
export const clearAllSessions = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const sessionKeys = keys.filter(key => key.startsWith('@session_')); // Filtrer les clés des sessions

    await AsyncStorage.multiRemove(sessionKeys); // Supprimer toutes les sessions
    console.log('All sessions cleared');
  } catch (e) {
    console.error('Error clearing sessions', e);
  }
};