import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Metadata } from "next";
import favicon from "../app/favicon.ico";
import NavBar from "../components/NavBar";
import ScrollUp from "../components/ScrollUp";
import Footer from "../components/Footer";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "360 Report",
    description: "360 Report",
    keywords: "360 Report's Blog",
    icons: {
        icon: `${favicon.src}`,
        apple: `${favicon.src}`,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className={workSans.className}
            >
                <NavBar />
                {children}
                <ScrollUp />
                <Footer />
            </body>
        </html>
    );
}
