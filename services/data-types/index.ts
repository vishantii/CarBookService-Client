export interface CategoryTypes {
  _id: string;
  name: string;
  price: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BanksTypes {
  _id: string;
  name: string;
  bankName: string;
  noRekening: string;
}
export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BanksTypes[];
}

export interface NominalsTypes {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface UserTypes {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  phoneNumber: string;
}

export interface JWTPayloadTypes {
  customer: UserTypes;
  iat: number;
}

export interface CheckoutTypes {
  carBrand: string;
  carType: string;
  carYear: string;
  category: {
    id: String;
    name: String;
    price: String;
  };
  chooseDate: string;
  licensePlate: string;
  miles: string;
  notes: string;
  chooseTime: string;
  spareparts: any;
  total: string;
}

export interface HistoryVoucherTopupTypes {
  category: string;
  coinName: string;
  coinQuantity: string;
  gameName: string;
  price: number;
  thumbnail: string;
}

export interface HistoryPaymentTypes {
  bankName: string;
  name: string;
  noRekening: string;
  type: string;
}

export interface HistoryTransactionTypes {
  _id: string;
  carBrand: string;
  carType: string;
  carYear: string;
  category: {
    id: string;
    name: string;
    price: string | any;
  };
  chooseDate: string;
  licensePlate: string;
  miles: string;
  notes: string;
  chooseTime: string;
  status: Number;
  bookingNumber: Number;
  total: number;
}

export interface TopUpCategoriesTypes {
  _id: string;
  value: number;
  name: string;
}

export interface TimeDataUpdateTypes {
  date: string;
  time: string;
}
