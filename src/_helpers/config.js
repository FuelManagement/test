export const config = {
    apiUrl: window.location.hostname === "geonet.localtunnel.me"
            ? 'https://geonet-server.localtunnel.me/api'
            : 'http://localhost:3009/api',
    env: "live" // live || local
};
