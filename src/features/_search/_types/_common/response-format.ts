import { z } from "zod";

const responseFormatList = ["json", "xml"] as const;
const responseFormatLabelList = ["JSON", "XML"];

export const responseFormatListMap = responseFormatList.map(
  (responseFormat, index) => ({
    label: responseFormatLabelList[index],
    value: responseFormat,
  }),
);

export const ResponseFormatSchema = z.enum(responseFormatList);

export type ResponseFormatType = z.infer<typeof ResponseFormatSchema>;
