import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackBar from '../components/BackBar';
import { courses, getDiscountRate, VAT_RATE } from '../data/courses';
import { colors, spacing, typography } from '../theme/colors';

const discountTiers = [
  { label: '1 course', rate: 0 },
  { label: '2 courses', rate: 5 },
  { label: '3 courses', rate: 10 },
  { label: 'More than 3 courses', rate: 15 },
];

function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

function formatCourseFee(amount: number): string {
  return `R${amount}`;
}

function formatMoney(amount: number): string {
  return `R${amount.toFixed(2)}`;
}

export default function CalculateFeesScreen() {
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  return <FeeCalculator key={courseId ?? 'no-course'} initialCourseId={courseId} />;
}

function FeeCalculator({ initialCourseId }: { initialCourseId?: string }) {
  const router = useRouter();
  const initialSelection =
    initialCourseId && courses.some((course) => course.id === initialCourseId)
      ? [initialCourseId]
      : [];
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>(initialSelection);
  const [calculatedCourseIds, setCalculatedCourseIds] = useState<string[]>(initialSelection);

  const selectedCourses = useMemo(
    () => courses.filter((course) => selectedCourseIds.includes(course.id)),
    [selectedCourseIds],
  );
  const calculatedCourses = useMemo(
    () => courses.filter((course) => calculatedCourseIds.includes(course.id)),
    [calculatedCourseIds],
  );
  const subtotal = calculatedCourses.reduce((total, course) => total + course.fee, 0);
  const discountRate = getDiscountRate(calculatedCourses.length);
  const discount = roundMoney(subtotal * discountRate);
  const discountedSubtotal = roundMoney(subtotal - discount);
  const vat = roundMoney(discountedSubtotal * VAT_RATE);
  const total = roundMoney(discountedSubtotal + vat);
  const professionalCourses = calculatedCourses.filter(
    (course) => course.type === 'Professional Development Programme',
  );

  function toggleCourse(courseIdToToggle: string) {
    setSelectedCourseIds((current) =>
      current.includes(courseIdToToggle)
        ? current.filter((id) => id !== courseIdToToggle)
        : [...current, courseIdToToggle],
    );
  }

  function resetSelection() {
    setSelectedCourseIds([]);
    setCalculatedCourseIds([]);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <BackBar title="Calculate Fees" />

      <Text style={styles.eyebrow}>PLAN YOUR LEARNING</Text>
      <Text style={styles.heading}>Calculate Fees</Text>
      <Text style={styles.intro}>
        Choose your courses. See your savings and total, including VAT.
      </Text>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeading}>Select your courses</Text>
        <View style={styles.selectedPill}>
          <Text style={styles.selectedCount}>{selectedCourses.length} selected</Text>
        </View>
      </View>
      <Text style={styles.sectionIntro}>
        Choose any combination of professional and short courses.
      </Text>

      <View style={styles.courseList}>
        {courses.map((course) => {
          const selected = selectedCourseIds.includes(course.id);
          const courseType =
            course.type === 'Professional Development Programme' ? 'Professional' : 'Short course';

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
                <Text style={styles.courseMeta}>
                  {courseType} · {course.durationWeeks} weeks
                </Text>
              </View>
              <Text style={styles.courseFee}>{formatCourseFee(course.fee)}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.disclaimer}>
        Listed course fees exclude VAT. Discounts apply before VAT is added.
      </Text>

      <View style={styles.discountSection}>
        <Text style={styles.discountTitle}>A little more learning, a little more savings.</Text>
        <View style={styles.discountTable}>
          {discountTiers.map((tier) => {
            const isCurrentTier =
              selectedCourses.length > 0 &&
              Math.round(getDiscountRate(selectedCourses.length) * 100) === tier.rate;

            return (
              <View
                key={tier.label}
                style={[styles.discountRow, isCurrentTier && styles.currentDiscountRow]}
              >
                <Text style={styles.discountLabel}>{tier.label}</Text>
                <Text style={styles.discountRate}>{tier.rate}% discount</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryEyebrow}>YOUR LEARNING PLAN</Text>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryHeading}>Fee summary</Text>
          {calculatedCourses.length > 0 ? (
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

        {calculatedCourses.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Choose your courses above, then tap Calculate to see your fee summary.
          </Text>
        ) : (
          <>
            <Text style={styles.summaryCount}>
              {professionalCourses.length > 0
                ? `${professionalCourses.length} professional ${professionalCourses.length === 1 ? 'course' : 'courses'}`
                : `${calculatedCourses.length} short ${calculatedCourses.length === 1 ? 'course' : 'courses'}`}
            </Text>
            <View style={styles.selectedCourseList}>
              {calculatedCourses.map((course) => (
                <Text key={course.id} style={styles.selectedCourseName}>
                  {course.name}
                </Text>
              ))}
            </View>

            {discount > 0 ? (
              <View style={styles.savingsBanner}>
                <Text style={styles.savingsIcon}>✣</Text>
                <Text style={styles.savingsText}>
                  You save {formatMoney(discount)} with this bundle.
                </Text>
              </View>
            ) : null}

            <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
            <SummaryRow
              label={`Discount (${Math.round(discountRate * 100)}%)`}
              value={`−${formatMoney(discount)}`}
              highlight
            />
            <SummaryRow label="After discount" value={formatMoney(discountedSubtotal)} />
            <SummaryRow label={`${Math.round(VAT_RATE * 100)}% VAT`} value={formatMoney(vat)} />
            <View style={styles.totalDivider} />
            <Text style={styles.totalLabel}>Total including VAT</Text>
            <Text style={styles.totalAmount}>{formatMoney(total)}</Text>
            <Text style={styles.vatNote}>
              VAT is {Math.round(VAT_RATE * 100)}% of {formatMoney(discountedSubtotal)}, the amount
              after your course-count discount.
            </Text>
          </>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={() => setCalculatedCourseIds([...selectedCourseIds])}
          style={({ pressed }) => [styles.calculateButton, pressed && styles.pressed]}
        >
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: calculatedCourses.length === 0 }}
          disabled={calculatedCourses.length === 0}
          onPress={() => router.navigate('/contact')}
          style={({ pressed }) => [
            styles.enrolButton,
            calculatedCourses.length === 0 && styles.disabledButton,
            pressed && calculatedCourses.length > 0 && styles.pressed,
          ]}
        >
          <Text style={styles.enrolButtonText}>Continue to enrol</Text>
          <Text style={styles.enrolButtonArrow}>→</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, highlight && styles.highlightValue]}>{value}</Text>
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
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 35,
  },
  intro: {
    ...typography.body,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  sectionHeading: {
    color: colors.text,
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 27,
  },
  selectedPill: {
    backgroundColor: '#E6F1EB',
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  selectedCount: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  sectionIntro: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 18,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  courseList: {
    gap: spacing.sm,
  },
  courseOption: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 72,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  selectedCourseOption: {
    backgroundColor: '#E6F1EB',
    borderColor: colors.primary,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1.5,
    height: 22,
    justifyContent: 'center',
    marginRight: spacing.sm,
    width: 22,
  },
  checkedBox: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  courseCopy: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  courseName: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
  },
  courseMeta: {
    color: colors.muted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 2,
  },
  courseFee: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  disclaimer: {
    color: colors.muted,
    fontSize: 9,
    lineHeight: 15,
    marginTop: spacing.sm,
  },
  discountSection: {
    marginTop: spacing.lg,
  },
  discountTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  discountTable: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  discountRow: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 38,
    paddingHorizontal: spacing.sm,
  },
  currentDiscountRow: {
    backgroundColor: '#FCE9C7',
  },
  discountLabel: {
    color: colors.text,
    fontSize: 10,
  },
  discountRate: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  summary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  summaryEyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  summaryHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryHeading: {
    color: colors.text,
    flex: 1,
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 48,
  },
  resetText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  emptyMessage: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 21,
    marginBottom: spacing.md,
  },
  summaryCount: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  selectedCourseList: {
    marginBottom: spacing.md,
  },
  selectedCourseName: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 18,
  },
  savingsBanner: {
    alignItems: 'center',
    backgroundColor: '#FCE9C7',
    borderRadius: 10,
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  savingsIcon: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  savingsText: {
    color: colors.primary,
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 16,
  },
  summaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    color: colors.muted,
    flex: 1,
    fontSize: 10,
    paddingRight: spacing.sm,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  highlightValue: {
    color: colors.primary,
  },
  totalDivider: {
    backgroundColor: colors.border,
    height: 1,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  totalAmount: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 42,
    marginTop: spacing.xs,
  },
  vatNote: {
    color: colors.muted,
    fontSize: 9,
    lineHeight: 15,
    marginTop: spacing.md,
  },
  calculateButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderRadius: 11,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 46,
  },
  calculateButtonText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  enrolButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.sm,
    minHeight: 46,
  },
  enrolButtonText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  enrolButtonArrow: {
    color: colors.white,
    fontSize: 17,
    marginLeft: spacing.sm,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
