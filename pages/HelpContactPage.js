import React from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import MenuButton from "../components/MenuButton";

const HelpContactPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Back Button + Logo */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton/>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Help & Contact</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          <Text style={styles.sectionText}>
            If you're experiencing any issues or have questions about using Almma, we're here to help!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            Email: support@almma.com{"\n"}
            Phone: (555) 123-4567{"\n"}
            Hours: Mon-Fri, 9am-5pm EST
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQ</Text>
          <Text style={styles.sectionText}>
            Check out our frequently asked questions for quick answers to common questions.
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {/* Add FAQ navigation here */}}
          >
            <Text style={styles.buttonText}>View FAQ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    transform: [{ translateX: -71.5 }],
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HelpContactPage; 