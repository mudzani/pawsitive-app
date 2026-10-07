import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';

export default function BackBar({ title }: { title: string }) {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backIcon}>←</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.lg,
    minHeight: 44,
  },
  backButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: spacing.sm,
    minHeight: 44,
    width: 20,
  },
  backIcon: {
    color: colors.primary,
    fontSize: 21,
    lineHeight: 26,
  },
  title: {
    color: colors.primary,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
});
