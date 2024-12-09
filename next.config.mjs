/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export'
    experimental: {
        serverComponentsExternalPackages: ['@sequelize/core', 'sequelize', 'sqlite3'],
    }
};

export default nextConfig;

