export function formatCurrency(value: string): string {
  if (!value) return "";
  const cleanedValue = value.replace(/[^0-9]/g, ""); // Hapus karakter non-angka
  return "Rp " + parseInt(cleanedValue || "0").toLocaleString("id-ID", { minimumFractionDigits: 0 });
}

export function bytesToMb(value: number): string {
  if (!value) return "0 MB";

  const kb = value;

  if (kb === 0) return "0 MB";

  const mb = kb / 1024000;
  return mb.toFixed(2) + " MB"; 
}