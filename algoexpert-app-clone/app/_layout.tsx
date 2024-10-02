import { Stack } from "expo-router";
import { PaperProvider, useTheme } from "react-native-paper";
import { MD2DarkTheme, MD2LightTheme } from "react-native-paper";
export default function RootLayout() {
  useTheme(MD2DarkTheme);
  return (
    <PaperProvider theme={MD2LightTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          // headerTintColor: "#ffffff", // Text color of the header
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
