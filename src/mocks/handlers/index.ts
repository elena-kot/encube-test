import { designElementHandlers } from './design-element';
import { commentHandlers } from './comment';

export const handlers = [
  ...Object.values(designElementHandlers),
  ...Object.values(commentHandlers),
];
