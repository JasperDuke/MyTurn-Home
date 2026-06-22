const DEFAULT_SURVEY_URL = "https://survey.findmyturn.com";

/** Public survey URL — set `NEXT_PUBLIC_SURVEY_URL` in `.env.local` */
export function getSurveyUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SURVEY_URL?.trim();
  return fromEnv || DEFAULT_SURVEY_URL;
}
