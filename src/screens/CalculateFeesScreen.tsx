import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { courses, getDiscountRate, VAT_RATE, formatRand } from '../data/courses';
import { colors, spacing, typography } from '../theme/colors';

const discountTiers = [
  { count: '1 course', rate: 0 },
  { count: '2 courses', rate: 5 },
  { count: '3 courses', rate: 10 },
  { count: '4+ courses', rate: 15 },
];

function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export default function CalculateFeesScreen() {
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  return <FeeCalculator key={courseId ?? 'no-course'} initialCourseId={courseId} />;
}

function FeeCalculator({ initialCourseId }: { initialCourseId?: string }) {
  const router = useRouter();
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>(() =>
    initialCourseId && courses.some((course) => course.id === initialCourseId)
      ? [initialCourseId]
      : [],
  );

  const selectedCourses = useMemo(
    () => courses.filter((course) => selectedCourseIds.includes(course.id)),
    [selectedCourseIds],
  );
  const subtotal = selectedCourses.reduce((total, course) => total + course.fee, 0);
  const discountRate = getDiscountRate(selectedCourses.length);
  const discount = roundMoney(subtotal * discountRate);
  const discountedSubtotal = roundMoney(subtotal - discount);
  const vat = roundMoney(discountedSubtotal * VAT_RATE);
  const total = roundMoney(discountedSubtotal + vat);

  function toggleCourse(courseIdToToggle: string) {
    setSelectedCourseIds((current) =>
      current.includes(courseIdToToggle)
        ? current.filter((id) => id !== courseIdToToggle)
        : [...current, courseIdToToggle],
    );
  }

  function resetSelection() {
    setSelectedCourseIds([]);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>PLAN YOUR STUDY</Text>
      <Text style={styles.heading}>Calculate your fees</Text>
      <Text style={styles.intro}>
        Select one or more courses to see an estimate. Your selection is not submitted or saved.
      </Text>

      <View style={styles.infoBanner}>
        <View style={styles.infoIcon}>
          <Text style={styles.infoIconText}>R</Text>
        </View>
        <Text style={styles.infoText}>
          Course prices are shown before VAT. Any course discount is applied before 15% VAT.
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeading}>Choose your courses</Text>
        <Text style={styles.selectedCount}>
          {selectedCourses.length} selected
        </Text>
      </View>

      <View style={styles.courseList}>
        {courses.map((course) => {
          const selected = selectedCourseIds.includes(course.id);
          return (
            <Pressable
              key={course.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              onPress={() => toggleCourse(course.id)}
              style={[styles.courseOption, selected && styles.selectedCourseOption]}
            >
              <View style={[styles.checkbox, selected && styles.checkedBox]}>
                {selected ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <View style={styles.courseCopy}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseMeta}>{course.durationWeeks} weeks</Text>
              </View>
              <Text style={styles.courseFee}>{formatRand(course.fee)}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.discountGuide}>
        <Text style={styles.discountTitle}>Bundle savings</Text>
        <Text style={styles.discountIntro}>Your discount depends on the number of courses selected.</Text>
        <View style={styles.tierGrid}>
          {discountTiers.map((tier) => {
            const selectedTier = Math.round(discountRate * 100) === tier.rate && selectedCourses.length > 0;
            return (
              <View key={tier.count} style={[styles.tier, selectedTier && styles.selectedTier]}>
                <Text style={[styles.tierRate, selectedTier && styles.selectedTierText]}>
                  {tier.rate}%
                </Text>
                <Text style={[styles.tierCount, selectedTier && styles.selectedTierText]}>
                  {tier.count}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryHeader}>
          <View style={styles.summaryHeadingCopy}>
            <Text style={styles.summaryHeading}>Your estimate</Text>
            <Text style={styles.summaryCount}>
              {selectedCourses.length} {selectedCourses.length === 1 ? 'course' : 'courses'} selected
            </Text>
          </View>
          {selectedCourses.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear selected courses"
              onPress={resetSelection}
              style={styles.resetButton}
            >
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          ) : null}
        </View>

        {selectedCourses.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Choose courses above to see the subtotal, any discount and the VAT-inclusive estimate.
          </Text>
        ) : (
          <>
            <View style={styles.selectedCourseList}>
              {selectedCourses.map((course) => (
                <View key={course.id} style={styles.selectedCourseRow}>
                  <Text style={styles.selectedCourseName}>{course.name}</Text>
                  <Text style={styles.selectedCourseFee}>{formatRand(course.fee)}</Text>
                </View>
              ))}
            </View>
            {discount > 0 ? (
              <View style={styles.savingsBanner}>
                <Text style={styles.savingsText}>
                  You save {formatRand(discount)} with your {Math.round(discountRate * 100)}% bundle
                  discount.
                </Text>
              </View>
            ) : null}
            <SummaryRow label="Subtotal" value={formatRand(subtotal)} />
            <SummaryRow
              label={`Bundle discount (${Math.round(discountRate * 100)}%)`}
              value={`−${formatRand(discount)}`}
            />
            <SummaryRow label="After discount" value={formatRand(discountedSubtotal)} />
            <SummaryRow label={`VAT (${Math.round(VAT_RATE * 100)}%)`} value={formatRand(vat)} />
            <View style={styles.totalDivider} />
            <SummaryRow label="Estimated total" value={formatRand(total)} strong />
          </>
        )}
      </View>

      <Text style={styles.disclaimer}>
        This is an estimate only. Discounts are based on the number of selected courses; confirm
        final fees with the academy.
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: selectedCourses.length === 0 }}
        disabled={selectedCourses.length === 0}
        onPress={() => router.navigate('/contact')}
        style={({ pressed }) => [
          styles.continueButton,
          selectedCourses.length === 0 && styles.disabledButton,
          pressed && selectedCourses.length > 0 && styles.pressedButton,
        ]}
      >
        <Text style={styles.continueText}>Continue to contact the academy</Text>
      </Pressable>
    </ScrollView>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, strong && styles.strongText]}>{label}</Text>
      <Text style={[styles.summaryValue, strong && styles.strongText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    maxWidth: 720,
    padding: spacing.md,
    paddingBottom: spacing.xl,
    width: '100%',
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginBottom: spacing.xs,
  },
  heading: {
    ...typography.heading,
    fontSize: 28,
    lineHeight: 35,
  },
  intro: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 22,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  infoBanner: {
    alignItems: 'center',
    backgroundColor: '#E8F1ED',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  infoIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 32,
  },
  infoIconText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  infoText: {
    color: colors.primary,
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionHeading: {
    ...typography.heading,
    fontSize: 20,
  },
  selectedCount: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  courseList: {
    gap: spacing.sm,
  },
  courseOption: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 72,
    padding: spacing.sm,
  },
  selectedCourseOption: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: colors.muted,
    borderRadius: 6,
    borderWidth: 1.5,
    height: 24,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 24,
  },
  checkedBox: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  courseCopy: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  courseName: {
    ...typography.subheading,
    fontSize: 14,
    lineHeight: 19,
  },
  courseMeta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  courseFee: {
    ...typography.price,
    fontSize: 14,
  },
  discountGuide: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  discountTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '800',
  },
  discountIntro: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  tierGrid: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  tier: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 60,
    paddingHorizontal: 2,
    paddingVertical: spacing.xs,
  },
  selectedTier: {
    backgroundColor: colors.primary,
  },
  tierRate: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '800',
  },
  tierCount: {
    color: colors.muted,
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center',
  },
  selectedTierText: {
    color: colors.white,
  },
  summary: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  summaryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryHeadingCopy: {
    flex: 1,
  },
  summaryHeading: {
    ...typography.heading,
    fontSize: 20,
  },
  summaryCount: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 54,
  },
  resetText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyMessage: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 21,
  },
  selectedCourseList: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
  },
  selectedCourseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  selectedCourseName: {
    ...typography.body,
    flex: 1,
    paddingRight: spacing.sm,
  },
  selectedCourseFee: {
    ...typography.body,
    fontWeight: '600',
  },
  savingsBanner: {
    backgroundColor: '#E8F1ED',
    borderRadius: 8,
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  savingsText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  summaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.body,
    flex: 1,
    paddingRight: spacing.sm,
  },
  summaryValue: {
    ...typography.body,
    fontWeight: '600',
  },
  totalDivider: {
    backgroundColor: colors.border,
    height: 1,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  strongText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  disclaimer: {
    ...typography.body,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.md,
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  disabledButton: {
    backgroundColor: colors.muted,
    opacity: 0.55,
  },
  pressedButton: {
    opacity: 0.82,
  },
  continueText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
