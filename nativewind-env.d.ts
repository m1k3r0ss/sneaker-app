import { ViewProps, TextProps, TextInputProps, TouchableOpacityProps, ImageProps, ScrollViewProps } from 'react-native';

declare module 'react-native' {
    interface ViewProps {
        className?: string;
    }
    interface TextProps {
        className?: string;
    }
    interface TextInputProps {
        className?: string;
    }
    interface TouchableOpacityProps {
        className?: string;
    }
    interface ImageProps {
        className?: string;
    }
    interface ScrollViewProps {
        className?: string;
    }
    interface ActivityIndicatorProps {
        className?: string;
    }
}