// src/setupProxy.js - CORS proxy configuration
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://easygo.duckdns.org',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api/v1', // rewrite path
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })
    );
};