export interface Activity {
  id: number;
  name: string;
  calories: number;
  category: string;
  duration: number;
  isPremium: boolean;
}

export interface Member {
  name: string;
  dni: string;
  locality: string;
  premium: boolean;
  active: boolean;
}

export interface Monitor {
  id: number;
  name: string;
  dni: string;
  birthdate: string;
  address: string;
  locality: string;
  province: string;
  postCode: string;
  phoneNumber: string;
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
}