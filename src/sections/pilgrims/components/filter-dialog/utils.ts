import type { DropdownOption, ToggleOption } from './index';
import type { PilgrimInitDataResponse } from 'src/services/api/pilgrims';

// ----------------------------------------------------------------------

/**
 * Transform packages data to dropdown options
 */
export const transformPackagesToOptions = (
  packages?: PilgrimInitDataResponse['data']['packages']
): DropdownOption[] => {
  if (!packages) return [];
  return packages.map((item) => ({
    value: item.id,
    label: item.name.ar,
    disabled: !item.status,
  }));
};

/**
 * Transform cities data to dropdown options
 */
export const transformCitiesToOptions = (
  cities?: PilgrimInitDataResponse['data']['cities']
): DropdownOption[] => {
  if (!cities) return [];
  return cities.map((item) => ({
    value: item.city_id,
    label: item.city.name.ar,
  }));
};

/**
 * Transform countries data to dropdown options
 */
export const transformCountriesToOptions = (
  countries?: PilgrimInitDataResponse['data']['countries']
): DropdownOption[] => {
  if (!countries) return [];
  return countries.map((item) => ({
    value: item.country.id,
    label: item.country.name.ar,
  }));
};

/**
 * Transform transports data to dropdown options
 */
export const transformTransportsToOptions = (
  transports?: PilgrimInitDataResponse['data']['transports']
): DropdownOption[] => {
  if (!transports) return [];
  return transports.map((item) => ({
    value: item.id,
    label: item.name.ar,
    disabled: !item.status,
  }));
};

/**
 * Transform pilgrim types data to dropdown options
 */
export const transformPilgrimTypesToOptions = (
  pilgrimTypes?: PilgrimInitDataResponse['data']['pilgrimTypes']
): DropdownOption[] => {
  if (!pilgrimTypes) return [];
  return pilgrimTypes.map((item) => ({
    value: item.id,
    label: item.name.ar,
    disabled: !item.status,
  }));
};

/**
 * Transform simple options (status/enum fields) to dropdown options
 */
export const transformSimpleToDropdownOptions = (
  items?: Array<{ value: number; label: string }>
): DropdownOption[] => {
  if (!items) return [];
  return items.map((item) => ({
    value: item.value,
    label: item.label,
  }));
};

/**
 * Transform simple options (status/enum fields) to toggle options
 */
export const transformSimpleToToggleOptions = (
  items?: Array<{ value: number; label: string }>
): ToggleOption[] => {
  if (!items) return [];
  return items.map((item) => ({
    value: item.value,
    label: item.label,
  }));
};

/**
 * Transform employees data to dropdown options
 */
export const transformEmployeesToOptions = (
  employees?: PilgrimInitDataResponse['data']['employees']
): DropdownOption[] => {
  if (!employees) return [];
  return employees.map((item) => ({
    value: item.id,
    label: item.name.ar,
  }));
};

/**
 * Transform tags data to dropdown options
 */
export const transformTagsToOptions = (
  tags?: PilgrimInitDataResponse['data']['tags']
): DropdownOption[] => {
  if (!tags) return [];
  return tags.map((item) => ({
    value: item.id,
    label: item.name.ar,
    disabled: !item.status,
    color: item.color,
  }));
};
