"use client";
import Select from "react-select";
import { getDataNumbersArray } from "../utils/getDataNumbersArray";
import { Dispatch, SetStateAction } from "react";

const locationsTotalCount = 126;

export default function LocationFilter({
  locationId,
  setLocationId,
  searchLocationsQuery,
  setSearchLocationsQuery,
}: {
  locationId: string;
  setLocationId: Dispatch<SetStateAction<string>>;
  searchLocationsQuery: string;
  setSearchLocationsQuery: Dispatch<SetStateAction<string>>;
}) {
  const locationsNumbersArray = getDataNumbersArray(locationsTotalCount);

  const locationOptions = locationsNumbersArray.map((num) => ({
    value: num.toString(),
    label: `Location ${num}`,
  }));

  const handleLocationChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setLocationId(selectedOption ? selectedOption.value : "");
    setSearchLocationsQuery("");
  };

  return (
    <div className="w-full grid grid-cols-4 gap-4 mt-8">
      <Select
        id="location"
        classNamePrefix="react-select"
        options={locationOptions}
        value={
          locationOptions.find((option) => option.value === locationId) || null
        }
        onChange={handleLocationChange}
        isSearchable={false}
        placeholder="Select Location"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            height: "48px",
            cursor: "pointer",
          }),
        }}
      />

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search by type..."
          className="border rounded-l p-2 h-12 w-full"
          value={searchLocationsQuery}
          onChange={(event) => setSearchLocationsQuery(event.target.value)}
        />
        <button
          className="w-16 bg-gray-300 text-black h-12 border-0 hover:bg-gray-100"
          onClick={() => setSearchLocationsQuery("")}
        >
          X
        </button>
      </div>
    </div>
  );
}
