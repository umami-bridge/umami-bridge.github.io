import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Panel from "../components/Panel";
import fetch from "node-fetch";
const Home: NextPage = (props: any) => {
  return (
    <div>
      <Head>
        <title>Umami Finance Bridge</title>
        <meta
          name="description"
          content="Bridge between networks now using the Umami Finance platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center min-h-screen bg-[#FFCCDA]">
        <NavBar />
        <Layout>
          <Panel data={props.data} />
        </Layout>
      </div>
    </div>
  );
};


export default Home;
