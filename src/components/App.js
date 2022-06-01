import React from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { useState, useEffect } from "react";
import Web3 from "web3";
import bankImage from "../bank.png";
import { Button, Row } from "react-bootstrap";
import TetherTokenAbi from "../abis/TetherToken.json";
import RewardTokenAbi from "../abis/RewardToken.json";
import DBankAbi from "../abis/DBank.json";

const App = (props) => {
  const [account, setAccount] = useState(null);
  const [tetherTokenContract, setTetherTokenContract] = useState(null);
  const [tetherBalance, setTetherBalance] = useState(0);
  const [rewardTokenContract, setRewardTokenContract] = useState({});
  const [dBankContract, setDBankContract] = useState({});
  const [stakingBalance, setStakingBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    const loadAccount = async () => {
      const web3Accounts = await web3.eth.getAccounts();
      console.log(web3Accounts);
      setAccount(web3Accounts[0]);
    };

    const loadBlockchainData = async () => {
      const networkId = await web3.eth.net.getId();
      const tetherNetworkData = TetherTokenAbi.networks[networkId];
      console.log("token network ID: ", networkId);

      //load Tether contract
      if (tetherNetworkData) {
        const tetherContract = new web3.eth.Contract(
          TetherTokenAbi.abi,
          tetherNetworkData.address
        );
        setTetherTokenContract(tetherContract);
      } else {
        window.alert(
          "Error - Tether contract not deployed - no network detected"
        );
      }
    };

    loadAccount();
    loadBlockchainData();
  }, []);

  useEffect(() => {
    if (tetherTokenContract) {
      const loadBalance = async () => {
        let balance = await tetherTokenContract.methods
          .balanceOf(account)
          .call();
        console.log("balance response: " + balance);
        setTetherBalance(balance);
        console.log(" tethertoken contract: ", tetherTokenContract);
      };
      loadBalance();
    }
  }, [tetherTokenContract, account]);

  const checkWalletIsConnected = async () => {};

  const connectWalletHandler = async () => {};

  const connectWalletButton = async () => {};

  const navBar = () => {
    const titleString = "\t\t DAPP Yield Farming Decentralized Banking";

    const imageElement = (
      <img
        src={bankImage}
        width="50"
        height="30"
        className="d-inline-block align-top"
        alt="bank"
      />
    );

    return (
      <Navbar title={titleString} image={imageElement} account={account} />
    );
  };

  return (
    <div>
      <Row>{navBar()}</Row>
      <br />
      <br />
      <Row style={{ position: "relative" }}>
        <Button variant="outline-dark">Click Me</Button>
      </Row>
      <Row>
        <Button variant="outline-dark">Click Me2</Button>
      </Row>
    </div>
  );
};

export default App;
