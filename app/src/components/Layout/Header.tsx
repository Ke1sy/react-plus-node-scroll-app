import React from 'react';
import {AppBar, Typography, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
});

export default () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Header
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

