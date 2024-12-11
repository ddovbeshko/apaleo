export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  address: {
    address: string;
    city: string;
    stateCode: string;
    country: string;
    postalCode: string;
  };
  id : number;
}
