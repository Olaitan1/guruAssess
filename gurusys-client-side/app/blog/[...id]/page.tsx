import SingleBlogPage from "../../../views/BlogsPage/SingleBlogPage.tsx";
interface IProps {
    params: { id: string[] };
}

const SingleBlog = ({ params: { id } }: IProps) => {
    return <SingleBlogPage blogID={id} />;
};

export default SingleBlog;
