const defaultState = {
    username: "",
    status: {
        loading: false,
        isFetched: false
    },
    userData: {
        name: null,
        avatarurl: null,
        following: null,
        followers: null,
        location: null,
        public_repos: null,
        bio: null,
        created_at: null,
        company: null,
        email: null,
        login: null,
    },
    errors: {
        msg: "",
        status: false,
    },
    allRepos: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            let newState_username = { ...state };
            newState_username.username = action.payload;
            return newState_username
        case 'SET_ERROR':
            let newState_error = { ...state };
            newState_error.errors = action.payload;
            return newState_error
        case 'SET_USERDATA':
            let newState_userdata = { ...state };
            newState_userdata.userData = action.payload;
            return newState_userdata
        case 'SET_STATUS':
            let newState_status = { ...state };
            newState_status.status = action.payload;
            return newState_status
        case 'SET_REPOS':
            let newState_repos = { ...state };
            newState_repos.allRepos = action.payload;
            return newState_repos
        default:
            return state
    }
}