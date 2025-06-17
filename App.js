// MathVerse - Chapter 1: Learning + Challenge Mode (100 Qs, Visual Feedback, Back Button)

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const backgroundAudio = new Audio.Sound();

const levels = [
  // The first few are already defined
  {
    type: "learn",
    content: "A relation R on a set A is reflexive if every element maps to itself. For example: (1,1), (2,2), (3,3)."
  },
  {
    type: "task",
    question: "Which relation is reflexive on set A = {1, 2, 3}?",
    options: [
      "R = {(1,1), (2,2), (3,3)}",
      "R = {(1,2), (2,3)}",
      "R = {(2,2), (3,3)}",
      "R = {(1,1), (3,3)}"
    ],
    correct: 0
  },
  {
    type: "learn",
    content: "A relation is symmetric if (a, b) ∈ R ⇒ (b, a) ∈ R. For example: if (1,2) is in R, then (2,1) must also be."
  },
  {
    type: "task",
    question: "Tap the symmetric relation:",
    options: [
      "R = {(1,2), (2,1)}",
      "R = {(1,2), (2,3)}",
      "R = {(2,2), (3,3)}",
      "R = {(1,3)}"
    ],
    correct: 0
  },
  // QUESTION 5
  {
    type: "learn",
    content: "A relation is transitive if (a,b) and (b,c) in R implies (a,c) is also in R."
  },
  {
    type: "task",
    question: "Which relation is transitive?",
    options: [
      "R = {(1,2), (2,3), (1,3)}",
      "R = {(1,2), (3,2)}",
      "R = {(1,3)}",
      "R = {(2,3), (3,4)}"
    ],
    correct: 0
  },
  // QUESTION 7
  {
    type: "learn",
    content: "A function from A to B maps each element of A to exactly one element of B."
  },
  {
    type: "task",
    question: "Which of the following is a valid function?",
    options: [
      "{(1,2), (1,3)}",
      "{(2,2), (3,3)}",
      "{(1,1), (1,1)}",
      "{(4,5), (4,6)}"
    ],
    correct: 1
  },
  {
    type: "learn",
    content: "Injective (one-one) functions map each input to a unique output."
  },
  {
    type: "task",
    question: "Which function is injective but not surjective?",
    options: [
      "f: A → B, f = {(1,a), (2,a)}",
      "f: A → B, f = {(1,a), (2,b)}",
      "f: A → B, f = {(1,a)}",
      "f: A → B, f = {(2,b), (2,c)}"
    ],
    correct: 1
  },
  {
    type: "learn",
    content: "A surjective (onto) function covers all elements of the codomain."
  },
  {
    type: "task",
    question: "Which of these functions is surjective?",
    options: [
      "f: A → B, f = {(1,a), (2,b)} where B = {a,b,c}",
      "f: A → B, f = {(1,a), (2,b), (3,c)} where B = {a,b,c}",
      "f: A → B, f = {(1,a), (2,a)} where B = {a,b}",
      "f: A → B, f = {(1,b), (2,c)} where B = {a,b,c}"
    ],
    correct: 1
  },
  {
    type: "learn",
    content: "A bijective function is both injective and surjective."
  },
  {
    type: "task",
    question: "Which of the following functions is bijective?",
    options: [
      "f: A → B, f = {(1,a), (2,a)}",
      "f: A → B, f = {(1,a), (2,b)}",
      "f: A → B, f = {(1,a)}",
      "f: A → B, f = {(1,a), (2,a), (3,a)}"
    ],
    correct: 1
  },
  {
    type: "learn",
    content: "The inverse of a function 'undoes' its output."
  },
  {
    type: "task",
    question: "What is the inverse of f(x) = 3x - 6?",
    options: [
      "(x + 6)/3",
      "(x - 6)/3",
      "(x - 3)/6",
      "3x + 6"
    ],
    correct: 1
  },
  {
    type: "learn",
    content: "(f ∘ g)(x) = f(g(x)). First apply g, then apply f."
  },
  {
    type: "task",
    question: "If f(x) = x² and g(x) = x + 1, what is (f ∘ g)(2)?",
    options: [
      "f(3) = 9",
      "g(2) = 3",
      "f(2) = 4",
      "None"
    ],
    correct: 0
  }
];

