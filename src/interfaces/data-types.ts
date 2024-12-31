export type formatMessage = {
  success: boolean;
  message: string;
  data: unknown | null;
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

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  errors: { [key: string]: string[] } | undefined; 
  message: string | undefined;
  status: boolean;
};

export type UserLogin = {
  name: string;
  email: string;
  access_token: string;
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

// gallery
export type Gallery = {
  id: string;
  title: string;
  type: string;
  category_id: string;
  file: string;
  file_name: string;
  category_name: string;
}& timeAt;

export type GalleryAddForm = {
  title: string;
  type: string;
  category_id: string;
  file: string;
  files?: File[]; 
  file_name: string;
};
// gallery

// resident
export type Residents = {
  id: string;
  name: string;
  age: number | null;
  address: string;
  origin_city: string;
  origin_campus: string;
  phone_number: string;
  room_number: string;
  status: string;
} & timeAt;

export type ResidentsAdd = {
  name: string;
  age: string | number;
  birth_date: Date;
  phone_number: string;
  origin_campus: string;
  room_number: string;
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

export type PaymentsAdd = {
  resident_id: string;
  billing_date: Date;
  billing_amount: string;
  status: string;
  payment_evidence: string;
  files?: File[]; 
  payment_file_name: string;
};
// resident

export interface PostEditPageProps {
  params: {
    id: string;
  };
}