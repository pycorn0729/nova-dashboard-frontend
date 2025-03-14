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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🏆 Competitions</h1>
      {competitions.length > 0 ? (
        <div className="space-y-4">
          {competitions.map((comp: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Epoch {comp.epoch_number}
                </p>
                <p className="text-sm text-gray-500">Protein: {comp.protein}</p>
              </div>
              <Link
                href={`/leaderboard?epoch_number=${comp.epoch_number}`}
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                View Leaderboard
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center">No competitions found.</p>
      )}
    </div>
  );
}
