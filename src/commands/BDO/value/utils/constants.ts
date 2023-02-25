// Ignored as additional maps may be placed here in the future.
export const fameMap: { [index: number]: number } = {
  1: 0.005,
  2: 0.01,
  3: 0.015,
};

export enum DENOMINATIONS {
  THOUSAND = 'thousand',
  MILLION = 'million',
  BILLION = 'billion',
}

export const denomShorthandMap: { [index: string]: string } = {
  billion: 'b',
  million: 'm',
  thousand: 'k',
};

// Marketplace sales have a 35% tax by default.
export const baseSaleModifier = 0.65;

// Value packs give a 30% sale bonus.
export const valuePackBonus = 0.3;
