pragma solidity >=0.5.9;

contract Meme {
    
    string memeHash;

    //write
    function set(string memory _memeHash) public{
        memeHash = _memeHash;
    }

    //read
    function get() public view returns(string memory) {
        return memeHash;
    }
}