import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Root styles
  root: {
    fontFamily: "Roboto",
    backgroundColor: "white",
    margin: 0,
  },

  // Buttons
  button: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0, // No border
  },

  buttonBack: {
    position: "absolute",
    top: 44,
    left: 25,
    width: 44,
    height: 44,
    backgroundColor: "#979797",
    borderRadius: 14,
    justifyContent: "center",  // Ensure content is centered
    alignItems: "center",      // Center horizontally
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },

  buttonContainer: {
    position: "absolute",
    top: 558,
    left: "50%",
    width: 305,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -152.5 }], // Since 305px / 2 = 152.5px
  },

  buttonNext: {
    width: 305,
    height: 58,
    backgroundColor: "#2e8ea7",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -200,
    left: "50%",
    transform: [{translateX: -152.5}],
    elevation: 5,
    shadowColor: "rgba(44, 41, 41, 0.08)",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 1,
    shadowRadius: 19,
  },

  buttonNextText: {
    color: "white",
    fontFamily: "DM Sans",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },

  container: {
    alignItems: "center",
    marginHorizontal: 20,
  },

  // Text styles
  text: {
    fontFamily: "DM Sans",
    fontWeight: "400",
    fontSize: 20,
    letterSpacing: -0.04,
    color: "#979797",
  },

  welcomeText: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 24,
    letterSpacing: -0.04,
    color: "#011a59",
    top: 50,
  },

  boldText: {
    fontWeight: "bold",
  },

  infoText: {
    fontFamily: "DM Sans",
    fontWeight: "400",
    fontSize: 20,
    letterSpacing: -0.04,
    color: "#979797",
    position: "relative",
    top: 60,
    textAlign: "center",
  },

  image: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },

  logo: {
    width: 143,
    height: 143,
    top: -49,
    resizeMode: "contain",
  },
  
})