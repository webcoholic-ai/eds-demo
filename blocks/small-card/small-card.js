export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
        row.classList.add('small-card-flex');
    });
};