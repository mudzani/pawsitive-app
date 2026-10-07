import { useState } from 'react';
import { Platform, Pressable, Share, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import BackBar from '../components/BackBar';
import { colors, spacing, typography } from '../theme/colors';

const ACADEMY_EMAIL = 'donald.mudzani@gmail.com';
const ACADEMY_PHONE = '0836221304';

export default function ContactScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSharing, setIsSharing] = useState(false);

  async function openAcademyEmail() {
    try {
      await Linking.openURL(`mailto:${ACADEMY_EMAIL}`);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? `Could not open your email app: ${error.message}. Please email ${ACADEMY_EMAIL} manually.`
          : `Could not open your email app. Please email ${ACADEMY_EMAIL} manually.`,
      );
    }
  }

  async function callAcademy() {
    try {
      await Linking.openURL(`tel:${ACADEMY_PHONE}`);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? `Could not open your phone app: ${error.message}. Call ${ACADEMY_PHONE} manually.`
          : `Could not open your phone app. Call ${ACADEMY_PHONE} manually.`,
      );
    }
  }

  async function shareEnquiry() {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      setFeedback('Please complete your name, email address, subject, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFeedback('Enter a valid email address so the academy can reply.');
      return;
    }

    if (!consent) {
      setFeedback('Please agree to be contacted about your enquiry before continuing.');
      return;
    }

    setIsSharing(true);
    setFeedback('');
    const emailSubject = `Pawsitive Pet Academy: ${cleanSubject}`;
    const enquiry = [
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      cleanPhone ? `Phone: ${cleanPhone}` : '',
      '',
      cleanMessage,
    ]
      .filter((line) => line !== '')
      .join('\n');
    const mailtoUrl = `mailto:${ACADEMY_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(enquiry)}`;

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
              title: emailSubject,
              text: `To: ${ACADEMY_EMAIL}\n\n${enquiry}`,
            });
            setFeedback(
              `The enquiry was shared. Send it to ${ACADEMY_EMAIL}; it has not been emailed automatically.`,
            );
          } else if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(
              `To: ${ACADEMY_EMAIL}\nSubject: ${emailSubject}\n\n${enquiry}`,
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
            title: emailSubject,
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
      <BackBar title="Contact Us" />

      <Text style={styles.eyebrow}>WE’RE HERE TO HELP</Text>
      <Text style={styles.heading}>Let’s talk pets.</Text>
      <Text style={styles.intro}>
        A course question or a new beginning? Tell us how we can help.
      </Text>

      <View style={styles.notice}>
        <Text style={styles.noticeIcon}>ⓘ</Text>
        <Text style={styles.noticeText}>
          Have a question about a course or enrolment? We’re here to help.
        </Text>
      </View>

      <View style={styles.contactCards}>
        <ContactCard
          icon="⌕"
          label="Call us"
          value={ACADEMY_PHONE}
          onPress={callAcademy}
        />
        <ContactCard
          icon="✉"
          label="Email us"
          value={ACADEMY_EMAIL}
          onPress={openAcademyEmail}
        />
        <ContactCard icon="◷" label="Office hours" value="Mon–Fri · 09:00–17:00" />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={openAcademyEmail}
        style={({ pressed }) => [styles.emailButton, pressed && styles.pressed]}
      >
        <Text style={styles.emailButtonText}>Email the academy</Text>
        <Text style={styles.emailButtonArrow}>→</Text>
      </Pressable>

      <View style={styles.formCard}>
        <Text style={styles.formHeading}>Send us a message</Text>
        <Text style={styles.formIntro}>
          Tell us what you’d like to learn. We’re here to help you find your next step.
        </Text>

        <Text style={styles.label}>Full name</Text>
        <TextInput
          accessibilityLabel="Full name"
          autoCapitalize="words"
          autoComplete="name"
          onChangeText={setName}
          placeholder="Your name"
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

        <Text style={styles.label}>Phone (optional)</Text>
        <TextInput
          accessibilityLabel="Phone number (optional)"
          autoComplete="tel"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          placeholder="Your phone number"
          placeholderTextColor={colors.muted}
          returnKeyType="next"
          style={styles.input}
          value={phone}
        />

        <Text style={styles.label}>Subject</Text>
        <TextInput
          accessibilityLabel="Subject"
          onChangeText={setSubject}
          placeholder="What can we help with?"
          placeholderTextColor={colors.muted}
          returnKeyType="next"
          style={styles.input}
          value={subject}
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          accessibilityLabel="Enquiry message"
          multiline
          onChangeText={setMessage}
          placeholder="Tell us a little about your enquiry..."
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.messageInput]}
          textAlignVertical="top"
          value={message}
        />

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: consent }}
          onPress={() => setConsent((current) => !current)}
          style={styles.consentRow}
        >
          <View style={[styles.checkbox, consent && styles.checkedBox]}>
            {consent ? <Text style={styles.checkMark}>✓</Text> : null}
          </View>
          <Text style={styles.consentText}>I agree to be contacted about my enquiry.</Text>
        </Pressable>

        {feedback ? (
          <Text accessibilityLiveRegion="polite" style={styles.feedback}>
            {feedback}
          </Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={shareEnquiry}
          style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
        >
          <Text style={styles.submitButtonText}>{isSharing ? 'Preparing email...' : 'Send message'}</Text>
          <Text style={styles.submitButtonArrow}>→</Text>
        </Pressable>
        <Text style={styles.disclaimer}>
          This prepares an email draft for you to review and send; your message is not sent
          automatically.
        </Text>
      </View>

      <Text style={styles.bottomNote}>
        Not sure which course is right for you? Explore the collection or send us your question.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.navigate('/courses')}
        style={({ pressed }) => [styles.coursesButton, pressed && styles.pressed]}
      >
        <Text style={styles.coursesButtonText}>View courses</Text>
        <Text style={styles.coursesButtonArrow}>→</Text>
      </Pressable>
    </ScrollView>
  );
}

