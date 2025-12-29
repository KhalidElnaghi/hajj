export const pilgrimInitialValues = {
  nameAr: '',
  nameEn: '',
  bookingNumber: '',
  idNumber: '',
  city: '',
  packageName: '',
  nationality: '',
  gender: '',
  arrivalDate: '',
  departureDate: '',
  permit: '',
  gregorianBirthDate: '',
  hijriBirthDate: '',
  age: 0,
  mobileNumber: '',
  anotherMobileNumber: '',
  photo: null,
  gatheringPointType: '',
  gatheringPoint: '',
  prominent: '',
  tentRoomNumber: '',
  campStatus: '',
  busNumber: '',
  seatNumber: '',
  generalHealthStatus: '',
  healthDetails: '',
  accommodationArea: '',
  supervisors: [],
  supervisorNotes: '',
};

export const permits = [
  { value: 'hajj', label: 'حج' },
  { value: 'umrah', label: 'عمرة' },
];

export const gatheringPointTypes = [
  { value: 'hotel', label: 'فندق' },
  { value: 'camp', label: 'مخيم' },
  { value: 'other', label: 'أخرى' },
];

export const gatheringPoints = [
  { value: 'point1', label: 'نقطة 1' },
  { value: 'point2', label: 'نقطة 2' },
  { value: 'point3', label: 'نقطة 3' },
];

export const accommodationAreas = [
  { value: 'mina', label: 'منى' },
  { value: 'arafat', label: 'عرفات' },
  { value: 'muzdalifah', label: 'مزدلفة' },
];

export const prominentOptions = [
  { value: 'yes', label: 'yes' },
  { value: 'no', label: 'no' },
];

export const campStatuses = [
  { value: 'confirmed', label: 'مؤكد' },
  { value: 'pending', label: 'قيد الانتظار' },
];

export const healthStatuses = [
  { value: 'excellent', label: 'ممتاز' },
  { value: 'good', label: 'جيد' },
  { value: 'fair', label: 'متوسط' },
  { value: 'poor', label: 'ضعيف' },
];

export const tabs = [
  { value: 'personal', label: 'Label.personal_information', icon: 'solar:user-bold' },
  { value: 'gathering', label: 'Label.gathering_points', icon: 'solar:map-point-bold' },
  {
    value: 'accommodation',
    label: 'Label.accommodation_residence',
    icon: 'solar:home-angle-outline',
  },
  { value: 'transportation', label: 'Label.transportation_data', icon: 'solar:bus-outline' },
  { value: 'health', label: 'Label.health_status_data', icon: 'solar:heart-pulse-outline' },
  {
    value: 'supervision',
    label: 'Label.supervision_organization',
    icon: 'solar:users-group-rounded-outline',
  },
];
