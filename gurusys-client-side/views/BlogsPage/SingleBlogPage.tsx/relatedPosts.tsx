"use client";

import useSWR from "swr";
import Link from "next/link";
import Loader from "../../../utils/Loader";
import Error from "../../../utils/Error";
import { fetcher } from "..";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IPost } from "../../../types/post";
import { Card } from "@mui/material";

interface IProps {
    blog: { category: string; title: string };
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        slidesToSlide: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1,
        partialVisibilityGutter: 40,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        slidesToSlide: 1,
        partialVisibilityGutter: 30,
    },
    mobile: {
        breakpoint: { max: 768, min: 350 },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 50,
    },
};

const RelatedBlogs = ({ blog: { category, title } }: IProps) => {
    const { data, error, isLoading } = useSWR("/posts", fetcher);

    if (error) return <Error />;
    if (isLoading) return <Loader />;

    const relatedBlogs: IPost[] = data.posts.filter(
        (post: IPost) => post.category === category && post.title !== title,
    );

    return (
        <div className="flex flex-col gap-2 w-full">
            <h1 className="font-bold text-black text-2xl text-center">
                Related Stories
            </h1>
            <Carousel
                responsive={responsive}
                removeArrowOnDeviceType={["mobile"]}
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={3000}
                containerClass="container-with-dots"
                dotListClass=""
                draggable={true}
                focusOnSelect={false}
                infinite={true}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                partialVisible={true}
            >
                {relatedBlogs?.map((relatedBlog: IPost) => (
                    <Link
                        href={`/blog/${relatedBlog._id}`}
                        key={relatedBlog._id}
                        className="flex items-stretch justify-center max-w-[22rem] min-h-[20rem] w-full bg-white rounded-lg hover:scale-95 duration-300 ease-linear mx-4"
                    >
                        <Card className="flex flex-col gap-[1rem] w-full p-2">
                            <div
                                className="max-w-[23rem] min-h-[15rem] max-h-[15rem] w-full"
                                style={{
                                    backgroundImage: `url(${relatedBlog.photos[0]})`,
                                    backgroundOrigin: "border-box",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain",
                                }}
                            />
                            <h1 className="text-lg font-bold text-black">
                                {relatedBlog.title}
                            </h1>
                        </Card>
                    </Link>
                ))}
            </Carousel>
        </div>
    );
};

export default RelatedBlogs;
