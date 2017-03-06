const initialState = {
  title: 'Ko ids ',
  done: false
};

const comment = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_POST': {
      return Object.assign({}, state, {
        title: action.comment.title
      });
    }
    case 'DEFAULTIZE_POST': {
      return Object.assign({}, state, {
        title: 'Default comment',
        done: false
      });
    }
    default: {
      return state;
    }
  }
};

export default comment;