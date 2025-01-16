interface TwitterShareData {
    jobUrl: string;
    customMessage?: string;
    jobTitle: string;
    companyName: string;
  }
  
  export function createTwitterShareUrl({
    jobUrl,
    customMessage,
    jobTitle,
    companyName,
  }: TwitterShareData): string {
    const messageWithDetails = customMessage
    ? `${customMessage} [${jobTitle}] [${companyName}]`
    : `Check out this ${jobTitle} position at ${companyName}!`;
  
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(messageWithDetails)}&url=${encodeURIComponent(jobUrl)}`;
}