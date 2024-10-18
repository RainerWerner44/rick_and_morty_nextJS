"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { genderOptions, speciesOptions, statusOptions } from "../data/selectOptions";


export default function CharacterFilter() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (status) params.set("status", status);
    if (species) params.set("species", species);
    if (gender) params.set("gender", gender);

    router.push(`?${params.toString()}`);
  }, [searchQuery, species, status, gender, router]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatus("");
    setSpecies("");
    setGender("");
    router.push("/character");
  };

  const handleStatusChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setStatus(selectedOption ? selectedOption.value : "");
  };

  const handleSpeciesChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSpecies(selectedOption ? selectedOption.value : "");
  };

  const handleGenderChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setGender(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="col-span-6 mb-6">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2 flex items-end">
          <input
            type="text"
            placeholder="Search a character..."
            className="border rounded-l p-2 h-12 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="status" className="block mb-1">
            Status
          </label>
          <Select
            id="status"
            classNamePrefix="react-select"
            options={statusOptions}
            value={statusOptions.find((option) => option.value === status)}
            onChange={handleStatusChange}
            isSearchable={false}
            placeholder="Select Status"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                height: "48px",
                cursor: "pointer",
              }),
            }}
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="species" className="block mb-1">
            Species
          </label>
          <Select
            id="species"
            classNamePrefix="react-select"
            options={speciesOptions}
            value={
              speciesOptions.find((option) => option.value === species) || null
            }
            onChange={handleSpeciesChange}
            isSearchable={false}
            placeholder="Select Species"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                height: "48px",
                cursor: "pointer",
              }),
            }}
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="gender" className="block mb-1">
            Gender
          </label>
          <Select
            id="gender"
            classNamePrefix="react-select"
            options={genderOptions}
            value={
              genderOptions.find((option) => option.value === gender) || null
            } 
            onChange={handleGenderChange}
            isSearchable={false}
            placeholder="Select Gender"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                height: "48px", 
                cursor: "pointer",
              }),
            }}
          />
        </div>

        <div className="col-span-1 flex items-end h-full">
          <button
            className="border rounded p-2 bg-blue-500 text-white hover:bg-blue-600 h-12 w-full"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
