const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//bitcoin - mainnet
//testnet
const network = bitcoin.networks.testnet

//Derivação de carteiras HD
const path = `m/49'/1'/0'/0`

//Criando as palavras da seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//Criando uma conta - par pvt-pub keys 
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Wallet created")
console.log("Adress: ", btcAdress)
console.log("Private key: ", node.toWIF())
console.log("Seed: ", mnemonic)