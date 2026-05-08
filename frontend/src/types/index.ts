export interface Activity {
  id: number;
  name: string;
  calories: number;
  category: string;
  duration: number;
  isPremium: boolean;
}

export interface Member {
  id: number;
  name: string;
  dni: string;
  birthdate: string;
  address: string;
  locality: string;
  province: string;
  postCode: string;
  phoneNumber: string;
  isPremium: boolean;
  isActive: boolean;
  fee: number;
  registrationDate: string;
  lastAccessDate: string;
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