function ContactCard({
  icon,
  label,
  value,
  onPress,
}: {
  icon: string;
  label: string;
  value: string;
  onPress?: () => void;
}) {
  const content = (
    <>
      <Text style={styles.contactIcon}>{icon}</Text>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text selectable={label === 'Email us'} style={styles.contactValue}>
        {value}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
        onPress={onPress}
        style={({ pressed }) => [styles.contactCard, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.contactCard}>{content}</View>;
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
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  intro: {
    ...typography.body,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  notice: {
    alignItems: 'flex-start',
    backgroundColor: '#FCE9C7',
    borderRadius: 12,
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  noticeIcon: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  noticeText: {
    color: colors.text,
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },
  contactCards: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  contactCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 17,
    borderWidth: 1,
    minHeight: 100,
    padding: spacing.md,
  },
  contactIcon: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  contactLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  contactValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  emailButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    minHeight: 48,
  },
  emailButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  emailButtonArrow: {
    color: colors.primary,
    fontSize: 17,
    marginLeft: spacing.sm,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  formHeading: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  formIntro: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 18,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.text,
    fontSize: 13,
    marginBottom: spacing.md,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  messageInput: {
    minHeight: 104,
    paddingTop: spacing.md,
  },
  consentRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    minHeight: 32,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 5,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  checkedBox: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkMark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  consentText: {
    color: colors.muted,
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
  },
  feedback: {
    color: colors.primary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 48,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  submitButtonArrow: {
    color: colors.white,
    fontSize: 17,
    marginLeft: spacing.sm,
  },
  disclaimer: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 16,
    marginTop: spacing.sm,
  },
  bottomNote: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  coursesButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 48,
  },
  coursesButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  coursesButtonArrow: {
    color: colors.white,
    fontSize: 17,
    marginLeft: spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
});
