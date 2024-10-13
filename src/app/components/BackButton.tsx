'use client';
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); 
  };

  return (
    <button
      type="button"
      className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
      onClick={handleBack}
    >
      Back
    </button>
  );
}
