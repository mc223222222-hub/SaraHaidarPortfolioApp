'use client';

import './navbar.scss'
import { Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import navData from "@/data/navigationItemsList.json"
import { NavDataItemInterface } from '@/interfaces/navDataItemInterface';
import { useTranslations } from 'next-intl';
import { getNavbarButtonStyle } from '@/styles/mainTheme';
import LocaleSwitcher from '@/app/components/localeSwitcher/localeSwitcher';
import { useMediaQuery } from '@/services/mediaQueryHook';
import React from 'react';
import { Inbox, Mail, Menu } from '@mui/icons-material';
import ContactPopupButton from '../contactPopupButton/contactPopupButton';

export default function Navbar() {
    const t = useTranslations("navbar");
    const hideNavBar = useMediaQuery("(min-width: 1000px)")

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <div className="navbar">
                {
                    hideNavBar ?
                        <div className='buttonContainer'>
                            {
                                navData.map((navItem: NavDataItemInterface, index) => {
                                    return (
                                        <Button sx={getNavbarButtonStyle()} disableRipple key={index} href={navItem.navPath} >
                                            {t(navItem.navTitleMsgsKey.toString())}
                                        </Button>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className='menuDrawerButtonContainer'>
                            <IconButton className='menuDrawerButton' onClick={toggleDrawer(true)}><Menu /></IconButton>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                <List>
                                    {navData.map((item, index) => (
                                        <ListItem key={t(item.navTitleMsgsKey)} disablePadding>
                                            <ListItemButton href={item.navPath}>
                                                <ListItemText primary={t(item.navTitleMsgsKey)} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>
                        </div>
                }
                <ContactPopupButton></ContactPopupButton>
                <LocaleSwitcher></LocaleSwitcher>
            </div>
        </>
    );
}