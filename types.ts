
export type Page = 'Home' | 'Admissions' | 'Fees' | 'Academics' | 'Booklists';

export interface Institution {
  name: string;
  location: string;
  map_link: string;
  contacts: {
    phone: string[];
    email: string;
  };
  mission: string;
  vision: string;
  motto: string;
  history: string;
}

export interface Admissions2026 {
  status: string;
  classes_offered: string[];
  openings_per_class: {
    Playgroup: number;
    "PP1_to_Grade_6": number;
    "Grade_7": number;
  };
  school_visit_tours: string;
  requirements: string[];
}

export interface Fees {
  tuition_per_term: {
    Playgroup: string;
    "Pre-Primary 1–2": string;
    "Grade 1-3": string;
    "Grade 4-6": string;
    "Grade 7": string;
  };
  other_charges: {
    Admission_once: string;
    Interview_per_child: string;
    Insurance_per_year: string;
    School_Diary_per_year: string;
    Assessment_Book_per_year: string;
    Exam_Fee_per_year: string;
  };
  inclusivity: string;
}

export interface TransportCharge {
  paybill: string;
  account_no: string;
  zones: {
    zone: string;
    route: string;
    two_way: string;
    one_way: string;
  }[];
}

export interface CoCurricularActivity {
  activity: string;
  classes: string;
  fee_per_term: string;
}

export interface CoCurricularActivities {
  compulsory: CoCurricularActivity[];
  optional: CoCurricularActivity[];
}

export interface SchoolEvent {
  date: string; // YYYY-MM-DD
  title: string;
  category: 'Term Dates' | 'Holiday' | 'Event';
  description?: string;
}

export interface Book {
  title: string;
  subject: string;
  publisher?: string;
}

export interface Stationery {
  item: string;
  quantity: number | string;
}

export interface GradeBooklist {
  textbooks: Book[];
  stationery: Stationery[];
}

export interface SchoolData {
  institution: Institution;
  admissions_2026: Admissions2026;
  fees: Fees;
  transport_charges: TransportCharge;
  co_curricular_activities: CoCurricularActivities;
  school_calendar: SchoolEvent[];
  booklists: {
    [grade: string]: GradeBooklist;
  };
}