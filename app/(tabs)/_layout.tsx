import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import AppHeader from '../../src/components/AppHeader';
import { colors } from '../../src/theme/colors';

function TabIcon({ symbol, focused }: { symbol: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 18, color: focused ? colors.primary : colors.muted }}>
      {symbol}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <AppHeader />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 5,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon symbol="⌂" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ focused }) => <TabIcon symbol="☰" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="fees"
        options={{
          title: 'Calculate Fees',
          tabBarIcon: ({ focused }) => <TabIcon symbol="R" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact Us',
          tabBarIcon: ({ focused }) => <TabIcon symbol="✉" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
