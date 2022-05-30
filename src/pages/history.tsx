import React, { useEffect, useState } from "react";
import { clearHistory, deleteHistoryItem, getHistory } from "../api/profile";
import Container from "../components/layout/Container";
import { HistoryItem } from "../types/HistoryItem.type";
import dayjs from "dayjs";
import Link from "next/link";

interface HistoryProps {}

const History: React.FC<HistoryProps> = () => {
  const [data, setData] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    getHistory().then((data) => setData(data));
  }, []);

  const clear = () => {
    clearHistory();
    setData(null);
  };

  const deleteItem = (historyId: string) => {
    deleteHistoryItem(historyId);
    setData((data) => {
      if (!data) return null;

      const newData = [...data];
      const indexToDelete = newData.findIndex((item) => item._id === historyId);
      newData.splice(indexToDelete, 1);
      return newData;
    });
  };

  return (
    <Container sm>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                <button
                  onClick={clear}
                  className="text-sm font-semibold text-blue-700 dark:text-blue-500"
                >
                  Clear History
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  <Link href={`/posts/${item.post._id}`}>
                    <a>{item.post.title}</a>
                  </Link>
                </th>
                <td className="px-6 py-4">
                  <Link href={`/profile/${item.post.author._id}`}>
                    <a>{item.post.author.username}</a>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {dayjs(item.date).format("MMM D, YYYY h:mm A")}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-sm font-medium text-blue-700 dark:text-blue-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default History;
