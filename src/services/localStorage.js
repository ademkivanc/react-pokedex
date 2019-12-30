export const loadStage = () => {

    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState == null) {
            return undefined;
        }
        return JSON.parse(serializedState)

    } catch (error) {
        return undefined
    }
}

export const saveState = (favories) => {
    try {
        const serializedState = JSON.stringify(favories);
        localStorage.setItem('state', serializedState)
    } catch (error) {
        
    }
}