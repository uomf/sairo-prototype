import data from './activities.json';

export const activities = data;
export type Activity = (typeof activities)[number];
