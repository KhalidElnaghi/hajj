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
