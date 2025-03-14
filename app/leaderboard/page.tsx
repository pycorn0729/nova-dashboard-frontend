import { BASE_URL } from "../utils/config";

const fetchLeaderboard = async (epoch: number) => {
  try {
    const res = await fetch(`${BASE_URL}/api/leaderboard/?epoch_number=${epoch}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch leaderboard");
    return await res.json();
  } catch (error) {
    return [];
  }
};

export default async function LeaderboardPage({searchParams}:{searchParams: Promise<{epoch_number?: string}>}) {
  const epochNumber = parseInt((await searchParams).epoch_number ?? '1');
  const leaderboard = await fetchLeaderboard(epochNumber);
  return (
    <div className="max-w-[80%] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Leaderboard - <span className="text-gray-500"> <small>Epoch {epochNumber}</small></span></h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Hotkey</th>
            <th className="border p-2">Block Number</th>
            <th className="border p-2">Max Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry: any, index: number) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{entry.hotkey}</td>
              <td className="border p-2">{entry.block_number}</td>
              <td className="border p-2">{entry.max_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
