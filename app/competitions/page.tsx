import Link from "next/link";
import { BASE_URL } from "../utils/config";
import ErrorView from "../components/ErrorView";

const fetchCompetitions = async () => {
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

export default async function CompetitionList() {
  const {data, error} = await fetchCompetitions();
  if (error) {
    return <ErrorView error={error} />;
  }
  const competitions = data;
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🏆 Competitions</h1>
      {competitions.length > 0 ? (
      
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Epoch</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Target Protein</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Anti Target Protein</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Leaderboard</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {competitions.map((comp: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-lg font-semibold text-gray-700">
                    #{comp.epoch_number}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-lg bg-green-50 px-2 py-1 text-sm text-green-600">
                    {comp.target_protein}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-lg bg-red-50 px-2 py-1 text-sm text-red-600">
                    {comp.anti_target_protein}
                  </span>
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
