/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/it',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
