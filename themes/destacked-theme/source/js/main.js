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
        $('.sidebar-widget-container').addClass('is-hidden');
        $('.left-menu-li-items > li').removeClass('hvr-grow-rotate');
        $('.right-menu-li-items > li').removeClass('hvr-grow');
    } else {
        $('.sidebar-widget-container').removeClass('is-hidden');
        $('.left-menu-li-items > li').addClass('hvr-grow-rotate');
        $('.right-menu-li-items > li').addClass('hvr-grow');
    }
}


// load highlight.js
$(document).ready(function() {
    // default

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
    $(' pre ').addClass('code-pre-block');
    $(' pre code').each(function(i, block){
        //console.log(i,block);
        $(block).attr('id','code-block-'+i);
        $(block).parent().prepend(`<p class='noselect code-copy-c' data-clipboard-target='#code-block-${i}'>copy<i class='fa fa-files-o' aria-hidden='true' style='padding:0 0.5rem;'></i></p>`);
    });
});


$(document).ready(function() {

    // For slider menu
    $('.left-menu').sliiide({place: 'left', exit_selector: '.left-exit', toggle: '#nav-icon',no_scroll:false});
    $('.right-menu').sliiide({place: 'right', exit_selector: '.right-exit', toggle: '.site-title-img',no_scroll:false});
    checkWindowSize();

    // side menu fix for showing archives list
    $('.archives-list, .categories-list').addClass('right-menu-li-items');

    // Typing animation
    const typed = new Typed('.lead', {
        strings:['and his awesome hexo static coding blog'],
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
            $('.header-row').addClass('header-row-bottom-border-shadow scroll-header-row-class');
            $('#nav-icon, #archive-icon').addClass('scroll-icon-class');
            $('.icon-separator').addClass('scroll-icon-separator-class');
            $('.blog-title > h1, .blog-title > a').addClass('scroll-blog-title-a-h-class');
            $('.blog-title').addClass('scroll-blog-title-class');
            $('.nav-icons').addClass('nav-icons-scroll');
            $('.site-title-img').addClass('site-title-img-scroll');
            $('.lead-container').hide();
        } else {
            // else header contracts
            $('.header-row').removeClass('header-row-bottom-border-shadow scroll-header-row-class');
            $('#nav-icon, #archive-icon').removeClass('scroll-icon-class');
            $('.icon-separator').removeClass('scroll-icon-separator-class');
            $('.blog-title > h1, .blog-title > a').removeClass('scroll-blog-title-a-h-class');
            $('.blog-title').removeClass('scroll-blog-title-class');
            $('.nav-icons').removeClass('nav-icons-scroll');
            $('.site-title-img').removeClass('site-title-img-scroll');
            $('.lead-container').show();
        }
    });

    // hide header on scroll down to maximize viewing space and show on scroll up
    if($('#head-data')[0].dataset.ispost === 'true') {
        $(window).on('mousewheel', function (event){
            if (event.deltaY > 0) {
                $('.blog-header').show();
            } else {
                $('.blog-header').slideUp('slow');
            }
        });
    }

    // Clipboard.js
    const clipcode = new Clipboard('.code-copy-c');

    // for data-links
    $('[data-link]').click(function() {
        window.location.href = $(this).attr('data-link');
        return false;
    });
    
    $('.hide-sidebar').on('click', function(){
        if(!$('.sidebar-widget-container').hasClass('is-hidden')){
            $('.sidebar-widget-container').addClass('is-hidden');
        } else {
            $('.sidebar-widget-container').removeClass('is-hidden');
        }
    });
});