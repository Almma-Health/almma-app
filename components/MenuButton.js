import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuButton = ({ onPress }) => {
  const handlePress = () => {
    console.log("Menu Button pressed");
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.menuButton} onPress={handlePress}>
      <Ionicons name="menu" size={32} color="#444" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 44,
    right: 20,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default MenuButton;