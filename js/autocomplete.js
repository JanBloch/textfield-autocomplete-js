
const buildAutocomplete = (domElement) => {
    if(!domElement instanceof HTMLElement)
        return;
    domElement.setAttribute('autocomplete', 'off');
};