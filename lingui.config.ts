import { LinguiConfig } from "@lingui/conf";

const config: Partial<LinguiConfig> = {
  locales: ["en", "ms"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "minimal",
};

export default config;
