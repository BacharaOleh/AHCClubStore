
export interface Sticker {
  id: string;
  imageUrl: string;
  name: string;
}

export interface Collection {
  id:string;
  name: string;
  creator: string;
  creatorAvatarUrl: string;
  coverImageUrl: string;
  stickers: Sticker[];
  status: 'kickstarter' | 'released';
  // Optional fields for Kickstarter campaigns
  fundingGoal?: number;
  fundingRaised?: number;
  backers?: number;
  endDate?: string; // ISO 8601 date string
}