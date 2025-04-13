"use client";
import React from "react";
import { api } from "~/trpc/react";

const Messages = () => {
  const messages = api.messages.getMessage.useQuery();
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.data?.map((message) => (
              <tr
                key={message.id}
                className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-6 py-4">{message.fromUserName}</td>
                <td className="px-6 py-4">{message.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
