import Block from './core/Block';
import Transaction from './core/Transaction';

let bobuxGenesisBlock = new Block(
    0,
    1337,
    {
        transaction: new Transaction(
            100,
            'god',
            '1023c8a3c35583a2ffca691652bf355d6b14b199eba6d6326546fa38bbc07cb2'
        ),
        nonce: 69_420_1337,
    },
    'there is no hash, but there is some bobux. stonks!!!'
);

export default bobuxGenesisBlock;
