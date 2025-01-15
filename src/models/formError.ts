export interface FormErrorRegister {
  companyName?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  [key: string]: string | undefined;
}
