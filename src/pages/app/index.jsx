import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect, useSigner } from "react";
import { useProvider, useAccount } from "wagmi";
import { ethers } from "ethers";
import swapABI from "../../ABI/swapABI.json";
import tokenOneABI from "../../ABI/tokenOne.json";
import tokenTwoABI from "../../ABI/tokenTwo.json";

const Balance = ({ title, price }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[225.8px]">
      <p className="text-[24px] font-medium  text-[#FCFCFC] opacity-[0.6]">
        {title}
      </p>
      <h1 className="text-[56px] font-medium text-white">${price}</h1>
    </div>
  );
};

function Index() {
  const [currentBal, setCurrentBal] = useState(0);
  const [borrowBal, setBorrowBal] = useState(0);
  const { address, isConnecting, isDisconnected } = useAccount();
  const provider = useProvider();

  let swapContract_addr = "0xaF44BEDF0DDbf86D61e15848481F9310D2F9B480";
  let tokenOne = "0x9Dae57ca18095646f6847912e8151e044c87E40f";
  let tokenTwo = "0xc7899935aa07e1B70698c6EA1468884a3d232Cf3";

  const swapTransaction = async () => {
    console.log("function");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const providerOne = new ethers.providers.Web3Provider(ethereum);
        const signer = providerOne.getSigner();

        const swapContract = new ethers.Contract(
          swapContract_addr,
          swapABI,
          signer
        );

        console.log("Going to pop window for gas fee");
        let deployedtxn = await swapContract.swapTokenOne(999, {
          gasPrice: ethers.utils.parseUnits("200", "gwei"),
          gasLimit: 2000000,
        });

        console.log("Swapping the token..");
        await deployedtxn.wait();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const func = async () => {
      const { ethereum } = window;
      if (ethereum) {
        if (address) {
          const providerOne = new ethers.providers.Web3Provider(ethereum);
          const signer = providerOne.getSigner();

          const TokenOneContract = new ethers.Contract(
            tokenOne,
            tokenOneABI,
            signer
          );
          const TokenTwoContract = new ethers.Contract(
            tokenTwo,
            tokenTwoABI,
            signer
          );

          let tokenOneBalance = await TokenOneContract.balanceOf(
            await signer.getAddress()
          );
          let tokenTwoBalance = await TokenTwoContract.balanceOf(
            await signer.getAddress()
          );
          setCurrentBal(tokenOneBalance);
          setBorrowBal(tokenTwoBalance);
        }
      }
    };

    func();
  });

  return (
    <>
      <div className="w-full h-min-ful bg-primary h-max pb-24 relative">
        <nav className="flex px-[72px] pt-[44px] w-[1409.5px] mx-auto">
          <img
            className="w-[110px] h-[58px] object-contain"
            src="/assets/logo.png"
            alt=""
          />
          <span className="ml-auto">
            <ConnectButton />
          </span>
        </nav>
        <section className="flex flex-col w-full items-center mt-[100px] ">
          <div className="flex gap-x-[278px]">
            <Balance title={"Supply Balance"} price={`${currentBal}`} />
            <div className="flex backdrop-blur-[118px] flex-col">
              <div className="flex w-[180px] h-[180px] justify-center items-center bg-neon-grad rounded-full">
                <span className="flex flex-col items-center justify-center w-[90%] h-[90%] rounded-full">
                  <span className="flex flex-col items-center justify-center w-[100%] h-[100%] bg-[#191919] rounded-full">
                    <p className="text-[20px] text-[#FCFCFC] opacity-[0.6]">
                      Net APY
                    </p>
                    <h2 className="text-[40px] text-white ">4.9%</h2>
                  </span>
                </span>
              </div>
              <button
                className="mt-6 text-white bg-neon-grad rounded-lg py-2"
                onClick={swapTransaction}
              >
                Swap Tokens
              </button>
            </div>

            <Balance title={"Borrow Balance"} price={`${borrowBal}`} />
          </div>
          <div className="flex items-center mt-[74px]">
            <p className="font-medium text-[16px] mr-[8px] text-[#FCFCFC] opacity-[0.6]">
              Borrow limit
            </p>
            <h4 className="text-white text-[20px] mr-[8px]">45%</h4>
            <div className="w-[809px] bg-white h-[4px] rounded-lg">
              <span className="flex w-[40%] h-full bg-neon-grad"></span>
            </div>
            <p className="font-medium text-[16px] ml-[19px] text-[#FCFCFC] opacity-[0.6]">
              $2000
            </p>
          </div>

          <div className="flex gap-x-[110px]">
            <div className="flex flex-col bg-[#393939]  w-[580px] h-fit rounded-[13px] mt-[74px]">
              <h1 className="font-semibold text-[24px] text-white mx-[24px] my-[24px]">
                Supply Markets
              </h1>
              <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-[#FCFCFC] opacity-[0.6] font-medium uppercase border-y  dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Assets
                      </th>
                      <th scope="col" className="px-6 py-3">
                        APY
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Wallet
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Collateral
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map((ele) => {
                      return (
                        <tr className=" border-b dark:bg-gray-800 border-transparent">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-[16px] font-medium text-white whitespace-nowrap dark:text-white"
                          >
                            <img
                              className="mr-[14px]"
                              src="/assets/aave.svg"
                              alt=""
                            />
                            Aave Token
                          </th>
                          <td className="px-6 py-4 text-[16px] text-white">
                            0.17%
                          </td>
                          <td className="px-6 py-4 text-[16px] text-white">
                            100 AAVE
                          </td>
                          <td className="px-6 text-[16px] text-white justify-center  flex ">
                            <Toggle />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col bg-[#393939]  w-[580px] h-fit rounded-[13px] mt-[74px]">
              <h1 className="font-semibold text-[24px] text-white mx-[24px] my-[24px]">
                Supply Markets
              </h1>
              <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-[#FCFCFC] opacity-[0.6] font-medium uppercase border-y  dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Assets
                      </th>
                      <th scope="col" className="px-6 py-3">
                        APY
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Wallet
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Liquidity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map((ele) => {
                      return (
                        <tr className=" border-b dark:bg-gray-800 border-transparent">
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-[16px] font-medium text-white whitespace-nowrap dark:text-white"
                          >
                            <img
                              className="mr-[14px]"
                              src="/assets/aave.svg"
                              alt=""
                            />
                            Aave Token
                          </th>
                          <td className="px-6 py-4 text-[16px] text-white">
                            0.17%
                          </td>
                          <td className="px-6 py-4 text-[16px] text-white">
                            100 AAVE
                          </td>
                          <td className="px-6 py-4 text-[16px] text-white">
                            $4.2M
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        {/* <Modal /> */}
      </div>
    </>
  );
}

const Modal = () => {
  return (
    <div className="flex items-center justify-center top-0 absolute w-full min-h-screen h-full bg-backdrop">
      <div className="flex flex-col w-[580px] h-max m-h-[1000px] bg-[#393939] mt-[48px] rounded-lg">
        <span className="flex items-center w-full justify-center mt-[34px]">
          <img className="w-12 h-12 mr-5" src="/assets/aave.svg" alt="" />
          <h1 className="text-white text-[24px]">Aave Token</h1>
        </span>
        <h2 className="text-white mx-auto w-min font-medium text-[56px] mt-7">
          $200
        </h2>
        <p className="text-[24px] text-gray-400 mx-auto w-min mt-4">Max </p>
        <div className="flex w-full justify-center mt-6">
          <p className="selected w-1/2 text-center text-[24px] font-bold p-4">
            Supply
          </p>
          <p className="un-selected w-1/2 text-center text-[24px] font-bold p-4">
            Withdraw
          </p>
        </div>
        <div className="px-[33px] py-[27px] ">
          <p className="font-semibold text-gray-400 border-b w-fit">
            Supply Rates
          </p>
          <Token bdTrue={true} />
          <Token />
          <p className="font-semibold text-gray-400 border-b w-fit">
            Supply Rates
          </p>
          <Token bdTrue={true} />
          <Token bdTrue={true} />
        </div>
        <button className="bg-white h-[65px] w-[514px] px-[33px] rounded-3xl text-[24px] font-bold mt-2 mx-auto">
          Supply
        </button>

        <span className="flex w-full justify-between mx-auto px-8 mt-8 mb-9">
          <p className="text-center text-[20px] text-gray-400">
            Wallet Balance
          </p>
          <p className="text-center text-[20px] text-gray-400">0.07 ETH</p>
        </span>
      </div>
    </div>
  );
};

const Token = ({ bdTrue }) => {
  return (
    <div
      className={
        "flex w-full py-6  border-gray-500" + (bdTrue ? " border-b-[1px]" : "")
      }
    >
      <img src="/assets/aave.svg" alt="" />
      <h1 className="ml-4 text-[24px] font-semibold text-gray-400">
        Supply APY
      </h1>
      <p className="ml-auto text-[20px] text-gray-400">0.18%</p>
    </div>
  );
};

const Toggle = () => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
    </label>
  );
};

export default Index;
