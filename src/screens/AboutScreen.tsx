import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import BackBar from '../components/BackBar';
import { colors, spacing, typography } from '../theme/colors';

const storyImage = require('../../assets/images/about-story.jpg');

const values = [
  {
    number: '01',
    title: 'Animal wellbeing',
    description: 'Put thoughtful, safe and compassionate care at the centre of learning.',
  },
  {
    number: '02',
    title: 'Practical knowledge',
    description: 'Explore skills that can be applied to everyday pet care.',
  },
  {
    number: '03',
    title: 'Flexible study',
    description: 'Choose from online programmes and focused short courses.',
  },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <BackBar title="About Pawsitive" />

      <Text style={styles.eyebrow}>OUR STORY</Text>
      <Text style={styles.heading}>A more positive future for pets</Text>
      <Text style={styles.intro}>
        Learning built around a stronger understanding of the animals in our lives.
      </Text>

      <View style={styles.imageFrame}>
        <Image
          source={storyImage}
          contentFit="cover"
          style={styles.storyImage}
          accessibilityLabel="A close-up of a dog"
        />
        <View style={styles.imageCaption}>
          <Text style={styles.captionText}>Care starts with understanding.</Text>
        </View>
      </View>

      <View style={styles.storyCard}>
        <Text style={styles.cardEyebrow}>PAWSITIVE PET ACADEMY</Text>
        <Text style={styles.cardHeading}>Learn with purpose</Text>
        <Text style={styles.body}>
          Pawsitive Pet Academy offers online training for pet lovers, pet owners and people
          interested in pet-care work. Our courses bring together useful knowledge and everyday
          skills to help learners approach animal care with confidence and compassion.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>What guides us</Text>
      <View style={styles.valueList}>
        {values.map((value, index) => (
          <View
            key={value.number}
            style={[styles.valueItem, index === values.length - 1 && styles.lastValueItem]}
          >
            <View style={styles.valueNumber}>
              <Text style={styles.valueNumberText}>{value.number}</Text>
            </View>
            <View style={styles.valueCopy}>
              <Text style={styles.valueTitle}>{value.title}</Text>
              <Text style={styles.body}>{value.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Find the right course for you</Text>
        <Text style={styles.ctaText}>
          Browse professional development programmes and short courses.
        </Text>
        <AppButton
          label="Explore courses"
          onPress={() => router.navigate('/courses')}
          style={styles.ctaButton}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate('/contact')}
          style={styles.contactLink}
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
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginBottom: spacing.sm,
  },
  heading: {
    ...typography.heading,
    fontSize: 28,
    lineHeight: 35,
    marginBottom: spacing.sm,
  },
  intro: {
    ...typography.body,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: spacing.md,
  },
  imageFrame: {
    borderRadius: 16,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  storyImage: {
    backgroundColor: colors.border,
    height: 220,
    width: '100%',
  },
  imageCaption: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  captionText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  storyCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  cardEyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: spacing.xs,
  },
  cardHeading: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 22,
  },
  sectionTitle: {
    ...typography.heading,
    marginBottom: spacing.md,
  },
  valueList: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  valueItem: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
  },
  lastValueItem: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  valueNumber: {
    alignItems: 'center',
    backgroundColor: '#F2E1C7',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 36,
  },
  valueNumberText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  valueCopy: {
    flex: 1,
  },
  valueTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  ctaCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.md,
  },
  ctaTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  ctaText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: spacing.md,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: colors.accent,
  },
  contactLink: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    minHeight: 44,
  },
  contactLinkText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
