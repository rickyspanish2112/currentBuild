import { Iaddress } from '../contracts/iaddress';

export class Address implements Iaddress {
  id: number;
  title: string;
  street1: string;
  street2: string;
  street3: string;
  county: string;
  postCode: string;
  country: string;
  isPrimary: boolean;
}
