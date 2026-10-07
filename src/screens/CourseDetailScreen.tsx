import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import BackBar from '../components/BackBar';
import { courses, formatRand } from '../data/courses';
import { colors, spacing, typography } from '../theme/colors';

export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const router = useRouter();
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <View style={styles.notFound}>
        <Text style={typography.heading}>Course not found</Text>
        <Text style={styles.body}>This course may have been removed or the link may be incorrect.</Text>
        <AppButton label="Browse courses" onPress={() => router.navigate('/courses')} />
      </View>
    );
  }

  const courseType = course.type === 'Short Course' ? 'Short course' : 'Professional';

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <BackBar title="Course details" />

      <Image
        source={course.image}
        contentFit="cover"
        style={styles.heroImage}
        accessibilityLabel={`${course.name} course`}
      />

      <View style={styles.courseIntro}>
        <Text style={styles.courseBadge}>
          {courseType} · {course.durationWeeks} weeks
        </Text>
        <Text style={styles.courseTitle}>{course.name}</Text>
        <Text style={styles.summary}>{course.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Course overview</Text>
        <Text style={styles.body}>{course.overview}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>What you’ll learn</Text>
        <View style={styles.learningList}>
          {course.whatYouWillLearn.map((item) => (
            <View key={item} style={styles.learningItem}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={styles.learningText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.requirementNote}>
        <Text style={styles.requirementLabel}>ENTRY REQUIREMENTS</Text>
        <Text style={styles.requirementText}>{course.requirements}</Text>
      </View>

      <View style={styles.nextStep}>
        <Text style={styles.eyebrow}>YOUR NEXT STEP</Text>
        <Text style={styles.price}>{formatRand(course.fee)}</Text>
        <Text style={styles.feeNote}>Course fee before discounts and 15% VAT</Text>

        <View style={styles.facts}>
          <CourseFact label="DURATION" value={`${course.durationWeeks} weeks`} />
          <CourseFact label="COURSE TYPE" value={courseType} />
          <CourseFact label="LEARNING" value="Online, with practical activities" />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Enrol in ${course.name}`}
          onPress={() => router.navigate('/contact')}
          style={({ pressed }) => [styles.enrolButton, pressed && styles.pressed]}
        >
          <Text style={styles.enrolButtonText}>Enrol now</Text>
          <Text style={styles.enrolArrow}>→</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Taking more courses? Calculate fees"
          onPress={() =>
            router.push({
              pathname: '/fees',
              params: { courseId: course.id },
            })
          }
          style={styles.feeLink}
        >
          <Text style={styles.feeLinkIcon}>⊕</Text>
          <Text style={styles.feeLinkText}>Taking more courses? Calculate Fees</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function CourseFact({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fact}>
      <Text style={styles.factLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
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
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    width: '100%',
  },
  heroImage: {
    aspectRatio: 1.57,
    backgroundColor: colors.border,
    borderRadius: 18,
    marginBottom: spacing.lg,
    width: '100%',
  },
  courseIntro: {
    marginBottom: spacing.lg,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F1EB',
    borderRadius: 18,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: spacing.sm,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  courseTitle: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 41,
    marginBottom: spacing.sm,
  },
  summary: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 32,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  learningList: {
    gap: spacing.md,
    paddingTop: spacing.xs,
  },
  learningItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: '#E6F1EB',
    borderRadius: 11,
    height: 22,
    justifyContent: 'center',
    marginTop: 1,
    width: 22,
  },
  checkMark: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  learningText: {
    ...typography.body,
    flex: 1,
    lineHeight: 21,
  },
  requirementNote: {
    marginBottom: spacing.lg,
  },
  requirementLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  requirementText: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 21,
  },
  nextStep: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: spacing.xs,
    padding: spacing.md,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  price: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1.2,
    lineHeight: 46,
  },
  feeNote: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  facts: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  fact: {
    gap: 3,
  },
  factLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '500',
  },
  factValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  enrolButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    marginTop: spacing.lg,
    minHeight: 50,
  },
  enrolButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  enrolArrow: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.8,
  },
  feeLink: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    minHeight: 40,
  },
  feeLinkIcon: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '700',
  },
  feeLinkText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  notFound: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
