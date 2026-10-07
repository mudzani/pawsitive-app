import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/courses';
import { colors, spacing, typography } from '../theme/colors';

type CourseFilter = 'All courses' | 'Programmes' | 'Short courses';

const filters: CourseFilter[] = ['All courses', 'Programmes', 'Short courses'];

export default function CoursesOverviewScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<CourseFilter>('All courses');
  const [searchText, setSearchText] = useState('');

  const visibleCourses = useMemo(() => {
    const query = searchText.trim().toLocaleLowerCase();
    return courses.filter((course) => {
      const matchesFilter =
        selectedFilter === 'All courses' ||
        (selectedFilter === 'Programmes' && course.type === 'Professional Development Programme') ||
        (selectedFilter === 'Short courses' && course.type === 'Short Course');
      return matchesFilter && (!query || course.name.toLocaleLowerCase().includes(query));
    });
  }, [searchText, selectedFilter]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>LEARN YOUR WAY</Text>
      <Text style={styles.heading}>Explore our courses</Text>
      <Text style={styles.intro}>
        Find a course to match your interests, from professional development programmes to focused
        short courses.
      </Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          accessibilityLabel="Search courses"
          onChangeText={setSearchText}
          placeholder="Search courses"
          placeholderTextColor={colors.muted}
          returnKeyType="search"
          style={styles.searchInput}
          value={searchText}
        />
        {searchText.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => setSearchText('')}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.filterLabel}>Browse by course type</Text>
      <View style={styles.filters}>
        {filters.map((filter) => {
          const selected = filter === selectedFilter;
          return (
            <Pressable
              key={filter}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setSelectedFilter(filter)}
              style={[styles.filter, selected && styles.selectedFilter]}
            >
              <Text style={[styles.filterText, selected && styles.selectedFilterText]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.resultHeader}>
        <Text style={styles.sectionHeading}>All courses</Text>
        <Text style={styles.resultCount}>
          {visibleCourses.length} {visibleCourses.length === 1 ? 'course' : 'courses'}
        </Text>
      </View>

      {visibleCourses.length > 0 ? (
        <View style={styles.courseGrid}>
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() =>
                router.push({
                  pathname: '/courses/course/[courseId]',
                  params: { courseId: course.id },
                })
              }
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No courses found</Text>
          <Text style={styles.emptyText}>Try another search or choose a different course type.</Text>
          <Pressable onPress={() => { setSearchText(''); setSelectedFilter('All courses'); }}>
            <Text style={styles.resetText}>Show all courses</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.bundleCard}>
        <Text style={styles.bundleTitle}>Planning more than one course?</Text>
        <Text style={styles.bundleText}>
          Select courses together and view an estimate with any applicable course discount.
        </Text>
        <AppButton
          label="Build a course bundle"
          onPress={() => router.navigate('/fees')}
          style={styles.bundleButton}
        />
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
  searchBox: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.md,
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    color: colors.muted,
    fontSize: 24,
    marginRight: spacing.sm,
  },
  searchInput: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    minHeight: 48,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    alignItems: 'center',
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  clearText: {
    color: colors.muted,
    fontSize: 25,
  },
  filterLabel: {
    ...typography.subheading,
    marginBottom: spacing.sm,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filter: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: spacing.md,
  },
  selectedFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  selectedFilterText: {
    color: colors.white,
  },
  resultHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionHeading: {
    ...typography.heading,
    fontSize: 20,
  },
  resultCount: {
    color: colors.muted,
    fontSize: 13,
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    padding: spacing.lg,
  },
  emptyTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    ...typography.body,
    color: colors.muted,
    lineHeight: 21,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  resetText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  bundleCard: {
    backgroundColor: '#F2E1C7',
    borderRadius: 16,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  bundleTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  bundleText: {
    ...typography.body,
    lineHeight: 21,
    marginBottom: spacing.md,
  },
  bundleButton: {
    backgroundColor: colors.primary,
  },
});
