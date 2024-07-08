"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { quickLinks, categoryLinks } from "./FooterLinks";
import { subscribeForm } from "../../utils/FormValidations";

const Footer = () => {
    const pathname: string = usePathname();
    const Year: number = new Date().getFullYear();

    return (
        <>
        {!pathname.includes("admin") &&
            (
                <footer className="p-4 md:p-8 min-h-[31rem] w-full bg-grey">
            <section className="flex flex-col justify-between gap-4 max-w-[100rem] min-h-[28rem] w-full mx-auto">
                <div className="flex-1 flex flex-row items-start justify-between flex-wrap gap-4">
                    <div className="flex-1 flex flex-col gap-4 max-w-[18rem] w-full">
                        <div className="flex-1 flex flex-col gap-1 md:gap-4">
                            <h1 className="text-lg font-semibold">About</h1>
                            <p>
                                Welcome to&nbsp;
                                <Link href="/" className="text-blue">
                                    Gurusys
                                </Link>
                                . Get trending news on events, entertainment,
                                lifestyle, fashion, gossips and politics. Know
                                what&apos;s happening in Nigeria and beyond.
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p>
                                <span className="text-lg font-semibold">
                                    Email:
                                </span>
                                &nbsp;
                                        <a href="mailto:gurusys@gmail.com">
                                            gurusys@gmail.com
                                </a>
                            </p>
                            <p>
                                <span className="text-lg font-semibold">
                                    Phone:
                                </span>
                                &nbsp;
                                        <a href="tel:+2348012345678">+2348012345678</a>
                            </p>
                        </div>
                    </div>
                    <div className="flex max-w-[20rem] lg:max-w-[30rem] w-full flex-row items-start justify-between lg:justify-around gap-4">
                        <div className="flex flex-col gap-1 md:gap-4">
                            <h1 className="text-lg font-semibold">
                                Quick Link
                            </h1>
                            <ul className="flex flex-col">
                                {quickLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.path}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-1 md:gap-4">
                            <h1 className="text-lg font-semibold">Category</h1>
                            <ul className="flex flex-col">
                                {categoryLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.path}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-center max-w-[25rem] w-full min-h-[16rem] bg-white rounded-lg">
                        <div className="flex flex-col gap-6 max-w-[20rem] w-full">
                            <div className="flex flex-col items-center gap-3">
                                <h1 className="text-center font-semibold text-xl">
                                    Weekly Newsletter
                                </h1>
                                <p className="text-center font-normal text-base">
                                    Get blog articles and offers via mail
                                </p>
                            </div>
                            {subscribeForm}
                        </div>
                    </div>
                </div>
                <section className="flex flex-col-reverse md:flex-row items-start md:items-end justify-between gap-3 w-full">
                    <div className="flex-1 flex flex-wrap items-end gap-1">
                      Gurusys
                        <p className="font-normal text-base">
                            &copy; {Year}. All Rights Reserved
                        </p>
                    </div>
                    <div className="flex-[0.5] flex flex-row items-center justify-end gap-1">
                        <a href="/">Terms of Use</a>
                        <span>|</span>
                        <a href="/">Privacy Policy</a>
                    </div>
                </section>
            </section>
        </footer>
            )
        }
        </>
    );
};

export default Footer;
