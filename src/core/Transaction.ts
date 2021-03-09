class Transaction {
    public amount: number;
    public payer: string;
    public payee: string;

    constructor(amount: number, payer: string, payee: string) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
}

export default Transaction;
