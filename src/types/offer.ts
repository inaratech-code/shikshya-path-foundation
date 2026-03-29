export type PublishedOffer = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  /** When false, hidden from public site and floating panel */
  active: boolean;
  createdAt: string;
};
