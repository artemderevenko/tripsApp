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
  { value: 'transport', label: 'Transportation Expenses', color: '#ffdcb5'},
  { value: 'accommodation', label: 'Accommodation Expenses', color: '#abcec1'},
  { value: 'guide', label: 'Guide Services', color: '#238f8a'},
  { value: 'meals', label: 'Meals and Dining', color: '#005064'},
  { value: 'entertainment', label: 'Entertainment and Activities', color: '#6f8ad6'},
  { value: 'equipment-rental', label: 'Equipment Rental', color: '#ecd2df'},
  { value: 'insurance', label: 'Insurance Costs', color: '#6eaae3'},
  { value: 'marketing', label: 'Marketing and Advertising', color: '#dd9199'},
  { value: 'administrative', label: 'Administrative Expenses', color: '#d9c659'},
  { value: 'other', label: 'Other', color: '#778899'},
];