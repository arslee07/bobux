import { createHash } from 'crypto';

class Block {
    public readonly index: number;
    public readonly timestamp: number;
    public readonly data: any;
    public readonly previousHash: string;
    public hash: string;

    constructor(
        index: number,
        timestamp: number,
        data: any,
        previousHash: string
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
    }

    computeHash(): string {
        return createHash('sha256')
            .update(this.index.toString())
            .update(this.timestamp.toString())
            .update(JSON.stringify(this.data))
            .update(this.previousHash)
            .digest('hex');
    }

    updateHash(): void {
        this.hash = this.computeHash();
    }
}

export default Block;
