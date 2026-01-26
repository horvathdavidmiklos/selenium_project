var hitelTipus = "jelzalog";
var periodus = 1;
var tipus = 'piaci';
var conf = null;
var s1 = false;
var infoTimer = null;
var valuess = new Array();
var i = 0;
var res = 0;
var maxpage = 0;
var periodusClick = 0;
var form_tipus = "";
var voltclick = false;

var uHitelosszeg = 0;
var uJovedelem = 0;
var uKamatperiodus = 7;
var uFutamido = 0;
var george=0;
var voltHitelosszegModositas=false;

var param="";
var param2="";
var jovairas_param=1;


var calcData = new Array();

var App = function () {
    return {

        paros: function () {
            if ($("#kedvezmeny_paros").is(':checked')){
                $("#kedv_box_babavaro").addClass("disabled");
                $("#kedvezmeny_babavaro").prop('checked', false);
                $("#20_ev_div").addClass("disabled");
                $("#10ev").prop('checked', true);
            }
            else if ($("#kedv_box_paros").is(':checked')) {

                $("#kedv_box_paros").addClass("disabled");
                $("#kedv_box_babavaro").removeClass("disabled");
                $("#kedvezmeny_babavaro").prop('checked', false);
            }


            $("#kedvezmeny_paros").on('click', function (e) {
                    if ($("#kedvezmeny_paros").is(':checked')) {
                        $("#kedv_box_babavaro").addClass("disabled");
                        $("#kedvezmeny_babavaro").prop('checked', false);
                        $("#20_ev_div").addClass("disabled");
                        $("#10ev").prop('checked', true);
                        App.calc();
                    }
                    else{
                        $("#kedv_box_babavaro").removeClass("disabled");
                        $("#20_ev_div").removeClass("disabled");
                        App.calc();
                    }
            });

            $("#kedvezmeny_babavaro").on('click', function (e) {
                    if ($("#kedvezmeny_babavaro").is(':checked')) {
                        $("#kedv_box_paros").addClass("disabled");
                        $("#kedvezmeny_paros").prop('checked', false);
                        $("#20_ev_div").removeClass("disabled");
                    }
                    else{
                        $("#kedv_box_paros").removeClass("disabled");
                    }
            });

        },
        piaci: function () {

            $("#kedv_box_babavaro_szabfel").hide();
            $("#piaci_kedvezmenyek_div").show();
        },
        init: function () {




            // $('.lazy-image').lazy();


            $("#bank").load("../fioklista/lista.html?id=" + Math.round(Math.random() * 10000), function () {
                $("#bank").find('option:selected').text('');
            });

            if (window.location.hash=="#piaci-kamatozasu-lakashitel"){
                App.piaci();
            }

            App.paros();



            $(".js-select-minositett").on('click', function (e) {
                $.cookie("hitelosszeg", $("#hitelosszeg").val(), { expires: 10 });
                $.cookie("futamido", $("#futamido").val(), { expires: 10 });
            });





            $(".js-section-kalulator").on('click', function (e) {
                $('html, body').animate({
                    scrollTop: $(".section-kalulator").eq(0).offset().top - 65
                }, 500);
            });

            if (window.location.hash) {

            } else
            {
                if (!$("body").hasClass("content_minositett_act")) {
                    location.href = '#piaci-kamatozasu-lakashitel';
                }
            }



            if (typeof (GSC.getUrlParameter('george')) !== 'undefined')
            {
                $(".js-no-george").hide();
                george=1;
            }



            param=GSC.getUrlParameter('param');

            if (typeof (GSC.getUrlParameter('param')) !== 'undefined')
            {
                param=GSC.getUrlParameter('param');
            }
            else{
                if (typeof (GSC.getUrlParameter('george')) !== 'undefined'){
                    showPopup("error");
                }
            }


            if (typeof (GSC.getUrlParameter('param2')) !== 'undefined')
            {
                param2=GSC.getUrlParameter('param2');
            }






            if (typeof (GSC.getUrlParameter('params')) !== 'undefined')
            {
                var params = GSC.getUrlParameter('params');
                var res = params.split("__");


                var r = null;
                for (i in res)
                {
                    r = res[i].split("_");

                    if (r[0] == 'hitelosszeg')
                    {
                        uHitelosszeg = r[1];
                        Cookies.remove('hitelosszeg', { path: '/' });
                        $.cookie("hitelosszeg", parseInt(uHitelosszeg), {
                            expires: 14,
                            path: "/",
                        });

                    }
                    if (r[0] == 'jovairas')
                    {
                        if (r[1]==0){
                            jovairas_param=0;
                        }
                    }

                    if (r[0] == 'jovedelem')
                    {
                        uJovedelem = r[1];
                        $("#jovedelem").val(GSC.formatNumber(uJovedelem));

                    }


                    if (r[0] == 'futamido')
                    {
                        uFutamido = r[1];
                        Cookies.remove('futamido', { path: '/' });
                        $.cookie("futamido", parseInt(uFutamido), {
                            expires: 14,
                            path: "/",
                        });
                    }

                    if (r[0] == 'kamatperiodus')
                    {
                        if (r[1]=="20ev"){
                            $("#20ev").prop('checked', true);
                            $("#20ev").trigger('click');
                        }
                        else if (r[1]=="10ev"){
                            $("#10ev").prop('checked', true);
                            $("#10ev").trigger('click');
                        }

                        uKamatperiodus = r[1];
                    }


                    if (r[0] == 'param')
                    {
                        param = r[1];
                    }



                }

            }




            var sPageURL = window.location.href;
            var sURLVariables = null;
            var sURLVariables = sPageURL.split('#');






            $("#phone").blur(function () {
                telszam = $(this).val();
                if (telszam.length >= 2 && telszam.slice(0, 2) === '36') {
                    $(this).val("+" + telszam);
                }
            });

            $(".nemures").blur(function () {
                if ($(this).val() != "")
                {
                    $(this).parent().addClass("nem-ures-input");
                } else
                {
                    $(this).parent().removeClass("nem-ures-input");
                }

            });

            $("#phone").click(function () {
                if ($(this).val() == "")
                {
                    $(this).val("+36");
                }
            });

            $(".btn_kalkulacio").on('click', function (e) {
                $(".wrapper").removeClass('btn_kalkulacio_act');
                $('html, body').animate({
                    scrollTop: $(".top_cont").eq(0).offset().top - 50
                }, 500);
            });


            $(".js-kalkulatorra").on('click', function (e) {
                $(".wrapper").removeClass('btn_kalkulacio_act');
                $('html, body').animate({
                    scrollTop: $(".top_cont").eq(0).offset().top - 50
                }, 500);
            });

            $(".js-elkuldom-link").on('click', function () {

                var boxid = 0;
                boxid = $(this).data("id");

                var torlesztesrefordithatomail = GSC.unformatNumber($("#jovedelem").val());
                var jovairas = 0;
                if ($("#kedvezmeny_jovairas").is(':checked')) {
                    jovairas = 1;
                }
                var periodus = "10ev";

                    if ($("#10ev").is(':checked')) {
                        periodus = "10ev";
                    }
                    else if ($("#20ev").is(':checked')) {
                        periodus = "20ev";
                    }


                var khr = 0;
                if ($("#bar_igen").is(':checked')) {
                    khr = 1;
                }




                futamido_par=$("#futamido").val();

                // var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?params=hitelosszeg_' + GSC.unformatNumber($("#hitelosszeg").val()) + '__jovedelem_' + GSC.unformatNumber($("#jovedelem").val()) + '__torl_' + GSC.unformatNumber(torlesztesrefordithatomail) + '__futamido_' + futamido_par+'__jovairas_'+jovairas+'__kamatperiodus_'+periodus+'__khr_'+khr;
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?params=hitelosszeg_' + GSC.unformatNumber($("#hitelosszeg").val()) + '__jovedelem_' + GSC.unformatNumber($("#jovedelem").val()) +'__futamido_' + futamido_par+'__jovairas_'+jovairas+'__kamatperiodus_'+periodus+'__khr_'+khr;

                if ((window.location.hash)!=""){
                    newurl=newurl+window.location.hash;
                }


                if (hitelTipus == "szabadfelhasznalasu")
                {
                    $(this).attr("href", 'mailto:?subject=Befejezetlen Szabad felhasználású jelzáloghitel kalkuláció – Erste Bank&body=Most itt tartasz a tervezésben az Erste Bank kalkulátor oldalán. \nKattints erre a linkre és jöhet a következő lépés: ' + newurl);
                } else
                {
                    $(this).attr("href", 'mailto:?subject=Befejezetlen Lakáshitel kalkuláció – Erste Bank&body=Most itt tartasz a tervezésben az Erste Bank kalkulátor oldalán. \nKattints erre a linkre és jöhet a következő lépés: ' + newurl);

                }



            });


            $(".js-maximum-link").on('click', function () {
                location.href = '#lakashitel-maximum-kalkulator';
                document.title = 'Lakáshitel maximum kalkulátor 2025 - Erste Bank';
                $("body").removeClass("content_jelzalog_act");
                $("body").removeClass("content_szabad_act");
                $("body").addClass("content_hitelmaximum_act");
                $("#jelzalog_repi").css("display", "block");
                $("#szabfel_repi").css("display", "none");

                $(".wrapper").removeClass('btn_kalkulacio_act');
                $(".js-calc").hide();
                $('html, body').animate({
                    scrollTop: $(".content_hitelmaximum").offset().top - 40
                }, 1000);

            });

            $(".js-dokumentumok-link").on('click', function () {
                $(".js-dokumentumok-link-felso").trigger("click");
                $('html, body').animate({
                    scrollTop: $(".js-dokumentumok-link-felso").offset().top - 100
                }, 1000);
            });

            $(".js-milyen-koltsegekkel-kell-szamolni-link").on('click', function () {

                if (maxpage == 1)
                {
                    $(".js-select-piaci").trigger("click");


                    setTimeout(
                            function ()
                            {
                                var gyikclass = ".js-milyen-koltsegekkel-kell-szamolni-1";
                                var id = "#" + $(gyikclass).attr("id");

                                if (!$(id).hasClass("ui-state-active"))
                                {
                                    $(id).trigger("click");
                                }

                                $('html, body').animate({
                                    scrollTop: $(id).offset().top - 100
                                }, 1000);
                            }, 500);
                } else
                {

                    if (hitelTipus == "jelzalog")
                    {
                        var gyikclass = ".js-milyen-koltsegekkel-kell-szamolni-1";
                    } else if (hitelTipus == "szabadfelhasznalasu")
                    {
                        var gyikclass = ".js-milyen-koltsegekkel-kell-szamolni-2";
                    }



                    var id = "#" + $(gyikclass).attr("id");

                    if (!$(id).hasClass("ui-state-active"))
                    {
                        $(id).trigger("click");
                    }

                    setTimeout(
                            function ()
                            {
                                $('html, body').animate({
                                    scrollTop: $(id).offset().top - 100
                                }, 1000);
                            }, 500);

                }





            });


            $(".js-next-step").on('click', function () {

                $(".step-tab-" + $(this).data("id")).trigger("click");

                $('html, body').animate({
                    scrollTop: $("#folyamat_tabok").offset().top - 20
                }, 1000);

            });

            $(".js-prev-step").on('click', function () {
                $(".step-tab-" + $(this).data("id")).trigger("click");
                $('html, body').animate({
                    scrollTop: $("#folyamat_tabok").offset().top - 20
                }, 1000);
            });

            $(".info_icon").on('mouseover', function () {
                clearTimeout(infoTimer);
                $(this).parent().addClass("info_icon_layer_act");
            });

            $(".info_icon").on('mouseout', function () {
                var t = this;
                infoTimer = setTimeout(function () {
                    App.closeInfoLayer(t);
                }, 200);
            });


            $(".js-reprezentativ-pelda-link").on('click', function () {

                var id = "";
                if ($("#jelzalog_repi").css("display") == "block")
                {
                    id = "#jelzalog_repi";
                }
                if ($("#szabfel_repi").css("display") == "block")
                {
                    id = "#szabfel_repi";
                }

                if (id != "")
                {
                    $('html, body').animate({
                        scrollTop: $(id).offset().top - 50
                    }, 1000);
                }
            });




            $(".js-select-piaci").on('click', function () {

                $("#kedv_box_babavaro_szabfel").hide();
                $("#piaci_kedvezmenyek_div").show();
                $("#kedv_box_babavaro").show();

                $('#og_title').attr('content', '🏠Lakáshitel kalkulátor 2025');
                $("#og_description").attr('content', 'Lakáshitel kalkulátor - hasonlítsd össze kamatperiódus alapján lakáshitel ajánlatainkat lakásvásárlásra, telekvásárlásra, lakásépítésre vagy hitelkiváltásra.');
                document.title = '🏠Lakáshitel kalkulátor 2025 - Erste Bank';
                if (!$("body").hasClass("content_minositett_act")) {
                        location.href = '#piaci-kamatozasu-lakashitel';
                        $("body").addClass("content_jelzalog_act");
                }

                $("body").removeClass("content_szabad_act");
                $("body").removeClass("content_hitelmaximum_act");

                $(".slider_info_item").css("display", "none");
                $("#szabfel_gyik").css("display", "none");
                $("#piaci_gyik").css("display", "block");
                hitelTipus = "jelzalog";
                if (uKamatperiodus == 0)
                {
                    $("#5ev").trigger("click");
                } else
                {
                    $("#" + uKamatperiodus).trigger("click");
                }
                $(".js-calc").show();
                maxpage = 0;
                periodusClick = 0;
                $(".js-szabfel").hide();
                $(".js-piaci").show();
                if (uKamatperiodus==3) {
                    $("#10ev").prop('checked', true);
                    $("#10ev").trigger("click");
                    $("#10ev_label").trigger("click");
                }else if (uKamatperiodus==7) {
                    $("#20ev").prop('checked', true);
                    $("#20ev").trigger("click");
                    $("#20ev_label").trigger("click");
                }

                $("#hitelosszeg_slider_data").data("defaultvalue", $('.js-hitelosszeg-slider .slider').slider('option', 'value'));
                $("#hitelosszeg_slider_data").data("maxvalue", 150000000);

                $('.js-hitelosszeg-slider .slider').slider('option', 'max', $("#hitelosszeg_slider_data").data("maxvalue"));
                $('.js-hitelosszeg-slider .slider').slider('option', 'value', $("#hitelosszeg_slider_data").data("defaultvalue"));
                $("#max_hitelosszeg").html("150M Ft");


                $('.js-futamido-slider .slider').slider('option', 'max', 10);
                $("#min_futamido").html("10 év");
                App.initLimits();

                $("#hitelosszeg").val(GSC.formatNumber($('.js-hitelosszeg-slider .slider').slider('option', 'value')));


                App.calc();

            });

            $(".js-select-szabfel").on('click', function () {


                $("#kedv_box_babavaro_szabfel").show();
                $("#piaci_kedvezmenyek_div").hide();
                $("#kedv_box_babavaro").hide();

                location.href = '#szabadfelhasznalasu-jelzalog-hitel-kalkulator';
                document.title = '🏘 Szabad felhasználású jelzáloghitel kalkulátor 2025 - Erste Bank';
                $('#og_title').attr('content', '🏘 Szabad felhasználású jelzáloghitel kalkulátor 2025');
                $("#og_description").attr('content', 'Szabadfelhasználású jelzáloghitel kalkulátor alacsony kamattal. Kattints és kalkulálj! Számos hasznos információval segítünk.');

                $("body").removeClass("content_jelzalog_act");
                $("body").addClass("content_szabad_act");
                $("body").removeClass("content_hitelmaximum_act");

                $(".slider_info_item").css("display", "none");
                $("#szabfel_gyik").css("display", "block");
                $("#piaci_gyik").css("display", "none");
                hitelTipus = 'szabadfelhasznalasu';
                if (uKamatperiodus == 0)
                {
                    $("#5ev").trigger("click");
                } else
                {
                    $("#" + uKamatperiodus).trigger("click");
                }
                $(".js-calc").show();
                maxpage = 0;
                periodusClick = 0;
                $(".js-szabfel").show();
                $(".js-piaci").hide();
                $("#10ev").prop('checked', true);
                $("#10ev").trigger("click");
                $("#10ev_label").trigger("click");


                $("#hitelosszeg_slider_data").data("defaultvalue", $('.js-hitelosszeg-slider .slider').slider('option', 'value'));

                if ($('.js-hitelosszeg-slider .slider').slider('option', 'value')>75000000){
                    $("#hitelosszeg_slider_data").data("defaultvalue", 75000000);
                    $("#hitelosszeg_slider_val").html("75M Ft");
                }
                $("#hitelosszeg_slider_data").data("maxvalue", 75000000);

                $('.js-hitelosszeg-slider .slider').slider('option', 'max', $("#hitelosszeg_slider_data").data("maxvalue"));
                $('.js-hitelosszeg-slider .slider').slider('option', 'value', $("#hitelosszeg_slider_data").data("defaultvalue"));


                $('.js-futamido-slider .slider').slider('option', 'max', 10);
                $("#min_futamido").html("6 év");

                $("#max_hitelosszeg").html("75M Ft");



                App.initLimits();

                $("hitelosszeg").val(GSC.formatNumber($('.js-hitelosszeg-slider .slider').slider('option', 'value')));
                App.calc();
            });

            $(".js-select-max").on('click', function () {
                location.href = '#lakashitel-maximum-kalkulator';
                document.title = 'Lakáshitel maximum kalkulátor 2025 - Erste Bank';
                $('#og_title').attr('content', 'Lakáshitel maximum kalkulátor 2025');
                $("#og_description").attr('content', 'Számold ki, mekkora összegű lakáshitelt tudsz felvenni. Most akár 150 000 Ft megtakarítás az egyes induló költségek visszatérítésével.');

                $("body").removeClass("content_jelzalog_act");
                $("body").removeClass("content_szabad_act");
                $("body").addClass("content_hitelmaximum_act");

                $("#jelzalog_repi").css("display", "block");
                $("#szabfel_repi").css("display", "none");
                $(".js-calc").hide();
                $(".wrapper").removeClass('btn_kalkulacio_act');
                maxpage = 1;
            });

            $(".js-maxra").on('click', function () {
                $(".js-select-max").trigger("click");

                $('html, body').animate({
                    scrollTop: $(".content_hitelmaximum").offset().top - 50
                }, 1000);

            });




            $(".js-close-error-layer").on('click', function () {
                App.closeErrorLayer();
            });

            $(".js-close-form-layer").on('click', function () {
                $("body").removeClass("form_layer_act");
            });

            $(".js-erdekel").on('click', function () {
                
                if (hitelTipus == "jelzalog")
                {
                    $("#l_hitel_tipus").val("jelzalog");
                    $("#l_hitel_tipus_nev").val("Lakáshitel");
                    form_tipus = "lakashitel";
                } else
                {
                    $("#l_hitel_tipus").val("szabadfelhasznalasu");
                    $("#l_hitel_tipus_nev").val("Szabad felhasználású jelzáloghitel");
                    form_tipus = "szabad-felhasznalasu-jelzaloghitel";
                }



                $("#layer_hitelosszeg").html(calcData["layer_hitelosszeg"]);
                $("#layer_futamido").html(calcData["layer_futamido"]);
                $('#layer_elso_havi').html(calcData['layer_elso_havi']);
                $("#layer_teljes_visszafizetendo").html(calcData["layer_teljes_visszafizetendo"]);
                $("#layer_teljes_visszafizetendo_desktop").html(calcData["layer_teljes_visszafizetendo"]);

                $("#layer_teljes_visszafizetendo_mobil").html(GSC.convertNumberToMillion(GSC.unformatNumber(calcData["layer_teljes_visszafizetendo"])) + " M");
                $('#layer_kamat').html(calcData['layer_kamat']);
                $('#layer_thm').html(calcData['layer_thm']);
                $("#layer_teljes_dij").html(calcData["layer_teljes_dij"]);
                $("#layer_jovedelem").html(calcData["layer_jovedelem"]);
                $("#layer_periodus").html($("#periodus_desktop").html());

                if (hitelTipus == "jelzalog")
                {
                    if ($("#kedvezmeny_babavaro_szabfel").is(':checked'))
                    {
                        $("#layer_babavaro").html("igen");
                    } else
                    {
                        $("#layer_babavaro").html("nem");
                    }
                    if ($("#kedvezmeny_babavaro").is(':checked'))
                    {
                        $("#layer_babavaro").html("igen");
                    } else
                    {
                        $("#layer_babavaro").html("nem");
                    }
                    if ($("#kedvezmeny_biztositas").is(':checked'))
                    {
                        $("#layer_biztositas").html("igen");
                    } else
                    {
                        $("#layer_biztositas").html("nem");
                    }
                    $(".js-layer-kedvezmeny").show();
                } else
                {
                    $(".js-layer-kedvezmeny").hide();
                }



                $("body").addClass("form_layer_act");



            });

            $("#registration_btn").on('click', function (e) {
                e.preventDefault();
                App.send();
            });


            $(".js-kedvezmeny").on('click', function () {
                App.calc();
            });


            if (typeof (GSC.getUrlParameter('hitelosszeg')) !== 'khr'){
                var khr = GSC.getUrlParameter('khr');
                if (khr==1){
                    $("#bar_igen").prop("checked", true);
                    $("#bar_igen").trigger("click");
                }
                else if (khr==0){
                    $("#bar_nem").prop("checked", true);
                    $("#bar_nem").trigger("click");
                }
            }

            if (typeof (GSC.getUrlParameter('hitelosszeg')) !== 'undefined')
            {
                uHitelosszeg = GSC.getUrlParameter('hitelosszeg');

                $.cookie("hitelosszeg", uHitelosszeg, { expires: 10 });
                $("#hitelosszeg").data("defaultvalue", uHitelosszeg);
                setTimeout(function(){
                $('.js-hitelosszeg-slider .slider').slider('option', 'value', uHitelosszeg);
                }, 500);

            }
            else{
                if ($.cookie("hitelosszeg")) {
                    uHitelosszeg = GSC.unformatNumber($.cookie("hitelosszeg"));
                }
            }
            if (typeof (GSC.getUrlParameter('jovedelem')) !== 'undefined')
            {
                uJovedelem = GSC.getUrlParameter('jovedelem');
                $("#jovedelem").val(GSC.formatNumber(uJovedelem));
            }
            else{
                if ($.cookie("jovedelem")) {
                    uJovedelem = GSC.unformatNumber($.cookie("jovedelem"));
                    $("#jovedelem").val(GSC.formatNumber(uJovedelem));
                }
            }



            if (typeof (GSC.getUrlParameter('khr')) !== 'undefined')
            {
                if (GSC.getUrlParameter('khr')==1){
                    $("#bar_igen").prop('checked', true);
                }
                else if (GSC.getUrlParameter('khr')==0){
                    $("#bar_nem").prop('checked', true);
                }
            }

            if (typeof (GSC.getUrlParameter('kamatperiodus')) !== 'undefined')
            {
                uKamatperiodus = GSC.getUrlParameter('kamatperiodus');

                if ($("#" + uKamatperiodus).length)
                {
                    $(".kamatperiodus").prop('checked', false);
                    $("#" + uKamatperiodus).prop('checked', true);
                }
            }
            else{
                if ($.cookie("periodus")) {
                    uKamatperiodus = $.cookie("periodus");
                    if ($("#" + uKamatperiodus).length)
                    {
                        $(".kamatperiodus").prop('checked', false);
                        $("#" + uKamatperiodus).prop('checked', true);
                    }
                }
            }

            if (typeof (GSC.getUrlParameter('futamido')) !== 'undefined')
            {
                uFutamido = GSC.getUrlParameter('futamido');

                $.cookie("futamido", uFutamido, { expires: 10 });
                $("#hitelosszeg").data("defaultvalue", uFutamido);
                setTimeout(function(){
                    $('.js-futamido-slider .slider').slider('option', 'value', uFutamido);
                }, 500);
            }
            else{
                if ($.cookie("futamido")) {
                    uFutamido= GSC.unformatNumber($.cookie("futamido"));
                }
            }




                    GSC.formInit();

            App.formatInputValue();
            App.initLimits();
            App.initEvents();



            if (typeof (GSC.getUrlParameter('params')) !== 'undefined') {
                var params = GSC.getUrlParameter('params');
                var res = params.split("__");


                var r = null;
                for (i in res) {
                    r = res[i].split("_");

                    if (window.location.hash == "#piaci-kamatozasu-lakashitel") {


                        if (r[0] == 'kamatperiodus') {
                            if (r[1] == "20ev") {
                                $("#20ev").prop('checked', true);
                                $("#20ev").trigger('click');
                            } else if (r[1] == "10ev") {
                                $("#10ev").prop('checked', true);
                                $("#10ev").trigger('click');
                            }

                            uKamatperiodus = r[1];
                        }

                    }
                }
            }


                if ($("#birthday_webfm").length) {
                var selector = document.getElementById("birthday_webfm");
                var im = new Inputmask("9999-99-99", { "placeholder": "éééé.hh.nn." });
                im.mask(selector);
                $("#birthday_webfm").on('mouseover', function (e) {
                    $(this).closest( ".input-item" ).addClass("nem-ures-input");
                });
                $("#birthday_webfm").on('mouseout', function (e) {
                    if ($(this).val() == "") {
                        $(this).closest( ".input-item" ).removeClass("nem-ures-input");
                    }
                });
            }


            if ($("#phone").length) {

                var selector = document.getElementById("phone");
                var im = new Inputmask("+36 99 999 9999", { "placeholder": " " });
                im.mask(selector);
                $("#phone").on('mouseover', function (e) {
                    $(this).closest( ".input-item" ).addClass("nem-ures-input");
                });
                $("#phone").on('mouseout', function (e) {
                    if ($(this).val() == "") {
                        $(this).closest( ".input-item" ).removeClass("nem-ures-input");
                    }
                });
            }


            GSC.emailAutoComplete("email");
            GSC.cityAutoComplete("birthplace");

            GSC.gyikAutoComplete("gyik_keresendo");


/*
            $("#gyik_keresendo").on('keyup', function () {

                var tip="";

                if ($("body").hasClass("content_minositett_act")) {
                    tip = "minositett";
                }
                else {
                    tip = hitelTipus;
                }




                $("#gyik_szavak").html('');
                $("#gyik_talalat").html('');

                $("#talalatok_szama").html('');
                $(".gyik_search_cont").removeClass("gyik_search_act");

                $.ajax({
                    url: "keres.php",
                    type: "post",
                    data: {
                        'keresendo': $("#gyik_keresendo").val(),
                        'hitelTipus': tip,
                    }
                    ,
                    dataType: "json",
                    success: function (result) {

                        if (result['szavak'])
                        {


                            $("#gyik_szavak").html(result['szavak']);
                            $(".gyik_search_cont").addClass("gyik_search_act");
                        }
                        if (result['kerdesek'])
                        {
                            $("#gyik_talalat").html(result['kerdesek']);
                            $(".gyik_search_cont").addClass("gyik_search_act");

                            $("#talalatok_szama").html(result['talalatok_szama'] + " találat");
                        }

                    }

                });

            });
            */


            if (sURLVariables != sPageURL)
            {
                sURLVariables[1];

                var u = sPageURL.split('-');

                if ((window.location.hash == "#piaci-kamatozasu-lakashitel") || (window.location.hash == "#szabadfelhasznalasu-jelzalog-hitel-kalkulator") || (window.location.hash == "#lakashitel-maximum-kalkulator")) {

                } else
                {


                    if (u[1] != undefined)
                    {

                        $(".step-tab-" + u[1]).trigger("click");

                        $('html, body').animate({
                            scrollTop: $("#folyamat_tabok").offset().top - 20
                        }, 1000);
                    }
                }
            }



            if (!voltclick)
            {
                voltclick = true;
                if (window.location.hash == "#piaci-kamatozasu-lakashitel") {
                    $(".js-select-piaci").trigger("click");
                } else if (window.location.hash == "#szabadfelhasznalasu-jelzalog-hitel-kalkulator") {
                    $(".js-select-szabfel").trigger("click");
                } else if (window.location.hash == "#lakashitel-maximum-kalkulator") {
                    $(".js-select-max").trigger("click");
                }
            }




            if ($.cookie("hitelosszeg")) {
                $("#hitelosszeg_slider_data").data("defaultvalue", GSC.unformatNumber($.cookie("hitelosszeg")));
                $("#hitelosszeg").val(GSC.formatNumber($.cookie("hitelosszeg")));


            }
            if ($.cookie("futamido")) {
                $("#futamido_slider_data").data("defaultvalue", GSC.unformatNumber($.cookie("futamido")));
                $("#futamido").val(GSC.unformatNumber($.cookie("futamido")));
            }


            if (typeof (GSC.getUrlParameter('params')) !== 'undefined') {
                var params = GSC.getUrlParameter('params');
                var res = params.split("__");


                var r = null;
                for (i in res) {
                    r = res[i].split("_");
                    if (r[0] == 'periodus') {

                        if (r[1] == "10ev") {
                            $("#10ev").prop('checked', true);
                            $("#10ev").trigger("click");
                            $("#10ev_label").trigger("click");
                        } else if (r[1] == "20ev") {

                            $("#20ev").prop('checked', true);
                            $("#20ev").trigger("click");
                            $("#20ev_label").trigger("click");
                        }

                    }

                    if (r[0] == 'khr') {

                        if (r[1] == 1) {
                            $("#bar_igen").prop('checked', true);
                            $("#bar_igen").trigger("click");
                        } else if (r[1] == 0) {

                            $("#bar_nem").prop('checked', true);
                            $("#bar_nem").trigger("click");
                        }

                    }

                }
            }

            // App.calc();


        },
        scrollTo: function (tipus, i) {



            if (!$("#gyik_" + tipus + "_" + i).hasClass("ui-state-active"))
            {
                $("#gyik_" + tipus + "_" + i).trigger("click");
            }


            $(".gyik_search_cont").removeClass("gyik_search_act");

            $('#gyik_' + tipus + '_' + i+' button[type="button"]').trigger("click");
            setTimeout(
                    function ()
                    {
                        $('html, body').animate({
                            scrollTop: $("#gyik_" + tipus + "_" + i).offset().top - 70
                        }, 1000, function () {

                        });

                    }, 500);

        },
        closeInfoLayer: function (t) {
            clearTimeout(infoTimer);
            $(t).parent().removeClass("info_icon_layer_act");
        },
        initEvents: function () {


            $("input[name='kamatperiodus']").on('click', function () {
                
                 if ($(this).is(':checked'))
                 {
                 periodusClick = 1;
                 periodus = $(this).data("id");
                 $.cookie("periodus", periodus, { expires : 10 });
                 App.initLimits();


                 if (periodus==3){ // 10 éves

                     $("#futamido_slider_data").data("maxvalue", 20);


                     if (tipus=="szabad_felh"){
                         $("#futamido_slider_data").data("minvalue", 6);
                         $("#min_futamido").html("6 év");
                         $("#max_futamido").html("20 év");

                     }
                     else {
                         if (uFutamido < 10) {
                             uFutamido = 10;
                         }
                         $("#futamido_slider_data").data("minvalue", 10);
                         $("#min_futamido").html("10 év");
                         $("#max_futamido").html("30 év");


                         $("#kedv_box_babavaro_szabfel").hide();
                         $("#piaci_kedvezmenyek_div").show();
                         $("#kedv_box_babavaro").show();


                         if ($("body").hasClass("content_minositett_act")) {
                             $("#kedv_box_paros").show();
                         }

                     }

                     $('.js-futamido-slider .slider').slider('option', 'min', $("#futamido_slider_data").data("minvalue"));
                     $("#futamido_slider_data").data("dafaultvalue", uFutamido);
                     $("#futamido_slider_data").val(uFutamido);

                     $("#futamido_slider_data").data("dafaultvalue", uFutamido);
                     $("#futamido_slider_data").val(uFutamido);



                 }
                 else{
                     if (periodus==7){ // 20 éves
                         $("#futamido_slider_data").data("minvalue", 20);
                         $("#futamido_slider_data").data("maxvalue", 20);
                         $("#futamido_slider_data").data("dafaultvalue", uFutamido);
                         $("#futamido_slider_data").val(uFutamido);

                         $("#min_futamido").html("20 év");
                         $("#max_futamido").html("20 év");

                         $("#kedv_box_babavaro_szabfel").show();
                         $("#piaci_kedvezmenyek_div").hide();

                         console.log("tipus "+tipus);
                         if ($("body").hasClass("content_minositett_act")) {
                             $("#kedv_box_paros").hide();
                         }
                         else{
                             $("#kedv_box_babavaro").hide();
                         }






                     }
                 }

                      // sliderReset();
                     $("#hitelosszeg").val(GSC.formatNumber($('.js-hitelosszeg-slider .slider').slider('option', 'value')));
                     $("#futamido_2").html(GSC.formatNumber($("#futamido").val())+" év");
                 App.calc();
                 }
                 
            });


        },

        formatInputValue: function () {

            $(".js-format-number").on('keyup', function () {

                var v = 0;
                v = GSC.unformatNumber($(this).val());
                $(this).val(GSC.formatNumber(v));

            });


        },

        initLimits: function () {

            /*
             periodus
             2 6 havi
             1 5 éves
             3 10 éves
             5 15 éves
             */


            if (uFutamido == 0)
            {
                uFutamido = 15;
            }
            if (uHitelosszeg == 0)
            {
                if (!voltHitelosszegModositas) {
                    uHitelosszeg = 5400000;
                }
                else{
                    uHitelosszeg = GSC.unformatNumber($("#hitelosszeg").val());
                }
            }

            if (voltHitelosszegModositas) {
                uHitelosszeg = GSC.unformatNumber($("#hitelosszeg").val());
            }


            if ($.cookie("hitelosszeg")) {
                $("#hitelosszeg_slider_data").data("defaultvalue", GSC.unformatNumber($.cookie("hitelosszeg")));
                $("#hitelosszeg").val(GSC.formatNumber($.cookie("hitelosszeg")));
                uHitelosszeg=GSC.unformatNumber($.cookie("hitelosszeg"));

            }
            if ($.cookie("futamido")) {
                $("#futamido_slider_data").data("defaultvalue", GSC.unformatNumber($.cookie("futamido")));
                $("#futamido").val(GSC.unformatNumber($.cookie("futamido")));
                uFutamido=GSC.unformatNumber($.cookie("futamido"));
            }


            if (hitelTipus == "jelzalog")
            {
                tipus = 'piaci';
                conf = calcConf['piaci'];

                console.log(hitelTipus);
                // $("#union_biztositas").css("display", "none");

                // $("#15ev").css("display", "block");
                $("#15ev_label").css("display", "block");
                $("#jelzalog_repi").css("display", "block");
                $("#szabfel_repi").css("display", "none");

                if (periodus==1){
                    periodus=3;
                }

                switch (periodus)
                {
                    case 2: // 6 havi



                        $("#futamido").data("minvalue", 4);
                        $("#futamido").data("maxvalue", 30);
                        $("#futamido").data("dafaultvalue", uFutamido);
                        // $(".kedvezmeny_box").removeClass("kedvezmeny_box_act");
                        $(".js-kedvezmeny").prop('checked', false);
                        $("#kedvezmeny_jovairas").prop('checked', true);
                        $("#periodus_desktop").html("Kamat (6 hónapig fix)");
                        $("#kedv_box_babavaro").css("display", "none");
                        $("#kedv_biztositas").css("display", "none");
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");

                        break;
                    case 3: // 10 éves

                        $("#futamido_slider_data").data("minvalue", 10);
                        $("#futamido_slider_data").data("maxvalue", 30);
                        $("#futamido_slider_data").data("defaultvalue", uFutamido);

                        $("#futamido").data("minvalue", 10);
                        $("#futamido").data("maxvalue", 30);
                        $("#futamido").data("dafaultvalue", uFutamido);
                        $("#futamido").val(uFutamido);
                        // $(".kedvezmeny_box").addClass("kedvezmeny_box_act");
                        $("#kedvezmeny_jovairas").prop('checked', true);
                        $("#periodus_desktop").html("Kamat (10 évig fix)");
                        if (hitelTipus!="jelzalog") {
                            $("#kedv_box_babavaro").css("display", "block");
                        }
                        $("#kedv_biztositas").css("display", "block");
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");
                        break;
                    case 7: // 20 éves
                        uFutamido=20;
                        $("#futamido_slider_data").data("minvalue", 20);
                        $("#futamido_slider_data").data("maxvalue", 20);
                        $("#futamido_slider_data").data("defaultvalue", uFutamido);

                        $("#futamido").data("minvalue", 20);
                        $("#futamido").data("maxvalue", 20);
                        $("#futamido").data("dafaultvalue", uFutamido);
                        $("#futamido").val(uFutamido);
                        // $(".kedvezmeny_box").addClass("kedvezmeny_box_act");
                        $("#kedvezmeny_jovairas").prop('checked', true);
                        $("#periodus_desktop").html("Kamat (20 évig fix)");
                        $("#kedv_box_babavaro").css("display", "block");
                        $("#kedv_biztositas").css("display", "block");
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");
                        break;
                    case 5: // 15 éves
                        $("#futamido").data("minvalue", 15);
                        $("#futamido").data("maxvalue", 15);
                        $("#futamido").data("dafaultvalue", uFutamido);
                        // $(".kedvezmeny_box").addClass("kedvezmeny_box_act");
                        $("#kedvezmeny_jovairas").prop('checked', true);
                        $("#periodus_desktop").html("Kamat (15 évig fix)");
                        $("#kedv_box_babavaro").css("display", "block");
                        $("#kedv_biztositas").css("display", "block");
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");
                        break;
                    case 1: // 5 éves
                    default:
                        $("#futamido").data("minvalue", 5);
                        $("#futamido").data("maxvalue", 30);
                        $("#futamido").data("dafaultvalue", uFutamido);
                        // $(".kedvezmeny_box").addClass("kedvezmeny_box_act");
                        $("#kedvezmeny_jovairas").prop('checked', true);
                        $("#periodus_desktop").html("Kamat (5 évig fix)");
                        $("#kedv_box_babavaro").css("display", "block");
                        $("#kedv_biztositas").css("display", "block");
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");
                        break;
                }


                $("#futamido").data("step", 1);


                $("#hitelosszeg").data("minvalue", 4000000);
                $("#hitelosszeg").data("maxvalue", 150000000);



                $("#hitelosszeg").val(GSC.formatNumber(uHitelosszeg));
                $("#hitelosszeg").data("dafaultvalue", uHitelosszeg);
                if (jQuery.browser.mobile)
                {
                    $("#hitelosszeg").data("step", 500000);
                }
                else{
                    $("#hitelosszeg").data("step", 100000);
                }



            } else if (hitelTipus == "szabadfelhasznalasu")
            {
                console.log(hitelTipus);
                // $(".kedvezmeny_box").removeClass("kedvezmeny_box_act");
                $("#kedv_box_babavaro").css("display", "none");
                // $("#kedv_biztositas").css("display", "none");
                $("#kedv_biztositas").css("display", "block");

                $("#union_biztositas").css("display", "block");
                $(".js-kedvezmeny").prop('checked', false);
                $("#kedvezmeny_jovairas").prop('checked', true);
                // $("#15ev").css("display", "none");
                $("#15ev_label").css("display", "none");

                $("#jelzalog_repi").css("display", "none");
                $("#szabfel_repi").css("display", "block");

                tipus = 'szabad_felh';
                conf = calcConf['szabad_felh'];

                $("#futamido").data("minvalue", 5);
                $("#futamido").data("maxvalue", 30);
                $("#futamido").data("dafaultvalue", 15);

                switch (periodus)
                {
                    case 2: // 6 havi
                        $("#futamido").data("minvalue", 4);
                        $("#futamido").data("maxvalue", 20);
                        $("#futamido").data("dafaultvalue", uFutamido);
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");
                        $("#periodus_desktop").html("Kamat (6 hónapig fix)");
                        break;
                    case 3: // 10 éves
                        $("#futamido").data("minvalue", 5);
                        $("#futamido").data("maxvalue", 20);
                        $("#futamido").data("dafaultvalue", uFutamido);
                        $("#periodus_desktop").html("Kamat (10 évig fix)");
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");
                        break;

                    case 1: // 5 éves
                    default:
                        $("#futamido").data("minvalue", 5);
                        $("#futamido").data("maxvalue", 20);
                        $("#futamido_2").html(GSC.formatNumber(uFutamido)+" év");
                        $("#futamido").data("dafaultvalue", uFutamido);
                        $("#periodus_desktop").html("Kamat (5 évig fix)");
                        break;
                }

                $("#futamido").data("step", 1);


                $("#hitelosszeg").data("minvalue", 4000000);
                $("#hitelosszeg").data("maxvalue", 75000000);
                $("#hitelosszeg").data("dafaultvalue", uHitelosszeg);
                $("#hitelosszeg").data("step", 100000);


            }

            if (typeof (GSC.getUrlParameter('jovairas')) !== 'undefined')
            {
                if (GSC.getUrlParameter('jovairas')==1){
                    $("#kedvezmeny_jovairas").prop('checked', true);
                }
                else if (GSC.getUrlParameter('jovairas')==0){
                    $("#kedvezmeny_jovairas").prop('checked', false);
                }
            }
            else{
                if (jovairas_param==0){
                    $("#kedvezmeny_jovairas").prop('checked', false);
                }
            }

            periodusClick=0;


                sliderReset();

            // App.initSliders();
            App.initChecker();
        },

        setJovedelem: function () {
            var v = 0;
            var hiba = "";
            v = GSC.unformatNumber($("#jovedelem").val());

            if (v < 175000)
            {
                var hiba = "A hiteligényléshez minimum 175 000 ft jövedelem szükséges.";
            }

            if (hiba != "")
            {
                $(this).parent().addClass('input_error');
                $(this).closest("div").find('.input_error_txt').html(hiba);
                $(this).closest("div").find('.input_error_txt').css("display", "block");
            } else
            {
                $(this).parent().removeClass('input_error');
                $(this).closest("div").find('.input_error_txt').html("");
                $(this).closest("div").find('.input_error_txt').css("display", "none");
                $.cookie("jovedelem", v, { expires : 10 });
            }


            App.calc();
            App.sliderBubi(GSC.unformatNumber($("#hitelosszeg").val()));
        },

        setHitelosszeg: function () {

            voltHitelosszegModositas=true;
            var v = 0;
            var hiba = "";
            v = GSC.unformatNumber($("#hitelosszeg").val());

            if (v < $(this).data("minvalue"))
            {
                var hiba = "A hitelösszeg minimum " + GSC.convertNumberToMillion($("#hitelosszeg").data("minvalue")) + " millió forint lehet.";
            }
            if (v > $("#hitelosszeg").data("maxvalue"))
            {
                var hiba = "A hitelösszeg maximum " + GSC.convertNumberToMillion($("#hitelosszeg").data("maxvalue")) + " millió forint lehet.";
            }


            if (hiba != "")
            {
                $("#hitelosszeg").parent().addClass('input_error');
                $("#hitelosszeg").closest("div").find('.input_error_txt').html(hiba);
                $("#hitelosszeg").closest("div").find('.input_error_txt').css("display", "block");
            } else
            {
                $("#hitelosszeg").parent().removeClass('input_error');
                $("#hitelosszeg").closest("div").find('.input_error_txt').html("");
                $("#hitelosszeg").closest("div").find('.input_error_txt').css("display", "none");

                $("#hitelosszeg_desktop").html(GSC.formatNumber(GSC.unformatNumber($("#hitelosszeg").val())));
                $("#hitelosszeg_mobil").html(GSC.convertNumberToMillion(GSC.unformatNumber($("#hitelosszeg").val())) + " M");

                $("#hitelosszeg_2").html(GSC.formatNumber(GSC.unformatNumber($("#hitelosszeg").val())));

                $('.js-hitelosszeg-slider .slider').slider('option', 'value', GSC.unformatNumber($("#hitelosszeg").val()));

                $(".js-hitelosszeg-slider").slider('value', v);
                var handle = $("#hitelosszeg_slider_val");
                handle.text(GSC.convertNumberToMillion(v) + " M");
                $.cookie("hitelosszeg", v, { expires : 10 });
            }

            App.calc();
        },
        initChecker: function () {


            $("#jovedelem").on('blur', function () {
                App.setJovedelem();
            });
            $("#jovedelem").on('keypress', function (e) {
                if (e.keyCode == 13)
                {
                    App.setJovedelem();
                }
            });

            $("#hitelosszeg").on('blur', function () {
                App.setHitelosszeg();
            });

            $("#hitelosszeg").on('keypress', function (e) {
                if (e.keyCode == 13)
                {
                    App.setHitelosszeg();
                }
            });






            $("#futamido").on('blur', function () {
                App.futamidoChange();
            });

            $("#futamido").on('keypress', function (e) {
                if (e.keyCode == 13)
                {
                    App.futamidoChange();
                }
            });

        },
        futamidoChange: function ()
        {



            var v = 0;
            var hiba = "";
            v = GSC.unformatNumber($("#futamido").val());

            if (v < $("#futamido").data("minvalue"))
            {
                $("#futamido").val($("#futamido").data("minvalue"));
            }
            if (v > $("#futamido").data("maxvalue"))
            {
                $("#futamido").val($("#futamido").data("maxvalue"));
            }

            $("#futamido_2").html(GSC.formatNumber($("#futamido").val())+" év");

            v = GSC.unformatNumber($("#futamido").val());

            $.cookie("futamido", v, { expires : 10 });
            $("#futamido_eredmeny").html(v);
            /*
            $(".js-futamido-slider").slider('value', v);
            var handle = $("#futamido_slider_val");
            handle.text(v + " év");
*/


            App.calc();
        },
        initSliders: function () {
return false;

            if (periodusClick == 0)
            {

                $("#min_hitelosszeg").html(GSC.convertNumberToMillion($("#hitelosszeg").data("minvalue")) + " M Ft");

                $("#max_hitelosszeg").html(GSC.convertNumberToMillion($("#hitelosszeg").data("maxvalue")) + " M Ft");


                $("#hitelosszeg").data("dafaultvalue", GSC.unformatNumber($("#hitelosszeg").val()));


                var handle = $("#hitelosszeg_slider_val");

                /*
                $(".js-hitelosszeg-slider").slider({
                    range: "max",
                    min: $("#hitelosszeg").data("minvalue"),
                    max: $("#hitelosszeg").data("maxvalue"),
                    value: $("#hitelosszeg").data("dafaultvalue"),
                    step: $("#hitelosszeg").data("step"),
                    create: function () {
                        handle.text(GSC.convertNumberToMillion($(this).slider("value")) + " M");

                        $("#hitelosszeg_desktop").html(GSC.formatNumber($(this).slider("value")));
                        $("#hitelosszeg_mobil").html(GSC.convertNumberToMillion($(this).slider("value")) + " M");
                        $("#hitelosszeg_2").html(GSC.formatNumber($(this).slider("value")));


                        $("#hitelosszeg").val(GSC.formatNumber($(this).slider("value")));
                        App.sliderBubi($(this).slider("value"));
                        $.cookie("hitelosszeg", GSC.unformatNumber($(this).slider("value")), { expires : 10 });
                        App.calc();
                    },
                    slide: function (event, ui) {
                        voltHitelosszegModositas=true;
                        $(".slider_info_item").css("display", "none");
                        handle.text(GSC.convertNumberToMillion(ui.value) + " M");

                        $("#hitelosszeg_desktop").html(GSC.formatNumber(ui.value));
                        $("#hitelosszeg_mobil").html(GSC.convertNumberToMillion(ui.value) + " M");
                        $("#hitelosszeg_2").html(GSC.formatNumber(ui.value));
                        $("#hitelosszeg").val(GSC.formatNumber(ui.value));
                        App.calc();
                        $(".slider_info_item").trigger("mouseout");
                        $.cookie("hitelosszeg", GSC.unformatNumber(ui.value), { expires : 10 });

                        // App.sliderBubi(ui.value);
                    },
                    stop: function (event, ui) {

                        App.sliderBubi(ui.value);

                        clearTimeout(sliderTimer);
                        var sliderTimer = setTimeout(function () {
                            // Kalk.szamol();
                        }, 200);
                    }
                });

                $(".js-hitelosszeg-slider").slider("option", "value", GSC.unformatNumber($("#hitelosszeg").data("dafaultvalue")));


                $("#hitelosszeg_desktop").html(GSC.formatNumber($("#hitelosszeg").data("dafaultvalue")));
                $("#hitelosszeg_mobil").html(GSC.convertNumberToMillion($("#hitelosszeg").data("dafaultvalue")) + " M");
                $("#hitelosszeg").val(GSC.formatNumber($("#hitelosszeg").data("dafaultvalue")));
                $("#hitelosszeg_2").html(GSC.formatNumber($("#hitelosszeg").data("dafaultvalue")));

                $("#hitelosszeg_slider_val").html(GSC.convertNumberToMillion($("#hitelosszeg").data("dafaultvalue")) + " M");
                App.sliderBubi(GSC.unformatNumber($("#hitelosszeg").val()));
*/
            }


            $("#min_futamido").html(GSC.formatNumber($("#futamido").data("minvalue")) + " év");
            $("#max_futamido").html(GSC.formatNumber($("#futamido").data("maxvalue")) + " év");


            var defv = $("#futamido").data("dafaultvalue");

            if (periodusClick == 1)
            {
                if (($("#futamido").val() >= $("#futamido").data("minvalue")) && ($("#futamido").val() <= $("#futamido").data("maxvalue")))
                {
                    defv = $("#futamido").val();
                }
            }


            // var handle2 = $("#futamido_slider_val");

            /*
            $(".js-futamido-slider").slider({
                range: "max",
                min: $("#futamido").data("minvalue"),
                max: $("#futamido").data("maxvalue"),
                value: defv,
                step: $("#futamido").data("step"),
                create: function () {
                    handle2.text($(this).slider("value") + " év");
                    $("#futamido_eredmeny").html($(this).slider("value"));
                    $("#futamido").val(GSC.formatNumber($(this).slider("value")));
                    $("#futamido_2").html(GSC.formatNumber($(this).slider("value"))+" év");

                    $.cookie("futamido", GSC.unformatNumber($(this).slider("value")), { expires : 10 });

                    App.calc();
                },
                slide: function (event, ui) {
                    handle2.text(ui.value + " év");
                    $("#futamido_eredmeny").html(ui.value);
                    $("#futamido").val(GSC.formatNumber(ui.value));
                    $("#futamido_2").html(GSC.formatNumber(ui.value)+" év");



                    $.cookie("futamido", GSC.unformatNumber(ui.value), { expires : 10 });
                    App.calc();
                },
                stop: function (event, ui) {
                    clearTimeout(sliderTimer);
                    var sliderTimer = setTimeout(function () {
                        // Kalk.szamol();
                    }, 200);
                }
            });

            $(".js-futamido-slider").slider("option", "min", $("#futamido").data("minvalue"));
            $(".js-futamido-slider").slider("option", "max", $("#futamido").data("maxvalue"));
            $("#futamido").val(GSC.unformatNumber($(".js-futamido-slider").slider("value")));
            $(".js-futamido-slider").slider("option", "value", GSC.unformatNumber(defv));
            $("#futamido_eredmeny").html(defv);
            $("#futamido_slider_val").html(defv + " év");
            */
        },

        sliderBubi: function (aktval)
        {
            $(".slider_info_item").css("display", "none");
            var min = $("#hitelosszeg").data("minvalue");
            var max = $("#hitelosszeg").data("maxvalue");

            var v = GSC.unformatNumber(aktval);
            // var c= (v*1)-(min*1);

            var c = (v * 1);

            // var c= (v*1);

            var sz = Math.round((c / ((max + (min * 2)) / 100)));


            var jovedelem_kategoria = 0;
            var kamat1 = 0;
            var kamat2 = 0;

            // if ((ui.value>=4500000) && (ui.value<5000000))

            if ((aktval >= 4500000) && (aktval < 5000000))
            {
                jovedelem_kategoria = App.jovedelemKategoria(GSC.unformatNumber($("#jovedelem").val()));
                kamat1 = App.haviKamat(1, periodus, jovedelem_kategoria, true, aktval);
                kamat2 = App.haviKamat(1, periodus, jovedelem_kategoria, true, 5100000);
                if (kamat1 > kamat2)
                {
                    $(".slider_info_item").css("display", "block");
                    $(".slider_info_item").css("left", sz + "%");
                    $(".slider_info_item").attr("title", "5M Ft hitelösszeg esetén kedvezőbb kamatot biztosítunk!");
                    $(".slider_info_item").trigger("mouseover");
                }
            }

            if ((aktval >= 9000000) && (aktval < 10000000))
            {
                jovedelem_kategoria = App.jovedelemKategoria(GSC.unformatNumber($("#jovedelem").val()));
                kamat1 = App.haviKamat(1, periodus, jovedelem_kategoria, true, aktval);
                kamat2 = App.haviKamat(1, periodus, jovedelem_kategoria, true, 11000000);
                if (kamat1 > kamat2)
                {
                    $(".slider_info_item").css("display", "block");
                    $(".slider_info_item").css("left", sz + "%");
                    $(".slider_info_item").attr("title", "10M Ft hitelösszeg esetén kedvezőbb kamatot biztosítunk!");
                    $(".slider_info_item").trigger("mouseover");
                }
            }

            if ((aktval >= 19000000) && (aktval < 20000000))
            {
                jovedelem_kategoria = App.jovedelemKategoria(GSC.unformatNumber($("#jovedelem").val()));
                kamat1 = App.haviKamat(1, periodus, jovedelem_kategoria, true, aktval);
                kamat2 = App.haviKamat(1, periodus, jovedelem_kategoria, true, 21000000);
                if (kamat1 > kamat2)
                {
                    $(".slider_info_item").css("display", "block");
                    $(".slider_info_item").css("left", sz + "%");
                    $(".slider_info_item").attr("title", "20M Ft hitelösszeg esetén kedvezőbb kamatot biztosítunk!");
                    $(".slider_info_item").trigger("mouseover");
                }
            }

            if ((aktval >= 29000000) && (aktval < 30000000))
            {
                jovedelem_kategoria = App.jovedelemKategoria(GSC.unformatNumber($("#jovedelem").val()));
                kamat1 = App.haviKamat(1, periodus, jovedelem_kategoria, true, aktval);
                kamat2 = App.haviKamat(1, periodus, jovedelem_kategoria, true, 31000000);
                if (kamat1 > kamat2)
                {
                    $(".slider_info_item").css("display", "block");
                    $(".slider_info_item").css("left", sz + "%");
                    $(".slider_info_item").attr("title", "30M Ft hitelösszeg esetén kedvezőbb kamatot biztosítunk!");
                    $(".slider_info_item").trigger("mouseover");
                }
            }


            // slider_info_item

        },
        kaphathitelt: function ()
        {
            if (GSC.unformatNumber($("#jovedelem").val()) < 100000)
            {
                return false;
            }
            return true;
        },
        kellSzamolni: function ()
        {

            if (GSC.unformatNumber($("#jovedelem").val()) < $("#jovedelem").data("minvalue"))
            {
                return false;
            }
            if (GSC.unformatNumber($("#hitelosszeg").val()) < $("#hitelosszeg").data("minvalue"))
            {
                return false;
            }
            if (GSC.unformatNumber($("#hitelosszeg").val()) > $("#hitelosszeg").data("maxvalue"))
            {
                return false;
            }
            return true;
        },
        osszegez: function (kulcs)
        {
            teljesOsszeg = 0;
            ertekek = conf[kulcs];
            for (var i in ertekek) {
                teljesOsszeg += ertekek[i];
            }


            return teljesOsszeg;
        },
        haviKamat: function (i, periodus, jovedelem_kategoria, teljes, eredetiHitelOsszeg)
        {
            periodus = periodus || 2;
            ret = 0;


            if (tipus == 'piaci') {
                if ((eredetiHitelOsszeg >= 30000000) && (conf['kamatok'][periodus]['30000000'] != undefined)) {
                    ret = conf['kamatok'][periodus]['30000000'][jovedelem_kategoria];
                } else if ((eredetiHitelOsszeg >= 10000000) && (conf['kamatok'][periodus]['10000000_29999999'] != undefined)) {
                    ret = conf['kamatok'][periodus]['10000000_29999999'][jovedelem_kategoria];
                } else if ((eredetiHitelOsszeg >= 4000000) && (conf['kamatok'][periodus]['4000000_9999999'] != undefined)) {
                    ret = conf['kamatok'][periodus]['4000000_9999999'][jovedelem_kategoria];
                } else {
                    ret = conf['kamatok'][periodus]['4000000_9999999'][jovedelem_kategoria];
                }
            }
            else{
                if ((eredetiHitelOsszeg >= 20000000) && (conf['kamatok'][periodus]['20000000'] != undefined)) {
                    ret = conf['kamatok'][periodus]['20000000'][jovedelem_kategoria];
                } else if ((eredetiHitelOsszeg >= 10000000) && (conf['kamatok'][periodus]['10000000_19999999'] != undefined)) {
                    ret = conf['kamatok'][periodus]['10000000_19999999'][jovedelem_kategoria];
                } else if ((eredetiHitelOsszeg >= 4000000) && (conf['kamatok'][periodus]['4000000_9999999'] != undefined)) {
                    ret = conf['kamatok'][periodus]['4000000_9999999'][jovedelem_kategoria];
                } else {
                    ret = conf['kamatok'][periodus]['4000000_9999999'][jovedelem_kategoria];
                }
            }


            if ($("#kedvezmeny_jovairas").is(':checked'))
            {
                // ret=ret- ;
            }
            if ($("#kedvezmeny_babavaro").is(':checked'))
            {
                ret = ret - 0.2;
            }
            if ($("#kedvezmeny_babavaro_szabfel").is(':checked'))
            {
                ret = ret - 0.2;
            }
            if ($("#kedvezmeny_biztositas").is(':checked'))
            {
                ret = ret - 0.2;
            }
            if ($("#union_biztositas_check").is(':checked'))
            {
                ret = ret - 0.1;
            }


            if (tipus == 'piaci') {
                if ($("#kedvezmeny_paros").is(':checked')) {

                    var jovedelem=GSC.unformatNumber($("#jovedelem").val());
                    if (jovedelem<400000)
                    {
                        ret = 6.59;
                    }
                    else if (jovedelem>=400000){
                        ret = 6.14;
                    }
                }
            }

            if (teljes) {

            } else {
                ret = ret / 100;
            }

            return ret;
        },

        isArray: function (object)
        {
            if (object.constructor === Array)
                return true;
            else
                return false;
        },
        jovedelemKategoria: function (jovedelem)
        {
            jov = GSC.unformatNumber($("#jovedelem").val());

            if (jov <= 199999)
            {
                jovedelem_kategoria = 4;
            } else if (jov <= 399999)
            {
                jovedelem_kategoria = 3;
            } else if (jov <= 799999)
            {
                jovedelem_kategoria = 2;
            } else if (jov >= 800000)
            {
                jovedelem_kategoria = 1;
            }

            return jovedelem_kategoria;

        },
        calc: function ()
        {

            var jov = 0;

            var jovedelem_kategoria = 0;

            jov = GSC.unformatNumber($("#jovedelem").val());
            jovedelem_kategoria = this.jovedelemKategoria(jov);


            if (!$("#kedvezmeny_jovairas").is(':checked'))
            {

                // if (hitelTipus == "jelzalog")
                {
                    jovedelem_kategoria = 5;
                }
            }


            if (this.kellSzamolni())
            {


                if (this.kaphathitelt())
                {

                    var honapok = $("#futamido").val() * 12;



                    var hitelOsszeg = GSC.unformatNumber($("#hitelosszeg").val());
                    var eredetiHitelOsszeg = 0;

                    var tamogatas = 0;
                    var fizetendo = 0;
                    var haviKoltseg = 0;
                    var dijak = this.osszegez('dijak');
                    var koltsegek = this.osszegez('koltsegek');
                    var tamogatasAlapja = hitelOsszeg;
                    var hitelosszegeredeti = hitelOsszeg;
                    var tamogatas = 0;
                    var tamogatasSzazalek = 0;
                    var balance = hitelOsszeg;
                    var teljes_visszafizetendo_osszeg = 0;
                    var teljes_dij = 0;
                    var kamatosszeg = 0;

                    var payment = [];
                    var havifizetendo = [];
                    var havifizetendo_x = [];


                    $("#futamido_div").html(honapok + " hónap");



                    if ((tipus == 'piaci') && (periodus != 2)) {
                        koltsegek = (koltsegek * 1) + ((hitelOsszeg * 1) * 0); //FolyĂłsĂ­tĂˇsi kĂ¶ltĂ©sg (0)
                    }


                    var n_hitelOsszeg = (-1) * (hitelOsszeg);
                    var eredetiHitelOsszeg = hitelOsszeg;
                    var eredetiHitelOsszeg2 = hitelOsszeg;
                    kamat = this.haviKamat(1, periodus, jovedelem_kategoria, 0, eredetiHitelOsszeg);
                    var eredetikamat = kamat;
                    var h9 = 0;
                    var e9 = 0;
                    var l9 = 0;
                    var kamattorlesztesek = 0;

                    var pmt = Math.round(PMT(kamat / 12, honapok, n_hitelOsszeg));

                    var d9 = 0;

                    for (i = 1; i <= honapok; ++i)
                    {
                        kamat = this.haviKamat(i, periodus, jovedelem_kategoria, 0, eredetiHitelOsszeg) / 12;


                        var n_hitelOsszeg = (-1) * (hitelOsszeg);
                        var n_eredetiHitelOsszeg = (-1) * (eredetiHitelOsszeg);

                        d9 = Math.round(eredetiHitelOsszeg2 * eredetikamat * 30 / 360);


                        if (periodus == 2 && i > 60)
                        {


                            if (i == 61)
                            {
                                hitelOsszeg = balance;
                            }


                            var fizetendo = PMT(kamat, honapok - 60, -hitelOsszeg);
                            var ipmt = IPMT(kamat, i - 60, honapok - 60, -hitelOsszeg);
                            var ppmt = PPMT(kamat, i - 60, honapok - 60, -hitelOsszeg);

                        } else
                        {
                            var fizetendo = PMT(kamat, honapok, n_hitelOsszeg);
                            var ipmt = IPMT(kamat, i, honapok, n_hitelOsszeg);
                            var ppmt = PPMT(kamat, i, honapok, n_hitelOsszeg);

                        }



                        kamatosszeg += ipmt;



                        var tamogatas = tamogatasAlapja * tamogatasSzazalek;

                        if (isNaN(tamogatas))
                        {
                            tamogatas = 0;
                        }

                        if (tamogatas > ipmt) {
                            tamogatas = ipmt;
                        }

                        balance -= ppmt;



                        if (i == honapok)
                        {

                            fizetendo = eredetiHitelOsszeg2 + d9;


                            teljes_visszafizetendo_osszeg = ((pmt) * (honapok - 1)) + fizetendo + koltsegek + (dijak * honapok);


                        } else
                        {

                            eredetiHitelOsszeg2 = eredetiHitelOsszeg2 - (pmt - d9);

                        }

                        payment[i] = fizetendo - tamogatas + haviKoltseg;
                        havifizetendo[i] = Math.round(payment[i] + dijak);


                    }




                    $("#hitelosszeg_div").html(GSC.formatNumber(GSC.unformatNumber($("#hitelosszeg").val())) + " Ft");
                    $("#hitelosszeg_desktop").html(GSC.formatNumber(GSC.unformatNumber($("#hitelosszeg").val())));
                    $("#hitelosszeg_2").html(GSC.formatNumber(GSC.unformatNumber($("#hitelosszeg").val()))+" Ft");

                    var a= GSC.unformatNumber($("#hitelosszeg").val());
                    var b= a/1000000;
                    b=b.toFixed(1);
                    $('#havi_torleszto_mobil').html(GSC.formatNumber(b)+" M");

                    kamat = this.haviKamat(i, periodus, jovedelem_kategoria, 1, eredetiHitelOsszeg);

                    var kamatString = "";
                    kamatString = kamat + " ";
                    kamatString = kamatString.replace(".", ",");
                    kamatString = kamatString.replace(" ", "");
                    $("#kamat_div").html(kamatString + "%");
                    $("#kamat_2").html(kamatString + "%");

                    hatodikEvtolFizetendo = havifizetendo[61] - dijak;
                    elsoHaviReszlet = havifizetendo[1] - dijak;
//                 elsoHaviReszlet = havifizetendo[1];


                    elsoHaviReszlet_ = elsoHaviReszlet;

                    $('#havi_torleszto').html(GSC.formatNumber(elsoHaviReszlet));
                    $('#havi_torleszto_2').html(GSC.formatNumber(elsoHaviReszlet)+" Ft");


                    $('#havi_torleszto_mobil').html(GSC.formatNumber(Math.round(elsoHaviReszlet / 1000)) + " e");

                    havifizetendo[0] = -eredetiHitelOsszeg + koltsegek * 1;

                    var thm = (Math.pow(IRR2(havifizetendo, 0.01) + 1, 12) - 1) * 100;


                    var thm_s = "";

                    thm_s = thm;



                    
                    thm=thm.toFixed(12)



                    if ((tipus == "piaci") && ((thm == 5.477082623578) ))
                    {
                        thm = 5.48;
                    } else if ((tipus == "piaci") && ((thm == 5.0276182358375054) || (thm == 5.02761823583775)))
                    {
                        thm = 5.03;
                    } else if ((tipus == "piaci") && (thm == 4.73594332024172))
                    {
                        thm = 4.74;
                    } else if ((tipus == "piaci") && (thm == 5.278256289544))
                    {
                        thm = 5.28;
                    }else if ((tipus == "piaci") && (thm == 4.7567593555202015))
                    {
                        thm = 4.76;
                    } else
                    {


                        thm_s += " ";
                        var res = thm_s.split(".");
                        var tizedes = 4;
                        if ((eredetiHitelOsszeg == 5000000) && (tipus == "piaci") && (periodus == 2))
                        {
                            tizedes = 2;
                        }

                        if (App.isArray(res))
                        {

                            thm = res[0] + "."


                            i = 0;
                            for (ku in res[1])
                            {
                                if (i < tizedes)
                                {

                                    thm += res[1][ku];
                                } else
                                {
                                    if (tipus == "szabad_felh")
                                    {

                                        if ((res[1][ku] > 0))
                                        {
                                            thm += ((res[1][ku] * 1) - 1);
                                        }
                                    }
                                    break;

                                }
                                i++;
                            }
                        }
                    }




                    thm = thm * 1;


                    thm = thm.toFixed(2);
                    thm_s = thm;

                    thm_s = thm_s.replace(".", ",");

                    $('#thm_span').html(thm_s);
                    $('#thm_2').html(thm_s+" %");

                    var kamatString = "";
                    kamatString = kamat.toFixed(2) + " ";
                    kamatString = kamatString.replace(".", ",");
                    kamatString = kamatString.replace(" ", "");
                    $("#kamat_div").html(kamatString + "%");

                    $('#kamat').html(kamatString);

                    $("#teljes_visszafizetendo_desktop").html(GSC.formatNumber(Math.round(teljes_visszafizetendo_osszeg)));
                    $("#teljes_visszafizetendo_mobil").html(GSC.convertNumberToMillion(Math.round(teljes_visszafizetendo_osszeg)) + " M");

                    koltsegek += dijak * honapok;
                    $("#teljes_dij_megfizetett_kamatok_nelul").html(GSC.formatNumber(koltsegek) + " Ft");

                    teljes_dij = Math.round(teljes_visszafizetendo_osszeg - hitelosszegeredeti);
                    $("#teljes_dij_desktop").html(GSC.formatNumber(teljes_dij));
                    $("#teljes_dij_mobil").html(GSC.convertNumberToMillion(teljes_dij) + " M");

                    $("#teljes_visszafizetendo_2").html(GSC.formatNumber(Math.round(teljes_visszafizetendo_osszeg))+" Ft");
                    $("#teljes_dij_2").html(GSC.formatNumber(teljes_dij)+" Ft");

                    // calcData["layer_hitelosszeg"]=GSC.convertNumberToMillion(GSC.unformatNumber($("#hitelosszeg").val())) + " M";
                    calcData["layer_hitelosszeg"] = GSC.formatNumber(GSC.unformatNumber($("#hitelosszeg").val())) + "";
                    calcData["layer_futamido"] = GSC.formatNumber(GSC.unformatNumber($("#futamido").val()));
                    // calcData['layer_elso_havi']=GSC.formatNumber(Math.round(elsoHaviReszlet / 1000)) + " e";
                    calcData['layer_elso_havi'] = GSC.formatNumber(elsoHaviReszlet) + "";
                    calcData["layer_teljes_visszafizetendo"] = GSC.formatNumber(teljes_visszafizetendo_osszeg) + "";
                    // calcData["layer_teljes_visszafizetendo"]=GSC.convertNumberToMillion(teljes_visszafizetendo_osszeg) + " M";


                    calcData['layer_kamat'] = kamatString;
                    calcData['layer_thm'] = thm_s;
                    // calcData["layer_teljes_dij"]=GSC.convertNumberToMillion(teljes_dij) + " M";
                    calcData["layer_teljes_dij"] = GSC.formatNumber(teljes_dij) + "";
                    // calcData["layer_jovedelem"]=GSC.formatNumber(Math.round(GSC.unformatNumber($("#jovedelem").val())) / 1000) + " e";
                    calcData["layer_jovedelem"] = GSC.formatNumber($("#jovedelem").val()) + "";


                } else
                {




                    App.showErrorLayer('Sajnos most nem tudunk Önnek megfelelő kölcsönt nyújtani!');
                    App.clearResult();

                }
            } else
            {
                App.clearResult();


            }




        },
        clearResult: function ()
        {


            $('#layer_hitelosszeg').html("-");
            $('#layer_futamido').html("-");
            $('#layer_elso_havi').html("-");
            $('#layer_teljes_visszafizetendo').html("-");
            $('#layer_kamat').html("-");
            $('#layer_thm').html("-");
            $('#layer_teljes_dij').html("-");
            $('#layer_jovedelem').html("-");

            $('#layer_teljes_visszafizetendo_desktop').html("-");
            $('#layer_teljes_visszafizetendo_mobil').html("-");



            $('#thm_span').html("-");
            $('#kamat').html("-");
            $('#havi_torleszto').html('-');

            $("#teljes_visszafizetendo_desktop").html("-");
            $("#teljes_visszafizetendo_mobil").html("-");
            $("#teljes_dij_megfizetett_kamatok_nelkul").html("-");
            $("#teljes_dij_desktop").html("-");
            $("#teljes_dij_mobil").html("-");
            $("#hitelosszeg_desktop").html("-");
            $("#hitelosszeg_mobil").html("-");

            $("#hitelosszeg_2").html("-");
            $("#kamat_2").html("-");
            $("#havi_torleszto_2").html("-");
            $("#thm_2").html("-");
            $("#teljes_dij_2").html("-");
            $("#teljes_visszafizetendo_2").html("-");

        },
        showErrorLayer: function (uzenet)
        {
            $("#hibauzenet").html(uzenet);
            $("#hibauzenet_layer").css("display", "block");
            $("#overlay").css("display", "block");
            $("#hb").css("display", "block");
            $("#hb").center();
        },
        closeErrorLayer: function ()
        {
            $("#hibauzenet_layer").css("display", "none");
            $("#hb").css("display", "none");
            $("#overlay").css("display", "none");
        },
        send: function ()
        {







            if ($("#form_vi2").is(":visible")) {
                GSC.hiba = '';
                App.checkFormData();

                if (GSC.hiba !== "") {


                    var firstinput = null;
                    $(".inp_error").each(function () {
                        if (firstinput==null) {
                            firstinput = this;
                        }

                    });


                    if (firstinput!=null) {
                        $('#visszahivas_popup').animate({scrollTop: Math.abs($("#visszahivas_popup-1").offset().top - $(firstinput).offset().top) - 50});
                        $(firstinput).focus();
                    }


                    /*
                     $('#form_layer_form').animate({                                      
                     scrollTop: ((($(firstinput).position().top)-$('#close_form_link').position().top))
                     }, 1000);

                     */

                    //GSC.show_error_layer(GSC.hiba, 'Hibaüzenet');
                } else {

                    $(".btn_spinner").toggleClass("act");

                    if ($("#l_hitel_tipus").val() == "jelzalog")
                    {
                        var h31 = $("#layer_babavaro").html();
                        var h33 = $("#layer_biztositas").html();
                    } else
                    {
                        var h31 = "";
                        var h33 = "";
                    }

                    var pers = $("#layer_periodus").html();
                    pers = pers.replace("(", "");
                    pers = pers.replace(")", "");

                    var webfmHitelTipus=hitelTipus;
                    var webfmPeriodus="";
                    if (periodus==7){
                        webfmPeriodus="20 éves fix";
                    }
                    else if (periodus==3){
                        webfmPeriodus="10 éves";
                    }
                    var webfmHitelosszeg=calcData["layer_hitelosszeg"];
                    var webfmFutamido=calcData["layer_futamido"];
                    var webfmHaviTorleszto=calcData['layer_elso_havi'];
                    var webfmKamat=calcData['layer_kamat'];
                    var webfmThm=calcData['layer_thm'];
                    var webfmHitelTeljesDija=calcData["layer_teljes_dij"];


                    if (george==1){
                        var postData = {
                            survey_id:193161257,
                            token: $("#token").val(),
                            param: {id: 0, text: param, "inputType": "input"},
                            param2: {id: 1, text: param2, "inputType": "input"},
                            phone: {id: 2, text: GSC.getPhone("phone"), "inputType": "input"},
                            bank: {id: 3, text: $("#bank option:selected").text(), "inputType": "input"},
                            datahandler: {id: 4, text: "Elfogadva", "inputType": "input"},
                            referer: {id: 5, text: GSC.getReferer(), "inputType": "input"},
                            campaign_relevant: {id: 6, text: "1", "inputType": "input"},
                            webfmHitelTipus: {id: 7, text: webfmHitelTipus, "inputType": "input"},
                            webfmPeriodus: {id: 8, text: webfmPeriodus, "inputType": "input"},
                            webfmHitelosszeg: {id: 9, text: webfmHitelosszeg, "inputType": "input"},
                            webfmFutamido: {id: 10, text: webfmFutamido, "inputType": "input"},
                            webfmHaviTorleszto: {id: 11, text: webfmHaviTorleszto, "inputType": "input"},
                            webfmKamat: {id: 12, text: webfmKamat, "inputType": "input"},
                            webfmThm: {id: 13, text: webfmThm, "inputType": "input"},
                            webfmHitelTeljesDija: {id: 14, text: webfmHitelTeljesDija, "inputType": "input"},
                        };
                    }
                    else {

                        var paros=0;
                        if ($("#kedvezmeny_paros").is(':checked')) {
                            paros=1;
                        }

                            var postData = {
                            survey_id:506608186,
                            token: $("#token").val(),
                            name: {id: 0, text: GSC.getName("name"), "inputType": "input"},
                            szulname: {id: 1, text: 'n/a', "inputType": "input"},
                            birthplace: {id: 2, text: GSC.getBirthplace("birthplace"), "inputType": "input"},
                            birthday: {id: 3, text: $("#birthday_webfm").val(), "inputType": "input"},
                            phone: {id: 4, text: GSC.getPhone("phone"), "inputType": "input"},
                            email: {id: 5, text: GSC.getEmail("email"), "inputType": "input"},
                            bar: {id: 6, text: GSC.getSzerepelAdoslistan(), "inputType": "input"},
                            bank: {id: 7, text: $("#bank option:selected").text(), "inputType": "input"},
                            datahandler: {id: 8, text: 0, "inputType": "checkbox"},
                            referer: {id: 9, text: GSC.getReferer(), "inputType": "input"},

                            h10: {id: 10, text: "Hitel típus", "inputType": "input"},
                            h11: {id: 11, text: $("#l_hitel_tipus_nev").val(), "inputType": "input"},

                            h12: {id: 12, text: "Periódus", "inputType": "input"},
                            h13: {id: 13, text: pers, "inputType": "input"},

                            h14: {id: 14, text: "Hitelösszeg", "inputType": "input"},
                            h15: {id: 15, text: $("#layer_hitelosszeg").html(), "inputType": "input"},

                            h16: {id: 16, text: "Futamidő", "inputType": "input"},
                            h17: {id: 17, text: $("#layer_futamido").html(), "inputType": "input"},

                            h18: {id: 18, text: "Havi törlesztő", "inputType": "input"},
                            h19: {id: 19, text: $("#layer_elso_havi").html(), "inputType": "input"},

                            h20: {id: 20, text: "Teljes visszafizetendő", "inputType": "input"},
                            h21: {id: 21, text: $("#layer_teljes_visszafizetendo").html(), "inputType": "input"},

                            h22: {id: 22, text: "Kamat", "inputType": "input"},
                            h23: {id: 23, text: $("#layer_kamat").html(), "inputType": "input"},

                            h24: {id: 24, text: "THM", "inputType": "input"},
                            h25: {id: 25, text: $("#layer_thm").html(), "inputType": "input"},

                            h26: {id: 26, text: "Hitel teljes díja", "inputType": "input"},
                            h27: {id: 27, text: $("#layer_teljes_dij").html(), "inputType": "input"},

                            h28: {id: 28, text: "Erste számlára érkező jövedelem", "inputType": "input"},
                            h29: {id: 29, text: $("#layer_jovedelem").html(), "inputType": "input"},

                            h30: {id: 30, text: "Hitellel együtt Babaváró", "inputType": "input"},
                            h31: {id: 31, text: h31, "inputType": "input"},

                            h32: {id: 32, text: "Törlesztésvédelmi biztosítás", "inputType": "input"},
                            h33: {id: 33, text: h33, "inputType": "input"},
                            h34: {id: 34, text: paros, "inputType": "input"},

                        };
                    }

                    $.ajax({
                        url: "send.php",
                        type: "post",
                        data: postData,
                        dataType: "json",
                        success: function (result) {

                            if (result == null || result === "undefined" || result.error) {
                                var error = "";
                                if (result.hasOwnProperty("error")) {
                                    $(result.error).each(function (item, value) {
                                        error += "<b>" + Object.values(value)[0] + '</b><br />';
                                    });
                                }
                                $(".new_layer_overlay").addClass('active');
                                $(".unsuccess").find('.text-yellow').html(error);
                                $(".unsuccess").addClass('active');
                                GSC.close_new_error_layer_unsuccess(true);
                            } else {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                    'event': 'formSubmit',
                                    calculator: form_tipus,
                                });


                                document.location.href = "koszonjuk/index.html";
                            }
                        }
                    });





                    /*
                     App.setWebfmXMLData();
                     
                     webfminit();
                     $("#form_vi2").trigger("submit");
                     */
                }
            }

        },
        setWebfmXMLData: function () {

            // $("#referrer").val(document.location.href);
            // $('#bank_h').val($("#bank option:selected").text());
            // $('#bar_h').val(GSC.getSzerepelAdoslistan());

            $('#10_h').val("Hitel típus");
            $('#11_h').val($("#l_hitel_tipus_nev").val());



            $('#12_h').val("Periódus");
            $('#13_h').val($("#layer_periodus").html());


            $('#14_h').val("Hitelösszeg");
            $('#15_h').val($("#layer_hitelosszeg").html());

            $('#16_h').val("Futamidő");
            $('#17_h').val($("#layer_futamido").html());

            $('#18_h').val("Havi törlesztő");
            $('#19_h').val($("#layer_elso_havi").html());

            $('#20_h').val("Teljes visszafizetendő ");
            $('#21_h').val($("#layer_teljes_visszafizetendo").html());

            $('#22_h').val("Kamat ");
            $('#23_h').val($("#layer_kamat").html());

            $('#24_h').val("THM");
            $('#25_h').val($("#layer_thm").html());

            $('#26_h').val("Hitel teljes díja");
            $('#27_h').val($("#layer_teljes_dij").html());

            $('#28_h').val("Erste számlára érkező jövedelem");
            $('#29_h').val($("#layer_jovedelem").html());


            $('#30_h').val("Hitellel együtt Babaváró");

            $('#32_h').val("Törlesztésvédelmi biztosítás");

            if ($("#l_hitel_tipus").val() == "jelzalog")
            {
                $('#31_h').val($("#layer_babavaro").html());
                $('#33_h').val($("#layer_biztositas").html());
            } else
            {
                $('#31_h').val("");
                $('#33_h').val("");
            }






            // 10_h

        },
        checkFormData: function () {


            if (george==0){
                GSC.checkName("name");//1
                GSC.checkEmail("email");
                GSC.checkBirthPlace("birthplace", false);
                GSC.checkBirthDate("birthday_webfm");
                GSC.checkTaxlist("ados");
            }


            GSC.checkPhone("phone");


            GSC.checkBank("bank");
            GSC.checkDataHandling("datahandler");
        },
        startSearch: function (szo)
        {
            $("#gyik_keresendo").val(szo);
            $("#gyik_keresendo").trigger("keyup");
        },

    }
}();



