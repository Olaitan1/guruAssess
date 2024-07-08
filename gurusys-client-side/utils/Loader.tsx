import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
    return (
        <Stack className="flex items-center justify-center w-full min-h-[50vh]">
            <CircularProgress color="inherit" className="text-black" />
        </Stack>
    );
}
