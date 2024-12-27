import { galleryString } from "@constant/breadcrumbs";

const addGalleryForm: Array<{
  label: string;
  placeholder: string | null;
}> = [
  {
    label: `Judul ${galleryString}`,
    placeholder: `Masukkan judul ${galleryString.toLocaleLowerCase()}`,
  },
  {
    label: `Tipe ${galleryString}`,
    placeholder: null,
  },
  {
    label: `Kategori ${galleryString}`,
    placeholder: `-- Pilih Kategori --`,
  },
  {
    label: `File ${galleryString}`,
    placeholder: null
  },
];

export { addGalleryForm };