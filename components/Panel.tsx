import React from "react";
import Image from "next/image";
import Send from "./Send";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Buy from "./Buy";

function Panel(props: any) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div
        className="mainpanel items-center"
      >
         <Buy />
      </div>

      <div className="flex flex-row gap-2 subpaneltext mt-4">
        <a>Umami lives on Arbitrum</a>
        <Image
          width="15.28px"
          height="16px"
          src="/arbitrum.png"
          alt="Arbitrum"
        />
      </div>
    </div>
  );
}

export default Panel;
