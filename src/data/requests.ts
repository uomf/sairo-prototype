import data from './requests.json';

export const requests = data;
export type NeighborRequest = (typeof requests)[number];
