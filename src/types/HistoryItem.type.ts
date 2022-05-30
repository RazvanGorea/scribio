export type HistoryItem = {
  _id: string;
  uid: string;
  date: number;
  post: {
    _id: string;
    title: string;
    author: {
      _id: string;
      username: string;
    };
  };
};
