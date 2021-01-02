//key is name of item that is going to be in the localStorage. We are setting up the localStorage
//Value cannot be stored ordinarily. When we return response, we have the user object {_id, username, email, role}. With LocalStorage, we cannot store JS objects, we have to convert it to JSON object.
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

//Only takes the key argument. When we want to get the item back, we have to convert it back from JSON object to JS object.
export const getLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
}

//To delete the item from localStorage, when user clicks logout, we will delete all the data pertaining to the user in LocalStorage and delete the cookie.

export const deleteLocalStorage = key => {
  localStorage.removeItem(key)
}
