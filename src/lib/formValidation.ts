
import * as z from "zod";

export const signUpFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name must be less than 50 characters" }),
  jobTitle: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters" })
    .max(50, { message: "Job title must be less than 50 characters" }),
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  workEmail: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .object({
      countryCode: z.string(),
      number: z
        .string()
        .min(5, { message: "Phone number is too short" })
        .max(15, { message: "Phone number is too long" })
        .regex(/^\d+$/, { message: "Please enter only numbers" }),
    }),
  registrationNumber: z
    .string()
    .min(5, { message: "Registration number is too short" })
    .max(50, { message: "Registration number is too long" }),
  companyAddress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(200, { message: "Address must be less than 200 characters" }),
  employeeCount: z.string({
    required_error: "Please select number of employees",
  }),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and privacy policy" }),
  }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const employeeCountOptions = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "501-1000", label: "501-1,000" },
  { value: "1001+", label: "1,000+" },
];

export const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
];