export default function App() {
  useEffect(() => {
    const loadAudio = async () => {
      try {
        await backgroundAudio.loadAsync(require('./assets/soft-bg.mp3'));
        await backgroundAudio.setIsLoopingAsync(true);
        await backgroundAudio.playAsync();
      } catch (error) {
        console.warn('Audio load error:', error);
      }
    };
    loadAudio();

    return () => {
      backgroundAudio.stopAsync();
      backgroundAudio.unloadAsync();
    };
  }, []);
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);
  const [xp, setXP] = useState(0);
  const [locked, setLocked] = useState(false);
  const [answered, setAnswered] = useState(false);

  const current = levels[level];
  const totalXP = levels.filter(l => l.type === 'task').length * 5;

  const handleSelect = (i) => {
    if (!locked) setSelected(i);
  };

  const handleSubmit = () => {
    if (current.type !== "task" || selected === null || locked) return;
    const isCorrect = selected === current.correct;
    if (isCorrect && !answered) {
      setXP(prev => prev + 5);
      setAnswered(true);
    }
    setLocked(true);
  };

  const next = () => {
    if (level + 1 < levels.length) {
      setLevel(level + 1);
      setSelected(null);
      setLocked(false);
      setAnswered(false);
    } else {
      Alert.alert("🏆 You completed Chapter 1!", `XP: ${xp} / ${totalXP}`);
    }
  };

  const back = () => {
    if (level > 0) {
      setLevel(level - 1);
      setSelected(null);
      setLocked(false);
      setAnswered(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#0f1117' }} contentContainerStyle={styles.container}>
      <Text style={styles.logo}>📘 MathVerse</Text>
      <Text style={styles.chapter}>Ch 1: Relations & Functions</Text>

      {current.type === "learn" && (
        <>
          <Text style={styles.learn}>{current.content}</Text>
          <TouchableOpacity style={styles.btnNext} onPress={next}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {current.type === "task" && (
        <>
          <Text style={styles.q}>{current.question}</Text>

          {current.options.map((opt, i) => {
            let optionStyle = styles.option;
            if (locked) {
              if (i === current.correct) optionStyle = styles.optionCorrect;
              else if (i === selected) optionStyle = styles.optionWrong;
            } else if (selected === i) {
              optionStyle = styles.selected;
            }
            return (
              <TouchableOpacity
                key={i}
                style={optionStyle}
                onPress={() => handleSelect(i)}
              >
                <Text style={styles.optText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={styles.btnNext} onPress={back}>
              <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnNext} onPress={next}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={styles.xp}>XP: {xp} / {totalXP}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ccff',
  },
  chapter: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
  },
  learn: {
    color: '#cceeff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    backgroundColor: '#112233',
    padding: 16,
    borderRadius: 10,
  },
  q: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#222',
    borderColor: '#444',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    width: width * 0.9,
    marginBottom: 10,
  },
  optionCorrect: {
    backgroundColor: '#224422',
    borderColor: '#00ff00',
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
    width: width * 0.9,
    marginBottom: 10,
  },
  optionWrong: {
    backgroundColor: '#441111',
    borderColor: '#ff0000',
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
    width: width * 0.9,
    marginBottom: 10,
  },
  selected: {
    borderColor: '#00ccff',
    backgroundColor: '#113344',
  },
  optText: {
    color: '#fff',
  },
  btn: {
    backgroundColor: '#00ccff',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 150,
    alignItems: 'center',
  },
  btnNext: {
    backgroundColor: '#007acc',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 150,
    alignItems: 'center',
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  xp: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
  },
});
