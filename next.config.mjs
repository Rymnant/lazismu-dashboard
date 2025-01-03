/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@sequelize/core', 'sequelize', 'sqlite3'],
};

export default nextConfig;

