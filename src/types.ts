export interface Car {
  id?: number;
  brand: string;
  model: string;
  color: string;
  registerNumber: string;
  year: number;
  price: number;
}

export interface Owner {
  id?: number;
  name: string;
  email: string;
  phone: string;
}
