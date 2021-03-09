import Blockchain from './Blockchain';
import Block from './Block';
import { createVerify } from 'crypto';
import Transaction from './Transaction';
import bobuxGenesisBlock from '../genesisBlock';

class Cryptocurrency extends Blockchain {
    public readonly name: string;
    public readonly shortName: string;
    public readonly symbol: string;

    constructor(name: string, shortName: string, symbol: string) {
        super();

        this.name = name;
        this.shortName = shortName;
        this.symbol = symbol;
        this.chain = [this.genesisBlock];
    }

    get genesisBlock(): Block {
        return bobuxGenesisBlock;
    }

    isTransactionValid(
        transaction: Transaction,
        senderPublicKey: string,
        signature
    ): boolean {
        return createVerify('SHA256')
            .update(transaction.toString())
            .verify(senderPublicKey, signature);
    }

    mine(block: Block): void {
        console.log('⛏️ Mining...');
        while (block.hash.substr(0, 3) !== '000') {
            block.data['nonce']++;
            block.updateHash();
        }
        console.log(`Solved! Nonce: ${block.data.nonce}`);
    }

    // wtf typescript
    // @ts-ignore
    addBlock(
        transaction: Transaction,
        senderPublicKey: string,
        signature: any
    ): void {
        if (this.isTransactionValid(transaction, senderPublicKey, signature)) {
            let block = new Block(
                this.chain.length,
                +new Date(),
                { transaction: transaction, nonce: 0 },
                this.lastBlock.hash
            );

            this.mine(block);
            this.chain.push(block);
        }
    }
}

export default Cryptocurrency;
