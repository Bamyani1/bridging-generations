export type StudentConsentStatus = "granted" | "pending" | "denied" | "revoked";

export type StudentConsentScope =
  | "website"
  | "print-materials"
  | "social-media"
  | "grant-reports"
  | "press";

export type StudentConsent = {
  portraitReleaseStatus: StudentConsentStatus;
  storyReleaseStatus: StudentConsentStatus;
  consentScope: readonly StudentConsentScope[];
  revokable?: boolean;
  signedDate?: string | null;
  releaseFormId?: string | null;
  revokedAt?: string | null;
};

export function canShowPortrait(consent?: StudentConsent | null): boolean {
  if (!consent) return false;
  if (consent.portraitReleaseStatus !== "granted") return false;
  if (consent.revokedAt) return false;
  return consent.consentScope.includes("website");
}

export function canShowStory(consent?: StudentConsent | null): boolean {
  if (!consent) return false;
  if (consent.storyReleaseStatus !== "granted") return false;
  if (consent.revokedAt) return false;
  return consent.consentScope.includes("website");
}
