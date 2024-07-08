"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { BsSearch } from "react-icons/bs";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { axiosFetcher } from "../utils/axiosBaseURL";

interface INavLinks
{
    name: string;
    path: string;
}

export const navLinks: INavLinks[] = [
    {
        name: "GURUSYS",
        path: "/",
    },
    {
        name: "Blogs",
        path: "/blog",
    },
    {
        name: "Place Ads",
        path: "/place_ads",
    },
    {
        name: "Contact Us",
        path: "/contact",
    },
    {
        name: "Search Blogs",
        path: "/search",
    },
];

const fetcher = (url: string) => axiosFetcher.get(url).then((res) => res.data);

const NavBar = () =>
{
    const [inputValue, setInputValue] = useState("");
    const [fixedNav, setFixedNav] = useState(false);
    const { data } = useSWR("/posts", fetcher);
    const pathname: string = usePathname();
    const results = data?.posts;

    const searchBlogs = () =>
    {
        results.filter((result: { title: string }) =>
            result.title
                .toLowerCase()
                .includes(inputValue.trim().toLowerCase()),
        );
    };

    useEffect(() =>
    {
        window.addEventListener("scroll", () =>
        {
            if (
                document.documentElement.scrollTop > 10 ||
                document.body.scrollTop > 10
            ) {
                setFixedNav(true);
            } else {
                setFixedNav(false);
            }
        });
    }, [fixedNav]);

    return (
        <>
            {!pathname.includes("admin") && (
                <section
                    className={
                        fixedNav
                            ? "flex items-center justify-center bg-grey w-full px-4 py-2 md:py-5 md:px-8 sticky top-0 z-[1000000] shadow-sm duration-500 ease-in-out shadow-deepGrey min-h-[5rem]"
                            : "flex items-center justify-center bg-white w-full px-4 py-2 md:py-5 md:px-8 sticky top-0 z-[1000000] shadow-sm duration-500 ease-in-out shadow-deepGrey min-h-[5rem]"
                    }
                >
                    <div className="flex flex-col items-stretch gap-1 max-w-[100rem] mx-auto w-full">
                        <nav className="hidden flex-1 lg:flex flex-row items-center justify-between w-full">
                            <Link
                                href={navLinks[0].path}
                                className="max-w-[20rem] text-blue"
                            >
                                GURUSYS
                            </Link>
                            <ul className="flex flex-row items-center justify-between w-full max-w-[22rem] text-black">
                                {navLinks.slice(1, 4).map(({ name, path }) => (
                                    <li key={name}>
                                        <Link href={path}>{name}</Link>
                                    </li>
                                ))}
                            </ul>

                            <ul className="flex items-center justify-center w-full max-w-[5rem] text-black">
                                <li className="flex items-center justify-center w-full">
                                    <Link
                                        href={navLinks[4].path}
                                        title={navLinks[4].name}
                                    >
                                        <BsSearch className="max-w-[1.5rem] w-full min-h-[2rem]" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <SideBar
                            setInputValue={setInputValue}
                            searchBlogs={searchBlogs}
                        />
                        <div className="w-full flex-1 flex items-center justify-center">
                            {!pathname.includes("admin") && (
                                <h1 className="font-semibold text-xl md:text-2xl text-black text-center">
                                    {pathname === "/" || pathname === "/blog"
                                        ? "Welcome to GuruSys Blog"
                                        : pathname === "/place_ads"
                                            ? "Place Ads."
                                            : pathname === "/contact"
                                                ? "Contact Us"
                                                : pathname === "/search"
                                                    ? "Search Blogs"
                                                    : "Article Page"}
                                </h1>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default NavBar;
