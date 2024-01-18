import { readBlockConfig, decorateIcons } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);
    block.append(footer);
  }
  const rows = [...block.children];
  [...block.children].forEach((row, r) => {

  });

  const sub = document.querySelector('#stay-connected-with-lenovo-pccw-solutions-community');
  sub.classList.add('sub');
  const tempDiv2 = document.createElement("div");
  tempDiv2.setAttribute('class', 'email-submit');
  sub.insertAdjacentElement('afterend', tempDiv2);
  const tempDiv = document.createElement("input");
  tempDiv.setAttribute('placeholder', 'Type your email');
  tempDiv2.appendChild(tempDiv);
  const tempDiv1 = document.createElement("button");
  tempDiv1.innerHTML = 'Subscribe';
  tempDiv1.classList.add('footer-submit-btn');
  tempDiv2.appendChild(tempDiv1);
  const footerLinks = document.querySelectorAll('.footer-sol a');
  footerLinks.forEach(link => {
    link.classList.add('footer-link');
  });

}

