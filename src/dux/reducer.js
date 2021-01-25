const intialState = {
  username: "",
  profile_pic: "",
};
const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER = "LOGOUT_USER";

export function updateUser(userObj) {
  return {
    type: UPDATE_USER,
    payload: userObj,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
    payload: {},
  };
}

export default function reducer(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {

    case UPDATE_USER:
      const { username, profile_pic } = payload;
      return { ...state, username, profile_pic };

    case LOGOUT_USER:
      return state;

    default:
      return state;
  }
}
