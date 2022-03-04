/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'admin.yuanshengyoupin.com',
      'file.yuanshengyoupin.com',
      'at.alicdn.com', 
      'admin.mengqi.co', 
      'editor.mengqi.co',
      'file.mengqi.co'
    ],
  },
  // distDir: 'build',
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/p/18718be1-4da0-4800-9091-f054be454d94': { page: '/p/18718be1-4da0-4800-9091-f054be454d94' },
    }
  },
};
