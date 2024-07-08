import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineMail } from "react-icons/ai";

export const notify = (arg: string) => toast(arg);
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
export const URLRegex =
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const subscribeFormValidationSchema: Object = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegExp, "Invalid email")
        .required("Required"),
});

export const contactFormValidationSchema: Object = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegExp, "Invalid email")
        .required("Required"),
    fullName: Yup.string()
        .required("Required")
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
    subject: Yup.string()
        .required("Required")
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
    textArea: Yup.string().required("Required"),
});

export const uploadAdsValidationSchema: Object = Yup.object({
    imgAd: Yup.mixed().required("Required"),
    AdURL: Yup.string()
        .required("Required")
        .matches(URLRegex, "Enter Correct URL. Must include https//:"),
    AdTitle: Yup.string().required("Required"),
    startDate: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),
});

export const newPostValidationSchema: Object = Yup.object({
    category: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    firstImg: Yup.string().required("Required"),
    // firstImgTextarea: Yup.string().required("Required"),
    secondImgTitle: Yup.string().optional(),
    secondImgTextarea: Yup.string().required("Required"),
    secondImg: Yup.string().optional(),
});

//FORMS
export const subscribeForm: React.ReactNode = (
    <>
        <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={subscribeFormValidationSchema}
            onSubmit={(values, { resetForm }) => {
                // console.log(values);
                resetForm();
                notify("Thanks! We will keep you notified.");
            }}
        >
            {({ errors, touched }) => (
                <Form className="flex flex-col gap-2">
                    <div className="flex flex-row items-center px-3 gap-4 bg-white w-full border border-grey min-h-[3rem] rounded-lg">
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your Email"
                            className="flex-1 focus:outline-0"
                        />
                        <AiOutlineMail className=" text-lg" />
                    </div>
                    {errors.email && touched.email ? (
                        <div className="text-red font-bold">{errors.email}</div>
                    ) : null}
                    <button
                        type="submit"
                        className="w-full bg-blue min-h-[3rem] font-medium text-base text-white rounded-lg"
                    >
                        Subscribe
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
);
