import React, { useEffect, useState } from 'react';
//import logo from '../logo.png';
import './App.css';
import {create} from "ipfs-http-client";
import Web3 from "web3";
import MemeABI from "../abis/Meme.json"

const ipfs = create("https://ipfs.infura.io:5001/api/v0");


const App = () => {

  useEffect(() => {
    loadWeb3();
  }, []);

  const [imageBuffer, setImageBuffer] = useState(null);
  const [imageUrl, setImage] = useState("https://ipfs.infura.io/ipfs/QmRtumqmm52d6rTEjyjupuuz2xVadUyT9ocRhWWB7TS3xB");
  const [ethAccount, setEthAccount] = useState();
  const [contract, setContract] = useState(null);

  const loadBlockchainData = async () => {
    //get account
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setEthAccount(accounts[0]);

    //get network
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    //get smart contract
    // ---ABI ---Address
    const networkData = MemeABI.networks[networkId];
    
    if(networkData) {
      console.log("Smart contract has been deployed on this network");
      const abi = MemeABI.abi;
      const address = networkData.address;
      const contract = web3.eth.Contract(abi, address);

      setContract(contract);
      
      // get url from blockchain
      const memeUrl = await contract.methods.get().call();
      console.log("memeurl:",memeUrl);
      setImage(memeUrl);

    } else {
      window.alert("Smart contract not deployed on selected network");
    }
  }

  const loadWeb3 = async () => {
    
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      //await window.ethereum.sendAsync("eth_requestAccounts");
      await loadBlockchainData();
    } else if (window.web3) {
      //window.web3 = new Web3(window.web3.currentProvider);
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Please use metamask!")
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {

      const createdFile = await ipfs.add(imageBuffer);
      const url = `https://ipfs.infura.io/ipfs/${createdFile.path}`;
      console.log(url);
      
      //store url on blockchain
      await contract.methods.set(url).send({from: ethAccount}, (err, txHash) => {
        if(err){
          console.log(err);
        } else {
          console.log("new image set: ", txHash);
        }
        setImage(url);
      });

    } catch (error) {
      console.log(error);
    }
  }


  const captureFile = (event) => {
    event.preventDefault();
    console.log("File captured");

    //process file
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setImageBuffer(Buffer(reader.result));
    }
  }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="navbar-brand col-sm-3 col-md-2 mr-0">
          Meme
        </div>
        <ul className="novbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <p className="text-white">{ethAccount}</p>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
            <img src={imageUrl} className="App-logo" alt="logo" />
              <p>&nbsp;</p>
              <h2>Change Image</h2>
              <form onSubmit={onSubmit}>
                <input type="file" onChange={captureFile}/>
                <button type="submit">Submit</button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}



export default App;
