import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackBar from '../components/BackBar';
import { courses, formatRand } from '../data/courses';
import { colors, spacing } from '../theme/colors';

const storyImage = require('../../assets/images/about-story.jpg');

const values = [
  {
    icon: '♡',
    title: 'Care',
    description: 'Patient, kind methods that put each animal’s welfare and comfort first.',
  },
  {
    icon: '◇',
    title: 'Trust',
    description: 'Clear information and honest expectations, so you can choose with confidence.',
  },
  {
    icon: '▣',
    title: 'Professionalism',
    description: 'Responsible practice, thoughtful preparation and respectful communication.',
  },
];

export default function AboutScreen() {
  const router = useRouter();
  const professionalCourses = courses.filter(
    (course) => course.type === 'Professional Development Programme',
  );
  const shortCourses = courses.filter((course) => course.type === 'Short Course');
  const professionalDuration = professionalCourses[0]?.durationWeeks ?? 0;
  const shortDuration = shortCourses[0]?.durationWeeks ?? 0;
  const professionalFee = professionalCourses[0]?.fee ?? 0;
  const shortFee = shortCourses[0]?.fee ?? 0;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <BackBar title="About Us" />

      <Text style={styles.eyebrow}>ABOUT PAWSITIVE PET ACADEMY</Text>
      <Text style={styles.heading}>A more positive future for pets</Text>
      <Text style={styles.intro}>Better care begins with understanding.</Text>

      <Image
        source={storyImage}
        contentFit="cover"
        style={styles.storyImage}
        accessibilityLabel="Pet owners learning how to care for a dog"
      />

      <View style={styles.storySection}>
        <Text style={styles.sectionHeading}>Our story</Text>
        <Text style={styles.body}>
          Pawsitive Pet Academy brings pet care and learning together. We make thoughtful,
          practical education accessible to people who want to do more for the animals in their
          lives.
        </Text>
        <Text style={[styles.body, styles.storyParagraph]}>
          From your first puppy to a future in pet services, connect knowledge with everyday action
          — always with care at the centre.
        </Text>
      </View>

      <View style={styles.valuesSection}>
        <Text style={styles.sectionHeading}>Our mission.{'\n'}Our values.</Text>
        <Text style={styles.sectionIntro}>
          Help people build the knowledge and confidence to care for pets thoughtfully.
        </Text>

        <View style={styles.valueList}>
          {values.map((value) => (
            <View key={value.title} style={styles.valueCard}>
              <View style={styles.valueIcon}>
                <Text style={styles.valueIconText}>{value.icon}</Text>
              </View>
              <Text style={styles.valueTitle}>{value.title}</Text>
              <Text style={styles.valueDescription}>{value.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.offerSection}>
        <Text style={styles.sectionHeading}>What we offer</Text>

        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Professional courses</Text>
          <Text style={styles.offerMeta}>
            {professionalCourses.length} courses · {professionalDuration} weeks each ·{' '}
            {formatRand(professionalFee)} each
          </Text>
          <Text style={styles.offerDescription}>
            Go deeper into training, grooming, behaviour or the business of pet care.
          </Text>
        </View>

        <View style={styles.offerCard}>
          <Text style={styles.offerTitle}>Short courses</Text>
          <Text style={styles.offerMeta}>
            {shortCourses.length} courses · {shortDuration} weeks each · {formatRand(shortFee)} each
          </Text>
          <Text style={styles.offerDescription}>
            Focus on puppy care, first aid and everyday dog-walking skills.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate('/courses')}
          style={({ pressed }) => [styles.exploreButton, pressed && styles.pressed]}
        >
          <Text style={styles.exploreButtonText}>Explore courses</Text>
          <Text style={styles.exploreButtonArrow}>→</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate('/contact')}
          style={({ pressed }) => [styles.contactLink, pressed && styles.pressed]}
        >
          <Text style={styles.contactLinkText}>Have a question? Contact us</Text>
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
    marginBottom: spacing.sm,
  },
  intro: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  storyImage: {
    aspectRatio: 1.3,
    backgroundColor: colors.border,
    borderRadius: 18,
    marginBottom: spacing.md,
    width: '100%',
  },
  storySection: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 30,
    marginBottom: spacing.md,
  },
  body: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
  },
  storyParagraph: {
    marginTop: spacing.md,
  },
  valuesSection: {
    backgroundColor: '#E6F1EB',
    marginHorizontal: -spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
    paddingBottom: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionIntro: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  valueList: {
    gap: spacing.md,
  },
  valueCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 17,
    borderWidth: 1,
    padding: spacing.md,
  },
  valueIcon: {
    alignItems: 'center',
    backgroundColor: '#E6F1EB',
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    marginBottom: spacing.sm,
    width: 40,
  },
  valueIconText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  valueTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  valueDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
  },
  offerSection: {
    marginBottom: spacing.md,
  },
  offerCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 17,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  offerTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  offerMeta: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  offerDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
  },
  exploreButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 48,
  },
  exploreButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  exploreButtonArrow: {
    color: colors.white,
    fontSize: 17,
    marginLeft: spacing.sm,
  },
  contactLink: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
    minHeight: 44,
  },
  contactLinkText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
