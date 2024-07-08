import ReactPaginate from "react-paginate";

interface IPagenateProps {
    blogsPerPage: number;
    offset: number;
    setOffset: Function;
    result: Object[];
}

const Paginate = ({ result, blogsPerPage, setOffset }: IPagenateProps) => {
    function handlePageClick(e: any) {
        const newOffset = (e.selected * blogsPerPage) % result.length;
        setOffset(newOffset);
    }

    const pageCount = Math.ceil(result.length / blogsPerPage);

    return (
        <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageRangeDisplayed={0}
            marginPagesDisplayed={0}
            containerClassName={
                "flex flex-row flex-wrap items-center justify-center gap-4 max-w-[25rem] w-full"
            }
            previousClassName={"max-w-[8rem] min-h-[3rem]"}
            previousLinkClassName={
                "flex item-center justify-center p-2 hover:scale-110 duration-300 ease-linear w-full border border-lightGrey text-base text-deepGrey font-medium rounded-lg"
            }
            nextClassName={"max-w-[8rem] min-h-[3rem]"}
            nextLinkClassName={
                "flex item-center justify-center p-2 hover:scale-110 duration-300 ease-linear w-full border border-lightGrey text-base text-deepGrey font-medium rounded-lg"
            }
            disabledLinkClassName={
                "hover:scale-100 opacity-50 cursor-not-allowed"
            }
        />
    );
};

export default Paginate;
