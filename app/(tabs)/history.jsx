import { StyleSheet, ScrollView, FlatList, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { getAllSessions } from '@/database/async_storage';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { HistoryCard } from '@/components/HistoryCard';

export default function History() {
  const [sessions, setSessions] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const storedSessions = await getAllSessions();

      if (Array.isArray(storedSessions) && storedSessions.length > 0) {
        // Vérifier que chaque élément est un objet
        const validSessions = storedSessions.filter(session => typeof session === 'object' && session !== null).sort((a, b) => new Date(b.date) - new Date(a.date));;

        setSessions(validSessions);
        console.log('Valid sessions stored:', validSessions);
      } else {
        console.log('No valid sessions found');
        setSessions([]);
      }

    } catch (error) {
      console.error('Error loading sessions:', error);
      setSessions([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  return (
    <View style={styles.container}>
      <ThemedText type='title'>History</ThemedText>
      <FlatList
        style={{ marginBottom: 80 }}
        keyExtractor={(item) => item.date + item.workTime + item.sessionCount}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log("onEndReached");
        }}
        showsVerticalScrollIndicator={false}
        data={sessions}
        renderItem={({ item }) => (
          <HistoryCard
            session={item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 16,
  },
});
