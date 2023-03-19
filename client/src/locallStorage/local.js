export const createLocalObject = (name,data) => {
   window.localStorage.setItem(`${name}`,JSON.stringify(data));
}

export const getLocalObject = (name) => {
    return JSON.parse(window.localStorage.getItem(`${name}`));
}

