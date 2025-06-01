import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";


const BackButton = ({ onPress }) => {
  const handlePress = () => {
    console.log("BackButton pressed");
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.buttonBack} onPress={handlePress}>
      <Image source={require("../assets/Back.png")} style={styles.image} />
    </TouchableOpacity>
  );
};

export default BackButton;