import DashboardSidebar from "../../../components/Admin/AdminSidebar";
interface IProps {
    children: React.ReactNode;
}

const AdminDashboardLayout = ({ children }: IProps) => {
    return (
        <section className="min-h-screen flex flex-col lg:flex-row w-full">
            <DashboardSidebar />
            {children}
        </section>
    );
};

export default AdminDashboardLayout;
