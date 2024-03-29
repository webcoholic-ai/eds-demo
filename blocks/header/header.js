import { getMetadata, decorateIcons } from "../../scripts/aem.js";
import {
  createOptimizedPicture,
  fetchPlaceholders,
} from "../../scripts/aem.js";

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia("(min-width: 1025px)");

function closeOnEscape(e) {
  if (e.code === "Escape") {
    const nav = document.getElementById("nav");
    const navSections = nav.querySelector(".nav-sections");
    const navSectionExpanded = navSections.querySelector(
      '[aria-expanded="true"]'
    );
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector("button").focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === "nav-drop";
  if (isNavDrop && (e.code === "Enter" || e.code === "Space")) {
    const dropExpanded = focused.getAttribute("aria-expanded") === "true";
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest(".nav-sections"));
    focused.setAttribute("aria-expanded", dropExpanded ? "false" : "true");
  }
}

function focusNavSection() {
  document.activeElement.addEventListener("keydown", openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll(".nav-sections > ul > li").forEach((section) => {
    section.setAttribute("aria-expanded", expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded =
    forceExpanded !== null
      ? !forceExpanded
      : nav.getAttribute("aria-expanded") === "true";
  const button = nav.querySelector(".nav-hamburger button");
  document.body.style.overflowY = expanded || isDesktop.matches ? "" : "hidden";
  nav.setAttribute("aria-expanded", expanded ? "false" : "true");
  toggleAllNavSections(
    navSections,
    expanded || isDesktop.matches ? "false" : "true"
  );
  button.setAttribute(
    "aria-label",
    expanded ? "Open navigation" : "Close navigation"
  );
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll(".nav-drop");
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute("tabindex")) {
        drop.setAttribute("role", "button");
        drop.setAttribute("tabindex", 0);
        drop.addEventListener("focus", focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute("role");
      drop.removeAttribute("tabindex");
      drop.removeEventListener("focus", focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener("keydown", closeOnEscape);
  } else {
    window.removeEventListener("keydown", closeOnEscape);
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta).pathname : "/nav";
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement("nav");
    nav.id = "nav";
    nav.innerHTML = html;

    const classes = ["brand", "sections", "tools", "search-bar"];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

    const navSections = nav.querySelector(".nav-sections");
    if (navSections) {
      navSections.querySelectorAll(":scope > ul > li").forEach((navSection) => {
        if (navSection.querySelector("ul"))
          navSection.classList.add("nav-drop");
        navSection.addEventListener("click", () => {
          if (isDesktop.matches) {
            const expanded =
              navSection.getAttribute("aria-expanded") === "true";
            toggleAllNavSections(navSections);
            navSection.setAttribute(
              "aria-expanded",
              expanded ? "false" : "true"
            );
          }
        });
        // navSection.addEventListener('mouseover', (e) => {
        //   if (isDesktop.matches) {
        //     e.stopPropagation();
        //     console.log(e.currentTarget.children.item(0).classList.toggle('active'));
        //     // let sty = e.currentTarget.children.item(0).style.display;
        //     // sty === 'block' ? sty = 'none' : sty = 'block';
        //     e.currentTarget.children.item(0).classList.toggle('active');
        //     const expanded = navSection.getAttribute('aria-expanded') === 'true';
        //     toggleAllNavSections(navSections);
        //     navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        //   }
        // });
      });
    }

    // hamburger for mobile
    const hamburger = document.createElement("div");
    hamburger.classList.add("nav-hamburger");
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>`;
    hamburger.addEventListener("click", () => toggleMenu(nav, navSections));
    nav.prepend(hamburger);
    nav.setAttribute("aria-expanded", "false");
    // prevent mobile nav behavior on window resize
    toggleMenu(nav, navSections, isDesktop.matches);
    isDesktop.addEventListener("change", () =>
      toggleMenu(nav, navSections, isDesktop.matches)
    );

    decorateIcons(nav);
    const navWrapper = document.createElement("div");
    navWrapper.className = "nav-wrapper";
    navWrapper.append(nav);
    block.append(navWrapper);
  }

  const navTools = document.querySelector(".nav-tools .icon img");

  // const tempDiv = document.createElement("input");
  // tempDiv.setAttribute('placeholder', 'Search...');
  // navTools.prepend(tempDiv);

  const navDropText = document.querySelector(".nav-drop ul");
  const text = document.createElement("li");
  text.textContent = "Explore your industry";
  navDropText.prepend(text);

  let navDropLink = document.querySelectorAll(".nav-drop > a");
  let ln, link;
  for (ln = 0; ln < navDropLink.length; ln++) {
    navDropLink[ln].setAttribute("href", "javascript:void(0)");
  }
  // document.querySelector('header nav .nav-sections').addEventListener('click', (e) => {
  //   let allNavLinks = document.querySelectorAll('header nav .nav-sections .nav-drop > ul');
  //   console.log(allNavLinks);
  //   for (link = 0; link < allNavLinks.length; link++) {
  //     console.log(allNavLinks[link]);
  //     allNavLinks[link].classList.remove('nav-active');
  //   }
  //   console.log(e.target.nextElementSibling);
  //   e.target.nextElementSibling.classList.add('nav-active');
  // });

  let navDropEl = document.querySelectorAll(
    "header nav .nav-sections .nav-drop > a"
  );

  navDropEl.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      if (e.target.nextElementSibling.classList.contains("nav-active")) {
        e.target.nextElementSibling.classList.remove("nav-active");
      } else {
        const elesWithIsOpen = document.querySelectorAll(".nav-active");
        elesWithIsOpen.forEach((eleWithIsOpen) => {
          eleWithIsOpen.classList.remove("nav-active");
        });
        e.target.nextElementSibling.classList.add("nav-active");
      }
    });
  });

  const navSearchBar = document.querySelector(".nav-search-bar > p");
  navSearchBar.classList.add("container");

  let inputGroupEl = document.createElement("div");
  inputGroupEl.classList.add("input-group");
  navSearchBar.prepend(inputGroupEl);

  let inputEl = document.createElement("input");
  inputEl.setAttribute("id", "searchinputtext");
  inputEl.classList.add("form-control");
  inputEl.classList.add("search_query");
  inputGroupEl.prepend(inputEl);

  let searchIcons = document.querySelectorAll(".icon-search")[0];
  let searchIconBg = document.querySelectorAll(".icon-search")[1];
  let searchDropDown = document.querySelector(".nav-search-bar");

  searchIcons.addEventListener("click", function (e) {
    // searchDropDown.classList.toggle("search-active");
    // if (navTools.src.indexOf("icons/search-cross.svg") != -1) {
    //   navTools.src = "icons/search.svg";
    // } else {
    //   navTools.src = "icons/search-cross.svg";
    // }
    window.open("/search", "_blank");
  });

  searchIconBg.setAttribute("id", "search");
  let search = document.getElementById("search");
  let searchInputText = document.getElementById("searchinputtext");
  let inputValue = "";

  function searchHandle() {
    console.log(searchInputText.value);
    inputValue = searchInputText.value;
    let w = window.open(`/search`, "_blank");

    w.onload = function () {
      let searchInputAppend = document.querySelector(".search-input");
      //w.searchInputAppend.value = inputValue;
      var myVariable = window.opener.inputValue;
      console.log(searchInputAppend);
    };
    searchInputText.value = "";
    // let searchFound = document.createElement("main");
    // searchFound.innerHTML = `<h2>I am the text that is found</h2>`;
    // document.body.append(searchFound);
  }

  search.addEventListener("click", function (e) {
    searchHandle();
  });

  searchInputText.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      searchHandle();
    }
  });
}
