import { z } from "zod";

export const ResponseFormatSchema = z.enum(["json", "xml"]);

export type ResponseFormatType = z.infer<typeof ResponseFormatSchema>;
