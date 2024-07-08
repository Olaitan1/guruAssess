"use client";

import { NextPage } from "next";
import { useState } from "react";
import AdminHeader from "../../../utils/AdminHeader";
import { Formik, Form, Field } from "formik";
import { ToastContainer } from "react-toastify";
import {
    newPostValidationSchema,
    notify,
} from "../../../utils/FormValidations";
import ImgPreview from "../UploadAds/ImgPreview";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosFetcher } from "../../../utils/axiosBaseURL";
import { categoryOptions } from "./categoryOptions";

const AdminNewPostPage: NextPage = () => {
    const [loading, setLoading] = useState(false);

    const createNewPost = (
        title: string,
        category: string,
        author: string,
        photos: string[],
        description: { heading: string; content: string }[],
    ) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("author", author);
        photos.forEach((photo) => {
            formData.append("photos", photo);
        });
        description.forEach((desc, index) => {
            formData.append(`description[${index}][heading]`, desc.heading);
            formData.append(`description[${index}][content]`, desc.content);
        });
        // formData.forEach((value, key) => console.log(key, "-", value));
        axiosFetcher
            .post("/new-post", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                notify(res.data.message);
                // console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                notify(err.response.data.message);
                // console.log(err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <main className="flex flex-col min-h-screen w-full p-2">
            <AdminHeader page="New Post" />
            <section className="flex items-start justify-center min-h-screen max-w-[56rem] w-full mx-auto py-8">
                <>
                    <Formik
                        initialValues={{
                            category: "Entertainment",
                            title: "",
                            author: "",
                            firstImg: "",
                            secondImgTitle: "",
                            secondImgTextarea: "",
                            secondImg: "",
                        }}
                        validationSchema={newPostValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // console.log(values);
                            createNewPost(
                                values.title,
                                values.category,
                                values.author,
                                [values.firstImg, values.secondImg],
                                [
                                    {
                                        heading: values.secondImgTitle,
                                        content: values.secondImgTextarea,
                                    },
                                ],
                            );
                            resetForm();
                        }}
                    >
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form className="flex flex-col justify-between gap-8 w-full max-w-[47rem] mx-auto min-h-screen">
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="gap-[1rem]">
                                        <div className="file-upload-container flex flex-col gap-2 w-full min-h-[11rem]">
                                            <Field
                                                type="file"
                                                name="firstImg"
                                                id="firstImg"
                                                accept=".png, .jpg, .jpeg"
                                                value={undefined}
                                                onChange={(e: any) =>
                                                    setFieldValue(
                                                        "firstImg",
                                                        e?.target?.files[0],
                                                    )
                                                }
                                                className="w-full focus:outline-0"
                                            />
                                            <button
                                                type="button"
                                                className="flex flex-col items-center gap-2"
                                            >
                                                Upload Cover Photo
                                            </button>
                                        </div>
                                        {values.firstImg && (
                                            <ImgPreview
                                                file={values.firstImg}
                                                fileName={values.title}
                                            />
                                        )}
                                        {errors.firstImg && touched.firstImg ? (
                                            <span className="text-red font-bold">
                                                {errors.firstImg}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="w-full">
                                        <label
                                            htmlFor="category"
                                            className="flex flex-col"
                                        >
                                            <span className="font-bold text-lg">
                                                Select Category
                                            </span>
                                            <Field
                                                as="select"
                                                name="category"
                                                id="category"
                                                className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                            >
                                                {categoryOptions.map(
                                                    (categoryOption: any) => (
                                                        <option
                                                            key={
                                                                categoryOption.name
                                                            }
                                                            value={
                                                                categoryOption.value
                                                            }
                                                        >
                                                            {
                                                                categoryOption.name
                                                            }
                                                        </option>
                                                    ),
                                                )}
                                            </Field>
                                            {errors.category &&
                                            touched.category ? (
                                                <span className="text-red font-bold">
                                                    {errors.category}
                                                </span>
                                            ) : null}
                                        </label>
                                    </div>

                                    <div className="w-full">
                                        <label
                                            htmlFor="title"
                                            className="flex flex-col"
                                        >
                                            <span className="font-bold text-lg">
                                                Title
                                            </span>
                                            <Field
                                                name="title"
                                                id="title"
                                                className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                                placeholder="The Impact of Technology on the Workplace"
                                            />
                                            {errors.title && touched.title ? (
                                                <span className="text-red font-bold">
                                                    {errors.title}
                                                </span>
                                            ) : null}
                                        </label>
                                    </div>

                                    <div className="w-full">
                                        <label
                                            htmlFor="author"
                                            className="flex flex-col"
                                        >
                                            <span className="font-bold text-lg">
                                                Author
                                            </span>
                                            <Field
                                                name="author"
                                                id="author"
                                                className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                                placeholder="Gurusys"
                                            />
                                            {errors.author && touched.author ? (
                                                <span className="text-red font-bold">
                                                    {errors.author}
                                                </span>
                                            ) : null}
                                        </label>
                                    </div>

                                    {/* SECOND IMAGE */}
                                    <div className="gap-[-1rem]">
                                        <div className="file-upload-container flex flex-col gap-2 w-full min-h-[11rem]">
                                            <Field
                                                type="file"
                                                name="secondImg"
                                                id="secondImg"
                                                accept=".png, .jpg, .jpeg"
                                                value={undefined}
                                                onChange={(e: any) =>
                                                    setFieldValue(
                                                        "secondImg",
                                                        e?.target?.files[0],
                                                    )
                                                }
                                                className="w-full focus:outline-0"
                                            />
                                            <button
                                                type="button"
                                                className="flex flex-col items-center gap-2"
                                            >
                                                Upload Second Cover Photo
                                            </button>
                                        </div>
                                        {values.secondImg && (
                                            <ImgPreview
                                                file={values.secondImg}
                                                fileName={values.title}
                                            />
                                        )}
                                        {errors.secondImg &&
                                        touched.secondImg ? (
                                            <span className="text-red font-bold">
                                                {errors.secondImg}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="w-full">
                                        <label
                                            htmlFor="secondImgTitle"
                                            className="flex flex-col"
                                        >
                                            <span className="font-bold text-lg">
                                                Sub Heading
                                            </span>
                                            <Field
                                                name="secondImgTitle"
                                                id="secondImgTitle"
                                                className="w-full min-h-[3rem] max-h-[3rem] border px-2 focus:outline-0"
                                                placeholder="The Impact of Technology on the Workplace"
                                            />
                                            {errors.secondImgTitle &&
                                            touched.secondImgTitle ? (
                                                <span className="text-red font-bold">
                                                    {errors.secondImgTitle}
                                                </span>
                                            ) : null}
                                        </label>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <label
                                            htmlFor="secondImgTextarea"
                                            className="flex flex-col"
                                        >
                                            <span className="font-bold text-lg">
                                                Sub Content
                                            </span>
                                            <Field
                                                as="textarea"
                                                rows="5"
                                                cols=""
                                                name="secondImgTextarea"
                                                id="secondImgTextarea"
                                                placeholder="Enter Content"
                                                className="w-full focus:outline-0 p-2 border"
                                            />
                                        </label>
                                        {errors.secondImgTextarea &&
                                        touched.secondImgTextarea ? (
                                            <span className="text-red font-bold">
                                                {errors.secondImgTextarea}
                                            </span>
                                        ) : null}
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
                                        "Post"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>
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
            </section>
        </main>
    );
};

export default AdminNewPostPage;

