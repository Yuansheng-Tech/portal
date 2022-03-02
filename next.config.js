/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'admin.yuanshengyoupin.com',
      'file.yuanshengyoupin.com',
      'at.alicdn.com', 
      'admin.mengqi.com', 
      'editor.mengqi.com'
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
