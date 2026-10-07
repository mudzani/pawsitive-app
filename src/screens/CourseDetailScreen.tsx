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

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <BackBar title="Course details" />

      <View style={styles.heroCard}>
        <Image
          source={course.image}
          contentFit="cover"
          style={styles.heroImage}
          accessibilityLabel={`${course.name} course`}
        />
        <View style={styles.heroCopy}>
          <Text style={styles.courseType}>
            {course.type === 'Short Course' ? 'SHORT COURSE' : 'PROFESSIONAL PROGRAMME'}
          </Text>
          <Text style={styles.courseTitle}>{course.name}</Text>
          <View style={styles.facts}>
            <View style={styles.fact}>
              <Text style={styles.factValue}>{course.durationWeeks}</Text>
              <Text style={styles.factLabel}>weeks</Text>
            </View>
            <View style={styles.factDivider} />
            <View style={styles.fact}>
              <Text style={styles.factValue}>{formatRand(course.fee)}</Text>
              <Text style={styles.factLabel}>course fee</Text>
            </View>
          </View>
          <Text style={styles.feeNote}>Per course, before VAT</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>About this course</Text>
        <Text style={styles.body}>{course.overview}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>What you will learn</Text>
        <View style={styles.learningCard}>
          {course.whatYouWillLearn.map((item, index) => (
            <View
              key={item}
              style={[
                styles.learningItem,
                index === course.whatYouWillLearn.length - 1 && styles.lastLearningItem,
              ]}
            >
              <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={styles.learningText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.requirementCard}>
        <Text style={styles.requirementLabel}>ENTRY REQUIREMENTS</Text>
        <Text style={styles.requirementText}>{course.requirements}</Text>
      </View>

      <View style={styles.enrolCard}>
        <Text style={styles.enrolTitle}>Your next step</Text>
        <Text style={styles.enrolText}>
          Add this course to a fee estimate or browse other learning options.
        </Text>
        <AppButton
          label="Calculate course fees"
          onPress={() =>
            router.push({
              pathname: '/fees',
              params: { courseId: course.id },
            })
          }
          style={styles.enrolButton}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate('/courses')}
          style={styles.browseButton}
        >
          <Text style={styles.browseText}>Browse all courses</Text>
        </Pressable>
      </View>
    </ScrollView>
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
  heroCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  heroImage: {
    backgroundColor: colors.border,
    height: 220,
    width: '100%',
  },
  heroCopy: {
    padding: spacing.md,
  },
  courseType: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  courseTitle: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 31,
    marginBottom: spacing.md,
  },
  facts: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fact: {
    alignItems: 'flex-start',
    minWidth: 92,
  },
  factValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  factLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  factDivider: {
    backgroundColor: colors.border,
    height: 36,
    marginHorizontal: spacing.md,
    width: 1,
  },
  feeNote: {
    color: colors.muted,
    fontSize: 11,
    marginTop: spacing.sm,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    ...typography.heading,
    fontSize: 20,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 22,
  },
  learningCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    padding: spacing.md,
  },
  learningItem: {
    alignItems: 'flex-start',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
  },
  lastLearningItem: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: '#E8F1ED',
    borderRadius: 11,
    height: 22,
    justifyContent: 'center',
    marginRight: spacing.sm,
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
  requirementCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  requirementLabel: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  requirementText: {
    ...typography.body,
    lineHeight: 21,
  },
  enrolCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.md,
  },
  enrolTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  enrolText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: spacing.md,
    opacity: 0.9,
  },
  enrolButton: {
    backgroundColor: colors.accent,
  },
  browseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
    minHeight: 44,
  },
  browseText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  notFound: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
