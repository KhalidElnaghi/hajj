import type { DropdownOption, ToggleOption } from './index';
import type { PilgrimInitDataResponse } from 'src/services/api/pilgrims';

const getLocalizedLabel = (label: any, locale: string) => {
  if (!label) return '';
  if (typeof label === 'string') return label;
  return label?.[locale as 'ar' | 'en'] || label?.en || label?.ar || '';
};

// ----------------------------------------------------------------------

/**
 * Transform packages data to dropdown options
 */
export const transformPackagesToOptions = (
  packages?: PilgrimInitDataResponse['data']['packages'],
  locale: string = 'ar'
): DropdownOption[] => {
  if (!packages) return [];
  return packages.map((item) => ({
    value: item.id,
    label: getLocalizedLabel(item.name, locale),
    disabled: !item.status,
  }));
};

/**
 * Transform cities data to dropdown options
 */
export const transformCitiesToOptions = (
  cities?: PilgrimInitDataResponse['data']['cities'],
  locale: string = 'ar'
): DropdownOption[] => {
  if (!cities) return [];
  return cities.map((item) => ({
    value: item.city_id,
    label: getLocalizedLabel(item.city.name, locale),
  }));
};

/**
 * Transform countries data to dropdown options
 */
export const transformCountriesToOptions = (
  countries?: PilgrimInitDataResponse['data']['countries'],
  locale: string = 'ar'
): DropdownOption[] => {
  if (!countries) return [];
  return countries.map((item) => ({
    value: item.country.id,
    label: getLocalizedLabel(item.country.name, locale),
  }));
};

/**
 * Transform transports data to dropdown options
 */
export const transformTransportsToOptions = (
  transports?: PilgrimInitDataResponse['data']['transports'],
  locale: string = 'ar'
): DropdownOption[] => {
  if (!transports) return [];
  return transports.map((item) => ({
    value: item.id,
    label: getLocalizedLabel(item.name, locale),
    disabled: !item.status,
  }));
};

/**
 * Transform pilgrim types data to dropdown options
 */
export const transformPilgrimTypesToOptions = (
  pilgrimTypes?: PilgrimInitDataResponse['data']['pilgrimTypes'],
  locale: string = 'ar'
): DropdownOption[] => {
  if (!pilgrimTypes) return [];
  return pilgrimTypes.map((item) => ({
    value: item.id,
    label: getLocalizedLabel(item.name, locale),
    disabled: !item.status,
  }));
};

/**
 * Transform simple options (status/enum fields) to dropdown options
 */
export const transformSimpleToDropdownOptions = (
  items?: Array<{ value: number | string; label: any }>,
  locale: string = 'ar'
): DropdownOption[] => {
  if (!items) return [];
  return items.map((item) => ({
    value: item.value,
    label: getLocalizedLabel(item.label, locale),
  }));
};

/**
 * Transform simple options (status/enum fields) to toggle options
 */
export const transformSimpleToToggleOptions = (
  items?: Array<{ value: number | string; label: any }>,
  locale: string = 'ar'
): ToggleOption[] => {
  if (!items) return [];
  return items.map((item) => ({
    value: item.value,
    label: getLocalizedLabel(item.label, locale),
  }));
};

/**
 * Transform employees data to dropdown options
 */
export const transformEmployeesToOptions = (
  employees?: PilgrimInitDataResponse['data']['employees'],
  locale: string = 'ar'
): DropdownOption[] => {
  if (!employees) return [];
  return employees.map((item) => ({
    value: item.id,
    label: getLocalizedLabel(item.name, locale),
  }));
};

/**
 * Transform tags data to dropdown options
 */
export const transformTagsToOptions = (
  tags?: PilgrimInitDataResponse['data']['tags'],
  locale: string = 'ar'
): DropdownOption[] => {
  if (!tags) return [];
  return tags.map((item) => ({
    value: item.id,
    label: getLocalizedLabel(item.name, locale),
    disabled: !item.status,
    color: item.color,
  }));
};
