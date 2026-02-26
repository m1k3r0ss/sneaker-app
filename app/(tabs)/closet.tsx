import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { searchSneakers, Sneaker, isRunningShoe } from '../../lib/sneakerdb';

export default function ClosetScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Sneaker[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Mock user collection for now until we link Supabase
    const [collection, setCollection] = useState([
        { id: '1', name: 'Air Jordan 1 Retro High OG', brand: 'Jordan', steps: 12400, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80', isRunning: false },
        { id: '2', name: 'Nike Pegasus 40', brand: 'Nike', steps: 45200, isRunning: true, img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80' },
        { id: '3', name: 'Yeezy Boost 350 V2', brand: 'adidas', steps: 8300, img: 'https://images.unsplash.com/photo-1614676477977-11100f7d54eb?w=400&q=80', isRunning: false }
    ]);

    // Handle search debouncing
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            try {
                const results = await searchSneakers(searchQuery);
                setSearchResults(results);
            } catch (err) {
                console.error("Search failed", err);
            } finally {
                setIsLoading(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <View className="flex-1 bg-zinc-950 pt-16 px-6">
            <Text className="text-white text-3xl font-bold mb-6">Your Closet</Text>

            <View className="flex-row bg-zinc-900 rounded-2xl items-center px-4 py-3 border border-zinc-800 mb-6">
                <Ionicons name="search" size={20} color="#a1a1aa" />
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search sneakers to add..."
                    placeholderTextColor="#a1a1aa"
                    className="flex-1 text-white ml-3 text-base"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#52525b" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {searchQuery.trim().length > 0 ? (
                    /* Search Results View */
                    <View>
                        <Text className="text-white text-xl font-semibold mb-4">Search Results</Text>

                        {isLoading ? (
                            <ActivityIndicator size="large" color="#38bdf8" className="mt-8" />
                        ) : searchResults.length === 0 ? (
                            <Text className="text-zinc-500 text-center mt-8">No sneakers found for "{searchQuery}"</Text>
                        ) : (
                            searchResults.map((shoe) => (
                                <TouchableOpacity key={shoe.id} className="flex-row bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-4 items-center">
                                    <Image
                                        source={{ uri: shoe.image?.thumbnail || shoe.image?.original || 'https://via.placeholder.com/150' }}
                                        className="w-20 h-20 rounded-xl bg-zinc-800"
                                        resizeMode="contain"
                                    />
                                    <View className="flex-1 ml-4 justify-center">
                                        <Text className="text-white text-lg font-bold" numberOfLines={1}>{shoe.name}</Text>
                                        <Text className="text-zinc-400 text-sm mt-1">{shoe.brand} • {shoe.colorway}</Text>
                                        <View className="flex-row items-center mt-2">
                                            {isRunningShoe(shoe) && (
                                                <View className="bg-sky-500/20 px-2 py-0.5 rounded mr-3">
                                                    <Text className="text-sky-400 text-[10px] font-bold uppercase">Running</Text>
                                                </View>
                                            )}
                                            <Text className="text-emerald-400 text-xs font-semibold">
                                                ~${shoe.estimatedMarketValue || '--'}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity className="bg-white/10 p-2 rounded-full">
                                        <Ionicons name="add" size={20} color="white" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                ) : (
                    /* Collection View */
                    <View>
                        <Text className="text-white text-xl font-semibold mb-4">Collection ({collection.length})</Text>

                        {collection.map((shoe) => (
                            <TouchableOpacity key={shoe.id} className="flex-row bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-4 items-center">
                                <Image source={{ uri: shoe.img }} className="w-20 h-20 rounded-xl bg-zinc-800" resizeMode="cover" />
                                <View className="flex-1 ml-4 justify-center">
                                    <Text className="text-white text-lg font-bold" numberOfLines={1}>{shoe.name}</Text>
                                    <Text className="text-zinc-400 text-sm mt-1">{shoe.brand}</Text>
                                    <View className="flex-row items-center mt-2">
                                        <Ionicons name="footsteps" size={14} color="#34d399" />
                                        <Text className="text-zinc-300 text-xs font-semibold ml-1">{shoe.steps.toLocaleString()} steps</Text>
                                        {shoe.isRunning && (
                                            <View className="bg-sky-500/20 px-2 py-0.5 rounded ml-3">
                                                <Text className="text-sky-400 text-[10px] font-bold uppercase">Running</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#52525b" />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
