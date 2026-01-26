$(".nemures").blur(function () {
    if ($(this).val() != "") {
        $(this).parent().addClass("nem-ures-input");
    } else {
        $(this).parent().removeClass("nem-ures-input");
    }

});


function backdrop() {
    $('.backdrop, .popup-dismiss').click(function () {
        $('.popup').removeClass('sys active higher-then-window');
        $('body').removeClass('body-noscroll');
        bd.fadeOut();
    });
}

function popup() {
    // Tároljuk el az utoljára kattintott elemet
    let lastFocusedElement;

    $(doc).on('click', '.show-popup', function () {
        // Mentsük el a megnyitó elemet
        lastFocusedElement = $(this);

        var target = $(this).data('target'),
            windowHeight = $(window).height(),
            popupHeight = $('.popup-' + target).outerHeight();

        let self = $(this),
            filter = self.data('filter');

        $('.popup').removeClass('active');
        $('.popup-' + target).addClass('active');
        $('#kategoria-filter').removeClass();
        $('#kategoria-filter').addClass(filter);
        $('body').addClass('body-noscroll');

        bd.fadeIn();

        setupPopupFocus(target);

    }).on('click', '.popup-close, .popup-dismiss, .popup-btnclose', function () {
        bd.fadeOut();
        $('.popup').removeClass('active');
        $('body').removeClass('body-noscroll');
        
        // Visszaállítjuk a fókuszt az eredeti elemre
        if (lastFocusedElement && lastFocusedElement.length) {
            lastFocusedElement.focus();
        }

        setTimeout(function () {
            bd.removeClass('sys');
        }, 400);
    });

    $(document).on('keydown', function (e) {
        if (e.key === "Escape") {
            bd.trigger('click');
            // Escape-re is állítsuk vissza a fókuszt
            if (lastFocusedElement && lastFocusedElement.length) {
                lastFocusedElement.focus();
            }
        }
    });
}

function showPopup(target) {
    // Itt is tároljuk el az aktív elemet
    lastFocusedElement = document.activeElement;
    
    $('.popup').removeClass('active');
    bd.fadeIn();
    setupPopupFocus(target);
}

function setupPopupFocus(target) {
    let popup = $('.popup-' + target).addClass('active');
    $('body').addClass('body-noscroll');

    setTimeout(() => {
        let focusableElements = popup.find('input, textarea, select, a').filter(':visible');
        const closeButton = popup.find('.popup-close').filter(':visible');

        if (focusableElements.length > 0) {
            focusableElements = focusableElements.add(closeButton);
        } else {
            focusableElements = closeButton;
        }

        const firstFocusableElement = focusableElements.first();
        const lastFocusableElement = focusableElements.last();


        if (firstFocusableElement.length > 0) {
            firstFocusableElement.focus();
        }

        popup.on('keydown', function (e) {
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement[0]) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement[0]) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        });

        $(document).on('focusin', function (e) {
            if (!popup.has(e.target).length && popup.hasClass('active')) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        });
    }, 400);
}


function RemoveAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽžőű';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZzou";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

function resizeBoxes(boxes) {
    if ($.type(boxes) === 'string') boxes = $(boxes);

    var h = 0;
    boxes.height('auto');
    boxes.each(function () {
        if ($(this).height() > h) h = $(this).height();
    });
    boxes.height(h);
}

function getOS() {
    var a = '';
    var osString = {
        'windows': /(Win)/,
        'android': /Android/,
        'linux': /(Linux|X11)/,
        'ios': /(iPhone|iPad|iPod|Mac)/,
        'unix': /UNIX/,
        'bot': /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
    };

    $.each(osString, function (k, v) {
        if (a == '' && v.test(navigator.userAgent)) a = k;
    });
    return a;
}

