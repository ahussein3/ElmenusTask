const intialState = {
    data: [],
    userRole: "admin",
};

const reducer = (state = intialState, action) => {
    let newState = [];
    let index = 0;

    switch (action.type) {
        case "SET_DATA":
            return { ...state, data: action.data }

        case "ADD_CATEGORY":
            newState = Object.assign({}, state.data);
            newState.categories = newState.categories.concat(action.catogeryData);
            return { ...state, ...{ data: newState } }

        case "ADD_ITEM":
            newState = Object.assign({}, state.data);
            let updatedCategories = newState.categories.map((category) => {
                if (category.id === action.item.index) {
                    category.items.push(action.item.ItemData)
                }
                return category
            });
            newState.categories = updatedCategories
            return { ...state, ...{ data: newState } }

        case "DELETE_ITEM":
            newState = Object.assign({}, state.data);
            for (let i = 0; i < newState.categories.length; i++) {
                if (newState.categories[i]["id"] === action.catID) {
                    index = i;
                }
            }
            const items = newState.categories[index].items.filter(item => item.id !== action.itemId);
            newState.categories[index].items = items;
            return { ...state, ...{ data: newState } }

        case "EDIT_ITEM":
            newState = Object.assign({}, state.data);
            for (let i = 0; i < newState.categories.length; i++) {
                if (newState.categories[i]["id"] === action.catId) {
                    index = i;
                }
            }
            const updatedItems = newState.categories[index].items.map((item) => {
                if (item.id === action.ItemData.id) {
                    item = { ...action.ItemData }
                }
                return item
            });
            newState.categories[index].items = updatedItems;
            return { ...state, ...{ data: newState } }

        case "CHANGE_VIEW":
            if (action.viewValue === 2) {
                return { ...state, ...{ editMode: true } }
            } else {
                return { ...state, ...{ editMode: false } }
            }

        default:
            return state;
    }
};

export default reducer;