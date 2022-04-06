import React, { useEffect } from "react";
import Image from "next/image";
import { getChainName, useEtherBalance, useEthers } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { Formik, useFormikContext, validateYupSchema } from "formik";
import fetch from "cross-fetch";
import axios, { Method } from "axios";
const ERC20_ABI = require("./ERC20.json");
import { BigNumber, Contract, ethers, Wallet } from "ethers";

function Send(props: any) {
  // States
  const { activateBrowserWallet, account } = useEthers();
  const { library, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [amount, setAmount] = React.useState("");
  const [advancedVisible, setAdvancedVisible] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [quote, setQuote] = React.useState({
    totalGasFeesInUSD: 0,
    toAmount: 0,
  });
  const [coin, setCoin] = React.useState({
    symbol: "",
    name: "",
    decimals: 0,
  });

  // Functions

  // --- approve button
  // --- send button
  // --- get decimals

  async function getDecimals(coinAddress: string) {
    let decimals;

    for (let i = 0; i < props.data.coins.length; i++) {
      if (props.data.coins[i].address === coinAddress) {
        decimals = props.data.coins[i].decimals;
      }
    }

    return decimals;
  }

  async function getCoinInfo(coinAddress: string) {
    let info;

    for (let i = 0; i < props.data.coins.length; i++) {
      if (props.data.coins[i].address === coinAddress) {
        info = props.data.coins[i];
      }
    }

    return info;
  }

  async function getCoinSymbol(coinAddress: string) {
    let info;

    for (let i = 0; i < props.data.coins.length; i++) {
      if (props.data.coins[i].address === coinAddress) {
        info = props.data.coins[i].symbol;
      }
    }

    return info;
  }

  // --- get chains
  async function getChains(
    fromTokenAddress: any,
    fromChainId: any,
    toTokenAddress: any,
    toChainId: any,
    fromAmount: any,
    userAddress: any,
    sort: any
  ) {
    let route;

    let url = `https://backend.movr.network/v2/quote?fromTokenAddress=${fromTokenAddress}&fromChainId=${fromChainId}&toTokenAddress=${toTokenAddress}&toChainId=${toChainId}&fromAmount=${fromAmount}&userAddress=${userAddress}&sort=${sort}`;

    let options = {
      Method: "GET",
      headers: {
        "API-KEY": "645b2c8c-5825-4930-baf3-d9b997fcd88c",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    await axios(url, options).then(async (res) => {
      route = res.data.result.routes[0];
    });

    return route;
    // TODO pick first route and send back
  }

  async function startTrip(
    fromChainId: any,
    toChainId: any,
    fromAssetAddress: any,
    toAssetAddress: any,
    route: any
  ) {
    if (!route) {
      return;
    }

    let trip;
    let method: Method = "POST";
    var options = {
      method: method,
      url: "https://backend.movr.network/v2/route/start",
      headers: {
        "Content-Type": "application/json",
        "API-KEY": "645b2c8c-5825-4930-baf3-d9b997fcd88c",
        "Access-Control-Allow-Origin": "*",
      },
      data: JSON.stringify({
        fromChainId: "1",
        toChainId: "42161",
        fromAssetAddress: "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3",
        toAssetAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        includeFirstTxDetails: true,
        route: {
          routeId: "806eefaa-8a6f-47bf-91b3-e7c82064cd27",
          fromAmount: "1560471094863077400",
          toAmount: "332684505727",
          usedBridgeNames: ["hop"],
          chainGasBalances: {
            "1": { minGasBalance: "30000000000000000", hasGasBalance: true },
            "42161": {
              minGasBalance: "2800000000000000",
              hasGasBalance: false,
            },
          },
          totalUserTx: 2,
          sender: "0xFcA5ea7c64133F2fca39aD099234b07aAab2df61",
          totalGasFeesInUsd: 52.53864442,
          userTxs: [
            {
              userTxType: "fund-movr",
              txType: "eth_sendTransaction",
              chainId: 1,
              toAmount: "1560553680554877789",
              toAsset: {
                chainId: 42161,
                address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                symbol: "ETH",
                name: "Ethereum",
                decimals: 18,
                icon: "https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg",
              },
              stepCount: 1,
              routePath: "0-1",
              sender: "0xFcA5ea7c64133F2fca39aD099234b07aAab2df61",
              approvalData: null,
              steps: [
                {
                  type: "bridge",
                  protocol: {
                    name: "hop",
                    displayName: "Hop",
                    icon: "https://bridgelogos.s3.ap-south-1.amazonaws.com/hop.png",
                    securityScore: 1,
                    robustnessScore: 4,
                  },
                  fromChainId: 1,
                  fromAsset: {
                    chainId: 1,
                    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                    symbol: "ETH",
                    name: "Ethereum",
                    decimals: 18,
                    icon: "https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg",
                  },
                  fromAmount: "1560471094863077400",
                  toChainId: 42161,
                  toAsset: {
                    chainId: 42161,
                    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                    symbol: "ETH",
                    name: "Ethereum",
                    decimals: 18,
                    icon: "https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg",
                  },
                  toAmount: "1560553680554877789",
                  gasFees: {
                    asset: {
                      chainId: 1,
                      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                      symbol: "ETH",
                      name: "Ethereum",
                      decimals: 18,
                      icon: "https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg",
                    },
                    gasLimit: 350000,
                    feesInUsd: 46.5864945,
                  },
                  serviceTime: 900,
                },
              ],
              gasFees: {
                feesInUsd: 46.5864945,
                asset: {
                  chainId: 1,
                  address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                  symbol: "ETH",
                  name: "Ethereum",
                  decimals: 18,
                  icon: "https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg",
                },
                gasLimit: 350000,
              },
              serviceTime: 900,
              userTxIndex: 0,
            },
            {
              userTxType: "dex-swap",
              txType: "eth_sendTransaction",
              chainId: 42161,
              protocol: {
                name: "oneinch",
                displayName: "1Inch",
                icon: "https://bridgelogos.s3.ap-south-1.amazonaws.com/1inch.png",
              },
              fromAsset: {
                chainId: 42161,
                address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                symbol: "ETH",
                name: "Ethereum",
                decimals: 18,
                icon: "https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg",
              },
              approvalData: null,
              fromAmount: "1560553680554877789",
              toAsset: {
                chainId: 42161,
                address: "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3",
                symbol: "UMAMI",
                name: "UMAMI Token",
                decimals: 9,
                icon: "https://assets.coingecko.com/coins/images/21159/small/1_ax54JNAAQWm7HE1ehAQV5g.png",
              },
              toAmount: "332684505727",
              gasFees: {
                gasLimit: 2180000,
                asset: {
                  chainId: 42161,
                  address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                  symbol: "ETH",
                  name: "Ethereum",
                  decimals: 18,
                  icon: "https://maticnetwork.github.io/polygon-token-assets/assets/eth.svg",
                },
                feesInUsd: 5.95214992,
              },
              sender: "0xFcA5ea7c64133F2fca39aD099234b07aAab2df61",
              userTxIndex: 1,
            },
          ],
          serviceTime: 900,
        },
      }),
    };

    await axios
      .request(options)
      .then(function (response) {
        trip = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    return trip;
  }

  async function prepareNextTx(activeRouteId, userTxIndex, txHash) {
    try {
      const response = await fetch(
        `https://backend.movr.network/v2/route/prepare?activeRouteId=${activeRouteId}&userTxIndex=${userTxIndex}&txHash=${txHash}`,
        {
          method: "GET",
          headers: {
            "API-KEY": "645b2c8c-5825-4930-baf3-d9b997fcd88c",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      return json;
    } catch (error) {
      console.log("Error", error);
    }
  }

  // Calls route/build-next-tx and receives transaction data in response
  async function buildNextTx(activeRouteId) {
    try {
      const response = await fetch(
        `https://backend.movr.network/v2/route/build-next-tx?activeRouteId=${activeRouteId}`,
        {
          method: "GET",
          headers: {
            "API-KEY": "645b2c8c-5825-4930-baf3-d9b997fcd88c",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      return json;
    } catch (error) {
      console.log("Error", error);
    }
  }

  // Helper Function to make approval
  async function makeApprovalTx(
    approvalTokenAddress,
    allowanceTarget,
    minimumApprovalAmount,
    signer
  ) {
    const ERC20Contract = new ethers.Contract(
      approvalTokenAddress,
      ERC20_ABI,
      signer
    );
    const gasEstimate = await ERC20Contract.estimateGas.approve(
      allowanceTarget,
      minimumApprovalAmount
    );
    const gasPrice = await signer.getGasPrice();

    console.log(ethers.utils.formatUnits(gasPrice, "gwei"));

    return ERC20Contract.approve(allowanceTarget, minimumApprovalAmount, {
      gasLimit: gasEstimate,
      gasPrice: gasPrice,
    });
  }

  // Render
  const AutoUpdateHandler = () => {
    const { values }: any = useFormikContext();
    useEffect(() => {
      if (!account || busy) {
        return;
      }
      async function updateCoin() {
        let coinInfo = await getCoinInfo(values.coin);
        setCoin(coinInfo);
      }

      async function updateRoute() {
        if (quote) {
          // TODO DETECT IF QUOTE IS ALREADY SET
          return;
        }
        const chosenRoute = await getChains(
          values.coin,
          "1",
          "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3", // UMAMI
          "42161",
          String(values.amount * 10 ** coin.decimals),
          account,
          "gas"
        );

        setQuote(chosenRoute as any);
      }

      updateCoin();
      updateRoute();
    }, []);
    return null;
  };

  return (
    <div className="bgcolor max-w-[500px] min-h-[64px] flex flex-col items-center py-16">
      <h1 className="text-center paneltitle panelpadding">Send</h1>
      <Formik
        initialValues={{
          amount: 0,
          slippage: "0.3%",
          coin: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          symbol: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.amount === 0) {
            return;
          }

          // Polygon Provider
          const fromProvider = await ethers.getDefaultProvider(
            "https://mainnet.infura.io/v3/5ef4dc2fb2d141c88f2eb25b21fadf2b"
          );

          const fromSigner = await library?.getSigner();

          // Arbitrum Provider
          const toProvider = await ethers.getDefaultProvider(
            "https://arb1.arbitrum.io/rpc"
          );
          const toSigner = await library?.getSigner();

          setSubmitting(true);
          setBusy(true);

          const chosenRoute = await getChains(
            values.coin,
            "1",
            "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3", // UMAMI
            "42161",
            String(values.amount * 10 ** coin.decimals),
            account,
            "gas"
          );

          const trip = await startTrip(
            "1",
            "42161",
            "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3",
            values.coin,
            quote
          );

          // Now approving and doing other swaps
          if (!trip) return;
          let userTxIndex = trip["result"]["userTxIndex"];
          let activeRouteId = trip["result"]["activeRouteId"];
          let txTarget = trip["result"]["txTarget"];
          let txData = trip["result"]["txData"];

          type trip = {
            result: {
              activeRouteId: string;
              userTxIndex: number;
              txTarget: string;
              txData: string;
            };
          };

          console.log(trip["result"]["approvalData"]);
          if (trip["result"]["approvalData"] != null) {
            console.log("Approval is needed", trip["result"]["approvalData"]);

            // Params for approval
            let approvalTokenAddress =
              trip["result"]["approvalData"]["approvalTokenAddress"];
            let allowanceTarget =
              trip["result"]["approvalData"]["allowanceTarget"];
            let minimumApprovalAmount =
              trip["result"]["approvalData"]["minimumApprovalAmount"];

            let tx = await makeApprovalTx(
              approvalTokenAddress,
              allowanceTarget,
              minimumApprovalAmount,
              fromSigner
            );
            console.log("tx", tx);
            await tx
              .wait()
              .then((receipt) =>
                console.log("Approval Tx :", receipt.transactionHash)
              )
              .catch((e) => console.log(e));
          } else {
            console.log("Approval not needed");
          }

          // START OF TRANSACTION

          // Main Socket Transaction (Swap + Bridge in one tx)
          const gasPrice = await fromSigner?.getGasPrice();
          console.log("result ", trip["result"]["value"]);

          const sourceGasEstimate = await fromProvider.estimateGas({
            from: account || "0x0",
            to: txTarget,
            data: txData,
            gasPrice: gasPrice,
            value: trip["result"]["value"],
          });

          console.log("sourceGasEstimate", sourceGasEstimate);

          const tx = await fromSigner?.sendTransaction({
            from: fromSigner?._address,
            to: txTarget,
            data: txData,
            gasPrice: gasPrice,
            gasLimit: sourceGasEstimate,
            value: trip["result"]["value"],
          });

          const receipt = await tx?.wait();
          let txHash = receipt?.transactionHash;
          console.log("Socket source Brige Tx :", receipt?.transactionHash);

          let isInitiated = false;

          // Repeatedly pings /route/prepare with executed transaction hash
          // Once the bridging process is complete, if it returns 'completed', the setInterval exits
          // If another swap transaction is involved post bridging, the returned response result is 'ready'
          // In which case the above process is repeated on destination chain
          let status = setInterval(async () => {
            // Gets status of route journey
            let status = await prepareNextTx(
              activeRouteId,
              userTxIndex,
              txHash
            );
            console.log("Current status :", status.result);

            // Exits setInterval if route is 'completed'
            if (status.result == "completed") {
              console.log("Bridging transaction is complete");
              clearInterval(status);
            }

            // Executes post bridging transactions on destination
            else if (status.result == "ready") {
              if (!isInitiated) {
                isInitiated = true;
                console.log("Proceeding with post-bridging transaction");

                let nextTx = await buildNextTx(activeRouteId);
                console.log(nextTx);

                // Updates relevant params
                let userTxIndex2 = nextTx.result.userTxIndex;
                let txTarget2 = nextTx.result.txTarget;
                let txData2 = nextTx.result.txData;

                // Checks if approval is needed
                if (nextTx.result.approvalData != null) {
                  console.log("Approval is needed", nextTx.result.approvalData);

                  let approvalTokenAddress =
                    nextTx.result.approvalData.approvalTokenAddress;
                  let allowanceTarget =
                    nextTx.result.approvalData.allowanceTarget;
                  let minimumApprovalAmount =
                    nextTx.result.approvalData.minimumApprovalAmount;

                  // Signer is initiated with provider of destination chain RPC
                  let tx = await makeApprovalTx(
                    approvalTokenAddress,
                    allowanceTarget,
                    minimumApprovalAmount,
                    toSigner
                  );
                  console.log("tx", tx);
                  await tx
                    .wait()
                    .then((receipt) =>
                      console.log(
                        "Destination Approve Tx",
                        receipt.transactionHash
                      )
                    )
                    .catch((e) => console.log(e));
                } else {
                  console.log("Approval not needed");
                }

                // Sends destination swap transaction
                let gasPrice = await toSigner?.getGasPrice();
                let sourceGasEstimate = await toProvider.estimateGas({
                  from: toSigner?._address,
                  to: txTarget2,
                  data: txData2,
                  gasPrice: gasPrice,
                  value: ethers.utils.parseEther("0"),
                });

                let tx = await toSigner?.sendTransaction({
                  from: toSigner?._address,
                  to: txTarget2,
                  data: txData2,
                  gasPrice: gasPrice,
                  gasLimit: sourceGasEstimate,
                });

                const receipt = await tx?.wait();
                txHash = receipt?.transactionHash;
                console.log("Destination Socket Tx", txHash);
              }
            }
          }, 5000);

          setBusy(false);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <AutoUpdateHandler />
            {props.data.coins && props.data.coins.length > 0 && (
              <div className="panelpadding h-full flex flex-col mb-[36px]">
                <div className="addshadow inputgroup flex flex-row min-h-[64px] mt-[56px]">
                  <div className="flex flex-row w-full items-center inputgroupholder">
                    <button
                      type="button"
                      disabled={!account}
                      onClick={async () => {
                        if (!etherBalance) {
                          return;
                        }
                        console.log("Formatting balance: ", etherBalance);
                        setFieldValue(
                          "amount",
                          formatUnits(etherBalance, "ether")
                        );
                      }}
                      className="mx-[8px] inputgroupbutton"
                    >
                      Max
                    </button>
                    <input
                      disabled={!account}
                      name="amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.amount}
                      className="inputgroupinput h-full w-full px-[12px]"
                    />
                  </div>
                  <select
                    name="coin"
                    disabled={!account}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.coin}
                    className="inputgroupselect py-[8px] px-[20px]"
                  >
                    {props.data.coins.map((coin: any) => (
                      <option value={coin.address} key={coin.address}>
                        {coin.symbol.replace(/ /g, "")}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {etherBalance && values.coin && (
                  <a className="balancetext min-h-[32px] min-w-[122px]">
                    {Number(formatUnits(etherBalance, 18)).toFixed(4) +
                      ` ${getChainName(Number(values.coin))} Available`}
                  </a>
                )} */}
              </div>
            )}
            <div className="w-full px-4 optionspanel flex items-center justify-center">
              <button
                type="button"
                disabled={!account}
                onClick={() => {
                  setAdvancedVisible(!advancedVisible);
                }}
                className="transition duration-150 hover:bg-gray-300 rounded-lg flex flex-row px-4 gap-2 items-center justify-center"
              >
                <a className="optionstext">Advanced opts</a>
                {advancedVisible ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                      fill="#2E3A59"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8.28799L5.98999 14.298L7.40399 15.713L12.004 11.113L16.604 15.713L18.011 14.298L12 8.28799Z"
                      fill="#2E3A59"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            {advancedVisible && (
              <div className="mt-2 slippagetext panelpadding  flex flex-row items-center w-full justify-between ">
                <div className="flex flex-col gap-2 items-center w-full">
                  <a className="tolerancetext w-full">Slippage tolerance</a>
                  <div className="flex flex-row items-center justify-between w-full ">
                    <div className="w-fit tolerancecontainer flex flex-row items-center justify-center w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("slippage", "0.1%");
                        }}
                        className="py-2  transition duration-150 hover:bg-gray-300 rounded-lg flex flex-row px-4 gap-2 items-center justify-center"
                      >
                        0.1%
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("slippage", "0.2%");
                        }}
                        className="py-2  transition duration-150 hover:bg-gray-300 rounded-lg flex flex-row px-4 gap-2 items-center justify-center"
                      >
                        0.2%
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("slippage", "0.3%");
                        }}
                        className="py-2  transition duration-150 hover:bg-gray-300 rounded-lg flex flex-row px-4 gap-2 items-center justify-center"
                      >
                        0.3%
                      </button>
                    </div>
                    <input
                      name="slippage"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.slippage}
                      className="max-w-[90px] py-2  rounded-lg flex flex-row px-2 gap-2 items-center justify-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* {quote && (
              <div className="mt-[64px] priceinfo flex flex-col panelpadding gap-10 w-full">
                <div className="flex flex-row justify-between ">
                  <div className="flex flex-row gap-2 items-center">
                    <a className="pricetitle">Fees</a>
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 22H10V19H13V22ZM13 17H10V16.993C10 15.343 10 13.918 10.672 12.92C11.1948 12.2574 11.8453 11.7065 12.585 11.3C12.919 11.086 13.234 10.883 13.499 10.672C14.6604 9.77306 15.1826 8.27392 14.831 6.84799C14.2747 5.51815 12.8593 4.76357 11.4451 5.04296C10.0309 5.32236 9.00877 6.55851 9 7.99999H6C6 4.68629 8.68629 1.99997 12 1.99997C14.3053 1.99307 16.4134 3.29894 17.434 5.36599C18.3507 7.47212 17.9883 9.91642 16.5 11.666C16.0475 12.1675 15.5396 12.616 14.986 13.003C14.5016 13.3371 14.0597 13.729 13.67 14.17C13.1193 15.0045 12.8819 16.0071 13 17Z"
                        fill="#2E3A59"
                      ></path>
                    </svg>
                  </div>
                  <a className="pricevalue">
                    ~ {quote.totalGasFeesInUSD.toFixed(2)}
                  </a>
                </div>
                <div className="flex flex-row justify-between ">
                  <div className="flex flex-row gap-2 items-center">
                    <a className="pricetitle">Min. received</a>
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 22H10V19H13V22ZM13 17H10V16.993C10 15.343 10 13.918 10.672 12.92C11.1948 12.2574 11.8453 11.7065 12.585 11.3C12.919 11.086 13.234 10.883 13.499 10.672C14.6604 9.77306 15.1826 8.27392 14.831 6.84799C14.2747 5.51815 12.8593 4.76357 11.4451 5.04296C10.0309 5.32236 9.00877 6.55851 9 7.99999H6C6 4.68629 8.68629 1.99997 12 1.99997C14.3053 1.99307 16.4134 3.29894 17.434 5.36599C18.3507 7.47212 17.9883 9.91642 16.5 11.666C16.0475 12.1675 15.5396 12.616 14.986 13.003C14.5016 13.3371 14.0597 13.729 13.67 14.17C13.1193 15.0045 12.8819 16.0071 13 17Z"
                        fill="#2E3A59"
                      ></path>
                    </svg>
                  </div>
                  <a className="pricevalue">
                    ~ {formatUnits(quote.toAmount, 9)} UMAMI
                  </a>
                </div>
              </div>
            )} */}
            <div className="mt-[48px] panelbuttongroup flex flex-row justify-between w-full panelpadding">
              <button
                disabled={!account}
                className="addshadow panelapprovebutton"
                type="submit"
              >
                Approve
              </button>
              <button
                disabled={!account}
                className="addshadow panelsendbutton"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Send;
