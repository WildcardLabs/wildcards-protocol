const  Web3  = require('web3');
const web3 = new Web3("<RPC URL - BASE>");
const address = "0x9456000C7111a4308e17E912933782aEA1e29a49"; //Wildcard Contract on Base
const abi = [{"inputs": [{"internalType": "bytes","name": "callData","type": "bytes"}],"name": "resolve","outputs": [{"internalType": "bytes","name": "","type": "bytes"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_addr","type": "address"}],"name": "toString","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "pure","type": "function"}];
const contract = new web3.eth.Contract(abi, address);

exports.helloWorld = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.status(204).send('');
  } 
  
  else{
    var data = req.query.data;
    var decoded = web3.eth.abi.decodeParameters(['bytes', 'bytes', 'address'], data);
    var calldata = decoded[1];
    var nft = decoded[2];
    var selector = calldata.slice(0, 10);
    
    // Check if client is requesting contenthash & if NFT requested is OK COMPUTERS on Base
    if (selector.trim().toLowerCase() == '0xbc1c58d1' && nft.trim().toLowerCase() == '0xce2830932889c7fb5e5206287c43554e673dcc88'){ //OK COMPUTERS NFT CONTRACT ADDR

    // Return ipfs hash of uploaded OK COMPUTERS html file
       var encodedcontent = web3.eth.abi.encodeParameter('bytes', '<ipfs hash>');
       res.send({"data": encodedcontent});
    }
    else {
    contract.methods.resolve(data).call(
    function(error, result){
    res.send({"data": result}); 
    
    })}
  }
  
}
