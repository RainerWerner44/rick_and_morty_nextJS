"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Location } from "@/types/Location";
import { getCharacters } from "../utils/getCharacters";
import { Character } from "@/types/Character";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { fetchLocationById } from "../utils/fetchLocationByID";
import { fetchCharactersByLocation } from "../utils/fetchCharactersByLocation";
import { fetchLocationsByQuery } from "../utils/fetchLocationsByQuery";
import LocationFilter from "../components/LocationFilter";
import LocationInfo from "../components/LocationInfo";
import LocationCharacters from "../components/LocationCharacters";
import LocationsList from "../components/LocationsList";

export default function Locations() {
  const searchParams = useSearchParams();
  const [locationId, setLocationId] = useState("");
  const [searchLocationsQuery, setSearchLocationsQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationCharacters, setLocationCharacters] = useState<Character[]>([]);
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
      const locationData = await fetchLocationById(locationId);
      if (locationData) {
        setCurrentLocation(locationData);
      }
      setIsDataLoading(false);
    };

    getLocationsByName();
  }, [locationId]);

  useEffect(() => {
    if (currentLocation && currentLocation?.residents.length > 0) {
      const locationsCharactersArray = getCharacters(currentLocation.residents);

      const fetchAndSetLocationCharacters = async () => {
        const characters = await fetchCharactersByLocation(
          locationsCharactersArray
        );
        setLocationCharacters(characters);
      };

      fetchAndSetLocationCharacters();
    } else {
      setLocationCharacters([]);
    }
  }, [currentLocation, currentLocation?.residents]);

  useEffect(() => {
    if (searchLocationsQuery.length > 0) {
      const getLocationsByQuery = async () => {
        const { info, results } = await fetchLocationsByQuery(
          searchLocationsQuery,
          currentPage
        );
        setLocationsNamesByQuery(results);
        setPagesCount(info.pages);
      };

      getLocationsByQuery();
    }
  }, [searchLocationsQuery, currentPage]);

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

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1200px]">
      <section className="flex-grow">
        <Header />

        <LocationFilter
          locationId={locationId}
          setLocationId={setLocationId}
          searchLocationsQuery={searchLocationsQuery}
          setSearchLocationsQuery={setSearchLocationsQuery}
        />

        {searchLocationsQuery.length === 0 ? (
          <div className="w-full grid grid-cols-3 gap-4 mt-8">
            <LocationInfo currentLocation={currentLocation} />

            {isDataLoading ? (
              <div className="grid col-start-2 col-end-4">
                <Loader />
              </div>
            ) : (
              <LocationCharacters locationCharacters={locationCharacters} />
            )}
          </div>
        ) : (
          <LocationsList
            currentPage={currentPage}
            pagesCount={pagesCount}
            setCurrentPage={setCurrentPage}
            locationsNamesByQuery={locationsNamesByQuery}
            setSearchLocationsQuery={setSearchLocationsQuery}
            locationId={locationId}
            setLocationId={setLocationId}
          />
        )}
      </section>
      <Footer />
    </div>
  );
}