function getBrowser() {
    var a = '';
    var browserString = {
        'Chrome': 'chrome',
        'MSIE': 'ie',
        'Trident/': 'ie',
        'Firefox': 'ff',
        'Safari': 'safari',
        'Presto': 'opera',
        'Opera': 'opera'
    };
    $.each(browserString, function (k, v) {
        if (a == '' && navigator.userAgent.indexOf(k) != '-1') a = v;
    });
    return a;

}

/* apple-safari mobile rotation bug fixed */
if (os == 'ios' && browser == 'safari') {
    (function (doc) {
        var addEvent = 'addEventListener',
            type = 'gesturestart',
            qsa = 'querySelectorAll',
            scales = [1, 1],
            meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

        function fix() {
            meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
            doc.removeEventListener(type, fix, true);
        }

        if ((meta = meta[meta.length - 1]) && addEvent in doc) {
            fix();
            scales = [.25, 1.6];
            doc[addEvent](type, fix, true);
        }
    }(document));
}

/* windows phone 8.1 bug fixed */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{width:auto!important}"
        )
    );
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}

var browser, os, WW, WH, DH, ST, baseURL, lazy, minW = 320, resizeTo, lang, doc = 'document,html,body', base = ($('base').length ? $('base').attr('href') : $('html').data('base')), lang = $('html').attr('lang'), d = false, previousTop = 0, opened = 0, runing, bd = $('.backdrop'), navbarHover = 0, lastScrollTop = '', justEmpty = '', scrolldown = 0, basketPageAppend = 0, running = false, triggered = 0, targetYTID = '';
browser = getBrowser();
os = getOS();

$(document).ready(function () {
    lang = $('html').attr('lang');
    baseURL = $('base').attr('href');
    $('html').addClass('br_' + browser).addClass('os_' + os);

    resize();
    $(window).resize(function () {
        clearTimeout(resizeTo);
        resizeTo = setTimeout(function () {
            resize();
        }, 400);
    });

    scroll();
    $(window).scroll(function () {
        scroll();
    });

    popup();
    backdrop();

    setTimeout(function () {
        $('html').addClass('page-loaded');
    }, 500);



    if (window.location.href.indexOf('#') != -1) {
        var id = window.location.href.substr(window.location.href.indexOf('#'));
        if ($(id).length) {
            setTimeout(function () {
                $('html').animate({'scrollTop': $(id).offset().top - 80}, 'slow', function () {
                    if ($(id).attr('tabindex') === undefined) {
                        $(id).attr('tabindex', '-1'); // Ha nincs tabindex, akkor hozzáadjuk
                    }
                    $(id)[0].focus(); // A fókusz a célzott elemre kerül
                });
            }, 2000);
        }
    }

    $(".sitelink").on('click', function (e) {

        var id = "#"+$(this).data('target');

        var $target = $(id);
        if ($target.length) {
            e.preventDefault(); // ne kövesse az alapértelmezett viselkedést

            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 500, function () {
                // tabindex hozzáadása, ha nincs
                if (!$target.is('[tabindex]')) {
                    $target.attr('tabindex', '-1');
                }

                // Késleltetett fókuszálás
                setTimeout(function () {
                    $target[0].focus();
                }, 10);
            });
        }

    });


    $('body').on('click', 'a', function (e) {
        var href = $(this).attr('href');
    
        if (!$(this).hasClass("ui-button") && href && href.indexOf('#') !== -1) {
            var id = href.substr(href.indexOf('#'));
    
            var $target = $(id);
            if ($target.length) {
                e.preventDefault(); // ne kövesse az alapértelmezett viselkedést
    
                $('html, body').animate({
                    scrollTop: $target.offset().top - 80
                }, 500, function () {
                    // tabindex hozzáadása, ha nincs
                    if (!$target.is('[tabindex]')) {
                        $target.attr('tabindex', '-1');
                    }
    
                    // Késleltetett fókuszálás
                    setTimeout(function () {
                        $target[0].focus();
                    }, 10);
                });
            }
        }
    });
/*
    $('body').on('click', 'a', function () {
        var href = $(this).attr('href');

        if (!$(this).hasClass("ui-button")) {
            if (href.indexOf('#') != -1) {
                var id = href.substr(href.indexOf('#'));
                if ($(id).length) {
                    $('html').animate({'scrollTop': $(id).offset().top - 80}, 'slow', function () {
                        if ($(id).attr('tabindex') === undefined) {
                            $(id).attr('tabindex', '-1'); // Ha nincs tabindex, akkor hozzáadjuk
                        }
                        $(id)[0].focus(); // A fókusz a célzott elemre kerül
                    });

                    return false;
                }
            }
        }
    });
*/


});

