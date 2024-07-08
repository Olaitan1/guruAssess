"use client";

import { NextPage } from "next";
import Image from "next/image";
import contact from "../../public/contact.png";
import ContactForm from "../../components/ContactForm";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiFillInstagram,
} from "react-icons/ai";

const ContactPage: NextPage = () => {
    return (
        <section className="w-full max-w-[100rem] mx-auto p-4 md:p-8 relative">
            <div className="max-w-[40rem] w-full block lg:hidden">
                <Image
                    src={contact.src}
                    alt="contact"
                    width={200}
                    height={200}
                    className="w-full"
                    priority
                />
            </div>
            <div className="contact max-w-[40rem] w-full hidden lg:block">
                <Image
                    src={contact.src}
                    alt="contact"
                    width={200}
                    height={200}
                    className="w-full"
                    priority
                />
            </div>
            <section className="flex flex-col lg:flex-row items-start justify-center w-full gap-4">
                <div className="flex-1 flex flex-col gap-4 md:gap-8 py-4 lg:p-4 bg-white lg:bg-lightGrey text-black rounded-lg w-full">
                    <h1 className="font-normal text-lg md:text-4xl">
                        Send us a message
                    </h1>
                    <ContactForm />
                </div>
                <div className="flex-1 flex flex-col gap-4 md:gap-6 py-4">
                    <p className="font-normal text-xl md:text-3xl">
                        For further Inquires, see our office address below:
                    </p>
                    <ul className="flex flex-col gap-2">
                        <li className="flex flex-row items-center gap-2">
                            <MdLocationOn className="w-full max-w-[3rem] min-h-[3rem] text-blue" />
                            <span className="font-normal text-base md:text-2xl">
                                10c, Ajanuku Street, Off Salvation Road, Opebi, Ikeja, Lagos, Nigeria.
                            </span>
                        </li>
                        <li className="flex flex-row items-center gap-2">
                            <BsFillTelephoneFill className="w-full max-w-[3rem] min-h-[3rem] text-blue" />
                            <a
                                href="tel:+2348183322118"
                                className="font-normal text-base md:text-2xl"
                            >
                                +2348183322118
                            </a>
                        </li>
                        <li className="flex flex-row items-center gap-2">
                            <AiOutlineMail className="w-full max-w-[3rem] min-h-[3rem] text-blue" />
                            <a
                                href="mailto:networkblogsng@gmail.com"
                                className="font-normal text-base md:text-2xl"
                            >
                                networkblogsng@gmail.com
                            </a>
                        </li>
                    </ul>
                    <ul className="flex flex-row items-center justify-start gap-2">
                        <li>
                            <a
                                href="http://"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillFacebook className="w-[51px] h-[48px] text-facebookColor"/>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com/NetworkBlogsNG"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillTwitterSquare className="w-[51px] h-[48px] text-twitterColor"/>
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillInstagram className="w-[51px] h-[48px] text-black"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    );
};

export default ContactPage;

