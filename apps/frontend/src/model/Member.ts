import { Pass } from './Pass';

export interface Member {
  _id: string;
  name: string;
  phone: string;
  createdAt: string;
  pass?: Pass | null;
}
