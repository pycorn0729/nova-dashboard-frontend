"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CompetitionList() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://209.126.9.130:9000/api/competitions");
      setCompetitions(response.data);
    } catch (error) {
      console.error("Failed to fetch competitions", error);
      setCompetitions([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🏆 Competitions</h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : competitions.length > 0 ? (
        <div className="space-y-4">
          {competitions.map((comp, index) => (
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
              <button
                onClick={() => router.push(`/leaderboard?epoch_number=${comp.epoch_number}`)}
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                View Leaderboard
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center">No competitions found.</p>
      )}
    </div>
  );
}
