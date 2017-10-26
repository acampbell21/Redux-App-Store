const apps = (state = [], action) => {
  switch(action.type) {
    case 'APPS':
      return action.apps;
    case 'ADD_APP':
      return [...state, action.app]
    case 'UPDATE_APP':
      return state.map( app => {
        if(app.id === action.app.id)
          return action.app
        return app
      })
    case 'DELETE_APP':
      return state.filter( app => app.id !== action.id )
    default:
      return state;
  }
}

export default apps;
