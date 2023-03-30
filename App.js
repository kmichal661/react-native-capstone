import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Onboarding from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { retrieveData, removeItem } from "./helpers/asyncStorage";
import { useEffect, useState, useReducer, createContext, useMemo } from "react";
import SplashScren from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "ON_BOARD":
          return {
            ...prevState,
            isLoading: false,
            isOnboardingCompleated: true,
          };
        case "SET_LOADING_FALSE":
          return {
            ...prevState,
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isLoading: false,
            isOnboardingCompleated: false,
          };
      }
    },
    {
      isLoading: true,
      isOnboardingCompleated: false,
    }
  );

  const authContext = useMemo(
    () => ({
      onBoard: async (data) => {
        dispatch({ type: "ON_BOARD" });
      },
      setLoadingFalse: async () => {
        dispatch({ type: "SET_LOADING_FALSE" });
      },
      signOut: async () => {
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  useEffect(() => {
    (async () => {
      const userEmail = await retrieveData("email");

      if (userEmail) {
        dispatch({ type: "ON_BOARD" });
      }
      dispatch({ type: "SET_LOADING_FALSE" });
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await removeItem("email");
  //   })();
  // });

  if (state?.isLoading) {
    return <SplashScren />;
  }
  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {state?.isOnboardingCompleated ? (
            <Stack.Screen name="Profile" component={ProfileScreen} />
          ) : (
            <Stack.Screen name="Onboarding" component={Onboarding} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
