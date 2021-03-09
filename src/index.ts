import Cryptocurrency from './core/Cryptocurrency';
import Wallet from './core/Wallet';
import key from './ars_privkey';

const bobux = new Cryptocurrency('bobux', 'BBX', 'β');

const bob = new Wallet();
const alice = new Wallet();
const ars = new Wallet(key);

ars.sendMoney(bobux, 50, bob.address);
bob.sendMoney(bobux, 23, alice.address);
alice.sendMoney(bobux, 5, ars.address);

console.log(JSON.stringify(bobux.chain, null, 2));

console.log();

console.log(`Ars balance: ${ars.getBalance(bobux.chain)}`);
console.log(`Alice balance: ${alice.getBalance(bobux.chain)}`);
console.log(`Bob balance: ${bob.getBalance(bobux.chain)}`);
