
// ------------------ Action Names ----------------- //
export const types = {
  MOUNT_APP: 'MOUNT_APP'
}

// ----------- Initialize Default State --------- //
const Initial_State = {
  mounted: false
}

// ------------------- Reducers ------------------- //
export default (state = Initial_State, action) => {
  switch (action.type) {
    case types.MOUNT_APP:
      return { ...state, mounted: true }

    default:
      return state
  }
}

// -------------- Action Creators ------------ //
export const actions = {
  dispatchMountAction: () => ({ type: types.MOUNT_APP })
}