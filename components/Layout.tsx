import React from "react";
import Image from "next/image";

function Layout(props: any) {
  return (
    <div className="my-6 flex flex-col items-center justify-center w-[100%] min-h-[92vh]">
      {props.children}
    </div>
  );
}

export default Layout;
