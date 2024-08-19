import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { BackHandler, useColorScheme } from "react-native";
import "react-native-reanimated";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      depthCard: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  let dark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      card: "#1e1e1e",
      background: "#121214",
      depthCard: "#2a2a2d",
    },
  };
  let light = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      card: "#fff",
      background: "#eff0f3",
      depthCard: "#dcdcdf",
    },
  };
  const theme = colorScheme === "dark" ? dark : light;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="InteractionList"
          options={{
            headerTransparent: true,
            headerLargeTitle: true,
            title: "List",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
