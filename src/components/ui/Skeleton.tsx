// components/ui/Skeleton.tsx
"use client";

export default function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
        />
    );
}
