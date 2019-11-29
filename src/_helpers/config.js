export const config = {
    apiUrl: window.location.hostname === "geonet.localtunnel.me"
    ? 'https://geonet-server.localtunnel.me/api'
    : 'http://192.168.1.5:30099/api',
env: "live" // live || local
    // "geonet.localtunnel.me"
    //         ? 'https://geonet-server.localtunnel.me/api'
    //         : 'http://'+window.location.hostname+':3009/api',
    // env: "live" // live || local
};