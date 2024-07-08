"use client";

import { useScrollTrigger, Box, Fab, Fade, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
    window?: () => Window;
    children?: React.ReactElement;
}

function ScrollTop(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    zIndex: 10000,
                }}
            >
                {children}
            </Box>
        </Fade>
    );
}

const ScrollUp = (props: Props) => {
    return (
        <ScrollTop {...props}>
            <Tooltip title="Scroll To Top">
                <Fab
                    sx={{
                        color: "#FCD1D1",
                        "&:hover": { backgroundColor: "white", color: "black" },
                    }}
                    size="small"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon className="text-black" />
                </Fab>
            </Tooltip>
        </ScrollTop>
    );
};

export default ScrollUp;
