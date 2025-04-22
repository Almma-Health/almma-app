import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserInfoPage from "./pages/discarded_pages/UserInfoPage";
import DietaryInfoPage from "./pages/DietaryInfoPage";
import NoGoFoodsPage from "./pages/NoGoFoodsPage";
import SummaryPage from "./pages/SummaryPage";
import WelcomePage from "./pages/WelcomePage";
import ChooseRestaurantPage from "./pages/ChooseRestaurantPage"
import HelpContactPage from "./pages/HelpContactPage";
import PastReviewsPage from "./pages/PastReviewsPage";
import SecurityPage from "./pages/SecurityPage";
import UserProfilePage from "./pages/UserProfilePage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import WriteReviewPage from "./pages/WriteReviewPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 300 } },
            close: { animation: 'timing', config: { duration: 300 } },
          },
        }}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="UserInfo" component={UserInfoPage} />
        <Stack.Screen name="DietaryInfo" component={DietaryInfoPage} />
        <Stack.Screen name="NoGoFoods" component={NoGoFoodsPage} />
        <Stack.Screen name="Summary" component={SummaryPage} />
        <Stack.Screen name="ChooseRestaurant" component={ChooseRestaurantPage} />
        <Stack.Screen name="HelpContact" component={HelpContactPage} /> 
        <Stack.Screen name="PastReviews" component={PastReviewsPage} />
        <Stack.Screen name="Security" component={SecurityPage} />
        <Stack.Screen name="UserProfile" component={UserProfilePage} />
        <Stack.Screen name="RestaurantMenu" component={RestaurantMenuPage} />
        <Stack.Screen name="WriteReview" component={WriteReviewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
