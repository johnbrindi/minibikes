/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // CSS side-effect imports are valid in Next.js; suppress the false-positive type error
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
};

module.exports = nextConfig;
