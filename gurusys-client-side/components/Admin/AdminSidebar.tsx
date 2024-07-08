"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { RiHomeSmile2Fill, RiAdvertisementLine } from "react-icons/ri";
import { BsFilePost, BsUpload } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { MdOutlineCreate } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import AdminDashboardMenuDrawer from "./AdminDashboardMenuDrawer";
import Cookies from "js-cookie";

export interface IDashboardLinks {
    name?: string;
    path?: string;
    emoji?: string | React.ReactElement;
    type?: string;
}

export const dashboardLinks: IDashboardLinks[] = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        emoji: <RiHomeSmile2Fill />,
    },
    {
        name: "Posts",
        path: "/admin/dashboard/posts",
        emoji: <BsFilePost />,
    },
    {
        name: "Upload Ads.",
        path: "/admin/dashboard/uploadAds",
        emoji: <BsUpload />,
    },
    {
        name: "All Ads.",
        path: "/admin/dashboard/ads",
        emoji: <RiAdvertisementLine />,
    },
    {
        name: "Users",
        path: "/admin/dashboard/users",
        emoji: <AiOutlineUser />,
    },
    {
        name: "Create Admin",
        path: "/admin/dashboard/createAdmin",
        emoji: <MdOutlineCreate />,
    },
    {
        name: "New Post",
        path: "/admin/dashboard/newPost",
        emoji: <AiOutlinePlus />,
    },
];

const DashboardSidebar = () => {
    const router = useRouter();
    const pathname: string = usePathname();

    const logOut = () => {
        Cookies.remove("token");
        Cookies.remove("adminDetails");
        router.push("/admin");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            alert("Session expired")
            logOut();
        }, 3500000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <section className="hidden lg:block max-h-screen max-w-[20%] bg-grey w-full sticky top-0">
                <div className="flex flex-col justify-between w-full h-full p-4">
                    <nav className="flex flex-col gap-8 w-full">
                        <div className="max-w-[8rem] w-full min-h-[6rem]">
                         Gurusys
                        </div>
                        <ul className="flex flex-col gap-3 w-full">
                            {dashboardLinks.map(
                                (item: IDashboardLinks, index: number) => (
                                    <li
                                        key={index}
                                        className="max-w-[11rem] w-full min-h-[1.5rem] max-h-[2rem]"
                                    >
                                        <Link
                                            href={item.path!}
                                            className="w-full h-full"
                                        >
                                            <button
                                                type="button"
                                                className={
                                                    pathname === item.path
                                                        ? "flex flex-row items-center justify-between p-2 gap-3 w-full  rounded-xl text-purple bg-lightBlue h-full"
                                                        : "flex flex-row items-center justify-between p-2 gap-3 w-full rounded-xl text-purple bg-white h-full"
                                                }
                                            >
                                                <span className="text-blue">
                                                    {item.emoji}
                                                </span>
                                                <span
                                                    className={
                                                        pathname === item.path
                                                            ? "text-base flex-1 flex items-center justify-start font-thin italic"
                                                            : "text-base flex-1 flex items-center justify-start font-normal"
                                                    }
                                                >
                                                    {item.name}
                                                </span>
                                            </button>
                                        </Link>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>

                    <button
                        type="button"
                        onClick={() => logOut()}
                        className="flex flex-row items-center justify-center gap-1 max-w-[12rem] w-full min-h-[2.5rem] rounded-xl text-white bg-blue"
                    >
                        <TbLogout />
                        <span className="text-sm font-bold">Log Out</span>
                    </button>
                </div>
            </section>

            {/* SMALL SCREEN MENU */}
            <AdminDashboardMenuDrawer logOut={logOut} />
        </>
    );
};

export default DashboardSidebar;
