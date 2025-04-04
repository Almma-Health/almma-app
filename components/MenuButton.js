import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";


const BackButton = ({ onPress }) => {
  const handlePress = () => {
    console.log("Menu Button pressed");
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.menuButton} onPress={handlePress}>
      <Image source={require("../assets/menu_button.png")} style={styles.menuImage} />
    </TouchableOpacity>
  );
};

export default BackButton;