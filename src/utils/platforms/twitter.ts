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
    const text = customMessage || `Check out this ${jobTitle} position at ${companyName}!`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(jobUrl)}`;
  }