export const config = {
    apiUrl: window.location.hostname === "geonet.localtunnel.me"
            ? 'https://geonet-server.localtunnel.me/api'
            : 'http://192.168.1.2:3009/api',
    env: "live" // live || local
};