document.addEventListener('DOMContentLoaded', function () {
    // Keresd meg az összes a.btn-space-act elemet
    const btns = document.querySelectorAll('a.btn-space-act');

    btns.forEach(btn => {
      btn.addEventListener('keydown', function (e) {
        // Ha space-t nyomtak
        if (e.code === 'Space') {
          e.preventDefault(); // Ne scrollozzon
          btn.click(); // Szimulálja a kattintást
        }
      });
    });
  });

function scroll() {
    WW = $(window).width();
    ST = $(window).scrollTop();

    /* create scroll functions */
    if (ST < previousTop) {
        //ha fel görgetek

        if (ST > 0) {
            //ha nem a tetején vagyok
        } else {
            //ha a tetjére ért
        }


    } else {
        var cat = $('.header-slider').height();

        if (ST > previousTop && ST > cat && !d) {
            //ha le görgetek
            $('html').addClass('scrolled-down');

            lastScrollTop = ST;

            if (scrolldown == 0) {
                setTimeout(function () {
                    $(window).scrollTop($(window).scrollTop() + 1);
                    scrolldown = 1;
                }, 100);
            }
        }
    }

    previousTop = ST;
}

function resize() {
    WW = $(window).width();
    WH = $(window).height();
    DH = $(document).height();

    /* create resize functions */
}


$.fn.onePageNav = function (options) {
    var settings = $.extend({
            activeClass: 'active',
            wrapper: '', // Nav wrapper selector for scroll effect
            speed: 900, // animation speed
            navStop: 0, // stop before top
            navStart: 200 // change class before navstart pixel
        }, options),
        $that = $(this);

    var isScrolling = false; // Flag változó a végtelen ciklus elkerülésére

    $(this).on('click', clickScroll);

    if (settings.wrapper) {
        $(window).on('scroll', function () {
            if (isScrolling) return; // Ha az oldal már épp scrollozik, ne csináljunk semmit

            var sectionTop = [],
                windowTop = $(window).scrollTop();

            $that.each(function () {
                var target = $(this).data('target'),
                    targetOffset = $(target).offset();
                if (typeof targetOffset !== 'undefined') {
                    sectionTop.push({top: targetOffset.top, element: $(target)});
                }
            });

            $.each(sectionTop, function (index, section) {
                if (windowTop > section.top - settings.navStart) {
                    $that.removeClass(settings.activeClass)
                        .eq(index).addClass(settings.activeClass);

                    // Görgetés a megfelelő menüpontra
                    var left = $('.top-menu-items li .active').position().left;
                    $('.top-menu-cont').scrollLeft(left);
                }
            });
        });
    }

    function clickScroll(event) {
        event.preventDefault();

        var target = $(this).data('target'),
            targetElement = $(target),
            targetOffset = targetElement.offset(),
            targetTop = targetOffset.top;

        isScrolling = true; // Görgetési folyamat elkezdődik, flag bekapcsolása

        $('html, body').animate({
            scrollTop: targetTop - settings.navStop - 50
        }, settings.speed, function () {
            isScrolling = false; // Görgetés befejeződött, flag kikapcsolása

            // **Fókusz áthelyezése az adott szakaszra, de görgetés nélkül**
            var scrollY = window.scrollY;
            setTimeout(function () {
                targetElement.attr('tabindex', '-1').focus();
                window.scrollTo(0, scrollY);
            }, 50);
        });
    }
};

