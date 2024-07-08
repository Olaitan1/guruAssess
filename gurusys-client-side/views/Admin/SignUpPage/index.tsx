"use client";
import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { notify, emailRegExp, passwordRegex } from "../../../utils/FormValidations";
import { ToastContainer } from "react-toastify";
import { navLinks } from "../../../components/NavBar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { axiosFetcher } from "../../../utils/axiosBaseURL";
import CircularProgress from "@mui/material/CircularProgress";



const signupFormValidationSchema: Object = Yup.object().shape({
    userName: Yup.string()
        .required("User name is required")
        .max(8, "Too Long!"),
    email: Yup.string()
        .required("Email is required")
        .matches(emailRegExp, "Invalid email"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            passwordRegex,
            "Password must be at least 8 characters with lowercase, uppercase, a number.",
        ),
    confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});


const AdminSignUpPage: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleConfirmPassword, setConfirmPasswordToggle] = useState(false);

    const createSuperAdmin = (
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
    ) => {
        setLoading(true);
        const superAdmin = {
            username: name,
            email: email,
            password: password,
            confirm_password: confirmPassword,
        };
        axiosFetcher
            .post("/register", superAdmin)
            .then((res) => {
                notify(
                    "Your account is created successfully. Kindly proceed to Login.",
                );
                console.log(res);
            })
            .catch((err) => {
                notify(err.response.data.Error);
                setLoading(false);
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Formik
                initialValues={{
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={signupFormValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    createSuperAdmin(
                        values.userName,
                        values.email,
                        values.password,
                        values.confirmPassword,
                    );
                    resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form className="flex items-center justify-center min-h-screen w-full p-4">
                        <section className="flex flex-col gap-3 w-full max-w-[30rem] mx-auto">
                            <Link href={navLinks[0].path}>
                           Gurusys
                            </Link>
                            <h1 className="font-semibold text-2xl text-center text-black">
                                Admin Sign-Up Page
                            </h1>
                            <div className="flex flex-col gap-3 w-full text-black">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="userName"
                                        className="font-medium text-base"
                                    >
                                        User Name
                                    </label>
                                    <Field
                                        name="userName"
                                        id="userName"
                                        placeholder="Enter User Name"
                                        className="flex-1 focus:outline-0 border border-deepGrey rounded-md p-2 min-h-[2rem]"
                                    />
                                    {errors.userName && touched.userName ? (
                                        <span className="text-red font-bold">
                                            {errors.userName}
                                        </span>
                                    ) : null}
                                </div>
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
                                        <span className="text-red font-bold">
                                            {errors.email}
                                        </span>
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
                                        <span className="text-red font-bold">
                                            {errors.password}
                                        </span>
                                    ) : null}
                                </div>

                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="password"
                                        className="font-medium text-base"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="flex flex-row  border border-deepGrey rounded-md p-2 min-h-[2rem]">
                                        <Field
                                            type={
                                                toggleConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="Confirm Your Password"
                                            className="flex-1 focus:outline-0"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setConfirmPasswordToggle(
                                                    !toggleConfirmPassword,
                                                )
                                            }
                                        >
                                            {toggleConfirmPassword ? (
                                                <AiFillEyeInvisible className="text-lg" />
                                            ) : (
                                                <AiFillEye className="text-lg" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword &&
                                    touched.confirmPassword ? (
                                        <span className="text-red font-bold">
                                            {errors.confirmPassword}
                                        </span>
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
                                        "Sign Up"
                                    )}
                                </button>
                            </div>
                            <p>
                                Already have an account?&nbsp;
                                <Link href="/admin" className="text-blue">
                                    Login
                                </Link>
                            </p>
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

export default AdminSignUpPage;