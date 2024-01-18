export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {

    });
};


let mybutton = document.querySelector(".move-to-top");

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}


mybutton.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});