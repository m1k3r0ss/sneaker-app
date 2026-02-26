import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TodayScreen() {
    return (
        <View className="flex-1 bg-zinc-950 pt-16 px-6">
            <View className="flex-row justify-between items-center mb-8">
                <View>
                    <Text className="text-zinc-400 text-lg font-medium">Hello, Sneakerhead</Text>
                    <Text className="text-white text-3xl font-bold mt-1">Today's Check-in</Text>
                </View>
                <TouchableOpacity className="w-12 h-12 bg-zinc-800 rounded-full items-center justify-center">
                    <Ionicons name="notifications-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="bg-zinc-900 rounded-3xl p-6 mb-6 border border-zinc-800">
                    <View className="flex-row items-center mb-4">
                        <Ionicons name="camera-outline" size={24} color="#38bdf8" />
                        <Text className="text-white text-xl font-semibold ml-2">Sneaker Login</Text>
                    </View>
                    <Text className="text-zinc-400 text-base mb-6 leading-6">
                        Verify the shoe you are wearing today to start tracking its steps.
                    </Text>
                    <TouchableOpacity className="bg-sky-500 py-4 rounded-2xl items-center flex-row justify-center">
                        <Ionicons name="aperture" size={20} color="white" />
                        <Text className="text-white text-lg font-bold ml-2">Snap to Verify</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between mb-6 gap-4">
                    <View className="flex-1 bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
                        <Ionicons name="footsteps" size={28} color="#34d399" className="mb-2" />
                        <Text className="text-3xl font-bold text-white mt-2">0</Text>
                        <Text className="text-zinc-400 text-sm mt-1">Steps Today</Text>
                    </View>

                    <View className="flex-1 bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
                        <Ionicons name="flame" size={28} color="#fbbf24" className="mb-2" />
                        <Text className="text-3xl font-bold text-white mt-2">--</Text>
                        <Text className="text-zinc-400 text-sm mt-1">Active Shoe</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
