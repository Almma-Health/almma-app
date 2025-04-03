import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";

const NextButton = ({ onPress }) => {
  const handlePress = () => {
    console.log("NextButton pressed");
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.buttonNext}
    >
      <Text style={styles.buttonNextText}>Let's Go</Text>
    </TouchableOpacity>
  );
};

export default NextButton;