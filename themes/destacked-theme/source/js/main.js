// Functions
// Extend jQuery with animation fn
$.fn.extend({
    animateCss: function (animationName) {
        const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

// Check Window size function
function checkWindowSize () {
    if ($(window).width() < 575) {
        $(".left-menu-li-items > li").removeClass("hvr-grow-rotate");
        $(".right-menu-li-items > li").removeClass("hvr-grow");
    } else {
        $(".left-menu-li-items > li").addClass("hvr-grow-rotate");
        $(".right-menu-li-items > li").addClass("hvr-grow");
    }
}


// load highlight.js
$(document).ready(function() {
    hljs.initHighlightingOnLoad();

    const trim_indent = true;
    // enable highlight
    $('pre code').each(function(i, block) {
        const texts = $(this).text().split('\n');
        if (trim_indent) {
            const tab = texts[0].match(/^\s{0,}/);
            if (tab) {
                const arr = [];
                texts.forEach(function (temp) {
                    arr.push(temp.replace(tab, ''));
                });
                $(this).text(arr.join('\n'));
            }
        }
        hljs.highlightBlock(block);
    });
    $(" pre ").addClass("code-pre-block");
    $(" pre code").each(function(i, block){
        //console.log(i,block);
        $(block).attr("id","code-block-"+i);
        $(block).parent().prepend('<p class="noselect code-copy-c" data-clipboard-target="#code-block-'+i+'">copy<i class="fa fa-files-o" aria-hidden="true" style="padding:0 0.5rem;"></i></p>');
    });
});


$(document).ready(function() {

    // For slider menu
    $('.left-menu').sliiide({place: 'left', exit_selector: '.left-exit', toggle: '#nav-icon',no_scroll:false});
    $('.right-menu').sliiide({place: 'right', exit_selector: '.right-exit', toggle: '.site-title-img',no_scroll:false});
    checkWindowSize();

    // side menu fix for showing archives list
    $(".archives-list, .categories-list").addClass("right-menu-li-items");

    // Typing animation
    const typed = new Typed(".lead", {
        strings:["and his awesome hexo static coding blog"],
        typeSpeed: 40,
        cursor:false
    });

    // If the viewport changes. changes the type of menu. For mobile devices, use top down menu. For others, use side menu
    $(window).resize(function() {
        checkWindowSize();
    });

    // Events

    // Border bottom material shadow for header on scroll
    $(window).scroll(function() {
        if($(window).scrollTop() > 0) {
            // when at screen top header is bigger
            $(".header-row").addClass("header-row-bottom-border-shadow scroll-header-row-class");
            $("#nav-icon, #archive-icon").addClass("scroll-icon-class");
            $(".icon-separator").addClass("scroll-icon-separator-class");
            $(".blog-title > h1, .blog-title > a").addClass("scroll-blog-title-a-h-class");
            $(".blog-title").addClass("scroll-blog-title-class");
            $(".nav-icons").addClass("nav-icons-scroll");
            $(".site-title-img").addClass("site-title-img-scroll");
            $(".lead-container").hide();
        } else {
            // else header contracts
            $(".header-row").removeClass("header-row-bottom-border-shadow scroll-header-row-class");
            $("#nav-icon, #archive-icon").removeClass("scroll-icon-class");
            $(".icon-separator").removeClass("scroll-icon-separator-class");
            $(".blog-title > h1, .blog-title > a").removeClass("scroll-blog-title-a-h-class");
            $(".blog-title").removeClass("scroll-blog-title-class");
            $(".nav-icons").removeClass("nav-icons-scroll");
            $(".site-title-img").removeClass("site-title-img-scroll");
            $(".lead-container").show();
        }
    });

    // hide header on scroll down to maximize viewing space and show on scroll up
    if($("#head-data")[0].dataset.ispost === "true") {
        $(window).on("mousewheel", function (event){
            if (event.deltaY > 0 ) {
                $(".blog-header").show();
            } else {
                $(".blog-header").slideUp("slow");
            }
        });
    }

    // Clipboard.js
    const clipcode = new Clipboard('.code-copy-c');

    // for data-links
    $("[data-link]").click(function() {
        window.location.href = $(this).attr("data-link");
        return false;
    });

    // vex
    vex.defaultOptions ={
        content: '',
        unsafeContent: '',
        showCloseButton: true,
        escapeButtonCloses: true,
        overlayClosesOnClick: true,
        appendLocation: 'body',
        className: 'vex-theme-wireframe',
        overlayClassName: '',
        contentClassName: 'vex-popup-container',
        closeClassName: '',
        closeAllOnPopState: true
    };


    // whenyou click on the image in the right of the navbar
    // $(".site-title-img").on("click", function(){
    //     const personBlogInfo = JSON.parse(decodeURIComponent($("#head-data")[0].dataset.personInfo).replace(/%27/g, "'"));
    //     // console.log(personBlogInfo);
    //     function fetchContactFormPopup () {
    //
    //     }
    //     vex.dialog.alert({
    //         unsafeMessage:
    //             `
    //               <div class="card soc-card">
    //                 <img class="card-img-top" src="${personBlogInfo.person_info.nav_img_url}" alt="Card image cap">
    //                 <div class="card-block soc-media-card-block">
    //                   <h2 class="card-title">${personBlogInfo.person_info.fullname}</h2>
    //                   <h6 class="soc-card-title-links">
    //                     <div class="block-1">
    //                         <i style="padding:0 1rem 0 0" class="fa fa-heart" aria-hidden="true"></i>${personBlogInfo.person_info.country}<br>
    //                         <i style="padding:0 1.2rem 0 0.2rem" class="fa fa-map-marker" aria-hidden="true"></i>${personBlogInfo.person_info.location}
    //                     </div>
    //                     <div class="block-2">
    //                         <a target="_blank" href="${personBlogInfo.person_info.website.link}"><i style="padding:0 1rem 0 0.1rem" class="fa fa-globe" aria-hidden="true"></i>${personBlogInfo.person_info.website.title}</a><br>
    //                         <a target="_blank" href="${personBlogInfo.person_info.resume.link}"><i style="padding:0 1rem 0 0rem" class="fa fa-rocket" aria-hidden="true"></i>${personBlogInfo.person_info.resume.title}</a>
    //                     </div>
    //                   </h6>
    //                   <p class="card-text" style="padding-top:1rem;">${personBlogInfo.person_info.description}</p>
    //                   <div class="soc-media-container">
    //                     <a class="soc-media-link" target="_blank" title="Contact me by email" href="${personBlogInfo.social_media_links.contact}"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
    //                     <a class="soc-media-link" target="_blank" title="See my Github" href="${personBlogInfo.social_media_links.github}"><i class="fa fa-github" aria-hidden="true"></i></a>
    //                     <a class="soc-media-link" target="_blank" title="Follow me in Medium" href="${personBlogInfo.social_media_links.medium}"><i class="fa fa-medium" aria-hidden="true"></i></a>
    //                     <a class="soc-media-link" target="_blank" title="Find me on LinkedIn" href="${personBlogInfo.social_media_links.linkedin}"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
    //                   </div>
    //                 </div>
    //               </div>
    //             `,
    //          // Overwrites defaultOptions
    //         showCloseButton: true
    //     });
    // });
});