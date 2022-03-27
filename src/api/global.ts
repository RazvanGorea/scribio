import axios from "axios";

// Helper function to trigger 'revalidate' API route
export const revalidatePage = async (path: string) => {
  const res = await axios.get<string>(`/api/revalidate?path=${path}`);
  return res.data;
};