jQuery('.scroll').onePageNav({
    wrapper: '#onepage-nav'
});

/*tooltip start*/
$(document).ready(function () {
    $(".tooltip-button").click(function () {
        var tooltipId = $(this).attr("aria-describedby");
        var $tooltip = $("#" + tooltipId);
        var $button = $(this);
        var $parent = $(this).closest(".tooltip");
        var buttonRect = $(this)[0].getBoundingClientRect();
        var tooltipWidth = 280; // Fix tooltip szélesség
        var tooltipHeight = $tooltip.outerHeight();
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        // Ha még nincs overlay, hozzuk létre
        if ($parent.find(".tooltip-overlay").length === 0) {
            var $overlay = $('<div class="tooltip-overlay"></div>');
            $parent.append($overlay);
        }

        // Alapértelmezett osztályok törlése
        $parent.removeClass("tooltip-left tooltip-right tooltip-bottom");

        // Ha a tooltip kilóg jobbra
        if (buttonRect.left + tooltipWidth / 2 > windowWidth) {
            $parent.addClass("tooltip-left");
        }

        // Ha a tooltip kilóg balra
        if (buttonRect.left - tooltipWidth / 2 < 0) {
            $parent.addClass("tooltip-right");
        }

        // Ha a tooltip felfelé kilóg, akkor lefelé nyitjuk
        if (buttonRect.top - tooltipHeight < 0) {
            $parent.addClass("tooltip-bottom");
        }

        // Tooltip megjelenítése
        $tooltip.removeAttr("hidden").show();
        trapFocus($tooltip, $button);

        // Fókusz áthelyezése az első fókuszálható elemre a tooltipen belül
        var focusableElements = $tooltip.find("button, a, input, textarea, select").filter(":visible");
        if (focusableElements.length > 0) {
            focusableElements.first().focus();
        }
    });

    $(document).on("click", ".tooltip-close, .tooltip-overlay", function () {
        var $tooltip = $(this).closest(".tooltip").find(".tooltip-cont");
        var $button = $(this).closest(".tooltip").find(".tooltip-button");
        var $overlay = $(this).closest(".tooltip").find(".tooltip-overlay");

        $tooltip.hide().attr("hidden", "hidden");
        $overlay.remove(); // Overlay eltávolítása
        releaseFocus($tooltip);
        $button.focus(); // Visszaállítjuk a fókuszt a gombra
    });

    function trapFocus($tooltip, $button) {
        var focusableElements = $tooltip.find("button, a, input, textarea, select").filter(":visible");
        if (focusableElements.length > 0) {
            var firstElement = focusableElements.first();
            var lastElement = focusableElements.last();

            releaseFocus($tooltip);

            $tooltip.on("keydown.trapFocus", function (e) {
                if (e.key === "Tab") {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement[0]) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement[0]) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                } else if (e.key === "Escape") {
                    $tooltip.hide().attr("hidden", "hidden");
                    $(".tooltip-overlay").remove(); // Overlay eltávolítása
                    releaseFocus($tooltip);
                    $button.focus();
                }
            });
        }
    }

    function releaseFocus($tooltip) {
        $tooltip.off("keydown.trapFocus");
    }
});

/*tooltip end */

/*gyik accordion */

class DisclosureButton {
    constructor(buttonNode) {
      this.buttonNode = buttonNode;
      this.controlledNode = null;
  
      const id = this.buttonNode.getAttribute('aria-controls');
      if (id) {
        this.controlledNode = document.getElementById(id);
      }
  
      this.buttonNode.setAttribute('aria-expanded', 'false');
      this.controlledNode.style.overflow = 'hidden';
      this.controlledNode.style.transition = 'max-height 0.3s ease-out';
      this.hideContent();
  
      this.buttonNode.addEventListener('click', this.onClick.bind(this));
      this.buttonNode.addEventListener('focus', this.onFocus.bind(this));
      this.buttonNode.addEventListener('blur', this.onBlur.bind(this));
    }

