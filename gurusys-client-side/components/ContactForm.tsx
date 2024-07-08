import { useRef } from "react";
import { Formik, Form, Field } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contactFormValidationSchema, notify } from "../utils/FormValidations";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
    const serviceID = process.env.NEXT_PUBLIC_CONTACT_FORM_SERVICE_ID as string;
    const templateID = process.env
        .NEXT_PUBLIC_CONTACT_FORM_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_CONTACT_FORM_PUBLIC_KEY as string;

    const form: any = useRef();
    const sendEmail = () => {
        emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
            (result) => {
                notify("Your mail has been received!");
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            },
        );
    };
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    fullName: "",
                    subject: "",
                    textArea: "",
                }}
                validationSchema={contactFormValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    sendEmail();
                    resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form ref={form} className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col">
                            <label htmlFor="fullname">Fullname</label>
                            <Field
                                name="fullName"
                                placeholder="Enter fullname"
                                className="border border-black bg-lightGrey lg:bg-white p-[0.5rem] min-h-[3rem] focus:outline-0"
                            />
                            {errors.fullName && touched.fullName ? (
                                <span className="text-red font-bold">
                                    {errors.fullName}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Email</label>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                className="border border-black bg-lightGrey lg:bg-white  p-[0.5rem] min-h-[3rem] focus:outline-0"
                            />
                            {errors.email && touched.email ? (
                                <span className="text-red font-bold">
                                    {errors.email}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="subject">Subject</label>
                            <Field
                                name="subject"
                                type="subject"
                                placeholder="Enter subject"
                                className="border border-black bg-lightGrey lg:bg-white  p-[0.5rem] min-h-[3rem] focus:outline-0"
                            />
                            {errors.subject && touched.subject ? (
                                <span className="text-red font-bold">
                                    {errors.subject}
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="textarea">Message</label>
                            <Field
                                as="textarea"
                                name="textArea"
                                placeholder="Enter your message"
                                rows="5"
                                className="border border-black bg-lightGrey lg:bg-white p-[0.5rem]"
                            />
                            {errors.textArea && touched.textArea ? (
                                <div className="text-red font-bold">
                                    {errors.textArea}
                                </div>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            className="max-w-full lg:max-w-[20rem] w-full min-h-[3rem] text-white bg-blue self-start rounded-md hover:opacity-80 duration-500 ease-linear"
                        >
                            Submit
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
};

export default ContactForm;
