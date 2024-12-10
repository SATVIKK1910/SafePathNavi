// New code -   ----------------------------
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen.js';
import MapScreen from './screens/MapScreen.js';
import MainPage from './screens/MainPage.js'; // Import MainPage
import ProfilePage from './screens/ProfilePage.js';
import CrimeReportForm from './screens/CrimeReportForm.js';
import { auth } from './firebaseConfig.js';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="CrimeReportForm" component={CrimeReportForm} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
