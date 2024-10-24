import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export function getLocaleFromUrl(): string {
  const headersList = (headers() as unknown as UnsafeUnwrappedHeaders);
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const fullUrl = `${protocol}://${host}${headersList.get("x-invoke-path") || ""}`;

  try {
    const url = new URL(fullUrl);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    return pathSegments[0] || "en"; // Default to 'en' if no locale found
  } catch (error) {
    console.error("Error parsing URL:", error);
    return "en"; // Default to 'en' in case of error
  }
}
