"use client";

import type { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import { axiosFetcher } from "../../utils/axiosBaseURL";
import Adverts from "../../components/Adverts";
import Error from "../../utils/Error";
import Paginate from "../../utils/Paginate";
import SkeletonLoader from "../../utils/SkeletonLoader";
import EmptyArray from "../../components/EmptyArray";
import { IPost } from "../../types/post";

export const fetcher = (url: string) =>
    axiosFetcher.get(url).then((res) => res.data);

const BlogsPage: NextPage = () => {
    const [offset, setOffset] = useState<number>(0);
    const { data, error, isLoading } = useSWR("/posts", fetcher);
    const blogsPerPage: number = 9;
    const endOffset: number = offset + blogsPerPage;
    let result: IPost[] = [];
    data?.posts.map((post: IPost) => result.unshift(post));

    if (error) return <Error />;

    return (
        <section className="flex flex-col items-center gap-8 w-full max-w-[100rem] mx-auto p-4 md:p-8">
            <Adverts advertPosition="Home1" />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 place-content-stretch w-full">
                <SkeletonLoader
                    slicedData={result?.slice(offset, endOffset)}
                    isLoading={isLoading}
                />
            </section>

            {!isLoading && result.length < 1 && <EmptyArray />}

            {result?.length > 10 && (
                <Paginate
                    result={result}
                    blogsPerPage={blogsPerPage}
                    offset={offset}
                    setOffset={setOffset}
                />
            )}
            <Adverts advertPosition="Home2" />
        </section>
    );
};

export default BlogsPage;
