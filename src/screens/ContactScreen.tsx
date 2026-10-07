import { useState } from 'react';
import { Platform, Share, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Linking from 'expo-linking';
import AppButton from '../components/AppButton';
import { colors, spacing, typography } from '../theme/colors';

const ACADEMY_EMAIL = 'donald.mudzani@gmail.com';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSharing, setIsSharing] = useState(false);

  async function shareEnquiry() {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setFeedback('Please enter your name, email address, and message before continuing.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFeedback('Enter a valid email address so the academy can reply.');
      return;
    }

    setIsSharing(true);
    setFeedback('');
    const subject = 'Pawsitive Pet Academy enquiry';
    const enquiry = `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`;
    const mailtoUrl = `mailto:${ACADEMY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiry)}`;

    try {
      await Linking.openURL(mailtoUrl);
      setFeedback(
        `Your email app should open a draft addressed to ${ACADEMY_EMAIL}. Review it and press Send; this app does not send it automatically.`,
      );
    } catch {
      try {
        if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
          if (navigator.share) {
            await navigator.share({
              title: subject,
              text: `To: ${ACADEMY_EMAIL}\n\n${enquiry}`,
            });
            setFeedback(
              `The enquiry was shared. Send it to ${ACADEMY_EMAIL}; it has not been emailed automatically.`,
            );
          } else if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(
              `To: ${ACADEMY_EMAIL}\nSubject: ${subject}\n\n${enquiry}`,
            );
            setFeedback(
              `Your enquiry was copied with the academy email address. Paste it into your email app and send it to ${ACADEMY_EMAIL}.`,
            );
          } else {
            setFeedback(
              `Could not open an email app or copy the enquiry. Please email ${ACADEMY_EMAIL} manually; nothing was sent.`,
            );
          }
        } else {
          const result = await Share.share({
            title: subject,
            message: `To: ${ACADEMY_EMAIL}\n\n${enquiry}`,
          });
          if (result.action === Share.dismissedAction) {
            setFeedback(`Sharing was cancelled. Email ${ACADEMY_EMAIL} manually; nothing was sent.`);
          } else {
            setFeedback(
              `The enquiry was shared. Send it to ${ACADEMY_EMAIL}; it has not been emailed automatically.`,
            );
          }
        }
      } catch (error) {
        setFeedback(
          error instanceof Error
            ? `Could not open email or sharing: ${error.message}. Email ${ACADEMY_EMAIL} manually.`
            : `Could not open email or sharing. Please email ${ACADEMY_EMAIL} manually.`,
        );
      }
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>GET IN TOUCH</Text>
      <Text style={styles.heading}>Let&apos;s talk about your next step</Text>
      <Text style={styles.intro}>
        Have a question about a course? Send an enquiry and your email app will open a draft for you
        to review.
      </Text>

      <View style={styles.emailCard}>
        <View style={styles.emailIcon}>
          <Text style={styles.emailIconText}>@</Text>
        </View>
        <View style={styles.emailCopy}>
          <Text style={styles.emailLabel}>EMAIL THE ACADEMY</Text>
          <Text selectable style={styles.emailAddress}>
            {ACADEMY_EMAIL}
          </Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formHeading}>Send us a message</Text>
        <Text style={styles.formIntro}>Complete the fields below to prepare your enquiry.</Text>

        <Text style={styles.label}>Your name</Text>
        <TextInput
          accessibilityLabel="Your name"
          autoCapitalize="words"
          autoComplete="name"
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor={colors.muted}
          returnKeyType="next"
          style={styles.input}
          value={name}
        />

        <Text style={styles.label}>Email address</Text>
        <TextInput
          accessibilityLabel="Email address"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor={colors.muted}
          returnKeyType="next"
          style={styles.input}
          textContentType="emailAddress"
          value={email}
        />

        <Text style={styles.label}>How can we help?</Text>
        <TextInput
          accessibilityLabel="Enquiry message"
          multiline
          onChangeText={setMessage}
          placeholder="Write your course question here"
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.messageInput]}
          textAlignVertical="top"
          value={message}
        />

        {feedback ? (
          <Text accessibilityLiveRegion="polite" style={styles.feedback}>
            {feedback}
          </Text>
        ) : null}
        <AppButton
          label={isSharing ? 'Opening email...' : 'Prepare email enquiry'}
          onPress={shareEnquiry}
          style={styles.submitButton}
        />
        <Text style={styles.disclaimer}>
          This app prepares a draft; it does not send your message automatically.
        </Text>
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
    marginBottom: spacing.xs,
  },
  heading: {
    ...typography.heading,
    fontSize: 27,
    lineHeight: 34,
  },
  intro: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 22,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  emailCard: {
    alignItems: 'center',
    backgroundColor: '#E8F1ED',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  emailIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    marginRight: spacing.md,
    width: 44,
  },
  emailIconText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  emailCopy: {
    flex: 1,
  },
  emailLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: spacing.xs,
  },
  emailAddress: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: spacing.md,
  },
  formHeading: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  formIntro: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 20,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  label: {
    ...typography.subheading,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 9,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    marginBottom: spacing.md,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  messageInput: {
    minHeight: 120,
    paddingTop: spacing.md,
  },
  feedback: {
    color: colors.primary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  submitButton: {
    backgroundColor: colors.accent,
    marginTop: spacing.xs,
  },
  disclaimer: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
