import ErrorView from "../components/ErrorView";

const fetchLeaderboard = async (epoch: number) => {
  try {
    const res = await fetch(`http://209.126.9.130:9000/api/leaderboard/?epoch_number=${epoch}`, {
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

export default async function LeaderboardPage({searchParams}:{searchParams: Promise<{epoch_number?: string}>}) {
  const epochNumber = parseInt((await searchParams).epoch_number ?? '1');
  const {data, error} = await fetchLeaderboard(epochNumber);
  if (error) {
    return <ErrorView error={error} />;
  }
  const {leaderboard, competition } = data;
  
  return (
    <div className="max-w-[80%] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <h2 className="text-lg mb-4">Epoch {competition.epoch_number}</h2>
      <h2 className="text-lg mb-4">Protein {competition.protein}</h2>
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
