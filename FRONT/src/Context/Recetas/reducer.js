export const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_RECIPES':
            return {...state, data: action.payload};
        case 'GET_SELECTED':
            return {...state, recipeSelected: action.payload};
        case 'GET_CATEGORIES':
            return {...state, categories: action.payload};
        case 'ADD_CATEGORY':
            return {...state, categories: [...state.categories, action.payload]};
        case 'EDIT_CATEGORY':
            const { id, categorias, descripcion, urlImg } = action.payload;
            return { ...state, categories: state.categories.map(category => { if (category.id === id) { return { ...category, categorias, descripcion, urlImg } } return category })};
        case 'REMOVE_CATEGORY':
            return {...state, favs: state.categories.filter(category => category.id !== action.payload)};
        case 'CHANGE_THEME':
            return {...state, theme: action.payload};
        case 'ADD_FAV':
            return {...state, favs: [...state.favs, action.payload]};
        case 'REMOVE_FAVORITE':
            return {...state, favs: state.favs.filter(item => item.id !== action.payload)};
        case 'INIT_FAVS':
            return {...state, favs: action.payload};
        case 'EDIT_WEEK':
            return {...state, plannedWeeks: action.payload};
        default:
            return state;
    }
}