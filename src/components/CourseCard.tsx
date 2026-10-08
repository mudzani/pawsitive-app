import { Image } from 'expo-image';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme/colors';
import { Course, formatRand } from '../data/courses';

type Props = {
  course: Course;
  onPress: () => void;
};

// This card is used on more than one screen.
// It keeps the course look the same on the home page and the full course list.
export default function CourseCard({ course, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`View ${course.name} course details`}
    >
      <Image
        source={course.image}
        style={styles.image}
        contentFit="cover"
        accessibilityLabel={`${course.name} course`}
      />
      <View style={styles.cardBody}>
        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.meta}>{course.durationWeeks} weeks</Text>
        <View style={styles.footerRow}>
          <Text style={typography.price}>{formatRand(course.fee)}</Text>
          <Text style={styles.viewDetails}>Details ›</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    flexBasis: '48%',
    flexGrow: 0,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    backgroundColor: colors.border,
    height: 116,
    width: '100%',
  },
  cardBody: {
    minHeight: 112,
    padding: spacing.sm,
  },
  title: {
    ...typography.subheading,
    fontSize: 14,
    lineHeight: 19,
    minHeight: 38,
  },
  meta: {
    ...typography.body,
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  viewDetails: {
    color: colors.accent,
    fontWeight: '600',
    fontSize: 13,
  },
  pressed: {
    opacity: 0.88,
  },
});
