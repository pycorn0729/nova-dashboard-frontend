import Link from "next/link";
import ErrorView from "../components/ErrorView";
import { fetchCompetitions } from "../services/competitionService";
import { EPOCH_IN_BLOCKS, BLOCK_IN_SECONDS } from "../utils/config";


export default async function CompetitionList() {
  const {data, error} = await fetchCompetitions();
  if (error) {
    return <ErrorView error={error} />;
  }

  const {competitions, block : current_block} = data;
  const current_epoch = Math.floor(current_block / EPOCH_IN_BLOCKS);
  const remaining_blocks = (current_epoch + 1)* EPOCH_IN_BLOCKS - current_block;
  const remaining_time = remaining_blocks * BLOCK_IN_SECONDS;

  return (
    <div className="max-w-[80%] mx-auto p-6 bg-white">
      <div className="text-center text-gray-500 italic mb-4">
        🎨 I'm like a potato with potential—just need a little polish! Help me go from 'meh' to 'wow'! 💅✨
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🏆 Nova Competitions</h1>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 justify-center">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Current Epoch:</span>
              <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                #{current_epoch}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Current Block:</span>
              <span className="rounded-lg bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
                #{current_block}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Remaining Blocks:</span>
              <span className="rounded-lg bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">
                {remaining_blocks}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Time Remaining:</span>
              <span className="rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
                {Math.floor(remaining_time / 3600)}h {Math.floor((remaining_time % 3600) / 60)}m
              </span>
            </div>
          </div>
        </div>
      </div>
      {competitions.length > 0 ? (
      
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Epoch</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Best Uid</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Best Hotkey</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Best Score (Elapsed Blocks)</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Target Protein</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Anti Target Protein</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Leaderboard</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {competitions.map((comp: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                    #{comp.epoch_number}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {comp.best_submission.uid}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {comp.best_submission.hotkey}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <span className="font-semibold text-green-600">{comp.best_submission.score.toFixed(3)}</span> {" "}
                  <span className="text-gray-500">({comp.best_submission.block_number - comp.epoch_number * EPOCH_IN_BLOCKS} blocks)</span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative group">
                    <button className="rounded-lg bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100 transition-colors flex items-center gap-1">
                      {comp.target_proteins.length} Targets
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute z-10 hidden group-hover:block mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="py-1 max-h-48 overflow-y-auto">
                        {comp.target_proteins.map((protein: string) => (
                          <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            {protein}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative group">
                    <button className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1">
                      {comp.anti_target_proteins.length} Anti Targets
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute z-10 hidden group-hover:block mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      {comp.anti_target_proteins.map((protein: string) => (
                        <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {protein}
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/leaderboard?epoch_number=${comp.epoch_number}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  >
                    View Leaderboard
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-500 font-medium">No competitions found.</p>
        </div>
      )}
    </div>
  );
}
