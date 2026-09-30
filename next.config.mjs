/** @type {import('next').NextConfig} */
const repoName = 'forced-choice-studio';
const isProd = process.env.NODE_ENV === 'production';

// Allow overriding via env var, or default to repoName in production export
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isProd ? `/${repoName}` : '');

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath ? basePath : undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
