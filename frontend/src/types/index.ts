export interface Activity {
  id: number;
  name: string;
  calories: number;
  category: string;
  duration: number;
  isPremium: boolean;
}

export interface Person {
  id: number;
  name: string;
  dni: string;
  birthdate: string;
  address: string;
  province: string;
  postCode: string;
  phoneNumber: string;
  locality: string;
}

export interface Member extends Person {
  premium: boolean;
  active: boolean;
}

export interface Monitor extends Person{
  salary: number;
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface PersonRequest {
  dni: string;
  name: string;
  birthdate: string;
  address: string;
  locality: string;
  province: string;
  postCode: string;
  phoneNumber: string;
  salary?: number;
  premium?: boolean;
  active?: boolean;
}