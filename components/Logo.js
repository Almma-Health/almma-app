import React from "react";
import { Image } from "react-native";
import { styles } from "../styles";

const Logo = ({ small }) => {
  return (
    <Image 
      source={require("../assets/High_ResLogo.jpg")} 
      style={small ? styles.smallLogo : styles.logo} 
    />
  );
};

export default Logo;
