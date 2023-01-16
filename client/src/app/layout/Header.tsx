import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom";

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


const middleLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'Contact', path: '/contact' },
    { title: 'Error testing', path: '/about' }
];

const userLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

export default function Header() {

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={
                {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
            }>
                <Box>
                    <Typography variant="h6">
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            RXSTORE
                        </Link>
                    </Typography>
                </Box>

                <Box>
                    <List className="middleLinks" sx={{ display: 'flex' }}>
                        {
                            middleLinks.map(({ title, path }) => (
                                <ListItem key={path}>
                                    <NavLink to={path} style={{
                                        fontSize: '1.20rem', fontFamily: '"Roboto","Helvetica","Arial","sans-serif"', textDecoration: 'none'
                                    }}>{title.toUpperCase()}</NavLink>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>

                <Box display='flex' alignItems='center'>
                    <IconButton size="large">
                        <Badge badgeContent="5" sx={{ color: 'red' }}>
                            <ShoppingCartCheckoutIcon sx={{ color: 'white' }} />
                        </Badge>
                    </IconButton>

                    <List className="userLinks" sx={{ display: 'flex' }}>
                        {
                            userLinks.map(({ title, path }) => (
                                <ListItem key={path}>
                                    <NavLink to={path} style={{ fontSize: '1.20rem', fontFamily: '"Roboto","Helvetica","Arial","sans-serif"', textDecoration: 'none' }}>{title.toUpperCase()}</NavLink>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>


            </Toolbar>
        </AppBar>
    );
}