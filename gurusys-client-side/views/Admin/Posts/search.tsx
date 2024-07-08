import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface IProps {
    results: Object[];
    setFilteredResults: Function;
    size?: string;
}

const PostSearch = ({ results, setFilteredResults, size }: IProps) => {
    const [textValue, setTextValue] = useState("");

    // console.time();
    // console.timeEnd();

    const searchBlogs = (value: string) => {
        const filteredBlog = results.filter(
            (result: any) =>
                result.title.toLowerCase().includes(value) ||
                result.category.toLowerCase().includes(value),
        );

        setFilteredResults(filteredBlog);
    };

    return (
        <Box
            component="form"
            sx={{ width: size ? size : "100%" }}
            autoComplete="off"
        >
            <TextField
                className="text-black"
                sx={{ width: "100%" }}
                id="standard-basic"
                label="Search blogs by title or category"
                variant="standard"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyUp={() => searchBlogs(textValue)}
            />
        </Box>
    );
};

export default PostSearch;
