import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme/colors';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

// variant="primary" = solid teal button (main action on a screen)
// variant="secondary" = outlined button (secondary action, e.g. "Back to Courses")
export default function AppButton({ label, onPress, variant = 'primary', style }: Props) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={isPrimary ? styles.primaryText : styles.secondaryText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48, // meets the 48dp touch-target guidance from our Phase 3 research
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  primaryText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
});
