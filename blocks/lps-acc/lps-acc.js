let img1;
export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        row.classList.add('acc-element');
        row.children.item(0).classList.add('accordionTitle');
        row.children.item(1).classList.add('accordionContent');
        img1 = row.getElementsByTagName('img');
        img1 = [...img1];
        img1.forEach(ele => {
            ele.classList.add('acc-img');
        });
        document.querySelector('.acc-img').setAttribute('loading', 'lazy');
    });
};

setTimeout(() => {
    const accordionTitles = document.querySelectorAll(".accordionTitle");
    const lpsAccImg = document.querySelectorAll('.lps-acc img');

    accordionTitles.forEach((accordionTitle, i) => {
        accordionTitle.setAttribute('data-value', '+');
        accordionTitle.addEventListener("click", (e) => {
            if (accordionTitle.classList.contains("is-open")) {
                accordionTitle.classList.remove("is-open");
                accordionTitle.style.paddingRight = '0px';
                accordionTitle.setAttribute('data-value', '+');
                lpsAccImg.forEach(img => {
                    img.style.display = 'none';
                });
            } else {
                const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
                accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
                    accordionTitleWithIsOpen.classList.remove("is-open");
                    accordionTitleWithIsOpen.setAttribute('data-value', '+');
                    accordionTitleWithIsOpen.style.paddingRight = '0px';
                    lpsAccImg.forEach(img => {
                        img.style.display = 'none';
                    });
                    e.target.nextElementSibling.children.item(1).lastElementChild.lastElementChild.style.display = 'block';
                });

                accordionTitle.classList.add("is-open");
                setTimeout(() => {
                    // selectedImg.style.display = 'block';
                    e.target.nextElementSibling.children.item(1).lastElementChild.lastElementChild.style.display = 'block';
                }, 200);

                accordionTitle.setAttribute('data-value', "-");
                accordionTitle.style.paddingRight = '5px';
            }
        });
    });
}, 1000);
