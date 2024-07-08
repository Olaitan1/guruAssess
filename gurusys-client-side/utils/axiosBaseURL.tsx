import axios from "axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get("token")!;
const websiteBaseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosFetcher = axios.create({
    baseURL: websiteBaseURL,
    // baseURL: "https://ecoonlineblog.onrender.com/blog",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    },
});
