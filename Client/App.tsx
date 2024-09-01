// App.js
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import {Provider} from 'react-redux';
import store from './store';
import Pickup from './screens/Pickup';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Signup from './screens/Signup';
import {auth} from './firebase';
import Profile from './screens/Profile';
import { StripeProvider } from '@stripe/stripe-react-native';
import Pay from './screens/Pay';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <StripeProvider
      publishableKey="pk_test_51PcBzhD8vdk9FbZFl9c1TBS03ePOlmRRmZ3ZqkpvztrcTd9BMLy3zbKE1IQxvTEkHWFmZScg5lAgUYJPHkFZKqXC00CkDf4UK3"
      merchantDisplayName="Abhi">
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={user ? 'home' : 'login'}
            screenOptions={{
              headerShown: false,
            }}>
            {user ? (
              <>
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="pickup" component={Pickup} />
                <Stack.Screen name="cart" component={Cart} />
                <Stack.Screen name="pay" component={Pay} />
              </>
            ) : (
              <>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
}
