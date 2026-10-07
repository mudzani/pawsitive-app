import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/colors';

const logo = require('../../assets/images/pawsitive-logo.png');

export default function AppHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View accessible accessibilityLabel="Pawsitive Pet Academy logo" style={styles.brandMark}>
          <Image source={logo} contentFit="fill" style={styles.brandMarkImage} />
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
    backgroundColor: colors.surface,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 84,
    paddingHorizontal: spacing.md,
  },
  brandMark: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    height: 56,
    marginRight: spacing.md,
    overflow: 'hidden',
    width: 56,
  },
  brandMarkImage: {
    height: 78,
    left: -13,
    position: 'absolute',
    top: -7,
    width: 78,
  },
  brandCopy: {
    flex: 1,
  },
  brandName: {
    color: colors.primary,
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandTagline: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginTop: 2,
  },
  aboutButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 44,
    paddingLeft: spacing.sm,
  },
  aboutText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  menuIcon: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '600',
  },
});
