const API_BASE = 'https://api.thesneakerdatabase.com/v1';

export type Sneaker = {
    id: string;
    brand: string;
    name: string;
    colorway: string;
    estimatedMarketValue: number;
    image: {
        original: string;
        small: string;
        thumbnail: string;
    };
    releaseDate: string;
};

// The web app will hit the local Express backend
const BACKEND_URL = 'http://localhost:3000';

export const searchSneakers = async (query: string): Promise<Sneaker[]> => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/sneakers/search?query=${encodeURIComponent(query)}&limit=10`);
        if (!res.ok) throw new Error('Failed to fetch from local sneaks backend');

        const products = await res.json();

        if (!products || products.length === 0) return [];

        // Map the backend Sneaks API response to our app's Sneaker type
        const mappedResults: Sneaker[] = products.map((shoe: any) => ({
            id: shoe.styleID || Math.random().toString(),
            brand: shoe.brand || 'Unknown',
            name: shoe.sneakerName || shoe.shoeName,
            colorway: shoe.colorway || 'Standard',
            estimatedMarketValue: shoe.lowestResellPrice?.stockX || shoe.retailPrice || 0,
            image: {
                original: shoe.thumbnail || '',
                small: shoe.thumbnail || '',
                thumbnail: shoe.thumbnail || '',
            },
            releaseDate: shoe.releaseDate || ''
        }));

        return mappedResults;
    } catch (error) {
        console.error("Sneaks-API search error:", error);
        return [];
    }
}

export const isRunningShoe = (sneaker: Sneaker): boolean => {
    // Logic to determine if a shoe is a running shoe 
    // e.g., using name keywords or category flags if the API provides it.
    const name = sneaker.name.toLowerCase();
    return name.includes('zoomx') ||
        name.includes('pegasus') ||
        name.includes('running') ||
        name.includes('ultraboost') ||
        name.includes('adizero') ||
        name.includes('hoka') ||
        name.includes('brooks');
};
