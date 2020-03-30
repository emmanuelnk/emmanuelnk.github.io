function initializeHighlightJS() {
  hljs.initHighlightingOnLoad();

  const preArr = document.querySelectorAll("pre") || [];

  preArr.forEach(pre => pre.classList.add("code-pre-block"));

  for (const [i, element] of document.querySelectorAll("pre code").entries()) {
    const preBlock = document.createElement("div");

    preBlock.innerHTML = `<p class='noselect code-copy-c' data-clipboard-target='#code-block-${i}'>copy<i class='fas fa-copy' aria-hidden='true' style='padding:0 0.5rem;'></i></p>`;
    element.id = `code-block-${i}`;
    element.parentNode.prepend(preBlock);

    const texts = element.textContent.split("\n");
    const trim_indent = true;

    if (trim_indent) {
      const tab = texts[0].match(/^\s{0,}/);
      if (tab) {
        const arr = [];
        texts.forEach(function(temp) {
          arr.push(temp.replace(tab, ""));
        });
        element.textContent = arr.join("\n");
      }
    }
    hljs.highlightBlock(element);
  }

  const clipcode = new Clipboard(".code-copy-c");
}

function initializeFullPageJS() {
  return new fullpage("#fullpage", {
    autoScrolling: true,
    keyboardScrolling: true,
    normalScrollElements: ".no-scroll",
    anchors: ["home", "blog"],
    menu: ".left-menu"
  });
}

(function() {
  initializeHighlightJS();
  const myFullpage = initializeFullPageJS();

  // elements
  const headerIcon = document.querySelector(".header-icons");
  const headerImg = document.querySelector(".header-img");
  const leftMenu = document.querySelector(".left-menu");
  const closeRightMenu = document.querySelector(".close-right-menu");
  const envelopeIcon = document.querySelector(".contact-envelope");
  const postNavContainers = document.querySelectorAll('.post-nav-container')

  // containers
  const container = document.querySelector(".container");
  const blogRollContainer = document.querySelector(".blog-roll-container");

  // Events

  // for data-links
  postNavContainers.forEach(element => {
    element.addEventListener("click", function (event){
      window.location.href = element.getAttribute('data-link');
      return false;
    });
  })

  if(headerIcon)
    headerIcon.addEventListener("click", event => {
      if(!container.classList.contains('hide-right-menu'))
        container.classList.add("hide-right-menu");
      container.classList.toggle("hide-left-menu");
    });

  [closeRightMenu, headerImg, envelopeIcon].forEach(element => {
    if(element)
      element.addEventListener("click", event => {
        if(!container.classList.contains('hide-left-menu'))
          container.classList.add("hide-left-menu");
        container.classList.toggle("hide-right-menu");
      });
  });

  // fullPage scrolling control
  let scrollTopEvents = 0;
  let scrollBottomEvents = 0;

  if(blogRollContainer)
    blogRollContainer.addEventListener("scroll", event => {
      if (!blogRollContainer.classList.contains("no-scroll"))
        blogRollContainer.classList.add("no-scroll");

      if (
        blogRollContainer.scrollHeight - blogRollContainer.scrollTop ===
        blogRollContainer.clientHeight
      ) {
        myFullpage.moveSectionDown();
        blogRollContainer.classList.remove("no-scroll");
      }

      if (blogRollContainer.scrollTop === blogRollContainer.clientTop) {
        if (scrollTopEvents < 1) {
          blogRollContainer.scrollTop = 1;
          scrollTopEvents++;
        } else {
          scrollTopEvents = 0;
          blogRollContainer.classList.remove("no-scroll");
          myFullpage.moveSectionUp();
        }
      }
    });
})();
