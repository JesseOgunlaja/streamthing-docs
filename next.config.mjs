/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	cacheComponents: true,
	async rewrites() {
		return [
			{
				source: "/",
				destination: "/introduction",
			},
		];
	},
};

export default nextConfig;
