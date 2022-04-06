import React from "react";
import { Formik } from "formik";

function BuySettings() {
  // https://umami.banxa.com/?coinType=ETH&fiatType=USD&fiatAmount=500&blockchain=ETH
  const supportedCurrencies = [
    "ARS",
    "AUD",
    "BRL",
    "CAD",
    "CZK",
    "DKK",
    "EUR",
    "HKD",
    "INR",
    "MYR",
    "MXN",
    "NZD",
    "NOK",
    "PHP",
    "GBP",
    "QAR",
    "IDR",
    "SAR",
    "SGD",
    "ZAR",
    "KRW",
    "SEK",
    "CHF",
    "THB",
    "TRY",
    "TWD",
    "AED",
    "USD",
    "VND",
    "JPY",
    "PLN",
  ];

  return (
    <>
      <Formik
        initialValues={{
          fiatType: "USD",
          fiatAmount: "1000",
          coin: "ETH",
          blockchain: "ETH",
          walletAddress: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          let url = `https://umami.banxa.com/?coinType=${values.coin}&fiatType=${values.fiatType}&fiatAmount=${values.fiatAmount}&blockchain=${values.blockchain}`;
          // Validate TODO
          window.location.assign(url);
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
          <form className="py-16" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center w-full text-center">
              <h1 className="paneltitle panelpadding mb-12">Buy </h1>
            </div>
            <div className="flex flex-col w-full h-full">
              <a className="youdo mb-1">You pay:</a>
              <div className="inputgroup flex flex-row max-w-[400px] min-h-[64px]">
                <div className="flex w-full items-center ">
                  <input
                    name="fiatAmount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fiatAmount}
                    className="buyinputgroupinput h-full w-full px-[12px]"
                  />
                </div>
                <select
                  name="fiatType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fiatType}
                  className="inputgroupselect py-[16px] px-[20px]"
                >
                  {supportedCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full flex-col gap-2 items-center flex justify-center text-center items-center flex mt-6">
                <a className="youdo mb-1">
                  You will receive ETH<br></br> on the Arbitrum chain.
                </a>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.51489 8.465L11.9999 16.95L20.4849 8.465L19.0709 7.05L11.9999 14.122L4.92889 7.05L3.51489 8.465Z"
                    fill="#2E3A59"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="items-center justify-center mt-[36px] panelbuttongroup flex flex-row  w-full panelpadding">
              <button
                className="w-full flex items-center justify-center max-w-[300px] panelsendbutton"
                type="submit"
              >
                Checkout on Banxa
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default BuySettings;
