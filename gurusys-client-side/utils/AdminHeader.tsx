"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

interface IProps {
    page: string;
}

const AdminHeader = ({ page }: IProps) => {
    const [user, setUser] = useState<any>(null);
    const pathname: string = usePathname();

    useEffect(() => {
        const adminUser =
            Cookies.get("adminDetails")! &&
            JSON.parse(Cookies.get("adminDetails")!);

        setUser(adminUser);
    }, []);

    return (
        <header className="flex flex-row items-center justify-between w-full sticky top-0 bg-white z-[5] min-h-[4rem]">
            <h1 className="font-bold text-xl md:text-3xl text-purple">
                {page}
            </h1>
            {pathname === "/admin/dashboard" && (
                <div className="flex flex-col">
                    <p className="font-medium text-lg md:text-3xl">
                        Welcome, {user && user.username}
                    </p>
                    <small>{user && user.role.toUpperCase()}</small>
                </div>
            )}
        </header>
    );
};

export default AdminHeader;
