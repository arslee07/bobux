import Block from './Block';
import Transaction from './Transaction';

class Blockchain {
    public chain: Block[];

    constructor() {
        this.chain = [this.genesisBlock];
    }

    get genesisBlock(): Block {
        return new Block(0, 0, '', '');
    }

    get lastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data: any): void {
        let block = new Block(
            this.chain.length,
            +new Date(),
            data,
            this.lastBlock.hash
        );
        this.chain.push(block);
    }
}

export default Blockchain;
