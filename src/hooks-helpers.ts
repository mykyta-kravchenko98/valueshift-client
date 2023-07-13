export function numberFormat(num: number, options?: Intl.NumberFormatOptions): string {
    let temp = 2;
    if (num < 1 && num > 0.0001) {
      temp = 4;
    }
    if (num < 0.0001) {
      temp = 8;
    }
    let defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: temp,
      minimumFractionDigits: 2,
      notation: 'standard',
      compactDisplay: 'long',
    };
    return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(num);
  }

  export default numberFormat;
  