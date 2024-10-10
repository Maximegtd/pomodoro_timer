import {
  SafeAreaView,
  Platform,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";

export const AppLayout = ({ children }) => {
  if (Platform.OS === "android") {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        {children}
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" />
        {children}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
