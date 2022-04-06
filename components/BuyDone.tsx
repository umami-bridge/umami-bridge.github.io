import React from "react";

function BuyDone() {
  return (
    <div className="flex flex-col items-center text-center gap-8">
      <h1 className="successtitle m-0">Purchase successful!</h1>
      <img src="/ava.png" className="rounded-full max-w-[180px]" />
      <p className="successdescrip max-w-[300px]">
        You can now swap your crypto for $UMAMI on Uniswap and start earning
        delicious yields.
      </p>
      <button className=" p-[13.75px] w-full flex items-center justify-center max-w-[300px] finalpanelsendbutton">
        Get $UMAMI
      </button>
    </div>
  );
}

export default BuyDone;
