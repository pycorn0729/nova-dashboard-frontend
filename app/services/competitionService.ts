import { BASE_URL } from "../utils/config";

export const fetchCompetitions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/competitions`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch leaderboard");
    return {
      data: await res.json(),
      error: null
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message
    };
  }
};

export const fetchLeaderboard = async (epoch: number) => {
  try {
    const res = await fetch(`${BASE_URL}/api/leaderboard/?epoch_number=${epoch}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch leaderboard");
    }
    return {
      data: await res.json(),
      error: null
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message
    };
  }
};