$(document).ready(function () {
    App.init();
});

jQuery.fn.center = function () {
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    // this.css("left", (($(window).width() - this.outerWidth()+300) / 2) + $(window).scrollLeft() + "px");    
    this.css("left", ((($(window).width()) - (this.outerWidth() * 1)) / 2) + 300 + $(window).scrollLeft() + "px");
    return this;
}


$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};



$(window).on('scroll', function () {

    /*
    if ($('.cont_calculator').isInViewport()) {
        $(".wrapper").removeClass('btn_kalkulacio_act');

    } else {

    }


    if ($('.fcopy').isInViewport()) {
        $(".wrapper").removeClass('btn_kalkulacio_act');

    } else {

        if ($('.content_repi').isInViewport()) {
            $(".wrapper").addClass('btn_kalkulacio_act');
        }
    }

    if ($('#folyamat_tabok').isInViewport()) {

    //    $(".wrapper").addClass('btn_kalkulacio_act');

    } else {

    }


    if ($('.gyik_search').isInViewport()) {

        $(".wrapper").addClass('btn_kalkulacio_act');

    } else {

    }
*/


    /*
     if ($('#folyamat_section').isInViewport()) {
     $(".wrapper").addClass('btn_kalkulacio_act');
     $(".js-top-nav-li").removeClass("top_nav_act")
     $(".js-folyamat-link").parent().addClass("top_nav_act");
     } else {
     
     }
     */
});




