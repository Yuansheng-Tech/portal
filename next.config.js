/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'admin.yuanshengyoupin.com',
      'file.yuanshengyoupin.com',
      'at.alicdn.com', 
      'admin.yuansheng.com', 
      'editor.yuansheng.com'
    ],
  },
  // distDir: 'build',
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/p/[id]': { page: '/' },
    }
  },
};
