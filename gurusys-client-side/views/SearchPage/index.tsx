"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../BlogsPage";
import Error from "../../utils/Error";
import Loader from "../../utils/Loader";
import PostSearch from "../Admin/Posts/search";
import { IPost } from "../../types/post";
import { Card } from "@mui/material";

const SearchPage: NextPage = () => {
    const [results, setResults] = useState<IPost[]>([]);
    const [filteredResult, setFilteredResult] = useState<IPost[]>([]);
    const { data, error, isLoading } = useSWR("/posts", fetcher);

    useEffect(() => {
        setResults(data?.posts);
        setFilteredResult(results);
    }, [data?.posts, results]);

    if (error) return <Error />;
    if (isLoading) return <Loader />;

    return (
        <section className="flex flex-col items-center gap-8 w-full max-w-[100rem] mx-auto p-4 md:p-8">
            <PostSearch
                size="100%"
                results={results}
                setFilteredResults={setFilteredResult}
            />
            {filteredResult?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 place-items-center w-full">
                    {filteredResult?.map((blog: IPost) => (
                        <Link
                            href={`/blog/${blog._id}`}
                            key={blog._id}
                            className="flex items-stretch justify-center max-w-[22rem] min-h-[20rem] w-full bg-white rounded-lg hover:scale-95 duration-300 ease-linear mx-4"
                        >
                            <Card className="flex flex-col gap-[1rem] w-full p-2">
                                <div
                                    className="max-w-[23rem] min-h-[15rem] max-h-[15rem] w-full"
                                    style={{
                                        backgroundImage: `url(${blog.photos[0]})`,
                                        backgroundOrigin: "border-box",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain",
                                    }}
                                />
                                <h1 className="text-lg font-bold text-black">
                                    {blog.title}
                                </h1>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full min-h-[20vh]">
                    <h1 className="text-black text-xl text-center w-full">
                        NO POST AVAILABLE
                    </h1>
                </div>
            )}
        </section>
    );
};

export default SearchPage;
