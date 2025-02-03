export function formatCurrency(value: string): string {
  if (!value) return "";
  if (value.includes('.00')) {
    value = value.replace('.00', '');
  }
  const cleanedValue = value.replace(/[^0-9]/g, "");
  return "Rp " + parseInt(cleanedValue).toLocaleString("id-ID", { minimumFractionDigits: 0 });
}

export function formatCurrencyNoRp(value: string): string {
  if (!value) return "";
  if (value.includes('.00')) {
    value = value.replace('.00', '');
  }

  const cleanedValue = value.replace(/[^0-9]/g, "");
  return parseInt(cleanedValue || "0").toLocaleString("id-ID", { minimumFractionDigits: 0 });
}

export function bytesToMb(value: number): string {
  if (!value) return "0 MB";

  const kb = value;

  if (kb === 0) return "0 MB";

  const mb = kb / 1024000;
  return mb.toFixed(2) + " MB"; 
}

export function formatShortName(text: string, value: number, condition: string | null): string {
  if(condition !== null){
    const conditionIndex = text.lastIndexOf(`${condition}`);
    const shortenedName = conditionIndex !== -1 && text.length > value + 5 
          ? `${text.substring(0, value)}...${text.substring(conditionIndex, text.length)}`
          : text;
    return shortenedName;
  }else{
    const shortenedName = text.length > value
          ? `${text.substring(0, value)}...`
          : text;
    return shortenedName;
  }
}