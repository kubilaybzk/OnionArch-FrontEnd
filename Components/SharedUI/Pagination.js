import Link from "next/link";

const Pagination = ({
  totalCount,
  totalPageSize,
  currentPage,
  hasNext,
  hasPrev,
  pageSize,
  pathName,
}) => {
  const pages = Array.from({ length: totalPageSize }, (_, i) => i);
  return (
    <div className="flex justify-center items-center mt-8">
      {hasPrev ? (
        <Link
          href={`${pathName}?Page=${parseInt(currentPage) - 1}`}
          className={`px-4 py-2 mr-2 font-medium ${
            !hasPrev
              ? "bg-gray-200 mr-2 cursor-not-allowed"
              : "bg-blue-500 mr-2 text-white hover:bg-blue-600"
          }`}
        >
          <span>Önceki Sayfa</span>
        </Link>
      ) : (
        <button
          className={`px-4 py-2 mr-2 font-medium ${
            !hasPrev
              ? "bg-gray-200 mr-2 cursor-not-allowed"
              : "bg-blue-500 mr-2 text-white hover:bg-blue-600"
          }`}
        >
          Önceki Sayfa
        </button>
      )}
      {pages.map((page) => (
        <Link href={`${pathName}?Page=${parseInt(page)}`} key={page}>
          <span
            className={`inline-block px-4 py-2 mr-2 ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page + 1}
          </span>
        </Link>
      ))}
      {hasNext ? (
        <Link
          href={`${pathName}?Page=${parseInt(currentPage) + 1}`}
          className={`px-4 py-2 ml-2 ${
            !hasNext
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <span>Sonraki Sayfa</span>
        </Link>
      ) : (
        <button
          className={`px-4 py-2 ml-2 ${
            !hasNext
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Sonraki Sayfa
        </button>
      )}
    </div>
  );
};

export default Pagination;
