import Link from "next/link";
import ErrorView from "../components/ErrorView";
import { fetchLeaderboard } from "../services/competitionService";
import {EPOCH_IN_BLOCKS} from "../utils/config";

export default async function LeaderboardPage({searchParams}:{searchParams: Promise<{epoch_number?: string}>}) {
  const epochNumber = parseInt((await searchParams).epoch_number ?? '1');
  const {data, error} = await fetchLeaderboard(epochNumber);
  if (error) {
    return <ErrorView error={error} />;
  }
  const {leaderboard, competition } = data;
  
  const start_block = epochNumber * EPOCH_IN_BLOCKS;
  const end_block = start_block + EPOCH_IN_BLOCKS;

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
          <div className="flex items-center gap-4 justify-center">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Target Proteins:</span>
              <div className="relative group">
                <button className="rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100 transition-colors flex items-center gap-1">
                  {competition.target_proteins.length} Targets
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute z-10 hidden group-hover:block mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-1 max-h-48 overflow-y-auto">
                      {competition.target_proteins.map((protein: string) => (
                        <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {protein}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Anti Target Protein:</span>
              <div className="relative group">
                <button className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1">
                  {competition.anti_target_proteins.length} Anti Targets
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute z-10 hidden group-hover:block mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  {competition.anti_target_proteins.map((protein: string) => (
                    <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {protein}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Block Range:</span>
              <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                {start_block} - {end_block}
              </span>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Rank</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Uid</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Hotkey</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Score</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Elapsed Blocks</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Molecule</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {leaderboard.map((entry: any, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">#{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{entry.uid}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{entry.hotkey}</td>
              <td className="px-6 py-4">
                <span className="font-semibold text-green-600">{entry.max_score.toFixed(3)}</span>
              </td>
              <td className="px-6 py-4">{entry.block_number - start_block}</td>
              <td className="px-6 py-4">
                <Link href={`/molecule?molecule=${encodeURIComponent(entry.molecule)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors">
                  <span>{entry.molecule}</span>                  
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
