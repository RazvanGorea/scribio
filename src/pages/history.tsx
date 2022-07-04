import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  clearHistory,
  deleteHistoryItem,
  getHistory,
  GetHistoryResponse,
} from "../api/profile";
import HistoryTable from "../components/HistoryTable";
import Container from "../components/layout/Container";
import * as emptyAnim from "../assets/lottie/empty.json";
import Lottie from "react-lottie";
import Authenticated from "../components/Authenticated";
import { useAuth } from "../context/AuthContext";
import { NextPage } from "next";
import Head from "next/head";

const History: NextPage = () => {
  const { isUserInitialized } = useAuth();

  const [data, setData] = useState<GetHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const nextPage = data ? data.page + 1 : 0;

  const fetchHistory = useCallback(async () => {
    const res = await getHistory(nextPage);
    setData((oldData) => ({
      page: res.page,
      hasMore: res.hasMore,
      data: oldData?.data ? [...oldData.data, ...res.data] : res.data,
    }));
  }, [nextPage]);

  useEffect(() => {
    if (isUserInitialized && !data) {
      fetchHistory().then(() => setLoading(false));
    }
  }, [fetchHistory, data, isUserInitialized]);

  const clear = () => {
    clearHistory();
    setData({
      page: 0,
      hasMore: false,
      data: [],
    });
  };

  const deleteItem = (historyId: string) => {
    deleteHistoryItem(historyId);
    setData((oldData) => {
      if (!oldData) return null;

      const newData = {
        page: oldData.page,
        hasMore: oldData.hasMore,
        data: [...oldData.data],
      };
      const indexToDelete = newData.data.findIndex(
        (item) => item._id === historyId
      );
      newData.data.splice(indexToDelete, 1);
      return newData;
    });
  };

  return (
    <>
      <Head>
        <title>History | Scribio</title>
      </Head>
      <Authenticated redirectPath="/logIn">
        <Container sm>
          {!loading && data?.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Lottie
                style={{ cursor: "default", maxWidth: 270, maxHeight: 270 }}
                options={{
                  animationData: emptyAnim,
                  loop: true,
                  autoplay: true,
                }}
                isClickToPauseDisabled
              />
              <h2>Your history is empty</h2>
            </div>
          ) : (
            <HistoryTable
              loading={loading}
              data={data?.data || null}
              hasMore={data ? data.hasMore : true}
              fetchHistory={fetchHistory}
              onClearHistory={clear}
              onDeleteItem={deleteItem}
            />
          )}
        </Container>
      </Authenticated>
    </>
  );
};

export default History;