    // Segédfüggvény a legközelebbi dl szülő megkereséséhez
    findParentDl() {
      let parent = this.buttonNode.parentElement;
      while (parent && parent.tagName.toLowerCase() !== 'dl') {
        parent = parent.parentElement;
      }
      return parent;
    }
  
    calculateTotalHeight(element) {
      const style = window.getComputedStyle(element);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      
      let totalHeight = element.scrollHeight + marginTop + marginBottom;
      
      // Ha van beágyazott dl elem benne és az látható
      const nestedDls = element.querySelectorAll('dl');
      nestedDls.forEach(dl => {
        const nestedButtons = dl.querySelectorAll('button[aria-expanded="true"]');
        nestedButtons.forEach(button => {
          const nestedContent = document.getElementById(button.getAttribute('aria-controls'));
          if (nestedContent && window.getComputedStyle(nestedContent).display !== 'none') {
            totalHeight += nestedContent.scrollHeight;
          }
        });
      });
      
      return totalHeight;
    }
  
    showContent() {
      if (this.controlledNode) {
        this.controlledNode.style.display = 'block';
        // Késleltetjük a magasság beállítását, hogy a display:block érvényesüljön
        setTimeout(() => {
          const totalHeight = this.calculateTotalHeight(this.controlledNode);
          this.controlledNode.style.maxHeight = `${totalHeight}px`;
          // Frissítjük a szülők magasságát
          this.updateParentHeights();
        }, 0);
      }
    }
  
    hideContent() {
      if (this.controlledNode) {
        this.controlledNode.style.maxHeight = '0';
        setTimeout(() => {
          if (this.buttonNode.getAttribute('aria-expanded') === 'false') {
            this.controlledNode.style.display = 'none';
          }
        }, 300);
      }
    }
  
    toggleExpand() {
      // Megkeressük a legközelebbi dl szülőt
      const parentDl = this.findParentDl();
      
      if (parentDl) {
        // Csak a szülő dl-en belül keressük a nyitott gombokat
        const allButtons = parentDl.querySelectorAll('button[aria-expanded="true"]');
        allButtons.forEach(button => {
          if (button !== this.buttonNode) {
            button.setAttribute('aria-expanded', 'false');
            const controlled = document.getElementById(button.getAttribute('aria-controls'));
            if (controlled) {
              controlled.style.maxHeight = '0';
              setTimeout(() => {
                if (button.getAttribute('aria-expanded') === 'false') {
                  controlled.style.display = 'none';
                  // Frissítjük a szülők magasságát a bezárás után
                  this.updateParentHeights();
                }
              }, 300);
            }
          }
        });
      }
  
      if (this.buttonNode.getAttribute('aria-expanded') === 'true') {
        this.buttonNode.setAttribute('aria-expanded', 'false');
        this.hideContent();
      } else {
        this.buttonNode.setAttribute('aria-expanded', 'true');
        this.showContent();

        // Update parent heights if needed
        let parent = this.controlledNode.parentElement;
        while (parent) {
          if (parent.style && parent.style.maxHeight) {
            const totalHeight = this.calculateTotalHeight(parent);
            parent.style.maxHeight = `${totalHeight}px`;
          }
          parent = parent.parentElement;
        }
      }
    }

    updateParentHeights() {
        let parent = this.controlledNode.parentElement;
        while (parent) {
            if (parent.classList.contains('gyik-txt')) {
                const totalHeight = this.calculateTotalHeight(parent);
                parent.style.maxHeight = `${totalHeight}px`;
            }
            parent = parent.parentElement;
        }
    }
  
    onClick() {
      this.toggleExpand();
    }
  
    onFocus() {
      this.buttonNode.classList.add('focus');
    }
  
