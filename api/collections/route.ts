
import { kv } from '@vercel/kv';
import { collections as initialCollections } from '../../constants';
import type { Collection } from '../../types';

// Vercel Edge functions can handle different request methods.
export async function GET() {
  const COLLECTIONS_KEY = 'ton-store-collections';

  try {
    let collections: Collection[] | null = await kv.get(COLLECTIONS_KEY);

    // If KV is empty (first time running), initialize it with our constants.
    if (!collections || collections.length === 0) {
      await kv.set(COLLECTIONS_KEY, initialCollections);
      collections = initialCollections;
    }

    return new Response(JSON.stringify(collections), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch collections from KV:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {
  const COLLECTIONS_KEY = 'ton-store-collections';

  try {
    const updatedCollection: Collection = await request.json();

    // Get the current list of all collections
    const allCollections: Collection[] | null = await kv.get(COLLECTIONS_KEY);

    if (!allCollections) {
      return new Response('Collections data not found in store.', { status: 404 });
    }

    // Find and update the specific collection
    const newCollections = allCollections.map(c => 
      c.id === updatedCollection.id ? updatedCollection : c
    );

    // Save the entire updated array back to KV
    await kv.set(COLLECTIONS_KEY, newCollections);

    return new Response(JSON.stringify({ success: true, updatedCollection }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Failed to update collection in KV:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
