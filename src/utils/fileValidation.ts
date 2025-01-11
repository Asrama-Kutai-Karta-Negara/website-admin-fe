import { FileValidationResult } from "@interfaces/interface-items";

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_VIDEO_SIZE_MB = 50;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const ALLOWED_FILE_TYPES_VIDEO = ["video/mp4", "video/x-matroska"]; 

export const validateFileTypeImage = (files: FileList): boolean => {
  for (let i = 0; i < files.length; i++) {
    if (!ALLOWED_FILE_TYPES.includes(files[i].type)) {
      return false;
    }
  }
  return true;
}

export const validateFileImage = (file: File): FileValidationResult => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      errorMessage: "Tipe file tidak valid. Hanya mendukung JPG, PNG, dan JPEG.",
    };
  }
  const fileSize = file.size / 1024 / 1024;
  if (fileSize > MAX_FILE_SIZE_MB) {
    return {
      isValid: false,
      errorMessage: `Ukuran file terlalu besar. Maksimal ukuran file adalah ${MAX_FILE_SIZE_MB} MB.`,
    };
  }

  return { isValid: true };
};

export const validateVideoUrl = (url: string) => {
  const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+[.])+[a-zA-Z]{2,6}([\/\w .-]*)*\/?$/;
  if (!url || !regex.test(url)) {
    return { isValid: false, errorMessage: 'URL video tidak valid.' };
  }
  return { isValid: true };
};