export type formatMessage<T = unknown> = {
  success: boolean;
  message: string;
  data: T | null;
}

export type MessageResponse = {
  count: number;
  current_page: number;
  previous_page: number;
  total_pages: number;
}&formatMessage;

type timeAt = {
  created_at: string;
  updated_at: string;
}

// login
export type LoginRequest = {
  email: string;
  password: string;
  errors: { [key: string]: string[] } | undefined; 
  message: string | undefined;
  status: boolean;
};

export type UserLogin = {
  name: string;
  email: string;
  access_token: string;
};

//register
export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  errors: { [key: string]: string[] } | undefined; 
  message: string | undefined;
  status: boolean;
};

export type UserRegister = {
  token: string;
  name: string;
};

// category
export type Categories = {
  id: string;
  name: string;
  description: string;
}& timeAt;

// room number
export type RoomNumbers = {
  id: string;
  name: string;
  description: string;
}& timeAt;

// origin campus
export type OriginCampus = {
  id: string;
  name: string;
  description: string;
}& timeAt;

// gallery
export type Gallery = {
  id: string;
  title: string;
  type: string;
  category_id: string;
  file: string;
  file_gallery: File | undefined;
  file_name: string;
  category_name: string;
}& timeAt;

export type GalleryAddForm = {
  title: string;
  type: string;
  category_id: string;
  file: File;
  files: File[] | undefined;
};

export type GalleryEditForm = {
  title: string;
  type: string;
  category_id: string;
  file: File | null;
  files: File[] | undefined;
  file_name: string;
};
// gallery

// resident
export type Resident = {
  id: string;
  name: string;
  age: number | string;
  birth_date: string;
  address: string;
  origin_city: string;
  origin_campus: string | null;
  origin_campus_id: string;
  phone_number: string;
  room_number: string | null;
  room_number_id: string;
  status: string;
} & timeAt;

export type ResidentAddForm = {
  name: string;
  age: string | number;
  birth_date: string;
  birth_date_convert: Date;
  phone_number: string;
  origin_campus_id: string;
  room_number_id: string;
  address: string;
  origin_city: string;
  status: string;
};


export type ResidentEditForm = {
  name: string;
  age: string | number;
  birth_date: string;
  birth_date_convert: Date;
  phone_number: string;
  origin_campus_id: string;
  room_number_id: string;
  address: string;
  origin_city: string;
  status: string;
};
// resident

// payment
export type Payments = {
  id: string;
  resident_id: string;
  payment_evidence: number | null;
  billing_date: string;
  billing_amount: string;
  resident_name: number;
  status: string;
} & timeAt;

export type PaymentAddForm = {
  resident_id: string;
  billing_date: string;
  billing_date_convert: Date | number;
  billing_amount: string | number;
  status: string;
  payment_evidence: File;
  files: File[] | undefined;
};