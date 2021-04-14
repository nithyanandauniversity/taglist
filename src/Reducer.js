import axios from 'axios'

const Reducer = (state, action) => {
    switch (action.type) {
        case 'selectTag':
            console.log('New Ta', action.data);
            return { ...state, selectedTag: action.data, isLoading: true };
        case 'selectImage':
            return { ...state, selectedImage: action.data, isLoading: true };
        case 'addData':
            console.log('actionData:', action.data);
            return { ...state, ...action.data };
        case 'modifySearchTags':
            console.log('modified', action.data)
            return { ...state, ...action.data }
        case 'modifyImageTags':
            console.log('modified', action.data)
            return { ...state, ...action.data }
        case 'modifyTitle':
            console.log('modified', action.data)
            return { ...state, title: action.data }
        case 'modifyDescription':
            console.log('modified', action.data)
            return { ...state, description: action.data }
        case 'isLoading':
            console.log('loading..', action.data.value);
            return { ...state, isLoading: false }
        default:
            throw new Error();
    }
};

export default Reducer;