import {
    DraggableProvidedDragHandleProps,
    DraggableStateSnapshot,
} from 'react-beautiful-dnd';

export interface StoreState {
    customProps: CustomProps;
}

export interface DndMultiViewProps {
    list: any[];
    kanbanBoardProps?: KanbanBoardProps;
    listViewProps?: ListViewProps;
    grid?: number;
    Toolbar?: DndMultiViewToolbar;
    defaultView?: ViewType;
}

export interface KanbanBoardProps {
    draggableColumn?: boolean;

    columnStyle?: React.CSSProperties;
    draggingColumnStyle?: React.CSSProperties;
    draggingOverColumnStyle?: React.CSSProperties;

    titleStyle?: React.CSSProperties;
    draggingTitleStyle?: React.CSSProperties;
    titleContainerStyle?: React.CSSProperties;
    draggingTitleContainerStyle?: React.CSSProperties;

    itemsContainerStyle?: React.CSSProperties;
    draggingItemContainerStyle?: React.CSSProperties;
    draggingOverItemContainerStyle?: React.CSSProperties;

    CustomItem?: CustomItem;
    CustomAddItem?: CustomAddItem;
}

export interface ListViewProps {
    listStyle?: React.CSSProperties;

    titleStyle?: React.CSSProperties;
    titleContainerStyle?: React.CSSProperties;

    itemsContainerStyle?: React.CSSProperties;
    draggingItemContainerStyle?: React.CSSProperties;
    draggingOverItemContainerStyle?: React.CSSProperties;

    disableToggle?: boolean;
    CustomToggleButton?: CustomToggleButton;
    CustomRowItem?: CustomRowItem;
    CustomHeadingRowItem?: CustomHeadingRowItem;
}

export interface CustomProps {
    kanbanBoard: KanbanBoardProps;
    listView: ListViewProps;
    grid: number;
    Toolbar?: DndMultiViewToolbar;
}

export type ViewType = 'kanban' | 'list';

export type CustomItem = (props: {
    item: any;
    index: number;
    snapshot: DraggableStateSnapshot;
}) => JSX.Element | null;

export type CustomAddItem = (props: {
    column: any;
    index: number;
    snapshot: DraggableStateSnapshot;
}) => JSX.Element | null;

export type DndMultiViewToolbar = (props: {
    setViewType: (type: ViewType) => void;
}) => JSX.Element | null;

export type CustomToggleButton = (props: {
    index: number;
    collapse: boolean;
    toggleCollapse: (laneIndex: number) => void;
}) => JSX.Element | null;

export type CustomRowItem = (props: {
    lane: any;
    laneIndex: any;
    item: any;
    index: number;
    snapshot: DraggableStateSnapshot;
    dragHandleProps: DraggableProvidedDragHandleProps;
}) => JSX.Element | null;

export type CustomHeadingRowItem = (props: {
    lane: any;
    laneIndex: any;
}) => JSX.Element | null;
