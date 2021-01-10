import React, {FC} from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {Card, Chip, CardContent, CardMedia, Typography} from '@material-ui/core/';
import {IPhotoType} from "../../types/types";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: `${theme.spacing(2)} 0`,
            display: 'flex',
            height: "100%",
            [theme.breakpoints.down(480)]: {
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            },
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            height: 150,
            width: 150,
            minWidth: 150,
            minHeight: 150,
        },
        chip: {
            margin: '5px 5px 0 0',
            maxWidth: '80%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            boxSizing: 'border-box'
        }
    }),
);

interface IImage {
    photo: IPhotoType
}

const Image: FC<IImage> = ({photo}) => {
    const classes = useStyles()
    const {id, farm, server, secret, title, description, tags} = photo
    const url = `https://live.staticflickr.com/${server}/${id}_${secret}_q.jpg`;
    const tagsArr = tags ? tags.split(' ') : [];

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={url}
                title={title}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="div" variant="subtitle1">
                        {title}
                    </Typography>
                    {/*{description && description._content &&*/}
                    {/*    <Typography component="div" variant="subtitle2">{description._content}</Typography>*/}
                    {/*}*/}
                    {tagsArr.map(tag => <Chip variant="outlined" color="primary" label={tag} key={tag} size="small"
                                              className={classes.chip}/>)}
                </CardContent>
            </div>
        </Card>
    );
};


export default Image
