import { useState, useEffect } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { dashboardLinks, IDashboardLinks } from "./AdminSidebar";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

interface IProps {
    logOut: VoidFunction;
}

const AdminDashboardMenuDrawer = ({ logOut }: IProps) => {
    const [modal, setModal] = useState(false);

    const removeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", removeModal);
        window.addEventListener("resize", removeModal);
    }, []);

    return (
        <section className="block lg:hidden min-h-[4rem] sticky top-0 z-[10] w-full bg-grey">
            <div className="flex flex-row items-center justify-between p-2">
                <div className="max-w-[5rem] w-full min-h-[3rem]">
               Gurusys
                </div>
                <button type="button" onClick={() => setModal(true)}>
                    <RxHamburgerMenu className="w-10 h-10" />
                </button>
            </div>
            <div
                className={
                    modal
                        ? "fixed z-50 right-0 top-0 h-full bg-grey flex flex-col justify-between flex-[0.3] max-w-[60%] w-full duration-500 ease-in-out p-4"
                        : "fixed z-50 right-[-100%] h-full top-0 bg-grey flex flex-col justify-between flex-[0.3] max-w-[60%] w-full duration-500 ease-in-out p-4"
                }
            >
                <div className="flex flex-col gap-8">
                    <button
                        type="button"
                        onClick={() => setModal(false)}
                        className=" self-end"
                    >
                        <AiOutlineClose className=" w-10 h-10" />
                    </button>
                    <ul className="flex flex-col gap-8 text-lg">
                        {dashboardLinks.map(
                            (item: IDashboardLinks, index: number) => (
                                <li
                                    key={index}
                                    className="max-w-[11rem] w-full min-h-[2.5rem]"
                                >
                                    <Link
                                        href={item.path!}
                                        onClick={() => setModal(false)}
                                    >
                                        <button
                                            type="button"
                                            className="flex flex-row items-center justify-between p-2 gap-3 w-full  rounded-xl text-purple bg-white h-full"
                                        >
                                            <span className="text-blue">
                                                {item.emoji}
                                            </span>
                                            <span className="text-md flex-1 flex items-center justify-start font-normal">
                                                {item.name}
                                            </span>
                                        </button>
                                    </Link>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
                <button
                    type="button"
                    onClick={() => logOut()}
                    className="flex flex-row items-center justify-center gap-1 max-w-[12rem] w-full min-h-[2.5rem] rounded-xl text-white bg-blue"
                >
                    <AiOutlinePlus />
                    <span className="text-sm font-bold">Log Out</span>
                </button>
            </div>
        </section>
    );
};

export default AdminDashboardMenuDrawer;
