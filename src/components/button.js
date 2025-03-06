const $button = (BUTTON_INFO) => {
    const button = document.createElement("button");
    button.innerText = BUTTON_INFO.TEXT;
    button.classList.add(...BUTTON_INFO.CLASS_NAME);

    if(BUTTON_INFO.EVENT) {
        button.addEventListener("click", BUTTON_INFO.EVENT);
    }

    return button; 
}

export default $button;