interface IQuickLink {
    name: string;
    path: string;
}

export const quickLinks: IQuickLink[] = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Blogs",
        path: "/blog",
    },
    {
        name: "Place Ads",
        path: "/place_ads",
    },
    {
        name: "Contact Us",
        path: "/contact",
    },
];
export const categoryLinks: IQuickLink[] = [
    {
        name: "Lifestyle",
        path: "/",
    },
    {
        name: "Technology",
        path: "/",
    },
    {
        name: "Travel",
        path: "/",
    },
    {
        name: "Business",
        path: "/",
    },
    {
        name: "Economy",
        path: "/",
    },
    {
        name: "Sports",
        path: "/",
    },
];
