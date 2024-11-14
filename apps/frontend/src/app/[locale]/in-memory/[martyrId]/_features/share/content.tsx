import React, { useEffect, useState } from "react";
import CopyLink from "./copy-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { socialMediaIconsMapper } from "@/utils/socialMediaIconsMapper";
import { useCurrentLocale } from "@/utils/useCurrentLocale";
import translator from "../../_glossary/translator";

const socialMediaPlatforms = [
  "linkedin",
  "facebook",
  "whatsapp",
  "telegram",
  "instagram",
  "twitter",
] as const;

type SocialMediaPlatform = (typeof socialMediaPlatforms)[number];

type ShareContentProps = {
  url: string;
  title?: string;
  text?: string;
};

export default function ShareContent({ url, title, text }: ShareContentProps) {
  const locale = useCurrentLocale();
  const t = translator(locale);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const shareData = {
    title: title || t.shareTitle({ name: "" }),
    text: text || t.shareText({ name: "" }),
    url,
  };

  const getShareUrl = (platform: SocialMediaPlatform) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(shareData.text);

    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing URLs
    };

    return urls[platform];
  };

  const handleShare = (platform: SocialMediaPlatform) => {
    const shareUrl = getShareUrl(platform);
    // Using optional chaining for window object
    window?.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const canNativeShare = () => {
    if (!isClient) return false;

    try {
      return (
        "share" in navigator &&
        "canShare" in navigator &&
        navigator.canShare(shareData)
      );
    } catch {
      return false;
    }
  };

  const handleNativeShare = async () => {
    if (!isClient) return;

    try {
      await navigator.share(shareData);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <CopyLink />

      <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center justify-center gap-4">
        <Separator orientation="horizontal" className="h-[1px] w-full" />
        <h4 className="text-center text-sm text-gray-500">
          {t.shareOrDirectly()}
        </h4>
        <Separator orientation="horizontal" className="h-[1px] w-full" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {socialMediaPlatforms.map((platform) => (
          <Button
            variant="outline"
            className="flex items-center gap-4 capitalize"
            key={platform}
            onClick={() => handleShare(platform)}
          >
            {socialMediaIconsMapper(platform, 18)}
            {t[platform as keyof typeof t]()}
          </Button>
        ))}
        {isClient && canNativeShare() && (
          <Button
            variant="outline"
            className="col-span-2 w-full"
            onClick={handleNativeShare}
          >
            {t.shareVia()}
          </Button>
        )}
      </div>
    </div>
  );
}
