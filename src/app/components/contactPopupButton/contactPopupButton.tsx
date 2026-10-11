import './contactPopupButton.scss';
import React, { useState } from "react";
import { Button, Popover, Typography } from "@mui/material";
import { AlternateEmail, Call, LocationPin, Person } from "@mui/icons-material";
import { getLocaleSwitcherButtonStyle } from "@/styles/mainTheme";
import jsonData from "@/data/contactPopupButton.json";

const ContactPopupButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLocationClick = () => {
        window.open(jsonData.locationGoogleMapsLink, '_blank')
    }

    const open = Boolean(anchorEl);
    const id = open ? "contact-popover" : undefined;


    return (
        <div className='contactPopupButtonContainer'>
            <Button
                size="small"
                color="primary"
                onClick={handleClick}
                sx={{ ...getLocaleSwitcherButtonStyle(), right: '4.5rem' }}
                className='contactPopupButton'
            >
                <Person sx={{ width: '1.75rem' }} />
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <div className='contactButtonPopupContent'>
                    <div className='contactButtonPopupContent_item'>
                        <AlternateEmail />
                        <p>{jsonData.email}</p>
                    </div>
                    <div className='contactButtonPopupContent_item'>
                        <Call />
                        <p>{jsonData.telephoneNumber}</p>
                    </div>
                    <div className='contactButtonPopupContent_item location' onClick={handleLocationClick}>
                        <LocationPin />
                        <p>{jsonData.location}</p>
                    </div>
                </div>
            </Popover>
        </div>
    );
};

export default ContactPopupButton;