import React from "react";
import BuyDone from "./BuyDone";
import BuySettings from "./BuySettings";

import { useEthers, useEtherBalance } from "@usedapp/core";

function Buy() {
  const { activateBrowserWallet, deactivate, account } = useEthers();

  // Balance to check against swap value
  const userBalance = useEtherBalance(account);

  return (
    <>
      <div className="bgcolor  panelpadding w-full h-full flex flex-col gap-4 max-w-[500px] min-h-[64px]">
        {/*         <div className="flex flex-col w-full items-center text-center gap-6 mb-4 ">
          <a className="buysteptext">Buy crypto with fiat</a>
          <div className="gap-12 flex flex-row w-full items-center justify-center">
            <div className="flex items-center justify-center buycircle bg-white rounded-full">
              <a>1</a>
            </div>
            <div className="flex items-center justify-center buycircle bg-white rounded-full">
              <a>2</a>
            </div>
            <div className="flex items-center justify-center buycircle bg-white rounded-full">
              <a>3</a>
            </div>
          </div>
        </div> */}

        <BuySettings />
      </div>
    </>
  );
}

export default Buy;
