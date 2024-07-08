"use client";

import { NextPage } from "next";
import AdminHeader from "../../../utils/AdminHeader";
import useSWR from "swr";
import { fetcher } from "../../BlogsPage";
import Error from "../../../utils/Error";
import Loader from "../../../utils/Loader";
import { axiosFetcher } from "../../../utils/axiosBaseURL";
import { notify } from "../../../utils/FormValidations";
import { ToastContainer } from "react-toastify";

const AdminUsersPage: NextPage = () => {
    const { data, error, isLoading } = useSWR("/admins", fetcher, {
        refreshInterval: 1000,
    });
    const result = data?.admins;

    if (error) return <Error />;
    if (isLoading) return <Loader />;

    const deleteAdmin = (admin: any) => {
        if (
            window.confirm(`Are you sure you want to delete ${admin.username}?`)
        ) {
            axiosFetcher
                .delete(`/delete-admin/${admin._id}`)
                .then((res) => {
                    notify(res.data.message);
                    // console.log(res);
                })
                .catch((err) => {
                    notify(err.response.data.message);
                    // console.log(err);
                });
        }
    };

    return (
        <>
            <main className="flex flex-col min-h-full w-full p-2">
                <AdminHeader page="ADMINS" />
                <section className="flex flex-col gap-3 w-full">
                    <p>Total Number of Admins - {result.length}</p>
                    {result.length > 0 ? (
                        result?.map((admin: any) => (
                            <div
                                key={admin._id}
                                className="flex flex-row flex-wrap items-center justify-between gap-2 w-full min-h-[4rem] bg-lightBlue p-2"
                            >
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold text-black">
                                        {admin.username}
                                    </h1>
                                    <p className="text-lg font-medium text-black">
                                        {admin.email}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => deleteAdmin(admin)}
                                    className="min-h-[3rem] text-black text-lg bg-red max-w-[8rem] w-full rounded-lg"
                                >
                                    Delete Admin
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full min-h-[20vh]">
                            <h1 className="text-black text-xl">
                                NO ADMIN CREATED
                            </h1>
                        </div>
                    )}
                </section>
            </main>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default AdminUsersPage;
