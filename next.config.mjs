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
};

export default nextConfig;
