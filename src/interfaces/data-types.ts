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

export type OriginCity = {
  id: string;
  name: string;
  description: string;
}& timeAt;

export type ResidentSelect = {
  id: string;
  name: string;
  room_number_id: string;
}

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
  url: string | undefined;
}& timeAt;

export type GalleryAddForm = {
  title: string;
  type: 'Foto' | 'Video';
  category_id: string;
  file: File | undefined;
  files: File[] | undefined;
  url: string; 
};

export type GalleryEditForm = {
  title: string;
  type: string;
  category_id: string;
  file: File;
  files: File[] | undefined;
  file_name: string;
  url: string; 
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
  origin_city_id: string;
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
  origin_city_id: string;
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
  origin_city_id: string;
  status: string;
};
// resident

// payment
export type Payment = {
  id: string;
  resident_id: string;
  payment_evidence: number | null;
  file_payment_evidence: File | undefined;
  payment_file_name: string;
  billing_date: string;
  billing_amount: string;
  resident_name: string;
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

export type PaymentEditForm = {
  resident_id: string;
  resident_name: string;
  billing_date: string;
  billing_date_convert: Date | number;
  billing_amount: string | number;
  status: string;
  payment_evidence: File | null;
  files: File[] | undefined;
};

// report
export type Report = {
  id: string;
  title: string;
  report_evidence: string;
  report_date: string;
  report_amount: string;
  report_categories: string;
  file_report_evidence: File | undefined;
  report_file_name: string;
}& timeAt;

export type ReportAddForm = {
  title: string;
  report_date: string;
  report_date_convert: Date | number;
  report_amount: string | number;
  report_categories: string;
  report_evidence: File;
  files: File[] | undefined;
};

export type ReportEditForm = { 
  title: string;
  report_date: string;
  report_date_convert: Date | number;
  report_amount: string | number;
  report_categories: string;
  report_evidence: File | null;
  files: File[] | undefined;
};

//export report
export type ExportReportForm = {
  range_date: string;
  format_file: 'PDF' | 'Excel' | undefined;
};

export type GenerateReport = {
  file_name: string;
  file_url: string;
};

//grafik
export type StaticData = {
  data_active: number;
  data_count: number;
}

export type chartIncomeData = {
  weekly_income: number[];
  total_income: number;
}

export type chartOutcomeData = {
  weekly_outcome: number[];
  total_outcome: number;
}
