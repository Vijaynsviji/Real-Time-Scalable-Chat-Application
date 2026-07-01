
import http from 'http';
import httpProxy from 'http-proxy';


const proxy = httpProxy.createProxyServer();
let serversList  = [
  "ws://localhost:8081"
];
const serverEnvironmentString = process.env.SOCKET_SERVERS;

console.log("serverEnvironmentString: ",serverEnvironmentString);

if(serverEnvironmentString){
serversList = serverEnvironmentString.split(",")
  .map(server => `ws://${server}`);
}

console.log("serversList: ",serversList);
const servers = serversList || [
  "ws://localhost:8081",
  "ws://localhost:8082",
  // "ws://localhost:8083"
];

let index = 0;

const server = http.createServer();

server.on("upgrade", (req:any, socket:any, head:any) => {

  const target = servers[index];

  index = (index + 1) % servers.length;

  proxy.ws(req, socket, head, { target });

});

server.listen(8050);