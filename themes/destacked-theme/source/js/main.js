function windowSizeEvents () {
    // If the viewport changes. changes the type of menu. For mobile devices, use top down menu. For others, use side menu
    if ($(window).width() < 575) {
        $('.sidebar-widget-container').addClass('is-hidden');
        $('.left-menu-li-items > li').removeClass('hvr-grow-rotate');
        $('.right-menu-li-items > li').removeClass('hvr-grow');
        $('.soc-media-container > a').removeClass('hvr-grow');
        $('#nav-icon').removeClass('menu-open');
        $('.left-menu').addClass('st-menu-close');
    } else {
        $('.sidebar-widget-container').removeClass('is-hidden');
        $('.left-menu-li-items > li').addClass('hvr-grow-rotate');
        $('.right-menu-li-items > li').addClass('hvr-grow');
        $('.soc-media-container > a').addClass('hvr-grow');
        $('#nav-icon').addClass('menu-open');
        $('.left-menu').addClass('st-menu-open');
    }
}

function scrollLocationEvents() {
    if($(window).scrollTop() > 0) {
        // when at screen top header is bigger
        $('.header-row').addClass('header-row-bottom-border-shadow scroll-header-row-class');
        $('#nav-icon').addClass('scroll-icon-class');
        $('.blog-title > h1, .blog-title > a').addClass('scroll-blog-title-a-h-class');
        $('.blog-title').addClass('scroll-blog-title-class');
        $('.nav-icons').addClass('nav-icons-scroll');
        $('.site-title-img').addClass('site-title-img-scroll');
    } else {
        // else header contracts
        $('.header-row').removeClass('header-row-bottom-border-shadow scroll-header-row-class');
        $('#nav-icon').removeClass('scroll-icon-class');
        $('.blog-title > h1, .blog-title > a').removeClass('scroll-blog-title-a-h-class');
        $('.blog-title').removeClass('scroll-blog-title-class');
        $('.nav-icons').removeClass('nav-icons-scroll');
        $('.site-title-img').removeClass('site-title-img-scroll');
    }
}

function scrollWheelEvents(event) {
    // hide header on scroll down to maximize viewing space and show on scroll up
    if (event.deltaY > 0) {
        $('.nav-container').show();
    } else {
        $('.nav-container').slideUp('slow');
    }
}

function initializeHighlightJS() {
    hljs.initHighlightingOnLoad();

    $('pre code').each(function(i, block) {
        const texts = $(this).text().split('\n');
        const trim_indent = true;

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

    const clipcode = new Clipboard('.code-copy-c');
}

function initializeFullPageJS(){
    $('#fullpage').fullpage({
		autoScrolling: true,
        scrollHorizontally: true,
        anchors: [
            'home',
            'blog',
            // 'projects',
            'contact'
        ],
	    menu: '#left-menu-items'
	});
}

$(document).ready(function() {
    windowSizeEvents();
    initializeHighlightJS();
    initializeFullPageJS();

    // Events

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

    $(window).scroll(function() {
        scrollLocationEvents();
    });

    $(window).resize(function() {
        windowSizeEvents();
    });


    if($('#head-data')[0].dataset.ispost === 'true') {
        $(window).on('mousewheel', function (event){
            scrollWheelEvents(event)
        });
    }

    // side menu fix for showing archives list
    $('.archives-list, .categories-list').addClass('right-menu-li-items');

    // menu events
    const navIcon = $('#nav-icon');
    const leftMenu = $('.left-menu');

    navIcon.click(function() {
        if (navIcon.hasClass('menu-open')) {
            navIcon.removeClass('menu-open');
            leftMenu.addClass('st-menu-close');
            leftMenu.removeClass('st-menu-open');
        } else {
            navIcon.addClass('menu-open');
            leftMenu.addClass('st-menu-open');
            leftMenu.removeClass('st-menu-close');
        }
    });

    // blog roll events
    $(".load-more").click(function() {
        $.getJSON( "../all_content.json", function(data) {
            console.log("received data", data);
        });
    });
});
