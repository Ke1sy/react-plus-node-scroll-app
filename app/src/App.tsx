import React, {useEffect, useState} from 'react';
import {Header, Main} from "./components/Layout";
import Gallery from "./components/Gallery/Gallery";
import Preloader from './components/Preloader/Preloader';
import {photosAPI} from "./api/api";
import {IPhotoType, RequestPhotosType, SelectedTabType} from './types/types';


const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState<SelectedTabType>('recent');
    const [photoList, setPhotoList] = useState<IPhotoType[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [date, setDate] = useState<number>(Date.now());
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [appInited, setAppInited] = useState(false);

    useEffect(() => {
        if (appInited) {
            setDate(Date.now());  // fix time to avoid duplicates while scrolling
            // (images are updating in real time and pages can be another in some seconds)
            // unfortunately only 'search' supports extra prop 'max_upload_date'
            // so for 'recent' we need filter manually
            uploadMorePhotos(true, true, true)
        }
    }, [selectedTab]);

    useEffect(() => {
        if (appInited) {
            uploadMorePhotos(true, false, true)
        }
    }, [searchQuery]);

    useEffect(() => {
        setAppInited(true);
    }, []);

    const uploadMorePhotos = async (resetPage = false, resetSearch = false, resetPhotos = false) => {
        if (!isLastPage && !isLoading) {
            const nextPage = resetPage ? 1 : page + 1;
            await requestImages({
                type: selectedTab,
                page: nextPage,
                text: resetSearch ? '' : searchQuery,
                maxDate: date,
                resetPhotos
            });

        }
    }


    const requestImages = async (data: RequestPhotosType & { resetPhotos: boolean }) => {
        try {
            setIsLoading(true);

            if (!searchQuery && selectedTab === 'search') {
                setIsLastPage(false);
                setPage(page);
                setPhotoList([]);
            } else {
                const {stat, photos} = await photosAPI.getPhotos(data);

                if (stat === 'ok') {
                    const {page, pages, photo} = photos;

                    const newPhotos = selectedTab === 'recent' ? photo.filter((newArrElem: IPhotoType) => {
                        return photoList.filter((listArrElem) => {
                            return listArrElem.id === newArrElem.id;
                        }).length === 0
                    }) : photo;

                    setIsLastPage(page === pages);
                    setPage(page);
                    setPhotoList(data.resetPhotos ? [...photo] : [...photoList, ...newPhotos]);
                }
            }

        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false)
        }
    };

    const handleTabChange = (tab: SelectedTabType) => {
        setSelectedTab(tab)
    }

    const emptySearch = !searchQuery && selectedTab === 'search';

    return (
        <>
            <Header/>
            <Main>
                <Gallery
                    images={photoList}
                    selectedTab={selectedTab}
                    onChangeSelectedTab={(tab: SelectedTabType) => handleTabChange(tab)}
                    onChangeSearchQuery={(value: string) => setSearchQuery(value)}
                />

                {!isLastPage && <Preloader
                  visible={!emptySearch}
                  onBecomeVisible={() => uploadMorePhotos()}
                />
                }

            </Main>
        </>
    );
};

export default App;
