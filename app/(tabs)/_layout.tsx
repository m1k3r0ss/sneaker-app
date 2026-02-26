import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#09090b', // zinc-950
                borderTopColor: '#27272a', // zinc-800
            },
            tabBarActiveTintColor: '#38bdf8', // sky-400
            tabBarInactiveTintColor: '#a1a1aa', // zinc-400
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Today',
                    tabBarIcon: ({ color }) => <Ionicons name="footsteps" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="closet"
                options={{
                    title: 'Closet',
                    tabBarIcon: ({ color }) => <Ionicons name="cube" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Ranks',
                    tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
                }}
            />
        </Tabs>
    );
}
