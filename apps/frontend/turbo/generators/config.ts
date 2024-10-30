import type { PlopTypes } from "@turbo/gen";
import path from "path";
import * as fs from "fs";
import { SupportedLocale } from "@/lib/supportedLanguages";

export const supportedLocale: SupportedLocale[] = [
  "en",
  "de",
  "fr",
  "es",
  "ar",
  "he",
  "it",
  "ja",
  "ko",
  "nl",
  "pl",
  "pt",
  "ru",
  "zh",
];

// Helper functions
function uppercase(str: string): string {
  return str.toUpperCase();
}

function arabicPlaceholder(str: string): string {
  return `${str}_ar`;
}

function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(`Error checking file existence at ${filePath}:`, error);
    return false;
  }
}

// Get the correct base path for the project
function getBasePath(): string {
  const possiblePaths = [
    path.join(process.cwd(), "apps/frontend/src/app/[locale]"),
    path.join(process.cwd(), "src/app/[locale]"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      console.log(`Found valid base path: ${p}`);
      return p;
    }
  }

  // Default to the first path if none found
  console.log(`Using default base path: ${possiblePaths[0]}`);
  return possiblePaths[0];
}

// Read and parse TypeScript file
function parseTypeScriptFile(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return null;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return null;
  }
}

// Extract keys from Definition file
function extractDefinitionKeys(content: string): string[] {
  const matches = content.match(/\w+(?=:\s*undefined;)/g);
  return matches || [];
}

