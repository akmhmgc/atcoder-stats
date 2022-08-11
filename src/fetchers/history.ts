import axios from "axios";

export const scores = async (username: string) => {
  const { data } = await axios.get(`https://atcoder.jp/users/${username}/history/json`);
  return data
}
