export const CALENDAR_MODE = {
  week: 'week',
  month: 'month',
  year: 'year',
};

export const CALENDAR_MODE_OPTIONS = [
  { value: CALENDAR_MODE.week, label: 'Week'},
  { value: CALENDAR_MODE.month, label: 'Month'},
  { value: CALENDAR_MODE.year, label: 'Year'},
];

export const SEX_OPTIONS = [
  { value: 'M', label: 'M'},
  { value: 'F', label: 'F'},
];

export const TRANSPORT_TYPE_OPTIONS = [
  { value: 'minibus_19', label: 'Mercedes-Benz (19 seats)', seats: 19 },
  { value: 'bus_35', label: 'Bus Yutong (35 seats)', seats: 35 },
];

export const INSURANCE_OPTIONS = [
  { value: 'yes', label: 'Yes'},
  { value: 'no', label: 'No'},
];

export const EXPENSE_CATEGORY = [
  { value: 'transport', label: 'Transportation Expenses'},
  { value: 'accommodation', label: 'Accommodation Expenses'},
  { value: 'guide', label: 'Guide Services'},
  { value: 'meals', label: 'Meals and Dining'},
  { value: 'entertainment', label: 'Entertainment and Activities'},
  { value: 'equipment-rental', label: 'Equipment Rental'},
  { value: 'insurance', label: 'Insurance Costs'},
  { value: 'marketing', label: 'Marketing and Advertising'},
  { value: 'administrative', label: 'Administrative Expenses'},
  { value: 'other', label: 'Other'},
];