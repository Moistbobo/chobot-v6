import i18next from "i18next";
import en from "./en";

const i18n = i18next.init({
  lng: "en",
  ns: Object.keys(en),
  resources: {
    en,
  },
  defaultNS: "status",
  compatibilityJSON: "v3",
});

export default i18n;
