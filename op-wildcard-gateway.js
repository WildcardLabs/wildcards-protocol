/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
    const Web3 = require('web3');
    const web3 = new Web3("...........");  //L2 http rpc url
    const address = ".........."; //Wildcard_Registry Contract address
    const abi = [{"inputs": [{"internalType": "bytes","name": "callData","type": "bytes"}],"name": "resolve","outputs": [{"internalType": "bytes","name": "","type": "bytes"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_addr","type": "address"}],"name": "toString","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "pure","type": "function"}];
    
    const contract = new web3.eth.Contract(abi, address);
    var data = req.query.data;
    
    contract.methods.resolve(data).call(
    function(error, result){
    res.send({"data": result}); 
    })
}
