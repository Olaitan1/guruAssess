import { NextPage } from "next";
import AdminHeader from "../../../utils/AdminHeader";

const AdminDashboardPage: NextPage = () => {
    return (
        <main className="flex flex-col min-h-screen w-full p-2">
            <AdminHeader page="Dashboard" />
            <section className="flex items-center justify-center min-h-[50vh]">
                <a href="http://" target="_blank">
                    <button
                        type="button"
                        className="flex flex-row items-center justify-center gap-1 max-w-[15rem] w-full min-h-[2.5rem] rounded-xl text-white bg-blue p-2"
                    >
                        Click here to redirect to analytics
                    </button>
                </a>
            </section>
        </main>
    );
};

export default AdminDashboardPage;