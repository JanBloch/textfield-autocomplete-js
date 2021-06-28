
const buildAutocomplete = (domElement, list, {limit}) => {
    if(!domElement instanceof HTMLElement)
        return;
    domElement.setAttribute('autocomplete', 'off');

    const divElement = document.createElement('div');
    list.forEach(v=>{
        const childElement = document.createElement('div');
        childElement.innerText = v;
        divElement.appendChild(childElement);
    });
    const wrapper = document.createElement('div');
    
    domElement.addEventListener('input', (event) => {
        console.log(event.target.value);
        if(event.target.value != '') {
            if(!event.target.parentNode.classList.contains('editing'))
                event.target.parentNode.classList.add('editing');
        }else{
            event.target.parentNode.classList.remove('editing');
        }
    })
    domElement.parentNode.insertBefore(wrapper, domElement);
    wrapper.appendChild(domElement);
    wrapper.appendChild(divElement);
    wrapper.className="autocomplete-wrapper";
    divElement.className="autocomplete-list";
};