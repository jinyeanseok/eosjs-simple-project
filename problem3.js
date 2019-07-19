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
        
    try {
    const result = await rpc.get_block(300000);
    const account = result.producer;
    const result2 = await rpc.get_account(account);
    console.log(await rpc.get_currency_balance('eosio.token', 'baekseok1115', 'EOS'));
    
     
 } catch (error) {
     console.error(error);
     
 }
}
main();