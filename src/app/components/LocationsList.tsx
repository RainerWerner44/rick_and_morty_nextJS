import { Location } from "@/types/Location";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function LocationsList({
  currentPage,
  pagesCount,
  setCurrentPage,
  locationsNamesByQuery,
  setSearchLocationsQuery,
  locationId,
  setLocationId,
}: {
  currentPage: number;
  pagesCount: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  locationsNamesByQuery: Location[];
  setSearchLocationsQuery: Dispatch<SetStateAction<string>>;
  locationId: string;
  setLocationId: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const onNextClick = () => {
    if (currentPage < pagesCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onPrevClick = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const onLocationItemClick = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());

    setSearchLocationsQuery("");
    setLocationId(String(id));

    params.set("locationId", locationId);
    router.push(`/location?locationId=${id}`);
  };
  return (
    <div className="w-full grid grid-cols-3 gap-4 mt-8">
      <h3 className="text-center text-[40px] grid col-start-1 col-end-4">
        Locations list
      </h3>

      <div className="col-start-2 col-end-3 text-center">
        {locationsNamesByQuery.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-300">
                <th className="py-2 px-4 border border-gray-300 text-center">
                  Type
                </th>
                <th className="py-2 px-4 border border-gray-300 text-center">
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {locationsNamesByQuery.map((loc) => (
                <tr key={loc.id} className="hover:bg-gray-100 cursor-pointer">
                  <td
                    className="py-2 px-4 border border-gray-300"
                    onClick={() => onLocationItemClick(loc.id)}
                  >
                    {loc.type.toLocaleUpperCase()}
                  </td>
                  <td
                    className="py-2 px-4 border border-gray-300"
                    onClick={() => onLocationItemClick(loc.id)}
                  >
                    {loc.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-gray-600">No locations by this query</h2>
        )}
      </div>

      {pagesCount > 1 && (
        <div className="grid col-start-1 col-end-4 mt-8 mb-10">
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={onPrevClick}
              disabled={currentPage === 1}
              className="w-24 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition duration-300 text-center"
            >
              Previous
            </button>

            <p>
              {currentPage}/{pagesCount}
            </p>

            <button
              className="w-24 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition duration-300 text-center"
              onClick={onNextClick}
              disabled={currentPage === pagesCount}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
