interface FacebookShareData {
    jobUrl: string;
    customMessage?: string;
    jobTitle: string;
    companyName: string;
  }
  
  export function createFacebookShareUrl({
    jobUrl,
    customMessage,
    jobTitle,
    companyName,
  }: FacebookShareData): string {
    const text = customMessage || `Check out this ${jobTitle} position at ${companyName}!`;
  
    // Facebook sharing URL with properly encoded parameters
    const baseUrl = 'https://www.facebook.com/sharer/sharer.php';
    const params = new URLSearchParams({
      u: jobUrl,
      quote: text,
    });
  
    return `${baseUrl}?${params.toString()}`;
  }
  