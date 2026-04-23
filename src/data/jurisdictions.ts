export interface Jurisdiction {
  code: string;
  country: 'us' | 'uk';
  region: string;
  slug: string;
  abbreviation: string;
}

export const US_STATES: Jurisdiction[] = [
  { code: 'us-al', country: 'us', region: 'Alabama', slug: 'alabama', abbreviation: 'AL' },
  { code: 'us-ak', country: 'us', region: 'Alaska', slug: 'alaska', abbreviation: 'AK' },
  { code: 'us-az', country: 'us', region: 'Arizona', slug: 'arizona', abbreviation: 'AZ' },
  { code: 'us-ar', country: 'us', region: 'Arkansas', slug: 'arkansas', abbreviation: 'AR' },
  { code: 'us-ca', country: 'us', region: 'California', slug: 'california', abbreviation: 'CA' },
  { code: 'us-co', country: 'us', region: 'Colorado', slug: 'colorado', abbreviation: 'CO' },
  { code: 'us-ct', country: 'us', region: 'Connecticut', slug: 'connecticut', abbreviation: 'CT' },
  { code: 'us-de', country: 'us', region: 'Delaware', slug: 'delaware', abbreviation: 'DE' },
  { code: 'us-fl', country: 'us', region: 'Florida', slug: 'florida', abbreviation: 'FL' },
  { code: 'us-ga', country: 'us', region: 'Georgia', slug: 'georgia', abbreviation: 'GA' },
  { code: 'us-hi', country: 'us', region: 'Hawaii', slug: 'hawaii', abbreviation: 'HI' },
  { code: 'us-id', country: 'us', region: 'Idaho', slug: 'idaho', abbreviation: 'ID' },
  { code: 'us-il', country: 'us', region: 'Illinois', slug: 'illinois', abbreviation: 'IL' },
  { code: 'us-in', country: 'us', region: 'Indiana', slug: 'indiana', abbreviation: 'IN' },
  { code: 'us-ia', country: 'us', region: 'Iowa', slug: 'iowa', abbreviation: 'IA' },
  { code: 'us-ks', country: 'us', region: 'Kansas', slug: 'kansas', abbreviation: 'KS' },
  { code: 'us-ky', country: 'us', region: 'Kentucky', slug: 'kentucky', abbreviation: 'KY' },
  { code: 'us-la', country: 'us', region: 'Louisiana', slug: 'louisiana', abbreviation: 'LA' },
  { code: 'us-me', country: 'us', region: 'Maine', slug: 'maine', abbreviation: 'ME' },
  { code: 'us-md', country: 'us', region: 'Maryland', slug: 'maryland', abbreviation: 'MD' },
  { code: 'us-ma', country: 'us', region: 'Massachusetts', slug: 'massachusetts', abbreviation: 'MA' },
  { code: 'us-mi', country: 'us', region: 'Michigan', slug: 'michigan', abbreviation: 'MI' },
  { code: 'us-mn', country: 'us', region: 'Minnesota', slug: 'minnesota', abbreviation: 'MN' },
  { code: 'us-ms', country: 'us', region: 'Mississippi', slug: 'mississippi', abbreviation: 'MS' },
  { code: 'us-mo', country: 'us', region: 'Missouri', slug: 'missouri', abbreviation: 'MO' },
  { code: 'us-mt', country: 'us', region: 'Montana', slug: 'montana', abbreviation: 'MT' },
  { code: 'us-ne', country: 'us', region: 'Nebraska', slug: 'nebraska', abbreviation: 'NE' },
  { code: 'us-nv', country: 'us', region: 'Nevada', slug: 'nevada', abbreviation: 'NV' },
  { code: 'us-nh', country: 'us', region: 'New Hampshire', slug: 'new-hampshire', abbreviation: 'NH' },
  { code: 'us-nj', country: 'us', region: 'New Jersey', slug: 'new-jersey', abbreviation: 'NJ' },
  { code: 'us-nm', country: 'us', region: 'New Mexico', slug: 'new-mexico', abbreviation: 'NM' },
  { code: 'us-ny', country: 'us', region: 'New York', slug: 'new-york', abbreviation: 'NY' },
  { code: 'us-nc', country: 'us', region: 'North Carolina', slug: 'north-carolina', abbreviation: 'NC' },
  { code: 'us-nd', country: 'us', region: 'North Dakota', slug: 'north-dakota', abbreviation: 'ND' },
  { code: 'us-oh', country: 'us', region: 'Ohio', slug: 'ohio', abbreviation: 'OH' },
  { code: 'us-ok', country: 'us', region: 'Oklahoma', slug: 'oklahoma', abbreviation: 'OK' },
  { code: 'us-or', country: 'us', region: 'Oregon', slug: 'oregon', abbreviation: 'OR' },
  { code: 'us-pa', country: 'us', region: 'Pennsylvania', slug: 'pennsylvania', abbreviation: 'PA' },
  { code: 'us-ri', country: 'us', region: 'Rhode Island', slug: 'rhode-island', abbreviation: 'RI' },
  { code: 'us-sc', country: 'us', region: 'South Carolina', slug: 'south-carolina', abbreviation: 'SC' },
  { code: 'us-sd', country: 'us', region: 'South Dakota', slug: 'south-dakota', abbreviation: 'SD' },
  { code: 'us-tn', country: 'us', region: 'Tennessee', slug: 'tennessee', abbreviation: 'TN' },
  { code: 'us-tx', country: 'us', region: 'Texas', slug: 'texas', abbreviation: 'TX' },
  { code: 'us-ut', country: 'us', region: 'Utah', slug: 'utah', abbreviation: 'UT' },
  { code: 'us-vt', country: 'us', region: 'Vermont', slug: 'vermont', abbreviation: 'VT' },
  { code: 'us-va', country: 'us', region: 'Virginia', slug: 'virginia', abbreviation: 'VA' },
  { code: 'us-wa', country: 'us', region: 'Washington', slug: 'washington', abbreviation: 'WA' },
  { code: 'us-wv', country: 'us', region: 'West Virginia', slug: 'west-virginia', abbreviation: 'WV' },
  { code: 'us-wi', country: 'us', region: 'Wisconsin', slug: 'wisconsin', abbreviation: 'WI' },
  { code: 'us-wy', country: 'us', region: 'Wyoming', slug: 'wyoming', abbreviation: 'WY' }
];

export const UK_NATIONS: Jurisdiction[] = [
  { code: 'uk-eng', country: 'uk', region: 'England', slug: 'england', abbreviation: 'ENG' },
  { code: 'uk-sco', country: 'uk', region: 'Scotland', slug: 'scotland', abbreviation: 'SCO' },
  { code: 'uk-wal', country: 'uk', region: 'Wales', slug: 'wales', abbreviation: 'WAL' },
  { code: 'uk-nir', country: 'uk', region: 'Northern Ireland', slug: 'northern-ireland', abbreviation: 'NIR' }
];

export const ALL_JURISDICTIONS: Jurisdiction[] = [...US_STATES, ...UK_NATIONS];

export const byCode = (code: string): Jurisdiction | undefined =>
  ALL_JURISDICTIONS.find((j) => j.code === code);
