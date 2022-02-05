pragma solidity >=0.5.9;

contract Meme {
    
    string memeUrl = "";

    //write
    function set(string memory _memeUrl) public{
        memeUrl = _memeUrl;
    }

    //read
    function get() public view returns(string memory) {
        return memeUrl;
    }
}