"use client";

import { NextPage } from "next";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import AdminHeader from "../../../utils/AdminHeader";
import useSWR from "swr";
import { fetcher } from "../../BlogsPage";
import Error from "../../../utils/Error";
import Loader from "../../../utils/Loader";
import { axiosFetcher } from "../../../utils/axiosBaseURL";
import { notify } from "../../../utils/FormValidations";
import Paginate from "../../../utils/Paginate";
import { ToastContainer } from "react-toastify";
import { IPost } from "../../../types/post";
import PostSearch from "./search";

const AdminPostsPage: NextPage = () => {
    const [results, setResults] = useState<IPost[]>([]);
    const [filteredResult, setFilteredResult] = useState<IPost[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const { data, error, isLoading } = useSWR("/posts", fetcher, {
        refreshInterval: 1000,
    });
    const blogsPerPage: number = 9;
    const endOffset: number = offset + blogsPerPage;

    const reArrangedData = useMemo(() => {
        const cachedData: IPost[] = [];
        data?.posts.map((post: IPost) => cachedData.unshift(post));

        return cachedData;
    }, [data?.posts]);

    useEffect(() => {
        setResults(reArrangedData);
        setFilteredResult(results);
    }, [reArrangedData, results]);

    if (error) return <Error />;
    if (isLoading) return <Loader />;

    const deletePost = (blog: IPost) => {
        if (
            window.confirm(`Are you sure you want to delete "${blog.title}"?`)
        ) {
            axiosFetcher
                .delete(`/delete-post/${blog._id}`)
                .then((res) => {
                    notify(res.data.message);
                    // console.log(res);
                })
                .catch((err) => {
                    notify(err.response.data.message);
                    // console.log(err);
                });
        }
    };

    return (
        <>
            <section className="flex flex-col min-h-screen gap-2 w-full p-2">
                <AdminHeader page="All Posts" />
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-row items-center justify-between flex-wrap gap-1 w-full">
                        <p>Total Number of Blogs - {filteredResult?.length}</p>
                        <PostSearch
                            results={results}
                            setFilteredResults={setFilteredResult}
                        />
                    </div>
                    {filteredResult?.length > 0 ? (
                        filteredResult
                            ?.slice(offset, endOffset)
                            ?.map((blog: IPost) => (
                                <div
                                    key={blog._id}
                                    className="flex flex-row flex-wrap items-center justify-between gap-2 w-full min-h-[4rem] bg-lightBlue p-2"
                                >
                                    <h1 className="text-2xl font-bold text-black">
                                        {blog.title}
                                    </h1>
                                    <div className="flex flex-row justify-between items-center gap-2 flex-wap max-w-[17rem]">
                                        <Link
                                            href={`/admin/dashboard/posts/${blog._id}`}
                                            className="w-full"
                                        >
                                            <button
                                                type="button"
                                                className="min-h-[3rem] text-black text-lg bg-twitterColor min-w-[8rem] max-w-[10rem] w-full rounded-lg px-1 "
                                            >
                                                Edit Post
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => deletePost(blog)}
                                            className="min-h-[3rem] text-black text-lg bg-red min-w-[8rem] max-w-[10rem] w-full rounded-lg px-1"
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="flex items-center justify-center w-full min-h-[20vh]">
                            <h1 className="text-black text-xl">
                                NO POST AVAILABLE
                            </h1>
                        </div>
                    )}
                </div>

                {filteredResult?.length > 10 && (
                    <Paginate
                        result={filteredResult}
                        blogsPerPage={blogsPerPage}
                        offset={offset}
                        setOffset={setOffset}
                    />
                )}
            </section>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default AdminPostsPage;
