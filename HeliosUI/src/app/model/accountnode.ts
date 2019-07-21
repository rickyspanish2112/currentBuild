import { Iaccountnode } from '../contracts/iaccountnode';

export class Accountnode implements Iaccountnode {
  id: number;  avatar: string;
  node: string;
  nodeRouteIdentifier: string;
}
