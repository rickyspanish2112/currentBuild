import { Ibadge } from '../contracts/ibadges';

export class Badge implements Ibadge {
  id: number;
  code: string;
  name: string;
}
