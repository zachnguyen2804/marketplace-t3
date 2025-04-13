"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/trpc/react";

const IndividualItem = ({ id }: { id: string }) => {
  const individualItem = api.listings.get.useQuery(
    { listingId: id },
    { enabled: !!id },
  );
  const user = useUser();
  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const sendMessage = api.messages.sendMessage.useMutation();

  return (
    <div className="container mx-auto flex flex-col gap-12">
      <h1 className="mt-12 text-4xl">{individualItem?.data?.name}</h1>
      <p>{individualItem.data?.description}</p>
      <p>$ {individualItem.data?.price}</p>

      {user.isSignedIn && (
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((formData) => {
            sendMessage
              .mutateAsync({
                message: formData.message,
                listingId: individualItem.data?.id as string,
              })
              .then(() => reset());
          })}
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Message
            </label>
            <textarea
              id="name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              {...register("message", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default IndividualItem;
