const SHA256 = require('crypto-js/sha256')


class Block{
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
                  this.index +
                  this.previousHash +
                  this.timestamp +
                  JSON.stringify(this.data)
                ).toString();
  }
}

class Blockchain{
  constructor() {
    this.chain = [];
  }

  createGenesisBlock() {
    // We have to create initial block ourselves
    let block = new Block(0, "01/01/2018", "Genesis Block", "0")
    this.chain.push(block);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let ralphsCoin = new Blockchain();
ralphsCoin.createGenesisBlock();
ralphsCoin.addBlock(new Block(1, "10/01/2018", {amount: 3}));
ralphsCoin.addBlock(new Block(2, "10/02/2018", {amount: 6}));

console.log("is chain valid: ", ralphsCoin.isChainValid());

// console.log(JSON.stringify(ralphsCoin, null, 4));
