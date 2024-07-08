"use client";
import useSWR from "swr";
import Adverts from "../../../components/Adverts";
import Loader from "../../../utils/Loader";
import Error from "../../../utils/Error";
import BreadCrumb from "../../../utils/Breadcrumb";
import { fetcher } from "..";
import RelatedBlogs from "./relatedPosts";
import { CardMedia } from "@mui/material";

interface IProps {
    blogID: string[];
}

const SingleBlogPage = ({ blogID }: IProps) => {
    const { data, error, isLoading } = useSWR(`/post/${blogID}`, fetcher);

    if (error) return <Error />;
    if (isLoading) return <Loader />;

    const post = data.post;

    return (
        <section className="flex flex-col items-center gap-8 w-full max-w-[100rem] mx-auto p-4 md:p-8">
            <BreadCrumb blog={post} />
            <Adverts advertPosition="Article1" />
            <div className="flex flex-col items-center justify-center max-w-[50rem] w-full gap-2">
                <div className="flex flex-col items-start self-start gap-3">
                    <button
                        disabled
                        className="flex items-center justify-center bg-blue self-start min-h-[1.75rem] min-w-[6rem] max-w-[8rem] w-full text-lightGrey rounded-md px-2 py-1 text-base text-center"
                    >
                        {post.category}
                    </button>

                    <h1 className="font-bold text-black text-2xl">
                        {post.title}
                    </h1>
                    <p>By - {post.author}</p>
                </div>

                <CardMedia
                    sx={{
                        minHeight: "15rem",
                        width: "100%",
                        backgroundOrigin: "border-box",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                    }}
                    image={`${post.photos[0]}`}
                />

                {post.description && (
                    <div className="flex flex-col gap-4 items-start w-full">
                        {post.description.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="flex flex-col items-start w-full gap-2"
                            >
                                <h1 className="text-lg font-bold">
                                    {item.heading}
                                </h1>
                                <p className="text-base font-normal">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                {post.photos[1] && (
                    <CardMedia
                        sx={{
                            minHeight: "15rem",
                            width: "100%",
                            backgroundOrigin: "border-box",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                        }}
                        image={`${post.photos[1]}`}
                    />
                )}
            </div>

            <RelatedBlogs blog={post} />
            <BreadCrumb blog={post} />
            <Adverts advertPosition="Article2" />
        </section>
    );
};

export default SingleBlogPage;
