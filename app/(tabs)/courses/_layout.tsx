import { Stack } from 'expo-router';

export default function CoursesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="course/[courseId]" options={{ headerShown: false }} />
    </Stack>
  );
}
