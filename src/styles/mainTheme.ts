import { SxProps, Theme } from "@mui/material";

export const getLocaleSwitcherButtonStyle = (): SxProps<Theme> => {
    return ({
        position: 'absolute',
        padding: '0rem',
        minWidth: '0',
        width: '2.5rem',
        height: '2.5rem',
        border: '0rem',
        lineHeight: 'normal',
        fontWeight: 'bold',
        color: 'black',
        top: '50%',
        right: '1rem',
        transform: 'translate(-50%, -50%)',
        '& .MuiSvgIcon-root': {
            color: 'gold',
            zIndex: 2,
            width: '100%',
            height: 'auto'
        },
        '& span': {
            zIndex: 3
        }
    })
}

export const getNavbarButtonStyle = (): SxProps<Theme> => {
    return ({
        padding: '0.3rem',
        minWidth: '0',
        borderWidth: '0.125rem',
        borderRadius: 0,
        lineHeight: 'normal',
        fontWeight: 'bold',
        flex: 1,
        color: 'black',
        backgroundColor: 'white',
        transition: 'all 0.2s ease',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.2)',
        }
    })
}