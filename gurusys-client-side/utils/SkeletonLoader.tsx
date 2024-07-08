import { IPost } from "../types/post";
import Link from "next/link";
import { Card, CardContent, CardMedia, Skeleton, Box } from "@mui/material";

interface ISkeletonLoader {
    isLoading?: boolean;
    slicedData: IPost[];
}

const SkeletonLoader = (props: ISkeletonLoader) => {
    return (
        <>
            {(props.isLoading
                ? Array.from(new Array(6))
                : props.slicedData
            ).map((blog: IPost, index: number) => (
                <Link
                    key={blog ? blog._id : index}
                    href={blog ? `/blog/${blog._id}` : "/"}
                    className="w-full max-w-full md:max-w-[25rem] hover:scale-95 duration-300 ease-linear"
                >
                    <Card className="flex flex-col items-center justify-between gap-4 min-h-[20rem] h-full w-full bg-white">
                        {blog ? (
                            <div className="flex flex-col gap-4 items-start p-3">
                                <CardMedia
                                    sx={{
                                        minHeight: "15rem",
                                        width: "100%",
                                    }}
                                    image={`${blog.photos[0]}`}
                                />
                                <button
                                    disabled
                                    className="flex items-center justify-center text-blue self-start min-h-[1.75rem] min-w-[6rem] max-w-[8rem] w-full bg-lightGrey rounded-md px-2 py-1 text-base"
                                >
                                    {blog.category}
                                </button>

                                <h1 className="font-bold text-black text-base md:text-xl overflow-ellipsis min-h-[5rem]">
                                    {blog.title}
                                </h1>
                            </div>
                        ) : (
                            <Box className="flex flex-col gap-4 items-start w-full p-3">
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    sx={{
                                        minHeight: "15rem",
                                        width: "100%",
                                    }}
                                />
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={128}
                                    height={28}
                                />
                                <Skeleton
                                    animation="wave"
                                    width="100%"
                                    height={28}
                                />
                            </Box>
                        )}
                        {blog ? (
                            <CardContent className="flex items-center justify-center w-full">
                                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between w-full">
                                    <span className="text-base text-deepGrey font-medium">
                                        Author: {blog.author}
                                    </span>
                                    <span className="text-base text-deepGrey font-medium">
                                        Posted On:&nbsp;
                                        {new Date(
                                            blog.createdAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        ) : (
                            <Box className="flex flex-col xl:flex-row items-start xl:items-center justify-between w-full p-3">
                                <Skeleton
                                    animation="wave"
                                    width="50%"
                                    height={28}
                                />
                                <Skeleton
                                    animation="wave"
                                    width="50%"
                                    height={28}
                                />
                            </Box>
                        )}
                    </Card>
                </Link>
            ))}
        </>
    );
};

export default SkeletonLoader;