// Extract existing translations
function extractExistingTranslations(content: string): Record<string, string> {
  const translations: Record<string, string> = {};
  const regex = /(\w+):\s*["'`]([^"'`]+)["'`]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    translations[match[1]] = match[2];
  }
  return translations;
}

function getDefaultTranslation(key: string, lang: string): string {
  switch (lang) {
    case "ar":
      return `${key}_ar`;
    case "he":
      return `${key}_he`;
    case "ja":
      return `${key}_ja`;
    case "ko":
      return `${key}_ko`;
    case "zh":
      return `${key}_zh`;
    default:
      return key;
  }
}

function needsUpdate(
  existingKeys: string[],
  definitionKeys: string[],
): boolean {
  return definitionKeys.some((key) => !existingKeys.includes(key));
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Add custom helpers
  plop.setHelper("uppercase", uppercase);
  plop.setHelper("arabicPlaceholder", arabicPlaceholder);

  // Create a generator called "translation"
  plop.setGenerator("translation", {
    description: "Generate translation structure for a new route",
    prompts: [
      {
        type: "input",
        name: "route",
        message: "What is the route name? (e.g., about, contact)",
        validate: (input: string) => {
          if (input.trim().length === 0) {
            return "Route name is required";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "translations",
        message:
          "Enter translation keys (comma separated, e.g., title,description,button)",
        validate: (input: string) => {
          if (input.trim().length === 0) {
            return "At least one translation key is required";
          }
          return true;
        },
      },
      //   {
      //     type: "confirm",
      //     name: "addMoreLanguages",
      //     message:
      //       "Do you want to add more languages besides English and Arabic?",
      //     default: false,
      //   },
      //   {
      //     type: "input",
      //     name: "languages",
      //     message:
      //       "Enter additional language codes (comma separated, e.g., fr,es,de)",
      //     when: (answers) => answers.addMoreLanguages,
      //   },
      {
        type: "confirm",
        name: "force",
        message: "Files already exist. Do you want to overwrite them?",
        default: false,
        when: (answers) => {
          const glossaryPath = path.join(
            "src/app/[locale]",
            answers.route,
            "_glossary",
          );
          return fileExists(glossaryPath);
        },
      },
    ],
    actions: (answers) => {
      const translationKeys = answers?.translations
        .split(",")
        .map((key: string) => key.trim());
      //   const baseLanguages = ["en", "ar"];
      //   const additionalLanguages = answers?.languages
      //     ? answers?.languages.split(",").map((lang: string) => lang.trim())
      //     : [];
      const allLanguages = supportedLocale;

      // If files exist and force is false, skip
      const glossaryPath = path.join(
        "src/app/[locale]",
        answers?.route,
        "_glossary",
      );

      if (fileExists(glossaryPath) && !answers?.force) {
        console.log(
          "Skipping file generation as files already exist and force option was not selected.",
        );
        return [];
      }

      const actions = [];

      // Create Definition.d.ts
      actions.push({
        type: "add",
        path: `src/app/[locale]/{{route}}/_glossary/Definition.d.ts`,
        templateFile: "templates/definition.hbs",
        force: answers?.force || false,
        data: {
          translationKeys,
        },
      });

      // Create translator.ts
      actions.push({
        type: "add",
        path: `src/app/[locale]/{{route}}/_glossary/translator.ts`,
        templateFile: "templates/translator.hbs",
        force: answers?.force || false,
        data: {
          languages: allLanguages,
        },
      });

      // Create language files
      allLanguages.forEach((lang) => {
        actions.push({
          type: "add",
          path: `src/app/[locale]/{{route}}/_glossary/languages/${lang}.ts`,
          templateFile: "templates/language.hbs",
          force: answers?.force || false,
          data: {
            lang,
            translationKeys,
            isArabic: lang === "ar",
          },
        });
      });

      return actions;
    },
  });

  plop.setGenerator("sync-translations", {
    description: "Sync translations with Definition file",
    prompts: [
      {
        type: "input",
        name: "route",
        message: "What is the route name to sync translations for?",
        validate: (input: string) => {
          if (input.trim().length === 0) {
            return "Route name is required";
          }

          const basePath = getBasePath();
          const definitionPath = path.join(
            basePath,
            input.trim(),
            "_glossary/Definition.d.ts",
          );

          console.log(`Checking for Definition file at: ${definitionPath}`);

          if (!fileExists(definitionPath)) {
            return "Definition file not found. Please check the route path.";
          }

          return true;
        },
      },
    ],
    actions: (answers) => {
      const actions:
        | PlopTypes.ActionType[]
        | {
            type: string;
            path: string;
            templateFile: string;
            force: boolean;
            data: {
              lang: SupportedLocale;
              translationKeys: { key: string; value: string }[];
              isArabic: boolean;
            };
          }[] = [];

      const routePath = answers?.route.trim();
      const basePath = getBasePath();
      const glossaryPath = path.join(basePath, routePath, "_glossary");
      const definitionPath = path.join(glossaryPath, "Definition.d.ts");

      console.log(`Using glossary path: ${glossaryPath}`);

      // Read Definition file
      const definitionContent = parseTypeScriptFile(definitionPath);
      if (!definitionContent) {
        throw new Error("Could not read Definition file");
      }

      // Extract keys from Definition
      const definitionKeys = extractDefinitionKeys(definitionContent);
      console.log(
        `\nFound ${definitionKeys.length} keys in Definition file:`,
        definitionKeys,
      );

      let updatedCount = 0;
      let createdCount = 0;

      supportedLocale.forEach((lang) => {
        const langFilePath = path.join(glossaryPath, "languages", `${lang}.ts`);
        let existingTranslations: Record<string, string> = {};
        let isNewFile = !fileExists(langFilePath);

        // If language file exists, read existing translations
        if (!isNewFile) {
          const langContent = parseTypeScriptFile(langFilePath);
          if (langContent) {
            existingTranslations = extractExistingTranslations(langContent);
            console.log(
              `\nExisting translations for ${lang}:`,
              Object.keys(existingTranslations),
            );
          }
        }

        // Check if we need to update this file
        const existingKeys = Object.keys(existingTranslations);
        if (isNewFile || needsUpdate(existingKeys, definitionKeys)) {
          // Prepare translation data
          const translationKeys = definitionKeys.map((key) => ({
            key,
            value:
              existingTranslations[key] || getDefaultTranslation(key, lang),
          }));

          // Create or update language file
          actions.push({
            type: "add",
            path: path.join(
              "src/app/[locale]",
              routePath,
              "_glossary/languages",
              `${lang}.ts`,
            ),
            templateFile: "templates/existingLanguage.hbs",
            force: true,
            data: {
              lang,
              translationKeys,
              isArabic: lang === "ar",
            },
          });

          if (isNewFile) {
            createdCount++;
            console.log(`\nCreating new translation file for ${lang}`);
          } else {
            updatedCount++;
            console.log(`\nUpdating existing translations for ${lang}`);
            const newKeys = definitionKeys.filter(
              (key) => !existingKeys.includes(key),
            );
            console.log(`New keys being added for ${lang}:`, newKeys);
          }
        } else {
          console.log(`\nNo updates needed for ${lang}`);
        }
      });

      console.log(`\nSummary:`);
      console.log(`- Created ${createdCount} new translation files`);
      console.log(`- Updated ${updatedCount} existing translation files`);
      console.log(`- Total keys in Definition: ${definitionKeys.length}`);

      return actions;
    },
  });
}
