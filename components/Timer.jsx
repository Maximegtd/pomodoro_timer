import { StyleSheet, View, Button, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { ThemedText } from "./ThemedText";
import { useEffect, useState } from 'react';
import { color } from '@/constants/Colors';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Timer() {
  const theme = useColorScheme() === 'dark' ? '#fff' : '#000';

  const types = {
    'SHORT': { label: 'short (20/5)', value: { workTime: 20 * 60, breakTime: 5 * 60 } },
    'LONG': { label: 'long (45/15)', value: { workTime: 45 * 60, breakTime: 15 * 60 } },
  };

  const [selectedType, setSelectedType] = useState('LONG');

  const [workTime, setWorkTime] = useState(selectedType === 'SHORT' ? types.SHORT.value.workTime : types.LONG.value.workTime);
  const [breakTime, setBreakTime] = useState(selectedType === 'SHORT' ? types.SHORT.value.breakTime : types.LONG.value.breakTime)

  const [mode, setMode] = useState('work'); // 'work' ou 'break'
  const [time, setTime] = useState(workTime); // temps affiché
  const [isRunning, setIsRunning] = useState(false); // état du timer en cours
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (time === 0) {
      handleTimerEnd();
    }
  }, [time]);

  const startTimer = () => {
    // Démarrer le timer
    setIsRunning(true);
    const id = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    setIntervalId(id);
  };

  const startPauseTimer = () => {
    if (!isRunning) {
      startTimer();
    } else {
      // Pause le timer
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTime(workTime);
  };

  const handleTimerEnd = () => {
    clearInterval(intervalId);
    sendNotification();

    // Passer au mode suivant
    if (mode === 'work') {
      setMode('break');
      setTime(breakTime);
    } else {
      setMode('work');
      setTime(workTime);
    }
    startTimer();
  };

  const sendNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Pomodoro',
        body: `${mode == 'break' ? "Time to work !" : "Time to take a break !"}`,
      },
      trigger: null,
    });
  };

  const changePomodoroType = (key) => {
    stopTimer();
    setSelectedType(key);
    setWorkTime(types[key].value.workTime);
    setBreakTime(types[key].value.breakTime);

    setMode('work');
    setTime(types[key].value.workTime);
  }

  return (
    <View style={styles.container}>
      {(isRunning || (!isRunning && time != workTime)) && (
        <ThemedText style={styles.mode}>{`Mode: ${mode === 'work' ? 'Work' : 'Break'}`}</ThemedText>
      )}
      <ThemedText style={styles.timer}>{`${Math.floor(time / 60)}:${('0' + (time % 60)).slice(-2)}`}</ThemedText>
      <Button
        onPress={startPauseTimer}
        title={isRunning ? 'Pause' : 'Start'} // 'Pause' quand le timer est lancé, 'Start' quand il est arrêté
      />
      <Button
        color={color.red}
        onPress={stopTimer}
        title="Stop"
      />
      <View style={styles.container}>
        {Object.keys(types).map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.radioButton,
              selectedType === key && styles.selectedButton,
              { borderColor: theme },
            ]}
            onPress={() => {
              changePomodoroType(key);
            }}
          >
            <View style={styles.circle} borderColor={theme}>
              {selectedType === key && <View style={styles.selectedCircle} borderColor={theme} backgroundColor={theme} />}
            </View>
            <ThemedText style={styles.label}>{types[key].label}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    width: "80%",
    gap: 16,
  },
  timer: {
    fontSize: 80,
    lineHeight: 82
  },
  mode: {
    alignSelf: 'flex-start'
  },
  radioButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});