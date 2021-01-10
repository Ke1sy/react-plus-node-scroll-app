import React, {FC} from 'react';
import Image from "./Image";
import {Container, Grid} from '@material-ui/core';
import GalleryTabs from "./GalleryTabs";
import Search from "../Search/Search";
import {IPhotoType, SelectedTabType} from "../../types/types";

interface IGallery {
    images: IPhotoType[],
    onChangeSelectedTab: (tab: SelectedTabType) => void,
    onChangeSearchQuery: (value: string) => void,
    selectedTab: SelectedTabType
}

const Gallery: FC<IGallery> = ({images, selectedTab, onChangeSelectedTab, onChangeSearchQuery}) => {
    return (
        <Container maxWidth="lg">
            <GalleryTabs onChangeSelectedTab={onChangeSelectedTab}/>

            {selectedTab === 'search' &&
            <Search
              placeholder="Search for cats..."
              liveSearch={true}
              searchAction={onChangeSearchQuery}
            />
            }

            <Grid container spacing={2}>
                {images.map((photo: IPhotoType) => (
                    <Grid item xs={12} md={6} key={photo.id}>
                        <Image photo={photo}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
};

export default Gallery;
