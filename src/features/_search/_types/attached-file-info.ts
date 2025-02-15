import { z } from "zod";
import { AttachedFileSchema } from "./attached-file";

/**
 * 添付ファイル情報を指す。
 * image_data: Base64エンコードされた画像データ
 * attached_files: 添付ファイル一覧
 */
export const AttachedFileInfoSchema = z.object({
  image_data: z.string(),
  attached_files: z.array(AttachedFileSchema),
});

export type AttachedFileInfoType = z.infer<typeof AttachedFileInfoSchema>;
