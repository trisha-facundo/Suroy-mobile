import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';


import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/MontserratAlternates-Regular.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/MontserratAlternates-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/MontserratAlternates-Bold.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/MontserratAlternates-Medium.ttf'),
    'Monomakh' : require('../../assets/fonts/Monomakh-Regular.ttf'),
  })

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
