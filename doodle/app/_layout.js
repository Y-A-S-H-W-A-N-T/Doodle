import { Stack } from 'expo-router/stack';
import MyContext from '../components/MyContext';

export default function Layout() {
  return (
    // change initial route according to login status
    <MyContext>
      <Stack initialRouteName='(tabs)/profile'>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="teacher/classes" options={{ headerShown: true }} />
        <Stack.Screen name="teacher/addTest" options={{ headerShown: true }} />
      </Stack>
    </MyContext>
  );
}
