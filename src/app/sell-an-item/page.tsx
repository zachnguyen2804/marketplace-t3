"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/trpc/react";

type Inputs = {
  name: string;
  description: string;
  price: string;
};

const SellAnItem = () => {
  const router = useRouter();
  const createListing = api.listings.create.useMutation();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    createListing
      .mutateAsync({
        ...formData,
        price: parseFloat(formData.price),
      })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {});
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 bg-gradient-to-b text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1>Sell an Item</h1>{" "}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Item Name
            </label>
            <input
              id="name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              {...register("description", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              {...register("price", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
};

export default SellAnItem;
