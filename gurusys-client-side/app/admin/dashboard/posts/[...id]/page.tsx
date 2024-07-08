import AdminEditPostPage from "../../../../../views/Admin/EditPost";

interface IProps {
    params: { id: string[] };
}

const EditPost = ({ params: { id } }: IProps) => {
    return <AdminEditPostPage postID={id} />;
};

export default EditPost;
