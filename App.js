import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserInfoPage from "./pages/UserInfoPage";
import DietaryInfoPage from "./pages/DietaryInfoPage";
import NoGoFoodsPage from "./pages/NoGoFoodsPage";
import SummaryPage from "./pages/SummaryPage";
import WelcomePage from "./pages/WelcomePage";
import ChooseRestaurantPage from "./pages/ChooseRestaurantPage"

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 300 } },
            close: { animation: 'timing', config: { duration: 300 } },
          },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="UserInfo" component={UserInfoPage} />
        <Stack.Screen name="DietaryInfo" component={DietaryInfoPage} />
        <Stack.Screen name="NoGoFoods" component={NoGoFoodsPage} />
        <Stack.Screen name="Summary" component={SummaryPage} />
        <Stack.Screen name="ChooseRestaurant" component={ChooseRestaurantPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
