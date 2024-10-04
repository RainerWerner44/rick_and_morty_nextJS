"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  console.log(searchQuery);
  

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatus("");
    setSpecies("");
    setGender("");
    router.push("/character");
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
          <select
            id="status"
            className="border rounded p-2 w-full h-12"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="species" className="block mb-1">
            Species
          </label>
          <select
            id="species"
            className="border rounded p-2 w-full h-12"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="">Select Species</option>
            <option value="human">Human</option>
            <option value="alien">Alien</option>
            <option value="humanoid">Humanoid</option>
            <option value="poopybutthole">Poopybutthole</option>
            <option value="mythological">Mythological</option>
            <option value="unknown">Unknown</option>
            <option value="animal">Animal</option>
            <option value="disease">Disease</option>
            <option value="robot">Robot</option>
            <option value="cronenberg">Cronenberg</option>
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="gender" className="block mb-1">
            Gender
          </label>
          <select
            id="gender"
            className="border rounded p-2 w-full h-12"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
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
