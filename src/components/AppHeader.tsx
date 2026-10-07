import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/colors';

export default function AppHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.brandMark}>
          <Text style={styles.brandMarkText}>P</Text>
        </View>
        <View style={styles.brandCopy}>
          <Text style={styles.brandName}>Pawsitive</Text>
          <Text style={styles.brandTagline}>PET ACADEMY</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="About Pawsitive Pet Academy"
          onPress={() => router.push('/home/about')}
          style={styles.aboutButton}
        >
          <Text style={styles.aboutText}>About us</Text>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 68,
    paddingHorizontal: spacing.md,
  },
  brandMark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 36,
  },
  brandMarkText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  brandCopy: {
    flex: 1,
  },
  brandName: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  brandTagline: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 1,
  },
  aboutButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 44,
    paddingLeft: spacing.sm,
  },
  aboutText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  menuIcon: {
    color: colors.primary,
    fontSize: 20,
  },
});
