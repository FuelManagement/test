const localtunnel = require('localtunnel');
 
(async () => {
  const tunnel_client = await localtunnel({ port: 8080, subdomain: "geonet"});
  console.log("Client Tunnel url ::", tunnel_client.url);
  tunnel_client.on('close', () => {
    console.log("Client Tunnel stopped");
  });

  const tunnel_server = await localtunnel({port: 30099, subdomain: "geonet-server"})
  console.log("Server Tunnel url ::",tunnel_server.url);
  tunnel_server.on('close', () => {
    console.log("Server Tunnel stopped");
  });
})();