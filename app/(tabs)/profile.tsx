import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-zinc-950 pt-16 px-6">
            <Text className="text-white text-3xl font-bold mb-8">Profile</Text>

            <View className="items-center mb-8">
                <View className="w-24 h-24 bg-zinc-800 rounded-full items-center justify-center mb-4 border-2 border-zinc-700">
                    <Ionicons name="person" size={40} color="#a1a1aa" />
                </View>
                <Text className="text-white text-2xl font-bold">@sneakerhead</Text>
                <Text className="text-zinc-400 text-sm mt-1">Joined Feb 2026</Text>
            </View>

            <View className="flex-row justify-between mb-8 gap-4">
                <View className="flex-1 bg-zinc-900 rounded-2xl p-5 border border-zinc-800 items-center">
                    <Text className="text-2xl font-bold text-white mb-1">3</Text>
                    <Text className="text-zinc-400 text-xs uppercase font-semibold">Pairs Owned</Text>
                </View>
                <View className="flex-1 bg-zinc-900 rounded-2xl p-5 border border-zinc-800 items-center">
                    <Text className="text-2xl font-bold text-white mb-1">290k</Text>
                    <Text className="text-zinc-400 text-xs uppercase font-semibold">Total Steps</Text>
                </View>
            </View>

            <View className="bg-zinc-900 rounded-3xl border border-zinc-800 px-4 py-2">
                <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-zinc-800/50">
                    <View className="flex-row items-center">
                        <Ionicons name="settings-outline" size={24} color="#a1a1aa" />
                        <Text className="text-white text-lg ml-3">Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#52525b" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-zinc-800/50">
                    <View className="flex-row items-center">
                        <Ionicons name="link-outline" size={24} color="#a1a1aa" />
                        <Text className="text-white text-lg ml-3">Sync Health Sources</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#52525b" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-between py-4">
                    <View className="flex-row items-center">
                        <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                        <Text className="text-red-500 text-lg ml-3">Log Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
