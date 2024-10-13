"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Location } from "@/types/Location";
import CharacterCard from "../components/CharacterCard";
import { getCharacters } from "../utils/getCharacters";
import { Character } from "@/types/Character";
import { getDataNumbersArray } from "../utils/getDataNumbersArray";
import { Info } from "@/types/Info";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const locationsTotalCount = 126;

export default function Locations() {
  const searchParams = useSearchParams();
  const [locationId, setLocationId] = useState("");
  const [searchLocationsQuery, setSearchLocationsQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locaitionCharacters, setLocationCharacters] = useState<Character[]>(
    []
  );
  const [locationsNamesByQuery, setLocationsNamesByQuery] = useState<
    Location[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getLocationsByName = async () => {
      setIsDataLoading(true);
      try {
        const locationsByNameResponse = await axios.get(
          `https://rickandmortyapi.com/api/location/${locationId}`
        );

        const data = locationsByNameResponse.data;

        if (locationId.length !== 0) {
          setCurrentLocation(data);
        } else {
          const { results }: { results: Location[] } = data;
          setCurrentLocation(results[0]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    getLocationsByName();
  }, [locationId]);

  useEffect(() => {
    if (currentLocation?.residents) {
      const locationsCharactersArray = getCharacters(
        currentLocation?.residents
      );

      if (locationsCharactersArray.length !== 1) {
        const getCharsByLocation = async () => {
          const charsByLocation = await axios.get(`
            https://rickandmortyapi.com/api/character/${locationsCharactersArray}`);

          const results: Character[] = charsByLocation.data;
          setLocationCharacters(results);
        };

        getCharsByLocation();
      } else {
        const getCharsByLocation = async () => {
          const charsByLocation = await axios.get(`
            https://rickandmortyapi.com/api/character/${locationsCharactersArray}`);

          const results: Character[] = [charsByLocation.data];

          setLocationCharacters(results);
        };

        getCharsByLocation();
      }
    }
  }, [currentLocation?.residents]);

  const locationsNumbersArray = getDataNumbersArray(locationsTotalCount);

  useEffect(() => {
    if (searchLocationsQuery.length > 0) {
      const getLocationsByQuery = async () => {
        try {
          const locationsByTypeResponse = await axios.get(
            `https://rickandmortyapi.com/api/location?page=${currentPage}&type=${searchLocationsQuery}`
          );

          const { info, results }: { info: Info; results: Location[] } =
            locationsByTypeResponse.data;

          setLocationsNamesByQuery(results);
          setPagesCount(info.pages);
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocationsNamesByQuery([]);
          setPagesCount(0);
        }
      };

      getLocationsByQuery();
    }
  }, [searchLocationsQuery, currentPage]);

  const onChangeSelect = (event: { target: { value: string } }) => {
    setLocationId(event.target.value);
    setSearchLocationsQuery("");
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchLocationsQuery !== "") {
      params.set("type", searchLocationsQuery);
      setLocationId("");
      params.delete("locationId");
      router.push(`location?${params.toString()}`);
    } else {
      router.push(`/location`);
    }

    if (locationId) {
      params.set("locationId", String(locationId));
      params.delete("type");
      router.push(`/location?${params.toString()}`);
    }
  }, [locationId, router, searchLocationsQuery, searchParams]);

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
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <section className="flex-grow">
        <Header />

        <div className="w-full grid grid-cols-4 gap-4 mt-8">
          <select
            id="episode"
            className="border rounded p-2 w-full h-12"
            value={locationId}
            onChange={onChangeSelect}
          >
            {locationsNumbersArray.map((num) => {
              return (
                <option value={num} key={num}>
                  Location - {num}
                </option>
              );
            })}
          </select>

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

        {searchLocationsQuery.length === 0 ? (
          <div className="w-full grid grid-cols-3 gap-4 mt-8">
            <div className="span-1 bg-gray-300 p-4 h-56 mt-4">
              <h2 className="text-[40px] mb-4">INFO</h2>
              <p>
                <strong>ID:</strong> {currentLocation?.id}
              </p>
              <p>
                <strong>Name:</strong> {currentLocation?.name}
              </p>
              <p>
                <strong>Type:</strong> {currentLocation?.type}
              </p>
              <p>
                <strong>Dimenison:</strong> {currentLocation?.dimension}
              </p>
            </div>

            {isDataLoading ? (
              <div className="grid col-start-2 col-end-4">
                <Loader />
              </div>
            ) : (
              <div className="grid col-start-2 col-end-4">
                <h2 className="text-center text-[40px] mb-8">Residents</h2>

                <div className="grid grid-cols-2 gap-4">
                  {locaitionCharacters.length > 0 ? (
                    locaitionCharacters.map((char) => {
                      return <CharacterCard key={char.id} char={char} />;
                    })
                  ) : (
                    <h4 className="text-center font-light text-[20px] grid col-start-1 col-end-3">
                      No Residents found
                    </h4>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full grid grid-cols-3 gap-4 mt-8">
            <h3 className="text-center text-[40px] grid col-start-1 col-end-4">
              Locations list
            </h3>
            {/* 
            <ul className="col-start-2 col-end-3 text-center">
              {locationsNamesByQuery.length > 0 ? (
                locationsNamesByQuery.map((loc) => (
                  <li
                    key={loc.id}
                    className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors duration-300 ease-in-out"
                    onClick={() => onLocationItemClick(loc.id)}
                  >
                    {loc.type.toLocaleUpperCase()} - {loc.name}
                  </li>
                ))
              ) : (
                <h2 className="text-gray-600">No locations by this query</h2>
              )}
            </ul> */}

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
                      <tr
                        key={loc.id}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
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
        )}
      </section>
      <Footer />
    </div>
  );
}
