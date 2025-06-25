import React from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import WelcomeText from "../components/WelcomeText";
import InfoText from "../components/InfoText";
import NextButton from "../components/NextButton";
import MenuButton from "../components/MenuButton";

const WelcomePage = ({ navigation }) => {
  const handleNextPress = () => {
    navigation.navigate('UserInfo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton/>
      </View>

      <View style={styles.welcomeContainer}>
        <WelcomeText />
      </View>

      <View style={styles.infoContainer}>
        <InfoText />
      </View>

      <View style={styles.buttonContainer}>
        <NextButton 
          onPress={handleNextPress} 
          buttonText="Get Started" 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    top: 43,
  },
  logoContainer: {
    position: "absolute",
    top: 43,
    left: "50%",
    transform: [{ translateX: -71.5 }], // Centers Logo (143px width / 2)
  },
  welcomeContainer: {
    marginTop: 226,
  },
  infoContainer: {
    marginTop: 41,
    textAlign: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
});

export default WelcomePage;