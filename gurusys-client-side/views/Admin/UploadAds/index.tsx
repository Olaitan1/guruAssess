"use client";

import { useState } from "react";
import { NextPage } from "next";
import CircularProgress from "@mui/material/CircularProgress";
import AdminHeader from "../../../utils/AdminHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { notify, URLRegex } from "../../../utils/FormValidations";
import ImgPreview from "./ImgPreview";
import { axiosFetcher } from "../../../utils/axiosBaseURL";
import { positionOptions } from "./PositionOptions";

const AdminAdsUploadPage: NextPage = () => {
    const [loading, setLoading] = useState(false);

    const uploadAds = (
        image: string,
        link: string,
        title: string,
        position: string,
        startDate: string,
        endDate: string,
    ) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("imageUrl", image);
        formData.append("link", link);
        formData.append("title", title);
        formData.append("position", position);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);

        axiosFetcher
            .post("/post-ads", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                notify("Ad uploaded successfully");
                // console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                notify("Error");
                // console.log(err);
            })
            .finally(() => setLoading(false));
    };

    const formik = useFormik({
        initialValues: {
            imgAd: "",
            AdURL: "",
            AdTitle: "",
            startDate: "",
            position: "Home1",
            endDate: "",
        },
        validationSchema: Yup.object({
            imgAd: Yup.mixed().required("Required"),
            AdURL: Yup.string()
                .required("Required")
                .matches(URLRegex, "Enter Correct URL. Must include https//:"),
            AdTitle: Yup.string().required("Required"),
            position: Yup.string().required("Required"),
            startDate: Yup.string().required("Required"),
            endDate: Yup.string().required("Required"),
        }),
        onSubmit: (values, { resetForm }) => {
            uploadAds(
                values.imgAd,
                values.AdURL,
                values.AdTitle,
                values.position,
                values.startDate,
                values.endDate,
            );
            resetForm();
        },
    });

    return (
        <main className="flex flex-col gap-8 min-h-screen w-full p-2">
            <AdminHeader page="Upload Ads." />
            <div className="flex items-start justify-center min-h-screen max-w-[56rem] w-full mx-auto border border-deepGrey px-2 py-8">
                <>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col gap-3 justify-between w-full max-w-[47rem] mx-auto h-full min-h-screen"
                    >
                        <div className="flex flex-col gap-[3rem] w-full">
                            <div className="flex flex-col max-h-[11rem] w-full">
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        name="imgAd"
                                        id="imgAd"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) => {
                                            formik.setFieldValue(
                                                "imgAd",
                                                e.target.files &&
                                                    e.target.files[0],
                                            );
                                        }}
                                        onBlur={formik.handleBlur}
                                        className="h-full w-full"
                                    />
                                    <button type="button">Upload Image</button>
                                </div>
                                {formik.values.imgAd && (
                                    <ImgPreview
                                        file={formik.values.imgAd}
                                        fileName={formik.values.AdTitle}
                                    />
                                )}
                                {formik.errors.imgAd && formik.touched.imgAd ? (
                                    <span className="text-red font-bold">
                                        {formik.errors.imgAd}
                                    </span>
                                ) : null}
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="AdURL"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold text-lg">
                                        Enter Ad URL
                                    </span>
                                    <input
                                        type="url"
                                        id="AdURL"
                                        {...formik.getFieldProps("AdURL")}
                                        placeholder="https://ecoonlineglobal.com"
                                        className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                    />
                                    {formik.errors.AdURL &&
                                    formik.touched.AdURL ? (
                                        <span className="text-red font-bold">
                                            {formik.errors.AdURL}
                                        </span>
                                    ) : null}
                                </label>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="AdTitle"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold text-lg">
                                        Enter Ad Title
                                    </span>
                                    <input
                                        type="text"
                                        id="AdTitle"
                                        {...formik.getFieldProps("AdTitle")}
                                        placeholder="Gurusys"
                                        className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                    />
                                    {formik.errors.AdTitle &&
                                    formik.touched.AdTitle ? (
                                        <span className="text-red font-bold">
                                            {formik.errors.AdTitle}
                                        </span>
                                    ) : null}
                                </label>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="position"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold text-lg">
                                        Select Ad Position
                                    </span>
                                    <select
                                        id="position"
                                        className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                        {...formik.getFieldProps("position")}
                                    >
                                        {positionOptions.map(
                                            (position: any) => (
                                                <option
                                                    key={position.name}
                                                    value={position.value}
                                                >
                                                    {position.name}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    {formik.errors.position &&
                                    formik.touched.position ? (
                                        <span className="text-red font-bold">
                                            {formik.errors.position}
                                        </span>
                                    ) : null}
                                </label>
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="startDate"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold text-lg">
                                        Enter Start Date
                                    </span>
                                    <input
                                        type="date"
                                        id="startDate"
                                        {...formik.getFieldProps("startDate")}
                                        className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                    />
                                    {formik.errors.startDate &&
                                    formik.touched.startDate ? (
                                        <span className="text-red font-bold">
                                            {formik.errors.startDate}
                                        </span>
                                    ) : null}
                                </label>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="endDate"
                                    className="flex flex-col"
                                >
                                    <span className="font-bold text-lg">
                                        Enter End Date
                                    </span>
                                    <input
                                        type="date"
                                        id="endDate"
                                        {...formik.getFieldProps("endDate")}
                                        className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                    />
                                    {formik.errors.endDate &&
                                    formik.touched.endDate ? (
                                        <span className="text-red font-bold">
                                            {formik.errors.endDate}
                                        </span>
                                    ) : null}
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex flex-row items-center justify-center gap-1 max-w-[12rem] w-full min-h-[2.5rem] rounded-xl text-white bg-blue"
                        >
                            {loading ? (
                                <CircularProgress
                                    color="inherit"
                                    size={20}
                                    className="text-white"
                                />
                            ) : (
                                "UPLOAD AD"
                            )}
                        </button>
                    </form>

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
            </div>
        </main>
    );
};

export default AdminAdsUploadPage;

