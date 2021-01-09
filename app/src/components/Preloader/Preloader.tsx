import React, {FC, RefObject, useEffect} from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {LinearProgress} from '@material-ui/core/'
import {Container} from "@material-ui/core";
import handleViewport from 'react-in-viewport';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            height: 100,
            display: 'flex',
            alignItems: 'center'
        },
        loader: {
            width: '100%'
        }
    }),
)

interface IPreloader {
    visible: boolean,
    onBecomeVisible: () => void,
    inViewport: boolean,
    forwardedRef: RefObject<HTMLDivElement>
}

const Preloader:FC<IPreloader> = ({visible, onBecomeVisible, inViewport, forwardedRef}) => {
    const classes = useStyles()

    useEffect(() => {
        if(inViewport) {
            onBecomeVisible();
        }
    }, [inViewport]);


    return (
        <Container maxWidth="lg">
            <div className={classes.wrapper} ref={forwardedRef}>
                <LinearProgress className={classes.loader} hidden={!visible}/>
            </div>
        </Container>
    );
};

const PreloaderWithViewport = handleViewport(Preloader);

export default PreloaderWithViewport;
