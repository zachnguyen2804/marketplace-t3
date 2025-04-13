import Head from "next/head";

import Messages from "../_components/Messages";

export default async function Offers() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Learn more about our mission." />
      </Head>
      <main className="flex min-h-screen flex-col gap-12 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto">
          <h1 className="mt-12 pl-10 text-4xl">Your Offers</h1>
          <Messages />
        </div>
      </main>
    </>
  );
}
