import LanguageCard from "./language-card";
import { supportedLocales } from "@/lib/supportedLanguages";
import { useState, useEffect } from "react";

const languagesObject = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
};

export default function LanguageSwitcherContent() {
  const [recommendedLanguages, setRecommendedLanguages] = useState<string[]>(
    [],
  );
  const [otherLanguages, setOtherLanguages] = useState<string[]>([]);

  useEffect(() => {
    // Get browser languages and process them
    const browserRecommendedLanguages = navigator.languages.map(
      (language) => language.split("-")[0],
    );

    // Remove duplicates
    const uniqueRecommended = Array.from(new Set(browserRecommendedLanguages))
      // Filter to only include supported languages
      .filter((lang) => Object.keys(languagesObject).includes(lang));

    // Set recommended languages
    setRecommendedLanguages(uniqueRecommended);

    // Set other languages
    setOtherLanguages(
      supportedLocales.filter(
        (language) => !uniqueRecommended.includes(language),
      ),
    );
  }, []); // Empty dependency array means this runs once on mount
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
                language={
                  languagesObject[language as keyof typeof languagesObject]
                }
                locale={language}
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
              language={
                languagesObject[language as keyof typeof languagesObject]
              }
              locale={language}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
