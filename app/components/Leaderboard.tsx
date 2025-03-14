import { useState, useEffect } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [epoch, setEpoch] = useState(1);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, [epoch]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://209.126.9.130:9000/api/leaderboard/?epoch_number=${epoch}`);
      console.log(response.data);
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
      setLeaderboard([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>

      {/* Epoch Filter */}
      <label className="block mb-2 text-gray-700">Select Epoch:</label>
      <input
        type="number"
        value={epoch}
        onChange={(e) => setEpoch(Number(e.target.value))}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Leaderboard Table */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : leaderboard.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Hotkey</th>
              <th className="border p-2">Block Number</th>
              <th className="border p-2">Max Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{entry.hotkey}</td>
                <td className="border p-2">{entry.block_number}</td>
                <td className="border p-2">{entry.max_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">No data found for this epoch.</p>
      )}
    </div>
  );
}
