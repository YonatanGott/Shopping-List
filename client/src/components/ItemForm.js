
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Grid, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { postItem, updateItem } from "../api/items";


const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: "white",
        marginTop: "0.3rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: "0.5rem",
        fontWeight: 600,
        backgroundColor: "#546e7a",
    },
    error: {
        padding: "0.2rem",
        backgroundColor: "#ffe082",
    },
}));

const ItemForm = ({ handleHideModal, name, notes, action, getItems, id }) => {
    const classes = useStyles();
    const [itemName, setItemName] = useState(name)
    const [itemNote, setItemNote] = useState(notes)
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        if (itemName.trim()) {
            const item = {
                name: itemName,
                notes: itemNote,
                id: id
            }
            if (action === 'post') {
                await postItem(item)
            } else if (action === 'patch') {
                await updateItem(item)
            }
            await getItems()
            handleHideModal()
        } else {
            setError("Please enter an item name")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={0}>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="item"
                                label="Item Name"
                                name="item"
                                autoFocus
                                value={itemName}
                                onChange={e => setItemName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="notes"
                                label="Notes"
                                id="notes"
                                value={itemNote}
                                onChange={e => setItemNote(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    {
                        action === 'post' ?
                            <Button type="submit" fullWidth variant="contained" className={classes.submit} > Add Item </Button>
                            :
                            <Button type="submit" fullWidth variant="contained" className={classes.submit} > Update Item </Button>
                    }
                </form>
                {
                    error && <Paper className={classes.error}>
                        {error}
                    </Paper>
                }
            </Paper>
        </Container>
    );
}

export default ItemForm;