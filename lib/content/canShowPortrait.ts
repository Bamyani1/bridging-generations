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
  signedDate?: string;
  releaseFormId?: string;
  consentScope: StudentConsentScope[];
  revokable: boolean;
  revokedAt?: string;
};

export function canShowPortrait(consent?: StudentConsent): boolean {
  if (!consent) return false;
  if (consent.portraitReleaseStatus !== "granted") return false;
  if (consent.revokedAt) return false;
  return consent.consentScope.includes("website");
}

export function canShowStory(consent?: StudentConsent): boolean {
  if (!consent) return false;
  if (consent.storyReleaseStatus !== "granted") return false;
  if (consent.revokedAt) return false;
  return consent.consentScope.includes("website");
}
