import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, padding: 32 }}>
      <ThemedText type='title'>History</ThemedText>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 100,
  },
});
