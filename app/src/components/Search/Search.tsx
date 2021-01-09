import React, {FC, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1),
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: theme.palette.primary.main
    },
    iconButton: {
        padding: 10,
        color: theme.palette.primary.main
    },
}));

interface ISearch {
    searchAction: (value: string) => void,
    placeholder: string,
    liveSearch: boolean
}

const Search:FC<ISearch> = ({searchAction, placeholder, liveSearch}) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<any>(null);

    const handleLiveChange = ({target: {value}}: any)  => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setSearchValue(value);

        setTypingTimeout(setTimeout( () => {
            searchAction(value);
        }, 300));

    };

    const handleChange = ({target: {value}}: any) => {
        setSearchValue(value);
    };

    const handleSubmit = (e: any) => {
        if(!searchValue) {
            return false
        }
        e.preventDefault();
        searchAction(searchValue);
    };

    const onChangeAction = liveSearch ? handleLiveChange : handleChange;

    return (
        <>
            <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search" disabled={!searchValue}>
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    onChange={onChangeAction}
                    className={classes.input}
                    placeholder={placeholder}
                    value={searchValue}

                />
            </Paper>
            <Box p={2}>P.S: according to docs photos who's
                <Typography color="secondary" component="span"> title, description or tags </Typography>
                contain the text will be returned. </Box>
        </>
    )
};

export default Search;
