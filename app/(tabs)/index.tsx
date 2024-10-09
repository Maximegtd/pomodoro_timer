import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Timer from '@/components/Timer';

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">SMOTUS Timer !</ThemedText>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
