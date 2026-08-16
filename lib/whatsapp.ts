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

type OrderOpts = {
  variantName?: string;
  unitPrice?: number;
  total?: number;
  mrp?: number;
  offerPrice?: number | null;
};

/** Quantity-aware order link used on the PDP (my-op wording). */
export function getWhatsAppOrderUrl(
  productName: string,
  quantity: number,
  opts?: OrderOpts
): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;

  let text = `Hi, I'd like to order ${quantity} × ${productName}`;
  if (opts?.variantName) {
    text += ` (${opts.variantName})`;
  }
  text += '.';

  if (opts?.unitPrice != null && opts.total != null) {
    const lines = [
      '',
      `Product: ${productName}`,
      opts.variantName ? `Variant: ${opts.variantName}` : null,
      `Quantity: ${quantity}`,
      opts.mrp != null ? `MRP: ₹${opts.mrp}` : null,
      opts.offerPrice != null && opts.offerPrice > 0
        ? `Offer Price: ₹${opts.offerPrice}`
        : null,
      `Final Price: ₹${opts.unitPrice} each`,
      `Total: ₹${opts.total}`,
    ].filter(Boolean);
    text += `\n${lines.join('\n')}`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
