pragma solidity >=0.5.9;

contract Meme {
    
    string memeUrl = "https://ipfs.infura.io/ipfs/QmRtumqmm52d6rTEjyjupuuz2xVadUyT9ocRhWWB7TS3xB";

    //write
    function set(string memory _memeUrl) public{
        memeUrl = _memeUrl;
    }

    //read
    function get() public view returns(string memory) {
        return memeUrl;
    }
}