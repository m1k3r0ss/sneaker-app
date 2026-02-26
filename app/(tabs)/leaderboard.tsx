import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function LeaderboardScreen() {
    const [filter, setFilter] = useState<'All' | 'Running'>('All');

    return (
        <View className="flex-1 bg-zinc-950 pt-16 px-6">
            <Text className="text-white text-3xl font-bold mb-6">Top Sneakers</Text>

            {/* Filter Tabs */}
            <View className="flex-row bg-zinc-900 p-1 rounded-xl mb-6 border border-zinc-800">
                <TouchableOpacity
                    onPress={() => setFilter('All')}
                    className={`flex-1 py-3 items-center rounded-lg ${filter === 'All' ? 'bg-zinc-800' : ''}`}
                >
                    <Text className={`font-semibold ${filter === 'All' ? 'text-white' : 'text-zinc-400'}`}>All Kicks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setFilter('Running')}
                    className={`flex-1 py-3 items-center rounded-lg ${filter === 'Running' ? 'bg-zinc-800' : ''}`}
                >
                    <Text className={`font-semibold ${filter === 'Running' ? 'text-white' : 'text-zinc-400'}`}>Running Shoes</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Mock Leaderboard */}
                {[
                    { rank: 1, name: 'Nike Pegasus 40', user: '@fastrunner', steps: 142500, img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80' },
                    { rank: 2, name: 'Air Jordan 1 Retro High OG', user: '@sneakerhead99', steps: 89300, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80' },
                    { rank: 3, name: 'Yeezy Boost 350 V2', user: '@hypebeast', steps: 75200, img: 'https://images.unsplash.com/photo-1614676477977-11100f7d54eb?w=400&q=80' }
                ]
                    .filter(item => filter === 'All' || item.name.includes('Pegasus'))
                    .map((player) => (
                        <View key={player.rank} className="flex-row bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-4 items-center">
                            <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${player.rank === 1 ? 'bg-yellow-500/20' : player.rank === 2 ? 'bg-zinc-300/20' : player.rank === 3 ? 'bg-amber-700/20' : 'bg-zinc-800'}`}>
                                <Text className={`font-bold ${player.rank === 1 ? 'text-yellow-500' : player.rank === 2 ? 'text-zinc-300' : player.rank === 3 ? 'text-amber-700' : 'text-zinc-400'}`}>{player.rank}</Text>
                            </View>
                            <Image source={{ uri: player.img }} className="w-12 h-12 rounded-lg bg-zinc-800" resizeMode="cover" />
                            <View className="flex-1 ml-4 justify-center">
                                <Text className="text-white text-base font-bold" numberOfLines={1}>{player.name}</Text>
                                <Text className="text-zinc-400 text-xs mt-1">{player.user}</Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-white font-bold">{player.steps.toLocaleString()}</Text>
                                <Text className="text-zinc-500 text-[10px] uppercase">Steps</Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </View>
    );
}
