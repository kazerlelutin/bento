export class TranslateUtils {
  static interpolate(text: string, params?: Record<string, string>): string {
    if (!params) return text;

    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] ?? match;
    });
  }

  static formatNumber(number: number, locale: string): string {
    return new Intl.NumberFormat(locale).format(number);
  }

  static formatDate(date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  static formatCurrency(amount: number, locale: string, currency: string): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
} 