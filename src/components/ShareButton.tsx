import React, { useState } from 'react';
import { Share2, Linkedin, Facebook, Twitter, MessageCircle, X } from 'lucide-react';
import { SharePlatform, shareToSocialMedia } from "@/utils/sharing"

interface ShareButtonProps {
  jobTitle: string;
  companyName: string;
  jobUrl: string;
  onShare?: (platform: SharePlatform) => void;
}

export function ShareButton({ jobTitle, companyName, jobUrl, onShare }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const handleShare = async (platform: SharePlatform) => {
    await shareToSocialMedia(platform, {
      jobTitle,
      companyName,
      jobUrl,
      customMessage,
    });
    onShare?.(platform);
    setIsOpen(false);
    setCustomMessage('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-neutral-950 rounded-lg transition-colors"
        aria-label="Share job posting"
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Share this job</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close sharing menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Add a custom message (optional)"
            className="w-full p-2 border border-gray-300 rounded-md mb-3 h-24 resize-none"
            maxLength={250}
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center gap-2 p-2 bg-[#0077B5] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 p-2 bg-[#1877F2] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 p-2 bg-black text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center gap-2 p-2 bg-[#25D366] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}