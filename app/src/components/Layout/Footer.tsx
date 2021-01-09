import React from 'react';
import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth={false}>
                <Typography variant="h6">
                    Footer
                </Typography>
            </Container>
        </footer>
    )
};

export default Footer;

