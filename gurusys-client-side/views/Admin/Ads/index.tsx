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

const AdminAdsPage: NextPage = () => {
    const { data, error, isLoading } = useSWR("/adverts", fetcher, {
        refreshInterval: 1000,
    });

    const result = data;

    if (error) return <Error />;
    if (isLoading) return <Loader />;

    console.log(result);

    const deletePost = (ad: any) => {
        if (window.confirm(`Are you sure you want to delete ${ad.title}?`)) {
            axiosFetcher
                .delete(`/adverts/${ad._id}`)
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
            <section className="flex flex-col min-h-screen w-full p-2">
                <AdminHeader page="All Ads" />
                <div className="flex flex-col gap-3 w-full">
                    <p>Total Number of Ads - {result.length}</p>
                    {result.length > 0 ? (
                        result?.map((ad: any) => (
                            <div
                                key={ad._id}
                                className="flex flex-row flex-wrap items-center justify-between gap-2 w-full min-h-[4rem] bg-lightBlue p-2"
                            >
                                <h1 className="text-2xl font-bold text-black">
                                    {ad.title}
                                </h1>
                                <button
                                    type="button"
                                    onClick={() => deletePost(ad)}
                                    className="min-h-[3rem] text-black text-lg bg-red max-w-[8rem] w-full rounded-lg"
                                >
                                    Delete Ad
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full min-h-[20vh]">
                            <h1 className="text-black text-xl">
                                NO AVAILABLE ADVERT
                            </h1>
                        </div>
                    )}
                </div>
            </section>
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

export default AdminAdsPage;
