export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        if (r == 0) {
            const nextbtn = document.createElement('button');
            nextbtn.classList.add('long-arrow-right');
            const node = document.createTextNode(row.textContent);
            nextbtn.append(node);
            row.replaceWith(nextbtn);
        } else if (r == rows.length - 1) {
            const prebtn = document.createElement('button');
            prebtn.classList.add('long-arrow-left');
            const node = document.createTextNode(row.textContent);
            prebtn.append(node);
            row.replaceWith(prebtn);
        }
    });

    let cw = document.querySelector('.carousel-wrapper');
    let arrowLeftStyle = document.createElement('div');
    arrowLeftStyle.classList.add('arrow-left');
    let arrowRightStyle = document.createElement('div');
    arrowRightStyle.classList.add('arrow-right');
    cw.prepend(arrowLeftStyle);
    cw.append(arrowRightStyle);

    arrowRightStyle.append(document.querySelector('.long-arrow-right'));
    arrowLeftStyle.prepend(document.querySelector('.long-arrow-left'));



    const images = document.querySelectorAll('.slider > div');
    const btn = document.querySelectorAll('button');
    const previous = document.querySelector('.arrow-left');
    const nxt = document.querySelector('.arrow-right');


    images.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
    });
    let counter = 0;

    const slideImage = () => {
        images.forEach(
            (e) => {
                e.style.transform = `translateX(-${counter * 100}%)`;
            }
        );
    };

    previous.addEventListener('click', () => {
        prev();
    });

    nxt.addEventListener('click', () => {
        next();
    });

    const prev = () => {
        if (counter > 0) {

            counter--;
            slideImage();
            console.log(counter);

        }
    };
    const next = () => {
        if (counter <= (images.length - 2)) {

            counter++;
            slideImage();
            console.log(counter);

        }
    };
}