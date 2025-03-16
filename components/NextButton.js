import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";

const NextButton = () => {
  return (
    <TouchableOpacity style={styles.buttonNext}>
      <Text style={styles.buttonNextText}>Let's Go</Text>
    </TouchableOpacity>
  );
};

export default NextButton;