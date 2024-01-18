export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        // console.log(row);
        row.classList.add('countd-element');

    });
};


setTimeout(() => {
    const countdown = document.querySelector('.countdown');
    const cdEL = document.querySelectorAll('.countd-element');
    for (let i = 0; i < cdEL.length; i++) {
        if (i % 2 == 0) {
            cdEL[i].children.item(1).classList.add('calender-type');
        } else {
            cdEL[i].children.item(0).classList.add('calender-colon');
        }
    }
    var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

    var x = setInterval(function () {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        for (let i = 0; i < cdEL.length; i++) {
            if (i === 0) {
                cdEL[i].children.item(0).innerHTML = days;
            }
            if (i === 2) {
                cdEL[i].children.item(0).innerHTML = hours;
            }
            if (i === 4) {
                cdEL[i].children.item(0).innerHTML = minutes;
            }
            if (i === 6) {
                cdEL[i].children.item(0).innerHTML = seconds;
            }
        }
    }, 1000);
}, 10);
