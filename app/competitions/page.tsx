import Link from "next/link";

const fetchCompetitions = async () => {
    try {
      const res = await fetch(`http://209.126.9.130:9000/api/competitions`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      return await res.json();
    } catch (error) {
      return [];
    }
};

export default async function CompetitionList() {
  const competitions = await fetchCompetitions()

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
                <p className="text-sm text-gray-500">Challenge ID: {comp.challenge_id}</p>
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