function formatNumber2(e) {
    return (e = GSC.unformatNumber(e)), $.number(e, 0, ",", " ");
}

// Segédfüggvény az értékek frissítéséhez
function updateSliderValues(value, handle, isHitelOsszeg) {

    var valueText = isHitelOsszeg ?
        (value/1000000).toFixed(1) + ' M' :
        value + ' év';

    if (isHitelOsszeg) {
        $("#hitelosszeg_slider_val").html(valueText);
    }
    else{
        var years = Math.floor(value);
        var months = Math.round((value - years) * 12);

        if (months === 0) {
            valueText = years + ' év';
        } else if (years === 0) {
            valueText = months + ' hónap';
        } else {
            valueText = years + ' év ' + months + ' hónap';
        }

        $("#futamido_slider_val").html(valueText);
    }

    // ARIA értékek frissítése
    handle.attr({
        'aria-valuenow': value,
        'aria-valuetext': valueText
    });



    // Vizuális értékek frissítése
    if (isHitelOsszeg) {
        $('#hitelosszeg_slider_val').text(valueText);
        $('#hitelosszeg').val(GSC.formatNumber(value));
        $('#hitelosszeg_desktop').text(formatNumber2(value));
        $('#hitelosszeg_mobil').text(valueText);

        $("#hitel_out").val(formatNumber2($("#hitelosszeg").val()));
        $("#status_div").html("Hitelösszeg " + formatNumber2(value) + " millió forint");
        // $("#slidertext").html(formatNumber2($("#hitelosszeg").val()));

        $("#hitelosszeg_slider_val").html(valueText);

    } else {

        $('#futamido_slider_val').text(valueText);
        $('#futamido').val(value);
        $('#futamido_eredmeny').text(value);
        $('#futamido_2').html(value + ' év');
        $.cookie("futamido", value, { expires : 10 });

        $("#status_div").html("Futamidő " + value + " év");



        $("#futamido_slider_val").html(valueText);

    }

    // Élő régió frissítése a képernyőolvasónak
    var announceText = isHitelOsszeg ?
        'A választott hitelösszeg: ' + valueText :
        'A választott futamidő: ' + valueText;

    //  $('#calc-sticky-focus').attr('aria-live', 'polite').html(announceText);
}

