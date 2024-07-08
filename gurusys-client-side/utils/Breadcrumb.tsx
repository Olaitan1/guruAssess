import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";

interface IProps {
    blog: { title: string };
}

export default function BreadCrumb({ blog: { title } }: IProps) {
    const breadcrumbs = [
        <Link
            key="2"
            href="/blog"
            className="text-base text-deepGrey font-bold hover:underline"
        >
            Blogs
        </Link>,
        <Typography key="3" className="text-base text-black font-medium">
            {title}
        </Typography>,
    ];

    return (
        <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
