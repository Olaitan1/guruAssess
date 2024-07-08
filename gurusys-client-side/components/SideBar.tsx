import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

import { navLinks } from "./NavBar";

interface IProps {
    setInputValue: Function;
    searchBlogs: VoidFunction;
}

const SideBar = ({ setInputValue, searchBlogs }: IProps) => {
    const [modal, setModal] = useState(false);

    const removeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", removeModal);
        window.addEventListener("resize", removeModal);
    }, []);
    return (
        <nav className="flex items-center justify-center lg:hidden w-full relative h-full max-h-[3rem]">
            <ul className="flex flex-row items-center gap-4 justify-between w-full">
                <li>
                    <Link href="/">
                     GURUSYS
                    </Link>
                </li>
                <li>
                    <button type="button" onClick={() => setModal(!modal)}>
                        <RxHamburgerMenu className="max-w-[2rem] w-full text-3xl" />
                    </button>
                </li>
            </ul>

            <div
                className={
                    modal
                        ? "fixed top-[6.6rem] right-0 flex items-center justify-center p-4 min-h-[10vh] bg-grey duration-500 ease-in-out w-full"
                        : "fixed top-[6.6rem] right-[-100%] flex items-center justify-center p-4 min-h-[10vh] bg-grey duration-500 ease-in-out w-full"
                }
            >
                <ul className="flex flex-col items-center justify-between min-h-[10vh] w-full text-black">
                    {navLinks
                        .slice(1, navLinks.length)
                        .map(({ name, path }, index) => (
                            <li key={index}>
                                <Link href={path} onClick={() => removeModal()}>
                                    {name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </nav>
    );
};

export default SideBar;
