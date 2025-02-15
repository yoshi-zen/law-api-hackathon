import { z } from "zod";

export const FileTypeSchema = z.enum(["xml", "json", "html", "rtf", "docx"]);

export type FileTypeType = z.infer<typeof FileTypeSchema>;
