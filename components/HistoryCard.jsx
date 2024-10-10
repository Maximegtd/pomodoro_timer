import { View, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";

import { StyleSheet } from 'react-native';

import moment from 'moment';


export const HistoryCard = ({ session }) => {
  const theme = useColorScheme() === 'dark' ? '#fff' : '#1833c9';
  const reversedTheme = useColorScheme() === 'dark' ? '#000' : '#fff';

  const formatedDate = moment(session.date).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <View style={[styles.card, { backgroundColor: theme }]}>
      <ThemedText style={[styles.cardText, { color: reversedTheme }]}>Date: {formatedDate}</ThemedText>
      <ThemedText style={[styles.cardText, { color: reversedTheme }]}>Sessions: {session.sessionCount}</ThemedText>
      <ThemedText style={[styles.cardText, { color: reversedTheme }]}>Total work time: {session.workTime}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
  },
});