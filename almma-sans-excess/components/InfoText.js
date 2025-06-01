import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from "../styles";

const InfoText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        In order to provide you with the{"\n"}
        best personalized{"\n"}
        recommendations, we are going to{"\n"}
        ask you two questions regarding{"\n"}
        your food preferences.{"\n"}
        {"\n"}
        <Text style={styles.boldText}>Ready?</Text>
      </Text>
    </View>
  );
};

export default InfoText;
