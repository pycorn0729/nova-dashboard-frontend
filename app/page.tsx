"use client";

import CompetitionList from "./components/CompetitionList";
import Leaderboard from "./components/Leaderboard";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CompetitionList />
    </div>
  );
}
