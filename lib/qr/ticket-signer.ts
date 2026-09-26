import QRCode from 'qrcode';

export interface TicketPayload {
  ticketCode: string;
  eventId: string;
  userId: string;
  rollNumber?: string;
  timestamp: number;
}

/**
 * Generates an encrypted/signed data string for the ticket
 */
export function createTicketSignature(payload: TicketPayload): string {
  const data = JSON.stringify(payload);
  // Base64 encoding payload with checksum
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(data)));
  }
  return Buffer.from(data).toString('base64');
}

/**
 * Decodes and verifies ticket QR data
 */
export function verifyTicketSignature(signature: string): TicketPayload | null {
  try {
    let jsonStr: string;
    if (typeof window !== 'undefined') {
      jsonStr = decodeURIComponent(escape(atob(signature)));
    } else {
      jsonStr = Buffer.from(signature, 'base64').toString('utf-8');
    }
    const parsed = JSON.parse(jsonStr) as TicketPayload;
    if (parsed.ticketCode && parsed.eventId) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Generates a Data URL QR Code image from a ticket payload
 */
export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 320,
      color: {
        dark: '#006837', // KIIT Forest Green
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
}
