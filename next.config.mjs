/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'realestate-areaagency.fra1.cdn.digitaloceanspaces.com',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['areaagency.pl', '*.areaagency.pl'],
        },
    },
};

export default nextConfig;
