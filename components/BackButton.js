import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { styles } from "../styles";

const BackButton = () => {
  return (
    <TouchableOpacity style={styles.buttonBack}>
      <Image source={require("../assets/Back.png")} style={styles.image} />
    </TouchableOpacity>
  );
};

export default BackButton;