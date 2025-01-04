interface WhatsAppShareData {
    jobUrl: string;
    customMessage?: string;
    jobTitle: string;
    companyName: string;
  }
  
  export function createWhatsAppShareUrl({
    jobUrl,
    customMessage,
    jobTitle,
    companyName,
  }: WhatsAppShareData): string {
    const text = customMessage || `Check out this ${jobTitle} position at ${companyName}!`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(jobUrl)}`;
  }