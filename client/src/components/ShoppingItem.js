import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardHeader, CardContent, IconButton, Modal, Backdrop } from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { deleteItem } from "../api/items";
import ItemForm from "./ItemForm";
import CloseIcon from '@material-ui/icons/Close';
import { motion } from "framer-motion"

const useStyles = makeStyles(() => ({
    paper: {
        backgroundColor: "#b0bec5",
    },
    delete: {
        color: 'black',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: "1rem",
    },
    title: {
        fontWeight: 500,
        fontFamily: "Oswald",
        fontSize: "1.2rem"
    },
    cardHeader: {
        padding: "0.1rem",
        textAlign: "center",
        marginTop: "0.1rem",
    },
}));

const ShoppingItem = ({ name, notes, id, getItems }) => {
    const classes = useStyles();
    const itemId = { id: id }
    const [open, setOpen] = useState(false);


    // Update Item
    const action = 'patch';

    const handleShowModal = () => {
        setOpen(true)
    }
    const handleHideModal = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        await deleteItem(itemId)
        await getItems()
    }

    return (
        <Card
            className={classes.paper}
            elevation={3}
            component={motion.div}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
            }}
        >
            <CardHeader
                action={
                    <>
                        <IconButton onClick={handleShowModal} >
                            <EditIcon className={classes.icon} />
                        </IconButton>
                        <IconButton onClick={handleDelete} >
                            <DeleteOutlineIcon className={classes.icon} />
                        </IconButton>
                    </>
                }
                title={
                    <Typography className={classes.title}>
                        {name}
                    </Typography>
                }
                subheader=""
                className={classes.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {notes}
                </Typography>
            </CardContent>
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
                        title="Update Item Information"
                        action={
                            <IconButton onClick={handleHideModal} >
                                <CloseIcon />
                            </IconButton>
                        } />
                    <CardContent className={classes.cardContent}>
                        <ItemForm handleHideModal={handleHideModal} name={name} notes={notes} action={action} getItems={getItems} id={id} />
                    </CardContent>
                </Card>
            </Modal>
        </Card>
    );
}
export default ShoppingItem;
