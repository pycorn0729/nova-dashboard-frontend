export default function ErrorView({error}: {error: string}) {
    return (
        <div className="max-w-[80%] mx-auto p-6 bg-red-100 border-2 border-red-400 rounded-lg shadow-lg">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-xl font-semibold text-red-700">Error</h1>
          </div>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      );
}