import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/local-admin", "/api/"],
      },
    ],
    sitemap: "https://citydentalsiwan.com/sitemap.xml",
  };
}
