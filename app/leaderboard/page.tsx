import Link from "next/link";
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
    <div className="max-w-[80%] mx-auto p-6 bg-white">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/competitions" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Competitions
          </Link>
          <h1 className="text-3xl font-bold text-center text-gray-800">🏆 Leaderboard # {epochNumber}</h1>
          <div className="w-32"></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 justify-center">
              <span className="font-medium text-gray-700">Target Protein:</span>
              <span className="rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
                {competition.target_protein}
              </span>
              <span className="font-medium text-gray-700">Anti Target Protein:</span>
              <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                {competition.anti_target_protein}
              </span>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Rank</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Hotkey</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Block Number</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Molecule</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Max Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {leaderboard.map((entry: any, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">#{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{entry.hotkey}</td>
              <td className="px-6 py-4">{entry.block_number}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {entry.molecule}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-green-600">{entry.max_score}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
