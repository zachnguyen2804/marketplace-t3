import Head from "next/head";
import { HydrateClient } from "~/trpc/server";
import ListingItems from "./_components/ListingItems";

export default async function Home() {
  return (
    <HydrateClient>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Learn more about our mission." />
      </Head>
      <main className="flex min-h-screen flex-col gap-12 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="mt-12 pl-10 text-4xl">Items for Sale</h1>
        <ListingItems />
      </main>
    </HydrateClient>
  );
}
