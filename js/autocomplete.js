
const defaultTheme = {
    wrapperElement: {
        classList: ['autocomplete-wrapper-style']
    },
    divElement: {
        classList:['autocomplete-list-style']
    }
};
const buildAutocomplete = (domElement, list, onSelected, {limitVisible, closeOnSelect=true, theme=defaultTheme}) => {
    if(!domElement instanceof HTMLElement)
        return;
    domElement.setAttribute('autocomplete', 'off');
    if(!domElement.id)
        domElement.id = Math.random().toString().substring(2);
    const divElement = document.createElement('div');
    const wrapper = document.createElement('div');

    divElement.id = Math.random().toString().substring(2);
    const updateList = () => {
        divElement.innerHTML = '';
        list.filter(v=>v.indexOf(domElement.value) == 0).slice(0, limitVisible ? limitVisible : list.length).forEach(v=>{
            const childElement = document.createElement('div');
            childElement.innerText = v;
            childElement.onclick = () => {
                onSelected(v)
                domElement.value = v;
                if(closeOnSelect){
                    wrapper.classList.remove('editing');
                }
            }
            
            divElement.appendChild(childElement);
        });
    };
    updateList();
    
    
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

    applyTheme(wrapper, divElement, theme);
    
    return updateList;
};

const applyTheme = (wrapperElement, divElement, theme) => {
    if(theme.wrapperElement && theme.wrapperElement.classList){
        wrapperElement.classList.add(...theme.wrapperElement.classList);
    }

    if(theme.divElement && theme.divElement.classList){
        divElement.classList.add(...theme.divElement.classList);
    }
}
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