    onBlur() {
      this.buttonNode.classList.remove('focus');
    }
  }

  window.addEventListener('load', function () {
    const accordions = document.querySelectorAll('.gyik-accordion');
    accordions.forEach(accordion => {
      const buttons = accordion.querySelectorAll('button[aria-expanded][aria-controls]');
      buttons.forEach(button => new DisclosureButton(button));
    });
  });

  /*
  window.addEventListener('load', function () {
    const buttons = document.querySelectorAll('button[aria-expanded][aria-controls]');
    buttons.forEach(button => new DisclosureButton(button));
  });
  */



/*gik accordion end */

$(document).ready(function (e) {

    if ($('.section-bg-menu').length) {
        var $obj = $('.section-bg-menu');
    // Csak akkor futtatjuk ha létezik az elem
    if ($obj.length > 0) {

        var top = $obj.offset().top;
        var checkS = true;
    }

    function checkScr() {

        var y = $(this).scrollTop();
        if (checkS) {
            top = $obj.offset().top;
        }
        if (y >= top) {
            checkS = false;
            $('.section-bg-menu').addClass('section-bg-menu-shadow');
        } else {
            $('.section-bg-menu').removeClass('section-bg-menu-shadow');
        }
    }

    $(window).scroll(function (event) {
        checkScr();
    });
    checkScr();
}
});
$(document).ready(function (e) {
    // GYIK link emulált kattintás
    $('body').on('click', 'a[data-gyik]', function (e) {
        var gyikId = $(this).attr('data-gyik');
        var $button = $('button[aria-controls="' + gyikId + '"]');
        if ($button.length) {
            $button.trigger('click');
        }
        // Ne legyen duplikált görgetés, csak a fókusz és nyitás történjen
        e.preventDefault();
        // Opcionális: görgessünk a GYIK szekcióhoz
        var $gyikSection = $('#gyik');
        if ($gyikSection.length) {
            $('html, body').animate({
                scrollTop: $gyikSection.offset().top - 80
            }, 400, function () {
                $gyikSection.attr('tabindex', '-1').focus();
            });
        }
    });
});

