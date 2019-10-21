export const config = {
    apiUrl: window.location.hostname === "geonet.localtunnel.me"
            ? 'https://geonet-server.localtunnel.me/api'
            : 'http://474eb3cd.ngrok.io/api',
    env: "live" // live || local
};
