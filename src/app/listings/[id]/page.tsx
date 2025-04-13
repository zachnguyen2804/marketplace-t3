// "use client";
import Head from "next/head";
import { type Metadata } from "next";
import React from "react";
import IndividualItem from "~/app/_components/IndividualItem";

type Props = {
  params: { id: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Listing ${params.id}`,
  };
}

export default function ListingView({ params }: Props) {
  const id = params.id;
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Learn more about our mission." />
      </Head>
      <main className="flex min-h-screen flex-col gap-12 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <IndividualItem id={id} />
      </main>
    </>
  );
}
