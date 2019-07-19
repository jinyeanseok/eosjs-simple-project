const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { PrivateKey, PublicKey, Signature, Aes, key_utils, config } = require('eosjs-ecc');
const { TextEncoder, TextDecoder } = require('util');
const fetch = require('node-fetch');

let privateKeys = [];// user private keys
const rpc = new JsonRpc('http://192.168.1.75:8010', { fetch });
const signatureProvider = new JsSignatureProvider(privateKeys);
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

async function main() {
let arr = []; //실제로 블록을 생성하는 bp를 넣을거임
try {
const info = await rpc.get_info();
const firstBP = info.head_block_producer;         // 시작점을 알아야 라운드를 얼마나 도는지 확인가능
const firstBlockNumber = info.head_block_num;     //
arr.push(info.head_block_producer); //실제 bp목록
while(1) {  //블록이랑 bp랑 블록넘버를 게속 받아오기 위함
const info = await rpc.get_info();
const nextBP = info.head_block_producer;
const nextBlockNumber = info.head_block_num;
if(arr[0] === nextBP) { //first bp랑 nextbp랑 비교
if(nextBlockNumber >= firstBlockNumber + 12) //현재 블록넘버랑 처음에 했던 블록넘버랑 비교
//12를 더해주는 이유는 12개의 블록을 생성 12개가 한번 더 지나면 한 라운드를 다 돌았기 떄문
break;
} else {
if(arr.indexOf(nextBP) == -1)
arr.push(nextBP);
}
}
for(let i=0; i<arr.length; i++)
console.log(arr[i]);
} catch (error) {
console.error(error);
}
}

main();