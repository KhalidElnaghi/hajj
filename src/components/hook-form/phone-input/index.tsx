'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-phone-number-input/style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import PhoneInputWithCountrySelect from 'react-phone-number-input';


import styles from '../../../styles/index.module.css';
import { useTranslations } from 'next-intl';

interface Iprops {
  handlePhoneChange: (e: any, name: string) => void;
  phone: number | string;
}
export default function InPutPhone({ handlePhoneChange, phone }: Iprops) {
  const  t  = useTranslations();
  return (
    <PhoneInputWithCountrySelect
      placeholder={t('Label.phone_number')}
      name="phone"
      value={phone as any}
      onChange={(e: any) => handlePhoneChange(e, 'phone')}
      defaultCountry="SA"
      className={styles.inputPhone}
    />
  );
}