// Akadálymentes slider inicializálás
$(".js-hitelosszeg-slider, .js-futamido-slider").each(function() {
    sliderInit(this)
});


var hasSlider=false;
function sliderReset(){
    // console.log("slider reset "+$("#futamido_slider_data").data("minvalue"));

    $('.js-futamido-slider .slider').slider('option', 'min', $("#futamido_slider_data").data("minvalue"));
    $('.js-futamido-slider .slider').slider('option', 'max', $("#futamido_slider_data").data("maxvalue"));
    $('.js-futamido-slider .slider').slider('option', 'value', $("#futamido_slider_data").data("defaultvalue"));

    /*
    $(".js-futamido-slider").each(function() {


        var $sliderElement = $(this).find('.slider');
        // Ellenőrizzük, hogy slider-e az elem
        if ($sliderElement.hasClass('ui-slider')) {
            $sliderElement.slider('destroy');
        }
        sliderInit(this);
    });
*/
}

function sliderInit(thisSlider){

    hasSlider= true;
    var $slider = $(thisSlider);
    var isHitelOsszeg = $slider.hasClass('js-hitelosszeg-slider');


    if ($.cookie("hitelosszeg")) {
        $("#hitelosszeg_slider_data").data("defaultvalue", GSC.unformatNumber($.cookie("hitelosszeg")) );
        $("#hitelosszeg").val(GSC.unformatNumber($.cookie("hitelosszeg")));

    }
    if ($.cookie("futamido")) {
        $("#futamido_slider_data").data("defaultvalue", GSC.unformatNumber($.cookie("futamido")));
        $("#futamido").val(GSC.unformatNumber($.cookie("futamido")));
    }
    var sliderConfig = {
        range: "max",
        min: isHitelOsszeg ? $("#hitelosszeg_slider_data").data("minvalue") : $("#futamido_slider_data").data("minvalue"),
        max: isHitelOsszeg ? $("#hitelosszeg_slider_data").data("maxvalue") : $("#futamido_slider_data").data("maxvalue"),
        value: isHitelOsszeg ? $("#hitelosszeg_slider_data").data("defaultvalue") : $("#futamido_slider_data").data("defaultvalue"),
        step: isHitelOsszeg ? $("#hitelosszeg_slider_data").data("step") : $("#futamido_slider_data").data("step"),



        create: function(event, ui) {

            $("#hitelosszeg").val($("#hitelosszeg").data("defaultvalue"));


            var handle = $(event.target).find('.ui-slider-handle');
            var currentValue = $(this).slider("value");

            handle.attr({
                'role': 'slider',
                'aria-label': isHitelOsszeg ? 'Hitel összege' : 'Futamidő',
                'aria-valuemin': $(this).slider("option", "min"),
                'aria-valuemax': $(this).slider("option", "max")
            });

            // Kezdeti értékek beállítása
            updateSliderValues(currentValue, handle, isHitelOsszeg);

            handle.on('keydown', function(e) {
                var value = $(event.target).slider('value');
                var step = $(event.target).slider('option', 'step');
                var newValue = value;

                var min = $slider.find('.slider').slider('option', 'min');
                var max = $slider.find('.slider').slider('option', 'max');


                switch(e.keyCode) {
                    case 37: // Bal nyíl
                    case 40: // Le nyíl
                        // newValue = value - step;
                        e.preventDefault();
                        break;
                    case 39: // Jobb nyíl
                    case 38: // Fel nyíl
                        // newValue = value + step;
                        e.preventDefault();
                        break;
                    case 36: // Home
                        newValue = $(event.target).slider('option', 'min');
                        e.preventDefault();
                        break;
                    case 35: // End
                        newValue = $(event.target).slider('option', 'max');
                        e.preventDefault();
                        break;
                    case 33: // Page Up
                        newValue = value + (step * 5);
                        e.preventDefault();
                        break;
                    case 34: // Page Down
                        newValue = value - (step * 5);
                        e.preventDefault();
                        break;
                    default:
                        return;
                }

                // Érték korlátozása a minimum és maximum között
                var min = $(event.target).slider('option', 'min');
                var max = $(event.target).slider('option', 'max');
                newValue = Math.min(Math.max(newValue, min), max);

                // Slider értékének frissítése
                $(event.target).slider('value', newValue);

                // Minden érték frissítése
                updateSliderValues(newValue, handle, isHitelOsszeg);

                // Azonnali kalkuláció frissítés
                App.calc();

                // Ha hitelösszeg slider, akkor frissítjük a buborékot is
                if (isHitelOsszeg) {
                    App.sliderBubi(newValue);
                }
            });
        },
        slide: function(event, ui) {
            var handle = $(event.target).find('.ui-slider-handle');
            updateSliderValues(ui.value, handle, isHitelOsszeg);
            App.calc();
        },
        change: function(event, ui) {
            var handle = $(event.target).find('.ui-slider-handle');
            updateSliderValues(ui.value, handle, isHitelOsszeg);
            App.calc();
        }
    };

    $slider.find('.slider').slider(sliderConfig);

    // App.calc();
}
