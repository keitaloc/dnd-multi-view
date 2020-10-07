<h1 align="center">dnd-multi-view <small><sup>(dmv)</sup></small></h1>

<div align="center">

**Strongly customization** and **Beautiful** drag and drop context auto-generated into `KANBAN` or `List` view

</div>

# Guides

**Basic Drag-and-Drop Context**

![diagram](https://user-images.githubusercontent.com/2182637/53607406-c8f3a780-3c12-11e9-979c-7f3b5bd1bfbd.gif)

## Usage

---

This is the minimal/default configuration, with the only-required prop is `list` data. Checkout out the API below for more configuration.

```
import { DndMultiView } from '...dnd-multi-view';

const App = () => {
    return (
        <DndMultiView
            list={data}
            kanbanBoardProps={}
            listViewProps={}
            defaultView="kanban"
            grid={8}
        />
    );
}
```

## API

---

## `<DndMultiView>`

---

### Interface: `DndMultiViewProps`

-   `list` **(required)**: (Array) data is: array of list data, each list have props (required `id`, `title`) and list of items as prop `items` (also required `id`). Here is an example:

```
const data = [
    {
        id: 'column-1',
        title: 'To do',
        items: [
            {
                id: 'task-1',
                content: 'Take out the gabrgabe',
                ...
            },
            ...
        ],
        ...
    },
    ...
]

```

-   `grid` **(optional)**: (Number) basic spacing unit in `padding` or `margin` between lists and items

-   `defaultView` **(optional)**: (`'kanban' | 'list'`) default view type in first render

-   `Toolbar` **(optional)**: (Function) custom Toolbar, props contain
    `setViewType(type)`

-   `kanbanBoarProps` **(optional)**:

    -   Customize style of `column`, `title`, `title-container`, `item-container`, `dragging/draggingOver` states
    -   `draggableColumn`: enable/disable draggable columns
    -   `CustomToggleButton`: custom toggle button with props: list `index`, `collapse` - current collapse state, `toggleCollapse(listIndex)`
    -   `CustomItem`: custom item component with props: `item` data, item `index`, `snapshot` state
    -   `CustomAddItem`: custom add-item component with props: `item` data, item `index`, `snapshot` state

-   `listViewProps` **(optional)**:
    -   Customize style of `list`, `title`, `title-container`, `item-container`, `dragging/draggingOver` states, we don't allow custom item style because item is complex, depend on user requirement, so you should use a `CustomRowItem` component along with your styling
    -   `disableToggle`: disable toggle item list view function
    -   `CustomToggleButton`: custom toggle button with props: list `index`, `collapse` - current collapse state, `toggleCollapse(listIndex)`
    -   `CustomRowItem`: custom item component with props: `lane` - whole list data, `laneIndex`, `item` data, item `index`, `snapshot` state, `dragHandleProps` - pass all props to make an element can handle drag event
    -   `CustomHeadingRowItem`: custom heading-item component with props: `lane` - list data and `laneIndex`
