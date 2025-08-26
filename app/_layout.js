import { Stack } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import { useFonts } from "expo-font";
import { AppProvider } from "../context/appcontext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <Stack initialRouteName="index">
    //   <Stack.Screen name="home" />
    //   <Stack.Screen name="index" options={{
    //     headerShown: false
    //   }}/>
    // </Stack>
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer screenOptions={{
          headerShown: true
        }}>
          <Drawer.Screen name="index" options={{ title: "Welcome"}}/>
          <Drawer.Screen name="home" options={{ title: "Jobs"}}/>
          <Drawer.Screen name="likejobs" options={{ title: "Liked-Jobs"}}/>
          {/* <Drawer.Screen name="logout" options={{ title: "Liked-Jobs"}}/> */}
        </Drawer>
      </GestureHandlerRootView>
    </AppProvider>
  )
};

export default Layout;
