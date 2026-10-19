/**
 * Authoritative Cambodian Commercial Banks & Financial Institutions Catalog
 * Sourced directly from resources/bank-logos/ (32 SVG Vector Assets)
 * Strictly zero emojis.
 */

export interface CambodianBank {
  id: string;
  nameEn: string;
  nameKm: string;
  shortName: string;
  logo: string;
  logoLarge?: string;
  accentColor: string;
  defaultAccountId: string;
}

export const CAMBODIAN_BANKS: CambodianBank[] = [
  {
    id: 'aba',
    nameEn: 'ABA Bank',
    nameKm: 'ធនាគារ អេប៊ីអេ',
    shortName: 'ABA',
    logo: '/resources/bank-logos/aba-bank.svg',
    accentColor: '#003E6B',
    defaultAccountId: 'shiliaiwei@bkrt',
  },
  {
    id: 'acleda',
    nameEn: 'ACLEDA Bank',
    nameKm: 'ធនាគារ អេស៊ីលីដា',
    shortName: 'ACLEDA',
    logo: '/resources/bank-logos/acleda-bank-large.svg',
    logoLarge: '/resources/bank-logos/acleda-bank-large.svg',
    accentColor: '#0B3A60',
    defaultAccountId: 'shiliaiwei@aclb',
  },
  {
    id: 'canadia',
    nameEn: 'Canadia Bank',
    nameKm: 'ធនាគារ កាណាឌីយ៉ា',
    shortName: 'Canadia',
    logo: '/resources/bank-logos/canadia-bank.svg',
    logoLarge: '/resources/bank-logos/canadia-bank-large.svg',
    accentColor: '#C4161C',
    defaultAccountId: 'shiliaiwei@cnba',
  },
  {
    id: 'chip-mong',
    nameEn: 'Chip Mong Commercial Bank',
    nameKm: 'ធនាគារ ជីប ម៉ុង',
    shortName: 'Chip Mong',
    logo: '/resources/bank-logos/chip-mong-commercial-bank.svg',
    logoLarge: '/resources/bank-logos/chip-mong-commercial-bank-large.svg',
    accentColor: '#E65100',
    defaultAccountId: 'shiliaiwei@chip',
  },
  {
    id: 'cimb',
    nameEn: 'CIMB Bank',
    nameKm: 'ធនាគារ ស៊ីអាយអឹមប៊ី',
    shortName: 'CIMB',
    logo: '/resources/bank-logos/cimb-bank.svg',
    logoLarge: '/resources/bank-logos/cimb-bank-large.svg',
    accentColor: '#ED1C24',
    defaultAccountId: 'shiliaiwei@cimb',
  },
  {
    id: 'ftb',
    nameEn: 'Foreign Trade Bank of Cambodia',
    nameKm: 'ធនាគារ ពាណិជ្ជកម្មក្រៅប្រទេស នៃកម្ពុជា',
    shortName: 'FTB',
    logo: '/resources/bank-logos/ftb-foreign-trade-bank-large.svg',
    logoLarge: '/resources/bank-logos/ftb-foreign-trade-bank-large.svg',
    accentColor: '#004B87',
    defaultAccountId: 'shiliaiwei@ftbb',
  },
  {
    id: 'kb-prasac',
    nameEn: 'KB PRASAC Bank',
    nameKm: 'ធនាគារ ឃេប៊ី ប្រាសាក់',
    shortName: 'KB PRASAC',
    logo: '/resources/bank-logos/kb-prasac-bank.svg',
    logoLarge: '/resources/bank-logos/kb-prasac-bank-large.svg',
    accentColor: '#FFB81C',
    defaultAccountId: 'shiliaiwei@prsc',
  },
  {
    id: 'maybank',
    nameEn: 'Maybank Cambodia',
    nameKm: 'ធនាគារ មេយប៊ែង',
    shortName: 'Maybank',
    logo: '/resources/bank-logos/maybank-cambodia.svg',
    logoLarge: '/resources/bank-logos/maybank-cambodia-large.svg',
    accentColor: '#FFC80B',
    defaultAccountId: 'shiliaiwei@mbbe',
  },
  {
    id: 'prince',
    nameEn: 'Prince Bank',
    nameKm: 'ធនាគារ ព្រីនស៍',
    shortName: 'Prince',
    logo: '/resources/bank-logos/prince-bank.svg',
    accentColor: '#002D62',
    defaultAccountId: 'shiliaiwei@prin',
  },
  {
    id: 'hong-leong',
    nameEn: 'Hong Leong Bank',
    nameKm: 'ធនាគារ ហុង លីអុង',
    shortName: 'Hong Leong',
    logo: '/resources/bank-logos/hong-leong-bank.svg',
    logoLarge: '/resources/bank-logos/hong-leong-bank-large.svg',
    accentColor: '#002B49',
    defaultAccountId: 'shiliaiwei@hlbb',
  },
  {
    id: 'icbc',
    nameEn: 'ICBC Bank',
    nameKm: 'ធនាគារ អាយស៊ីប៊ីស៊ី',
    shortName: 'ICBC',
    logo: '/resources/bank-logos/icbc-bank.svg',
    logoLarge: '/resources/bank-logos/icbc-bank-large.svg',
    accentColor: '#C8102E',
    defaultAccountId: 'shiliaiwei@icbc',
  },
  {
    id: 'mb-bank',
    nameEn: 'MB Bank',
    nameKm: 'ធនាគារ អិមប៊ី',
    shortName: 'MB Bank',
    logo: '/resources/bank-logos/mb-bank.svg',
    logoLarge: '/resources/bank-logos/mb-bank-large.svg',
    accentColor: '#00205B',
    defaultAccountId: 'shiliaiwei@mbbk',
  },
  {
    id: 'campu',
    nameEn: 'Cambodia Public Bank',
    nameKm: 'ធនាគារ កម្ពុជា សាធារណៈ',
    shortName: 'Campu Bank',
    logo: '/resources/bank-logos/cambodia-public-bank.svg',
    logoLarge: '/resources/bank-logos/cambodia-public-bank-large.svg',
    accentColor: '#C41230',
    defaultAccountId: 'shiliaiwei@cpbl',
  },
  {
    id: 'cathay',
    nameEn: 'Cathay United Bank',
    nameKm: 'ធនាគារ កាថេ យូណាយធីត',
    shortName: 'Cathay',
    logo: '/resources/bank-logos/cathay-united-bank-large.svg',
    accentColor: '#008542',
    defaultAccountId: 'shiliaiwei@cubk',
  },
  {
    id: 'ardb',
    nameEn: 'ARDB Bank',
    nameKm: 'ធនាគារ អភិវឌ្ឍន៍ជនបទ និងកសិកម្ម',
    shortName: 'ARDB',
    logo: '/resources/bank-logos/ardb-bank.svg',
    logoLarge: '/resources/bank-logos/ardb-bank-large.svg',
    accentColor: '#007A3D',
    defaultAccountId: 'shiliaiwei@ardb',
  },
  {
    id: 'bongloy',
    nameEn: 'BongLoy Payments',
    nameKm: 'បុងឡូយ ផេមិនស៍',
    shortName: 'BongLoy',
    logo: '/resources/bank-logos/bongloy.svg',
    accentColor: '#1A73E8',
    defaultAccountId: 'shiliaiwei@bong',
  },
];

export function findBankByNameOrId(query: string): CambodianBank | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().trim();
  return CAMBODIAN_BANKS.find(
    (b) =>
      b.id.toLowerCase() === q ||
      b.shortName.toLowerCase() === q ||
      b.nameEn.toLowerCase().includes(q) ||
      b.nameKm.toLowerCase().includes(q)
  );
}
