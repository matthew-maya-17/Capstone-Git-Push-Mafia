export function AuthFetch(url, options = {}) {

    //get jwtToken
    const token = localStorage.getItem("jwtToken");

    if (!token) {
        return Promise.reject("No token found");
    }


  //default headers we want on every request
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  //get any additional options we set
  const allOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  //return the url with all the options we want
  return fetch(url, allOptions);
}
