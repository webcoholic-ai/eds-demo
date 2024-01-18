export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        row.classList.add('next-sec');
    });
};