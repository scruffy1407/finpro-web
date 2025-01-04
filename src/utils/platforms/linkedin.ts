interface LinkedInShareData {
    jobTitle: string;
    companyName: string;
    jobUrl: string;
    customMessage?: string;
  }
  
  export function createLinkedInShareUrl({
    jobTitle,
    companyName,
    jobUrl,
    customMessage,
  }: LinkedInShareData): string {
    const summary = customMessage
      ? `${customMessage}\n\nPosition: ${jobTitle}\nCompany: ${companyName}`
      : `Check out this exciting ${jobTitle} position at ${companyName}!`;
  
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      jobUrl
    )}&summary=${encodeURIComponent(summary)}`;
  }