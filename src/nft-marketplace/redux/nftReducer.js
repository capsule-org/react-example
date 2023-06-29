const initialState = {
    title: null,
    value: null,
    likes: null,
    image: null,
};

const nftReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NFT':
            return {
                ...state,
                title: action.payload.title,
                value: action.payload.value,
                likes: action.payload.likes,
                image: action.payload.image,
            };
        default:
            return state;
    }
};

export default nftReducer;