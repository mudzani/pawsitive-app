import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/courses';
import { colors, spacing, typography } from '../theme/colors';

const heroImage = require('../../assets/images/home-hero.jpg');

export default function HomeScreen() {
  const router = useRouter();
  const startingCourses = courses.slice(0, 4);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.welcome}>
        <Text style={styles.eyebrow}>For the people who love pets</Text>
        <Text style={styles.heading}>Learn. Grow.
Care.</Text>
        <Text style={styles.intro}>
      Turn your love for animals into everyday confidence. Practical learning for pet owners and aspiring professionals..
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Image
          source={heroImage}
          style={styles.heroImage}
          contentFit="cover"
          accessibilityLabel="A puppy resting comfortably at home"
        />
        <View style={styles.heroCaption}>
          <Text style={styles.heroCaptionTitle}>Learn with care</Text>
          <Text style={styles.heroCaptionText}>
            Flexible online courses for pet lovers and future pet-care professionals.
          </Text>
        </View>
      </View>

      <AppButton
        label="Explore our courses"
        onPress={() => router.navigate('/courses')}
        style={styles.primaryAction}
      />

      <View style={styles.sectionHeader}>
        <View style={styles.sectionCopy}>
          <Text style={typography.heading}>Choose your starting point</Text>
          <Text style={styles.sectionDescription}>Explore a few of our learning pathways.</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate('/courses')}
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllText}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.courseGrid}>
        {startingCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() =>
              router.push({
                pathname: '/home/course/[courseId]',
                params: { courseId: course.id },
              })
            }
          />
        ))}
      </View>

      <View style={styles.bottomCard}>
        <View style={styles.bottomCopy}>
          <Text style={styles.bottomTitle}>Ready to take the next step?</Text>
          <Text style={styles.bottomText}>
            Compare course fees or get in touch with a question about your learning options.
          </Text>
        </View>
        <View style={styles.bottomActions}>
          <AppButton label="Calculate fees" onPress={() => router.navigate('/fees')} />
          <AppButton
            label="Contact us"
            onPress={() => router.navigate('/contact')}
            variant="secondary"
          />
        </View>
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
  welcome: {
    marginBottom: spacing.md,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginBottom: spacing.sm,
  },
  heading: {
    color: colors.primary,
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: -0.7,
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  intro: {
    ...typography.body,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  heroCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  heroImage: {
    backgroundColor: colors.border,
    height: 208,
    width: '100%',
  },
  heroCaption: {
    padding: spacing.md,
  },
  heroCaptionTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  heroCaptionText: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 21,
  },
  primaryAction: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  sectionCopy: {
    flex: 1,
  },
  sectionDescription: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  seeAllButton: {
    justifyContent: 'center',
    minHeight: 44,
    paddingLeft: spacing.sm,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  bottomCard: {
    backgroundColor: '#F2E1C7',
    borderRadius: 16,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  bottomCopy: {
    marginBottom: spacing.md,
  },
  bottomTitle: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  bottomText: {
    ...typography.body,
    lineHeight: 21,
  },
  bottomActions: {
    gap: spacing.sm,
  },
});
