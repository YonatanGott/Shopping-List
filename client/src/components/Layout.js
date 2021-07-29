import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingList from "./ShoppingList";


const useStyles = makeStyles(() => ({
    title: {
        marginTop: "0.5rem",
        fontWeight: 700,
        fontFamily: "Oswald",
    },
}));

const Layout = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography className={classes.title} variant="h2">
                Shopping List
            </Typography>
            <ShoppingList />
        </Container>
    );
}

export default Layout;