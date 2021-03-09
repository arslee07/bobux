import Block from './Block';
import {
    generateKeyPairSync,
    createPublicKey,
    createSign,
    createHash,
} from 'crypto';
import Cryptocurrency from './Cryptocurrency';
import Transaction from './Transaction';

class Wallet {
    public readonly privateKey: string;
    public readonly publicKey: string;
    public readonly address: string;

    constructor(privateKey?: string) {
        if (!privateKey) {
            const keypair = generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
            }); // хз че за буквы но так надо

            this.privateKey = keypair.privateKey;
            this.publicKey = keypair.publicKey;
            this.address = createHash('sha256')
                .update(this.publicKey)
                .digest('hex');
        } else {
            this.privateKey = privateKey;
            this.publicKey = createPublicKey({
                key: privateKey,
                format: 'pem',
            })
                .export({
                    format: 'pem',
                    type: 'spki',
                })
                .toString();
            this.address = createHash('sha256')
                .update(this.publicKey)
                .digest('hex');
        }
    }

    getBalance(chain: Block[]): number {
        let bal = 0;

        chain.forEach((block) => {
            if (block.data.transaction.payer === this.address) {
                bal -= block.data.transaction.amount;
            }
            if (block.data.transaction.payee === this.address) {
                bal += block.data.transaction.amount;
            }
        });
        return bal;
    }

    sendMoney(
        chain: Cryptocurrency,
        amount: number,
        payeeAddress: string
    ): void {
        const transaction = new Transaction(amount, this.address, payeeAddress);

        const sign = createSign('SHA256');
        sign.update(transaction.toString()).end();

        const signature = sign.sign(this.privateKey);
        chain.addBlock(transaction, this.publicKey, signature);
    }
}

export default Wallet;
