import { z } from "zod";
export const projectTypes = [
  "Residential construction",
  "Commercial construction",
  "Interior design",
  "Home renovation",
  "Architecture and planning",
  "Turnkey solution",
  "Not sure yet",
];
export const startTimeframes = [
  "As soon as possible",
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "Just exploring",
];
/** Strip spaces, dashes and brackets before testing a phone number. */
const normalisePhone = (value) => value.replace(/[\s\-().]/g, "");
/**
 * Shared by the browser form (React Hook Form) and the API route, so the same
 * rules run on both sides of the network.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Please keep your name under 80 characters."),
  phone: z
    .string()
    .trim()
    .refine((value) => /^\+?\d{10,14}$/.test(normalisePhone(value)), {
      message: "Please enter a valid phone number, including the area code.",
    }),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((value) => value === "" || z.email().safeParse(value).success, {
      message: "Please enter a valid email address, or leave this blank.",
    }),
  projectType: z.enum(projectTypes, { message: "Please choose a project type." }),
  location: z
    .string()
    .trim()
    .min(2, "Please tell us where the project is located.")
    .max(120, "Please keep this under 120 characters."),
  budget: z.string().trim().max(60, "Please keep this under 60 characters."),
  startTimeframe: z.union([z.enum(startTimeframes), z.literal("")]),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few words about your project.")
    .max(2000, "Please keep your message under 2000 characters."),
  consent: z.literal(true, {
    message: "Please confirm that we may contact you about this enquiry.",
  }),
  /** Honeypot: real visitors never see or fill this. */
  website: z.string().max(0).optional(),
  /** Set automatically on project and service pages. */
  projectRef: z.string().trim().max(160).optional(),
});
