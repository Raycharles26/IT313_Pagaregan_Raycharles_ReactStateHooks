import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

// CUSTOM HOOK: Stopwatch timer
function useStopwatch(isRunning: boolean): number {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return seconds;
}

// COMPONENT 1: Practice Tracker
type PracticeTrackerProps = {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
};

function PracticeTracker({ solved, onSolve, onReset }: PracticeTrackerProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Practice Tracker</Text>
      <Text style={styles.counter}>Solved: {solved}</Text>

      {solved >= 5 && <Text style={styles.success}>Great job!</Text>}

      <View style={styles.button}>
        <Button title="Solve +1" onPress={onSolve} />
      </View>

      <View style={styles.button}>
        <Button title="Reset" onPress={onReset} />
      </View>
    </View>
  );
}

// COMPONENT 2: Stopwatch
type StopwatchProps = {
  seconds: number;
  isRunning: boolean;
};

function Stopwatch({ seconds, isRunning }: StopwatchProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0");

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Lab Stopwatch</Text>
      <Text style={styles.timer}>{formattedTime}</Text>

      <Text style={styles.status}>{isRunning ? "Running..." : "Paused"}</Text>
    </View>
  );
}

// COMPONENT 3: Parent Screen
export default function HomeScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lab Practice Tracker</Text>
      <Text style={styles.subtitle}>Track your practice and study time</Text>

      <PracticeTracker
        solved={solved}
        onSolve={() => setSolved((previous) => previous + 1)}
        onReset={() => setSolved(0)}
      />

      <Stopwatch seconds={seconds} isRunning={isRunning} />

      <View style={styles.card}>
        <Text style={styles.heading}>Timer Controls</Text>

        <View style={styles.button}>
          <Button title="Start" onPress={() => setIsRunning(true)} />
        </View>

        <View style={styles.button}>
          <Button title="Stop" onPress={() => setIsRunning(false)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 55,
    backgroundColor: "#F0F4F8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#17365D",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555555",
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    marginBottom: 18,
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
    color: "#17365D",
  },
  counter: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  success: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16803D",
    textAlign: "center",
    marginBottom: 12,
  },
  timer: {
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
    color: "#17365D",
  },
  status: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    marginTop: 10,
  },
});
