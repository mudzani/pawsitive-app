import type { ImageSourcePropType } from 'react-native';

// Real Pawsitive Pet Academy course data, confirmed against the WIL POE.
// Both the Courses Overview screen and the Calculate Fees screen read
// from this same list, so the app never shows two different prices
// for the same course.

export type Course = {
  id: string;
  name: string;
  type: 'Professional Development Programme' | 'Short Course';
  durationWeeks: number;
  fee: number; // in Rand
  image: ImageSourcePropType;
  summary: string;
  overview: string;
  whatYouWillLearn: string[];
  requirements: string;
};

export const courses: Course[] = [
  {
    id: 'canine-obedience-training',
    name: 'Canine Obedience Training',
    type: 'Professional Development Programme',
    durationWeeks: 12,
    fee: 1500,
    image: require('../../assets/images/course-obedience.jpg'),
    summary: 'Build confidence with reward-based training, clear cues and practical dog-handling skills.',
    overview:
      'A professional development programme covering dog body language, communication cues, reward-based motivation structures, and obedience protocols.',
    whatYouWillLearn: [
      'Classical and operant conditioning structures',
      'Command parameters (sit, stay, heel, recall under distraction)',
      'Common behavioural correction methodologies (fear-free)',
      'Interpreting reactive vs relaxed body posture',
      'Structuring one-on-one training sessions with client dogs',
    ],
    requirements: 'None (basic pet interaction recommended)',
  },
  {
    id: 'pet-grooming',
    name: 'Pet Grooming',
    type: 'Professional Development Programme',
    durationWeeks: 12,
    fee: 1500,
    image: require('../../assets/images/course-grooming.jpg'),
    summary: 'Thoughtful coat care, gentle handling and everyday hygiene.',
    overview:
      'Professional techniques for hygiene, skin care, styling and safe handling of pets during grooming.',
    whatYouWillLearn: [
      'Coat types and appropriate grooming tools',
      'Safe handling and restraint techniques',
      'Skin and coat health checks',
      'Styling techniques for common breeds',
      'Client communication and aftercare advice',
    ],
    requirements: 'None (basic pet interaction recommended)',
  },
  {
    id: 'animal-behaviour',
    name: 'Animal Behaviour',
    type: 'Professional Development Programme',
    durationWeeks: 12,
    fee: 1500,
    image: require('../../assets/images/course-behaviour.jpg'),
    summary: 'Understand the behaviour, needs and emotional cues of the animals in your care.',
    overview:
      'Understanding domestic pet psychology, cognitive responses, and environmental stress factors.',
    whatYouWillLearn: [
      'Foundations of animal cognition',
      'Reading stress and anxiety signals',
      'Environmental enrichment principles',
      'Common behavioural triggers in domestic pets',
      'Building a basic behaviour assessment',
    ],
    requirements: 'None (basic pet interaction recommended)',
  },
  {
    id: 'pet-business-management',
    name: 'Pet Business Management',
    type: 'Professional Development Programme',
    durationWeeks: 12,
    fee: 1500,
    image: require('../../assets/images/course-walking.jpg'),
    summary: 'Learn the practical foundations of running a confident, caring pet business.',
    overview:
      'The essentials of starting, marketing and scaling a local pet care business.',
    whatYouWillLearn: [
      'Setting up a small pet care business',
      'Basic marketing for local service businesses',
      'Pricing and booking management',
      'Customer relationship basics',
      'Scaling from solo operator to a small team',
    ],
    requirements: 'None (basic pet interaction recommended)',
  },
  {
    id: 'puppy-care',
    name: 'Puppy Care',
    type: 'Short Course',
    durationWeeks: 6,
    fee: 750,
    image: require('../../assets/images/course-puppy.jpg'),
    summary: 'Help your puppy settle in with positive routines, early socialisation and care.',
    overview:
      'Establishing basic routines, crate training, and initial socialisation benchmarks for new puppies.',
    whatYouWillLearn: [
      'Setting up a feeding and sleep routine',
      'Crate training basics',
      'Early socialisation milestones',
      'Common first-month health checks',
    ],
    requirements: 'None',
  },
  {
    id: 'pet-first-aid',
    name: 'Pet First Aid',
    type: 'Short Course',
    durationWeeks: 6,
    fee: 750,
    image: require('../../assets/images/course-first-aid.jpg'),
    summary: 'Learn how to recognise common pet emergencies and respond with confidence.',
    overview:
      'Emergency response protocols and temporary stabilisation methods for common pet injuries.',
    whatYouWillLearn: [
      'Recognising a pet emergency',
      'Basic wound care and stabilisation',
      'When to transport vs when to call a vet',
      'Building a pet first aid kit',
    ],
    requirements: 'None',
  },
  {
    id: 'basic-dog-walking',
    name: 'Basic Dog Walking',
    type: 'Short Course',
    durationWeeks: 6,
    fee: 750,
    image: require('../../assets/images/course-walking.jpg'),
    summary: 'Build safe leash skills and confidence walking dogs in everyday settings.',
    overview:
      'Daily physical training, leash manners, and handling multiple dogs safely in public.',
    whatYouWillLearn: [
      'Leash handling fundamentals',
      'Walking multiple dogs safely',
      'Reading a dog\u2019s comfort level in public spaces',
      'Basic route and time planning',
    ],
    requirements: 'None',
  },
];

// Discount tiers confirmed against the WIL POE — do not change without
// checking the brief again.
export function getDiscountRate(numberOfCourses: number): number {
  if (numberOfCourses <= 1) return 0;
  if (numberOfCourses === 2) return 0.05;
  if (numberOfCourses === 3) return 0.1;
  return 0.15; // more than 3
}

export const VAT_RATE = 0.15;

const randFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const randCentsFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatRand(amount: number): string {
  return Number.isInteger(amount) ? randFormatter.format(amount) : randCentsFormatter.format(amount);
}
