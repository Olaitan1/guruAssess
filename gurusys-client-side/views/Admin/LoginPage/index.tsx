"use client";
import { useState } from "react";
import { NextPage } from "next";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { emailRegExp, passwordRegex } from "../../../utils/FormValidations";
import { navLinks } from "../../../components/NavBar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosFetcher } from "../../../utils/axiosBaseURL";
import { notify } from "../../../utils/FormValidations";
import { ToastContainer } from "react-toastify";

const loginFormValidationSchema: Object = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(emailRegExp, "Invalid email"),
    password: Yup.string()
        .required("Password is required")
        // .matches(
        //     passwordRegex,
        //     "Password must be at least 8 characters with lowercase, uppercase, a number.",
        // ),
});

const AdminLoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const router = useRouter();

    const adminLogin = (email: string, password: string) => {
        setLoading(true);
        const user = {
            email: email,
            password: password,
        };
        axiosFetcher
            .post("/login", user)
            .then((res) => {
                router.push("/admin/dashboard");
                Cookies.set("token", res.data.token);
                Cookies.set("adminDetails", JSON.stringify(res.data.admin));
                // console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                notify(err.response.data.error || err.response.data.Error);
                // console.log(err);
            })
            .finally(() => setLoading(false));
    };
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={loginFormValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    adminLogin(values.email, values.password);
                    resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form className="flex items-center justify-center min-h-[50vh] w-full p-4">
                        <section className="flex flex-col gap-3 w-full max-w-[30rem] mx-auto">
                            <Link href={navLinks[0].path}>
                             Gurusys
                            </Link>
                            <h1 className="font-semibold text-2xl text-center text-black">
                                Admin Login Page
                            </h1>
                            <div className="flex flex-col gap-3 w-full text-black">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="email"
                                        className="font-medium text-base"
                                    >
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        className="flex-1 focus:outline-0 border border-deepGrey rounded-md p-2 min-h-[2rem]"
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="text-red font-bold">
                                            {errors.email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="password"
                                        className="font-medium text-base"
                                    >
                                        Password
                                    </label>
                                    <div className="flex flex-row  border border-deepGrey rounded-md p-2 min-h-[2rem]">
                                        <Field
                                            type={
                                                togglePassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            id="password"
                                            placeholder="Your Password"
                                            className="flex-1 focus:outline-0"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setTogglePassword(
                                                    !togglePassword,
                                                )
                                            }
                                        >
                                            {togglePassword ? (
                                                <AiFillEyeInvisible className="text-lg" />
                                            ) : (
                                                <AiFillEye className="text-lg" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && touched.password ? (
                                        <div className="text-red font-bold">
                                            {errors.password}
                                        </div>
                                    ) : null}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue min-h-[3rem] font-medium text-base text-white rounded-lg"
                                >
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                            className="text-white"
                                        />
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </div>
                        </section>
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
    );
};

export default AdminLoginPage;
