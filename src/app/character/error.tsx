"use client";

export default function CharacterError() {
  const clearSearchParams = () => {
    window.location.href = window.location.pathname;
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1 className="text-center text-[40px]">No characters found</h1>

      <button
        onClick={clearSearchParams}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Clear Filters
      </button>
    </div>
  );
}
