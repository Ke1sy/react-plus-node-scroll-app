import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab} from '@material-ui/core';
import { SearchIcon, AccessTimeIcon } from '../Icons/MeterialIcons';
import {SelectedTabType} from "../../types/types";

function getTabProps(index: any) {
    return {
        id: `gallery-tab-${index}`,
        'aria-controls': `gallery-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(4)
    },
}));

type ITabs = {
    id: number,
    label: string,
    icon: any,
    type: 'recent' | 'search'
}

const TABS:ITabs[] = [
    {
        id: 0,
        label: 'Recent',
        icon: <AccessTimeIcon/>,
        type: 'recent'
    }, {
        id: 1,
        label: 'Search',
        icon: <SearchIcon/>,
        type: 'search'
    }
];

interface IGalleryTabs {
    onChangeSelectedTab: (tab: SelectedTabType) => void,
}

const GalleryTabs:FC<IGalleryTabs> = ({onChangeSelectedTab}) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        const selectedTab = TABS.find(tab => tab.id === newValue);
        if(selectedTab) {
            onChangeSelectedTab(selectedTab.type);
        }
        setSelectedTab(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="gallery tabs"
                >
                    {TABS.map(({id, icon, label, type}) => <Tab key={type} icon={icon} label={label} {...getTabProps(id)} />)}
                </Tabs>
            </AppBar>

        </div>
    );
}

export default GalleryTabs
