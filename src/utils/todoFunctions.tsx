type Props = {
    id: string;
    name: string;
    items: []
}

function findAndDeleteTodo(todoList: Props, id: string) {
    for (var i = 0; i < todoList.items.length; i++) {
        const curItem: Props = todoList.items[i];
        if (curItem.id === id) {
            todoList.items.splice(i, 1);
            return todoList;
        }
        else {
            findAndDeleteTodo(curItem, id);
        }
    }
    return todoList;
}

function appendSubTodo(todoList: Props, parentId: string, name: string): {} {
    if (parentId === todoList.id) {
        const subTodo: Props = {
            id: new Date().getTime().toString(),
            name: name,
            items: []
        }
        const temp: Props[] = todoList.items;
        temp.push(subTodo);
        return todoList;
    }
    let newItems = [];
    newItems = todoList.items.map((obj) => {
        return appendSubTodo(obj, parentId, name);
    })

    return { ...todoList, items: newItems }
}

export { appendSubTodo, findAndDeleteTodo }