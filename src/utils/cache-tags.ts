/**
 * Centralized cache tags for Next.js revalidation
 * Use these tags with revalidateTag() to invalidate specific cached data
 */
export const cacheTags = {
  countries: 'countries',
  cities: 'cities',
  nationalities: 'nationalities',
  academicDegrees: 'academicDegrees',
  packageSessions: 'packageSessions',
  curriculums: 'curriculums',
  educationStages: 'educationStages',
  educationGrades: 'educationGrades',
  educationSubjects: 'educationSubjects',
  paymentMethod: 'paymentMethod',
  settings: 'settings',
  days: 'days',
  timeSlots: 'timeSlots',
} as const;
