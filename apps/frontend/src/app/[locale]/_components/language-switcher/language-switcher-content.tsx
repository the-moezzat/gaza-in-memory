import LanguageCard from "./language-card";
import {
  enabledLanguages,
  languageNames,
  type SupportedLocale,
  supportedLocale,
} from "@/lib/supportedLanguages";
import { useState, useEffect } from "react";

export default function LanguageSwitcherContent() {
  const [recommendedLanguages, setRecommendedLanguages] = useState<
    SupportedLocale[]
  >([]);
  const [otherLanguages, setOtherLanguages] = useState<SupportedLocale[]>([]);

  useEffect(() => {
    const browserRecommendedLanguages: SupportedLocale[] =
      navigator.languages.map(
        (language) => language.split("-")[0] as SupportedLocale,
      );

    // Remove duplicates
    const uniqueRecommended = Array.from(new Set(browserRecommendedLanguages))
      // Filter to only include supported languages
      .filter((lang) => Object.keys(languageNames).includes(lang));

    // Set recommended languages
    setRecommendedLanguages(uniqueRecommended);

    // Set other languages
    setOtherLanguages(
      supportedLocale.filter(
        (language) => !uniqueRecommended.includes(language),
      ),
    );
  }, []);

  return (
    <div className="mt-4 space-y-6">
      {recommendedLanguages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Recommended languages
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {recommendedLanguages.map((language) => (
              <LanguageCard
                key={language}
                language={languageNames[language]}
                locale={language}
                enabled={enabledLanguages.includes(language)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Supported languages
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {otherLanguages.map((language) => (
            <LanguageCard
              key={language}
              language={languageNames[language]}
              locale={language}
              enabled={enabledLanguages.includes(language)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
