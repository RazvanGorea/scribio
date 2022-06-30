import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import { HistoryItem } from "../types/HistoryItem.type";
import DotsLoading from "./DotsLoading";

const loadingList = Array.from(Array(12).keys()).map((_, i) => (
  <tr
    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    key={i}
  >
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
    >
      <a>
        <Skeleton />
      </a>
    </th>
    <td className="px-6 py-4">
      <a>
        <Skeleton />
      </a>
    </td>
    <td className="px-6 py-4">
      <Skeleton />
    </td>
    <td className="px-6 py-4"></td>
  </tr>
));

interface HistoryTableProps {
  onDeleteItem: (historyItemId: string) => void;
  onClearHistory: () => void;
  fetchHistory: () => void;
  data: HistoryItem[] | null;
  loading: boolean;
  hasMore: boolean;
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  onDeleteItem,
  onClearHistory,
  fetchHistory,
  data,
  loading,
  hasMore,
}) => {
  console.log(data);

  const list = data?.map((item) => (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={item._id}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        <Link href={`/post/${item.post._id}`}>
          <a>{item.post.title}</a>
        </Link>
      </th>
      <td className="px-6 py-4">
        <Link href={`/profile/${item.post.author._id}`}>
          <a>{item.post.author.username}</a>
        </Link>
      </td>
      <td className="px-6 py-4 min-w-[8.250rem]">
        {dayjs(item.date).format("MMM D, YYYY h:mm A")}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onDeleteItem(item._id)}
          className="text-sm font-medium text-blue-700 dark:text-blue-500"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <InfiniteScroll
      style={{ overflow: "initial" }}
      dataLength={data?.length || 0}
      next={data && data.length > 0 ? fetchHistory : () => {}} // Call only after initial fetch occured
      hasMore={hasMore}
      loader={<DotsLoading style={{ marginTop: 15 }} />}
    >
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {loading ? <Skeleton /> : "Title"}
              </th>
              <th scope="col" className="px-6 py-3">
                {loading ? <Skeleton /> : "Author"}
              </th>
              <th scope="col" className="px-6 py-3">
                {loading ? <Skeleton /> : "Date"}
              </th>
              <th scope="col" className="px-6 py-3">
                {!loading && (
                  <button
                    onClick={onClearHistory}
                    className="text-sm font-semibold text-blue-700 dark:text-blue-500"
                  >
                    Clear History
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>{loading ? loadingList : list}</tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
};

export default HistoryTable;
