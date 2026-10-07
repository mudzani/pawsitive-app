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
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.md,
    minHeight: 44,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 40,
  },
  backIcon: {
    color: colors.primary,
    fontSize: 30,
    lineHeight: 32,
    marginTop: -4,
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
});
