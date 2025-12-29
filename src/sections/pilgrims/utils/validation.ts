import * as Yup from 'yup';

type TranslateFunction = (key: string) => string;

export const createPilgrimValidationSchema = (t: TranslateFunction) => {
  return Yup.object().shape({
    nameAr: Yup.string()
      .required(t('Message.name_ar_required'))
      .min(2, t('Message.name_min_length')),
    nameEn: Yup.string()
      .required(t('Message.name_en_required'))
      .min(2, t('Message.name_min_length')),
    idNumber: Yup.string()
      .required(t('Message.id_number_required'))
      .length(10, t('Message.id_number_length'))
      .matches(/^\d+$/, t('Message.id_number_invalid'))
      .test('saudi-id-format', t('Message.id_number_saudi_format'), (value) => {
        if (!value || value.length !== 10) return false;
        const firstDigit = value.charAt(0);
        return ['1', '2', '3', '4'].includes(firstDigit);
      }),
    nationality: Yup.string().required(t('Message.nationality_required')),
    gender: Yup.string()
      .required(t('Message.gender_required'))
      .oneOf(['0', '1'], t('Message.gender_invalid')),
    gregorianBirthDate: Yup.string().required(t('Message.birthdate_required')),
    hijriBirthDate: Yup.string().notRequired().nullable(),
    age: Yup.number()
      .required(t('Message.age_required'))
      .min(0, t('Message.age_invalid'))
      .max(150, t('Message.age_max')),
    mobileNumber: Yup.string()
      .required(t('Message.mobile_required'))
      .matches(/^[0-9+\-\s()]*$/, t('Message.phone_invalid')),
    photo: Yup.mixed()
      .nullable()
      .test('fileType', t('Message.photo_invalid_type'), (value) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        if (value instanceof File) {
          const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          return validTypes.includes(value.type);
        }
        if (typeof value === 'object' && 'preview' in value && value instanceof File) {
          const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          return validTypes.includes(value.type);
        }
        return false;
      })
      .test('fileSize', t('Message.photo_size_limit'), (value) => {
        if (!value || typeof value === 'string') return true;
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        if (typeof value === 'object' && 'preview' in value && value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        return false;
      }),
    packageName: Yup.string().required(t('Message.package_required')),
    city: Yup.string().required(t('Message.city_required')),

    bookingNumber: Yup.string().default(''),
    arrivalDate: Yup.string().default(''),
    departureDate: Yup.string().default(''),
    permit: Yup.string().default(''),
    anotherMobileNumber: Yup.string()
      .default('')
      .test('saudi-phone', t('Message.phone_saudi_invalid'), (value) => {
        if (!value || value.trim() === '') return true;
        const cleaned = value.replace(/[\s\-+()]/g, '');
        const saudiPhoneRegex = /^(?:\+966|00966|966|0)?5[0-9]{8}$/;
        return saudiPhoneRegex.test(cleaned);
      }),
    gatheringPointType: Yup.string().default(''),
    gatheringPoint: Yup.string().default(''),
    prominent: Yup.string().default(''),
    accommodationArea: Yup.string().default(''),
    tentRoomNumber: Yup.string().default(''),
    campStatus: Yup.string().default(''),
    busNumber: Yup.string().default(''),
    seatNumber: Yup.string().default(''),
    generalHealthStatus: Yup.string().default(''),
    healthDetails: Yup.string().default(''),
    supervisors: Yup.array().of(Yup.string()).default([]),
    supervisorNotes: Yup.string().default(''),
  });
};
