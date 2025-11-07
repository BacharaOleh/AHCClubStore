
import type { Collection } from './types';

// Helper to create a future date for Kickstarter campaigns
const getFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

// NOTE: This is the central wallet address for the store.
// All minting/backing transactions for collections will be sent to this address.
const STORE_WALLET_ADDRESS = 'UQCw9Rg6XOwKRehOD2qBOscw67s58Bv715f-lVMWbELFpRLm';


export const collections: Collection[] = [

  {
    id: 'col3',
    name: 'Aid_crypto',
    creator: 'Floyw',
    creatorAvatarUrl: 'https://i.ibb.co/sJFk6Y25/photo-2025-04-16-19-42-48.jpg',
    coverImageUrl: 'https://i.ibb.co/jkR06mLs/photo-2025-11-07-05-02-02.jpg',
    status: 'kickstarter',
    collectionAddress: STORE_WALLET_ADDRESS,
    price: '1', // Pledge amount
    fundingGoal: 10,
    fundingRaised: 0,
    backers: 0,
    endDate: getFutureDate(15),
    stickers: [
      { id: 's11', name: 'Azuki #9605', imageUrl: 'https://picsum.photos/seed/azuki1/200/200' },
      { id: 's12', name: 'Azuki #4668', imageUrl: 'https://picsum.photos/seed/azuki2/200/200' },
      { id: 's13', name: 'Azuki #1491', imageUrl: 'https://picsum.photos/seed/azuki3/200/200' },
      { id: 's14', name: 'Azuki #2450', imageUrl: 'https://picsum.photos/seed/azuki4/200/200' },
      { id: 's15', name: 'Azuki #3333', imageUrl: 'https://picsum.photos/seed/azuki5/200/200' },
    ],
  },
 
  {
    id: 'col5',
    name: 'AHC',
    creator: 'Alternative Holders Club',
    creatorAvatarUrl: 'https://e7.pngegg.com/pngimages/761/800/png-clipart-panda-eating-bamboo-eating-panda-animals-pandas.png',
    coverImageUrl: 'https://i.ibb.co/JRZgyfP8/photo-2025-09-30-00-23-25-2.jpg',
    status: 'kickstarter',
    collectionAddress: STORE_WALLET_ADDRESS,
    price: '0.1', // Pledge amount
    fundingGoal: 25,
    fundingRaised: 0,
    backers: 0,
    endDate: getFutureDate(28),
    stickers: [
      { id: 's19', name: 'Moonbird #2642', imageUrl: 'https://picsum.photos/seed/bird1/200/200' },
      { id: 's20', name: 'Moonbird #7963', imageUrl: 'https://picsum.photos/seed/bird2/200/200' },
      { id: 's21', name: 'Moonbird #6225', imageUrl: 'https://picsum.photos/seed/bird3/200/200' },
      { id: 's22', name: 'Moonbird #3730', imageUrl: 'https://picsum.photos/seed/bird4/200/200' },
    ],
  },
  {
    id: 'col6',
    name: 'Cool Cats',
    creator: 'Cool Cats NFT',
    creatorAvatarUrl: 'https://picsum.photos/seed/coolcats-creator/100/100',
    coverImageUrl: 'https://picsum.photos/seed/coolcats-cover/600/400',
    status: 'released',
    collectionAddress: STORE_WALLET_ADDRESS,
    price: '0.1',
    stickers: [
      { id: 's23', name: 'Cool Cat #1490', imageUrl: 'https://picsum.photos/seed/cat1/200/200' },
      { id: 's24', name: 'Cool Cat #3330', imageUrl: 'https://picsum.photos/seed/cat2/200/200' },
      { id: 's25', name: 'Cool Cat #4669', imageUrl: 'https://picsum.photos/seed/cat3/200/200' },
    ],
  },
];
