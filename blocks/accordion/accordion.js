export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        row.classList.add('acc-element');
        row.children.item(0).classList.add('accordionTitle');
        row.children.item(1).classList.add('accordionContent');
    });
};


setTimeout(() => {
    const accordionTitles = document.querySelectorAll(".accordionTitle");
    const lpsAccImg = document.querySelectorAll('.lps-acc img');

    accordionTitles.forEach((accordionTitle, i) => {
        let num = Math.floor(Math.random() * 3);
        let selectedImg = lpsAccImg[num];
        //console.log(selectedImg);
        accordionTitle.setAttribute('data-value', '+');
        accordionTitle.addEventListener("click", () => {
            //let selectImg = selectedImg;
            if (accordionTitle.classList.contains("is-open")) {
                accordionTitle.classList.remove("is-open");
                accordionTitle.style.paddingRight = '0px';
                accordionTitle.setAttribute('data-value', '+');
                lpsAccImg.forEach(img => {
                    img.style.display = 'none';
                });
                //selectedImg.style.display = 'none';
            } else {
                const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
                accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
                    accordionTitleWithIsOpen.classList.remove("is-open");
                    accordionTitleWithIsOpen.setAttribute('data-value', '+');
                    accordionTitleWithIsOpen.style.paddingRight = '0px';
                    lpsAccImg.forEach(img => {
                        img.style.display = 'none';
                    });
                });
                accordionTitle.classList.add("is-open");
                setTimeout(() => {
                    //num = Math.floor(Math.random() * 3);
                    //selectedImg = lpsAccImg[num];
                    selectedImg.style.display = 'block';
                }, 200);

                accordionTitle.setAttribute('data-value', "-");
                accordionTitle.style.paddingRight = '5px';
            }
        });
    });
}, 1000);




