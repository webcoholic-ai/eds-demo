let img1;
export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        img1 = row.getElementsByTagName('img');
        img1 = [...img1];
        img1.forEach(ele => {
            ele.classList.add('acc-img');
        });
        document.querySelector('.acc-img').setAttribute('loading', 'lazy');
    });
};
