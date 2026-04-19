export type LicenseType = "basic" | "premium" | "exclusive";

export interface License {
  type: LicenseType;
  name: string;
  price: number;
  features: string[];
}

export interface Beat {
  id: string;
  title: string;
  producer: string;
  genre: string;
  bpm: number;
  key: string;
  tags: string[];
  coverImage: string;
  audioUrl: string;
  licenses: License[];
  plays: number;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  beat: Beat;
  license: License;
}
