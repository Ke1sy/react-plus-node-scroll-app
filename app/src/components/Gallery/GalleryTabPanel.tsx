import React, {FC, ReactNode} from 'react';

interface ITabPanel {
    children?: ReactNode;
    index: number;
    selectedTab: number;
}

const TabPanel: FC<ITabPanel> = (props) => {
    const { children, selectedTab, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={selectedTab !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
            style={{padding: 2}}
        >
            {selectedTab === index && children}
        </div>
    );
};


export default TabPanel;
