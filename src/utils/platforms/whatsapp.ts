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
    const messageWithDetails = customMessage
    ? `${customMessage} [${jobTitle}] [${companyName}]`
    : `Check out this ${jobTitle} position at ${companyName}!`;
  
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(messageWithDetails)}%20${encodeURIComponent(jobUrl)}`;
}