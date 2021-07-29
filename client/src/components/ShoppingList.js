import React, { useEffect, useState } from "react";
import { Grid, Modal, Backdrop, Button, Card, CardHeader, CardContent, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingItem from "./ShoppingItem";
import ItemForm from "./ItemForm";
import CloseIcon from '@material-ui/icons/Close';
import { getAllItems } from "../api/items";
import { motion } from "framer-motion"


const useStyles = makeStyles(() => ({
    grid: {
        marginTop: '1rem',
        padding: '1rem',
        borderRadius: '2%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeader: {
        padding: "0.1rem",
        textAlign: "center",
        marginTop: "0.1rem",
    },
    cardContent: {
        padding: "0",
    },
    button: {
        padding: "1.2rem",
        fontWeight: 600,
        backgroundColor: "#546e7a",
        marginBottom: "0.5rem"
    },
}));

// Animation
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2
        }
    }
};
const tile = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const ShoppingList = () => {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);


    // Add Item
    const name = '';
    const notes = '';
    const action = 'post';

    const handleShowModal = () => {
        setOpen(true)
    }
    const handleHideModal = () => {
        setOpen(false)
    }

    const getItems = async () => {
        const items = await getAllItems()
        if (items) {
            setItems(items.items)
        }
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            className={classes.grid}
            component={motion.div}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={handleShowModal}
                >
                    Add an Item
                </Button>
            </Grid>
            {
                items && items.map(item => {
                    return (
                        <Grid key={item.id} item xs={6} sm={3} component={motion.div} variants={tile}>
                            <ShoppingItem id={item.id} name={item.name} notes={item.notes} getItems={getItems} />
                        </Grid>
                    )
                })
            }
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleHideModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHeader}
                        title="What would you like to buy?"
                        action={
                            <IconButton onClick={handleHideModal} >
                                <CloseIcon />
                            </IconButton>
                        } />
                    <CardContent className={classes.cardContent}>
                        <ItemForm handleHideModal={handleHideModal} name={name} notes={notes} action={action} getItems={getItems} />
                    </CardContent>
                </Card>
            </Modal>
        </Grid>
    );
}

export default ShoppingList;