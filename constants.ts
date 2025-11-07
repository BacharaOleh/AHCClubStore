import type { Collection } from './types';

// Helper to create a future date for Kickstarter campaigns
const getFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export const collections: Collection[] = [
  {
    id: 'col1',
    name: 'AHC Crypto Pandas',
    creator: 'AHC Crypto',
    creatorAvatarUrl: 'https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/a0a10c71-3a0e-4c7a-9c7b-7b567d022b3b.jpeg',
    coverImageUrl: 'https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/a0a10c71-3a0e-4c7a-9c7b-7b567d022b3b.jpeg',
    status: 'released',
    collectionAddress: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
    price: '0.05',
    stickers: [
      { id: 's1', name: 'Panda Sticker 1', imageUrl: 'https://picsum.photos/seed/panda1/200/200' },
      { id: 's2', name: 'Panda Sticker 2', imageUrl: 'https://picsum.photos/seed/panda2/200/200' },
      { id: 's3', name: 'Panda Sticker 3', imageUrl: 'https://picsum.photos/seed/panda3/200/200' },
      { id: 's4', name: 'Panda Sticker 4', imageUrl: 'https://picsum.photos/seed/panda4/200/200' },
      { id: 's5', name: 'Panda Sticker 5', imageUrl: 'https://picsum.photos/seed/panda5/200/200' },
      { id: 's6', name: 'Panda Sticker 6', imageUrl: 'https://picsum.photos/seed/panda6/200/200' },
    ],
  },
  {
    id: 'col2',
    name: 'CryptoPunks',
    creator: 'Larva Labs',
    creatorAvatarUrl: 'https://picsum.photos/seed/larva/100/100',
    coverImageUrl: 'https://picsum.photos/seed/punks-cover/600/400',
    status: 'released',
    collectionAddress: 'EQBp43CV55wkmf-sL5hUIu2g6z-ttrgP9x3aKR23Ww-O2E1O',
    price: '1.5',
    stickers: [
      { id: 's7', name: 'Punk #7523', imageUrl: 'https://picsum.photos/seed/punk1/200/200' },
      { id: 's8', name: 'Punk #3100', imageUrl: 'https://picsum.photos/seed/punk2/200/200' },
      { id: 's9', name: 'Punk #7804', imageUrl: 'https://picsum.photos/seed/punk3/200/200' },
      { id: 's10', name: 'Punk #5822', imageUrl: 'https://picsum.photos/seed/punk4/200/200' },
    ],
  },
  {
    id: 'col3',
    name: 'Aid_crypto',
    creator: 'Floyw',
    creatorAvatarUrl: 'https://i.ibb.co/sJFk6Y25/photo-2025-04-16-19-42-48.jpg',
    coverImageUrl: 'https://i.ibb.co/jkR06mLs/photo-2025-11-07-05-02-02.jpg',
    status: 'kickstarter',
    collectionAddress: 'EQDsl3l2Y9n5a5ri2_e1WJc-k_bO526Nn2ed2IuL3dY2sBfM',
    price: '1', // Pledge amount
    fundingGoal: 10,
    fundingRaised: 7.8,
    backers: 124,
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
    id: 'col4',
    name: 'Doodles',
    creator: 'Burnt Toast',
    creatorAvatarUrl: 'https://picsum.photos/seed/doodles-creator/100/100',
    coverImageUrl: 'https://picsum.photos/seed/doodles-cover/600/400',
    status: 'released',
    collectionAddress: 'EQD26-L3g-eQ6b6Xaa-e-k8-a8-a-k-a-b-e-k-Q',
    price: '0.75',
    stickers: [
      { id: 's16', name: 'Doodle #2238', imageUrl: 'https://picsum.photos/seed/doodle1/200/200' },
      { id: 's17', name: 'Doodle #6914', imageUrl: 'https://picsum.photos/seed/doodle2/200/200' },
      { id: 's18', name: 'Doodle #776', imageUrl: 'https://picsum.photos/seed/doodle3/200/200' },
    ],
  },
  {
    id: 'col5',
    name: 'AHC',
    creator: 'Alternative Holders Club',
    creatorAvatarUrl: 'https://e7.pngegg.com/pngimages/761/800/png-clipart-panda-eating-bamboo-eating-panda-animals-pandas.png',
    coverImageUrl: 'https://i.ibb.co/JRZgyfP8/photo-2025-09-30-00-23-25-2.jpg',
    status: 'kickstarter',
    collectionAddress: 'EQC4gPy76c-3tI-d-e-f-i-n-i-t-e-l-y-a-d-d-r-e-s',
    price: '2.5', // Pledge amount
    fundingGoal: 25,
    fundingRaised: 12.1,
    backers: 350,
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
    collectionAddress: 'EQB-a72-B-a-l-a-n-c-e-i-s-z-e-r-o-p-l-e-a-s',
    price: '0.1',
    stickers: [
      { id: 's23', name: 'Cool Cat #1490', imageUrl: 'https://picsum.photos/seed/cat1/200/200' },
      { id: 's24', name: 'Cool Cat #3330', imageUrl: 'https://picsum.photos/seed/cat2/200/200' },
      { id: 's25', name: 'Cool Cat #4669', imageUrl: 'https://picsum.photos/seed/cat3/200/200' },
    ],
  },
];