export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row, r) => {
       
        if (r == 2) {
            row.classList.add('para');
        }
    });
};