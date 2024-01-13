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
              ? "bg-gray-200 rounded-md mr-2 cursor-not-allowed"
              : "bg-Primary mr-2 text-white hover:bg-PrimaryHover rounded-md"
          }`}
        >
          <span>{`<<`}</span>
        </Link>
      ) : (
        <button
          className={`px-4 py-2 mr-2 font-medium ${
            !hasPrev
              ? "bg-gray-200 rounded-md mr-2 cursor-not-allowed"
              : "bg-Primary mr-2 text-white hover:bg-PrimaryHover rounded-md"
          }`}
        >
          {`<<`}
        </button>
      )}
      {pages.map((page) => (
        <Link href={`${pathName}?Page=${parseInt(page)}`} key={page}>
          <span
            className={`inline-block px-4 py-2 mr-2 ${
              currentPage === page
                ? "bg-Primary rounded-md text-white"
                : "bg-gray-200 rounded-md hover:bg-gray-300"
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
              ? "bg-gray-200 rounded-md cursor-not-allowed"
              : "bg-Primary text-white hover:bg-PrimaryHover rounded-md"
          }`}
        >
          {`>>`}
        </Link>
      ) : (
        <button
          className={`px-4 py-2 ml-2 ${
            !hasNext
              ? "bg-gray-200 rounded-md cursor-not-allowed"
              : "bg-Primary text-white hover:bg-PrimaryHover rounded-md"
          }`}
        >
          {`>>`}
        </button>
      )}
    </div>
  );
};

export default Pagination;