/* sticky kalkulátor box */
document.addEventListener('focusin', function(e) {
    // Ellenőrizzük, hogy az elem a kalkulátor boxon belül van-e
    if (e.target.closest('.box-7')) {
        const stickySum = document.querySelector('.box-7-sum');
        if (!stickySum) return;

        // Várunk egy ticket hogy a DOM frissüljön
        setTimeout(() => {
            const rect = e.target.getBoundingClientRect();
            const sumRect = stickySum.getBoundingClientRect();

            // Ha a fókuszált elem a sticky elem alá kerülne
            if (rect.bottom > sumRect.top) {
                // Görgetünk annyit hogy látszódjon
                const scrollAmount = rect.bottom - sumRect.top + 20; // 20px extra padding
                window.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, 0);
    }
});
/* sticky kalkulátor box */

/*iframe video */
function loadYouTubeVideo(button, videoUrl) {
    const container = button.closest('.video-container');
    const iframe = container.querySelector('iframe');
    const thumbnail = container.querySelector('.video-thumbnail');
    
    iframe.src = videoUrl;
    thumbnail.style.display = 'none';
    iframe.style.display = 'block';
}
/*iframe video */

$(function () {
  $("#tabs, .tabs_2").each(function () {
    const $container = $(this);
    $container.tabs();

    const $tablist = $container.find("> ul");
    $tablist.attr("role", "tablist");

    const $tabs = $tablist.find("a");
    const $panels = $container.children("div");

    $tabs.each(function (index) {
      const $tab = $(this);
      const panelId = $tab.attr("href").replace("#", "");
      const $panel = $("#" + panelId);

      // Biztonság kedvéért: eltávolítjuk a nem ide illő aria-expanded attribútumot
      $tab.removeAttr("aria-expanded");

      // Generálunk egy egyedi ID-t, ha nincs
      if (!$tab.attr("id")) {
        $tab.attr("id", "tab-" + panelId);
      }

      // Tab ARIA attribútumok
      $tab
        .attr("role", "tab")
        .attr("aria-controls", panelId)
        .attr("aria-selected", index === 0 ? "true" : "false")
        .attr("tabindex", index === 0 ? "0" : "-1");

      // Szülő <li> elem szerepköre
      $tab.parent().attr("role", "presentation");

      // Panel ARIA attribútumok
      $panel
        .attr("role", "tabpanel")
        .attr("aria-labelledby", $tab.attr("id"))
        .attr("tabindex", "0")
        .attr("hidden", index !== 0);
    });

    // Aktiváláskor frissítjük az állapotokat
    $container.on("tabsactivate", function (event, ui) {
      const $newTab = ui.newTab.find("a");
      const $oldTab = ui.oldTab.find("a");

      $newTab
        .attr("aria-selected", "true")
        .attr("tabindex", "0");
      $oldTab
        .attr("aria-selected", "false")
        .attr("tabindex", "-1");

      ui.newPanel.removeAttr("hidden");
      ui.oldPanel.attr("hidden", true);
    });
  });
});


/*
$(function () {
    $("#tabs").tabs();
    $(".tabs_2").tabs();
});
*/
/*
$(".download-box-title").click(function () {
    $(this).parents(".download-box").toggleClass("download-box-act");
});
*/

$(".download-box-title").click(function () {
    const $button = $(this);
    const isExpanded = $button.attr("aria-expanded") === "true";
    const newExpanded = !isExpanded;
    const controlledId = $button.attr("aria-controls");
    const $controlledElement = $("#" + controlledId);

    if (newExpanded) {
        // Nyitás: azonnal változtassuk az attribútumokat
        $button.attr("aria-expanded", true);
        $controlledElement.attr("aria-hidden", false);
        $button.parents(".download-box").addClass("download-box-act");
    } else {
        // Zárás: késleltetve változtassuk az aria-hidden-t
        $button.attr("aria-expanded", false);
        $button.parents(".download-box").removeClass("download-box-act");
        
        setTimeout(() => {
            if ($button.attr("aria-expanded") === "false") {
                $controlledElement.attr("aria-hidden", true);
            }
        }, 1000);
    }
});

$( ".header-banner-close" ).click(function() {
	$( ".section-header-banner" ).toggleClass( "header-banner-act" );
});
$(".calc-sticky-btn-open-close").click(function (e) {
    $(".calc-sticky").toggleClass("calc-sticky-open-act");
    $("#calc-sticky-focus").focus();
});

$(document).ready(function() {
    function checkVisibility() {
        var calcResult = $('.box-0');
        if (calcResult.length) { 
            var elementTop = calcResult.offset().top;
            var scrollPosition = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (elementTop + calcResult.outerHeight() < scrollPosition) {
                $('body').addClass('calc-sticky-act');
            } else {
                $('body').removeClass('calc-sticky-act');
            }
        }
    }

    $(window).on('scroll resize', checkVisibility);
    checkVisibility();
});
$( ".tabs-scroll" ).click(function() {
    var scrollAmount = $('.tabs_1 .ui-tabs-active').position().left;
    $('.tabs-scroll').scrollLeft(scrollAmount);
});

//prevent mouseout and other related events from firing their handlers
$(".info-icon").on('mouseout', function (e) {
    e.stopImmediatePropagation();
});
/*
$(".btn-section-hitelmaximum").on('click', function (e) {
    $('html, body').animate({
        scrollTop: $(".section-hitelmaximum").eq(0).offset().top - 65
    }, 500);
});
*/
$(".btn-section-kalulator").on('click', function (e) {
    $('html, body').animate({
        scrollTop: $(".section-kalulator").eq(0).offset().top - 65
    }, 500);
});

