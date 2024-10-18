import { Location } from "@/types/Location";

export default function LocationInfo({
  currentLocation,
}: {
  currentLocation: Location | null;
}) {
  return (
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
  );
}
