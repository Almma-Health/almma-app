import React from "react";
import { Image } from "react-native";
import { styles } from "../styles";

const Logo = () => {
  return <Image source={require("../assets/High_ResLogo.jpg")} style={styles.logo} />;
};

export default Logo;
