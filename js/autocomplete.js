
const buildAutocomplete = (domElement, list, {limitVisible} ) => {
    if(!domElement instanceof HTMLElement)
        return;
    domElement.setAttribute('autocomplete', 'off');
    const divElement = document.createElement('div');
    const updateList = () => {
        divElement.innerHTML = '';
        list.filter(v=>v.indexOf(domElement.value) == 0).slice(0, limitVisible).forEach(v=>{
            const childElement = document.createElement('div');
            childElement.innerText = v;
            divElement.appendChild(childElement);
        });
    };
    updateList();
    const wrapper = document.createElement('div');
    
    domElement.addEventListener('input', (e)=>{updateEditingClass(e);updateList();});
    domElement.addEventListener('focusout', removeEditingClassIfFocusLost([domElement.id, divElement.id]));
    divElement.addEventListener('focusout', removeEditingClassIfFocusLost([domElement.id, divElement.id]));
    domElement.addEventListener('focusin', updateEditingClass);
    domElement.parentNode.insertBefore(wrapper, domElement);
    wrapper.appendChild(domElement);
    wrapper.appendChild(divElement);
    wrapper.className="autocomplete-wrapper";
    divElement.className="autocomplete-list";
    divElement.setAttribute('tabindex', 1);

    
    return updateList;
};

const updateEditingClass = (event) => {
    if(event.target.value != '') {
        if(!event.target.parentNode.classList.contains('editing'))
            event.target.parentNode.classList.add('editing');
    }else{
        event.target.parentNode.classList.remove('editing');
    }
}

const removeEditingClassIfFocusLost = (validIds) => {
    return ((event)=>{
        if(!event.relatedTarget || !validIds.includes(event.relatedTarget.id))
            event.target.parentNode.classList.remove('editing');
    })
}