import { createLinkedInShareUrl } from '@/utils/platforms/linkedin';
import { createFacebookShareUrl } from '@/utils/platforms/facebook';
import { createTwitterShareUrl } from '@/utils/platforms/twitter';
import { createWhatsAppShareUrl } from '@/utils/platforms/whatsapp';

export type SharePlatform = 'linkedin' | 'facebook' | 'twitter' | 'whatsapp';

interface ShareData {
  jobTitle: string;
  companyName: string;
  jobUrl: string;
  customMessage?: string;
}

export async function shareToSocialMedia(
  platform: SharePlatform,
  shareData: ShareData
): Promise<void> {
  let shareUrl = '';

  switch (platform) {
    case 'linkedin':
      shareUrl = createLinkedInShareUrl(shareData);
      break;
    case 'facebook':
      shareUrl = createFacebookShareUrl(shareData);
      break;
    case 'twitter':
      shareUrl = createTwitterShareUrl(shareData);
      break;
    case 'whatsapp':
      shareUrl = createWhatsAppShareUrl(shareData);
      break;
  }
  trackShareEvent(platform, shareData.jobTitle);
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function trackShareEvent(platform: SharePlatform, jobTitle: string) {
}