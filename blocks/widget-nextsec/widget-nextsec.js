export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        row.classList.add('next-sec');
    });

    const r = fetch('http://localhost:3000/countdown')
        .then(res =>{return res}).
        then(data => console.log(data));


};

setTimeout(() => {
    let textNextSec = document.querySelector('.next-sec .button-container');
    let arrowIcon = document.createElement('i');
    arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" class="svg img-fluid replaced-svg">   
    </svg > `;
    let svg = arrowIcon.querySelector('svg');
    svg.innerHTML = `<path d="M44.586 24L38.293 17.707L39.707 16.293L48.414 25L39.707 33.707L38.293 32.293L44.586 26H1V24H44.586Z" fill="black" ></path >`;
    textNextSec.append(arrowIcon);
}, 1000);
