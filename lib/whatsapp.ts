export function getWhatsAppNumber(): string {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
}

export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber().length >= 10;
}

export function getWhatsAppBuyUrl(productName: string): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const text = `Hello, I'm interested in purchasing ${productName} Eau de Parfum.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
