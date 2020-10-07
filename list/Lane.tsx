import {makeStyles} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';
import {StoreState} from '../types';
import {ItemList} from './item';

const useStyle = (grid: number) =>
    makeStyles({
        'lane-wrapper': {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 5,
            marginLeft: grid,
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
        },
        'lane-content': {
            maxHeight: '100%',
            overflow: 'hidden',
            borderRadius: 5,
            border: '1px solid rgba(20, 22, 29, 0.1)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            whiteSpace: 'normal',
            marginBottom: grid * 2,
        },
        'lane-header': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `0 ${grid * 2}px`,
        },
        'lane-title': {
            fontWeight: 'bold',
            fontSize: 20,
        },
    });

export const Lanes = (props: {list; toggleCollapse; deleteItem}) => {
    const {list, toggleCollapse, deleteItem} = props;
    const {listView, grid} = useSelector(
        (state: StoreState) => state.customProps,
    );
    const classes = useStyle(grid)();

    return list.map((lane, laneIndex) => (
        <div key={lane.id} className={classes['lane-wrapper']}>
            <div className={classes['lane-content']} style={listView.listStyle}>
                <LaneHeader
                    laneIndex={laneIndex}
                    title={lane.title}
                    collapse={lane.collapse}
                    toggleCollapse={toggleCollapse}
                    isListEmpty={lane.items?.length === 0}
                />
                <ItemList
                    lane={lane}
                    laneIndex={laneIndex}
                    deleteItem={deleteItem}
                />
            </div>
        </div>
    ));
};

const LaneHeader = (props: {
    title: string;
    collapse: boolean;
    laneIndex: number;
    isListEmpty: boolean;
    toggleCollapse: (laneIndex: number) => void;
}) => {
    const {title, collapse, laneIndex, toggleCollapse, isListEmpty} = props;
    const {listView, grid} = useSelector(
        (state: StoreState) => state.customProps,
    );
    const classes = useStyle(grid)();

    const renderToggleButton = () => {
        if (listView.disableToggle) {
            return null;
        }

        if (listView.CustomToggleButton) {
            return (
                <listView.CustomToggleButton
                    index={laneIndex}
                    collapse={collapse}
                    toggleCollapse={toggleCollapse}
                />
            );
        }
        return (
            <button onClick={() => toggleCollapse(laneIndex)}>Toggle</button>
        );
    };

    return (
        <div
            className={classes['lane-header']}
            style={{
                ...listView.titleContainerStyle,
                borderBottom:
                    collapse || isListEmpty
                        ? undefined
                        : listView.titleContainerStyle?.borderBottom,
            }}
        >
            <p className={classes['lane-header']} style={listView.titleStyle}>
                {title}
            </p>

            {renderToggleButton()}
        </div>
    );
};
