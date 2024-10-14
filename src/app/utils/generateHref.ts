export const generateHref = (
  page: number,
  search: string,
  status: string,
  species: string,
  gender: string
) => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (status) queryParams.append("status", status);
  if (species) queryParams.append("species", species);
  if (gender) queryParams.append("gender", gender);

  return `?page=${page}&${queryParams.toString()}`;
};
