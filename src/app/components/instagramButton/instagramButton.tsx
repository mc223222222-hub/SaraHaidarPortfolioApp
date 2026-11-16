import React from "react";
import { Button } from "@mui/material";
import { Instagram } from "@mui/icons-material";
import { getLocaleSwitcherButtonStyle } from "@/styles/mainTheme";
import jsonData from "@/data/contactPopupButton.json";

const InstagramButton: React.FC = () => {
    return (
        <Button
            size="small"
            color="primary"
            component="a"
            href={jsonData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="Instagram"
            title="Instagram"
            sx={{ ...getLocaleSwitcherButtonStyle(), right: '8rem' }}
            className="instagramButton"
        >
            <Instagram sx={{ width: '1.75rem' }} />
        </Button>
    );
};

export default InstagramButton;
