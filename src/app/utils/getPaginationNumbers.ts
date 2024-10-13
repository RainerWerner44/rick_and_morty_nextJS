export function getPaginationNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 1) return [1];

  pageNumbers.push(1);

  if (currentPage > 3) {
    pageNumbers.push("...");
  }

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      pageNumbers.push(i);
    }
  }

  if (currentPage < totalPages - 2) {
    pageNumbers.push("...");
  }

  if (totalPages > 1) {
    pageNumbers.push(totalPages - 1, totalPages);
  }

  if (
    currentPage === totalPages ||
    currentPage === totalPages - 1 ||
    currentPage === totalPages - 2 ||
    currentPage === totalPages - 3
  ) {
    return Array.from(new Set(pageNumbers));
  }

  return pageNumbers;
}
