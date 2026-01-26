var maxFutamido = 0;
var box_index = 1;
var keresokSzama = 1;
var maxconf = null;
var torlesztesreFordithato = new Array();
var torlesztesreFordithatoResz = 0;
var jovedelem_kategoria = 0;
var jovedelem = 0;
var kamat = 0;
var meglevo_torleszto = 0;
var hitelkartya_keret = 0;
var maxvisszafizetendo = 0;
var ingatlan_erteke_80 = 0;
var max = 0;
var kat = 0;
var szamoltmar = false;
var maxCalcData = new Array();

var hibauzenet = "";

var MaxApp = function () {
    return {

        init: function () {


            $(".eredmeny_box").css("display", "none")
            MaxApp.initChecker();



            $(".js-max-elkuldom-link").on('click', function () {

                var boxid = 0;
                boxid = $(this).data("id");

                var torlesztesrefordithatomail = $("#box_" + boxid + "_max_desktop").data("torlesztesrefordithato");


                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?params=osszeg_' + GSC.unformatNumber($("#box_" + boxid + "_max_desktop").html()) + '__jov_' + GSC.unformatNumber(jovedelem) + '__torl_' + GSC.unformatNumber(torlesztesrefordithatomail) + '__mvisz_7__ido_' + $("#box_" + boxid + "_futamido_evek").html();
                $(this).attr("href", 'mailto:?subject=Befejezetlen Lakáshitel kalkuláció – Erste Bank&body=Most itt tartasz a tervezésben az Erste Bank kalkulátor oldalán. \nKattints erre a linkre és jöhet a következő lépés: ' + newurl);

            });

            $(".js-max-reprezentativ-pelda-link").on('click', function () {
                $('html, body').animate({
                    scrollTop: $("#jelzalog_repi").offset().top - 50
                }, 1000);
            });

            $(".js-keresok-szama").on('click', function () {

                if ($("#egyedul").is(':checked'))
                {
                    keresokSzama = 1;
                }
                if ($("#tobben").is(':checked'))
                {
                    keresokSzama = 2;
                }
                
                if ($("#mjovedelem").val()!="")
                {
                    $("#mjovedelem").trigger("blur");
                }

            });


            $(".js-hide-result").on('click', function () {
                $("#max_eredmeny").css("display", "none");
                $("#mennyit_button").show();
            });

            $(".ujrakalkulal").on('click', function () {
                /*
                // MaxApp.calc();
                $(".js-input-clear").val("");
                
                $(".input_error_txt").html("");
                $(".inp_item").removeClass("input_error");
                
                $(".js-keresok-szama").prop('checked', false);
                $(".js-checkbox-clear").prop('checked', false);
                $("#egyedul").prop('checked', true);
                
                $("#mennyit_button").show();
                $("#nem_tudunk_kalkulalni").css("display", "none");
                $("#ujra_button").css("display", "none");
                $("#max_eredmeny").css("display", "none");
                
                $('html, body').animate({
                    scrollTop: $('#ingatlan_erteke').offset().top - 130
                }, 1000);
                */
            });

            $(".mennyit_kaphatok").on('click', function () {
                 MaxApp.calc();
            });


            $(".js-erdekel-max").on('click', function () {

                var id = $(this).data("id");
                // console.dir(maxCalcData[id]);
                $("#l_hitel_tipus").val("jelzalog");
                $("#l_hitel_tipus_nev").val("Lakáshitel");
                
                $("#layer_hitelosszeg").html(maxCalcData[id]["layer_hitelosszeg"]);
                $("#layer_futamido").html(maxCalcData[id]["layer_futamido"]);
                $("#layer_elso_havi").html(maxCalcData[id]['layer_elso_havi']);
                $("#layer_teljes_visszafizetendo").html(maxCalcData[id]["layer_teljes_visszafizetendo"]);
                $('#layer_kamat').html(maxCalcData[id]['layer_kamat']);
                $('#layer_thm').html(maxCalcData[id]['layer_thm']);
                $("#layer_teljes_dij").html(maxCalcData[id]["layer_teljes_dij"]);
                $("#layer_jovedelem").html(maxCalcData[id]["layer_jovedelem"]);
                $("#layer_periodus").html(maxCalcData[id]["layer_periodus"]);

                form_tipus="lakashitel-hitelmaximum";

                if ($("#kedvezmeny_babavarom").is(':checked'))
                {
                    $("#layer_babavaro").html("igen");
                } else
                {
                    $("#layer_babavaro").html("nem");
                }
                if ($("#kedvezmeny_biztositasm").is(':checked'))
                {
                    $("#layer_biztositas").html("igen");
                } else
                {
                    $("#layer_biztositas").html("nem");
                }

                $("body").addClass("form_layer_act");
            });






            $(".js-erdekel-nincs-ajanlat").on('click', function () {
                
                $("#layer_hitelosszeg").html("-");
                    $("#layer_futamido").html("-");
                    $('#layer_elso_havi').html("-");
                    $("#layer_teljes_visszafizetendo").html("-");
                    $('#layer_kamat').html("-");
                    $('#layer_thm').html("-");
                    $("#layer_teljes_dij").html("-");
                    $("#layer_jovedelem").html("-");
                    $("#layer_periodus").html("-");
                    
                    $("#layer_babavaro").html("-");
                    $("#layer_biztositas").html("-");
                    
                 
                        
                         
                
                $("body").addClass("form_layer_act");
            });




            

            // MaxApp.calc();

        },

        calcLayer: function () {

            $("body").addClass("info_layer_act");
            var sliderTimer = setTimeout(function () {
                $("body").removeClass("info_layer_act");
            }, 3000);
        },
        initChecker: function () {


// folyoszamla


            $("#ingatlan_erteke").on('blur', function () {
                var v = 0;
                var hiba = "";
                v = GSC.unformatNumber($(this).val());

                if ((v * 0.8) < 4000000)
                {
                    $(this).parent().parent().addClass('input_error');
                    $("#ingatlan_erteke_error").html("Minimum 5 millió forint érékű ingatlan szükséges");
                    $("#ingatlan_erteke_error").css("display", "block");
                    hibauzenet = "Minimum 5 millió forint érékű ingatlan szükséges";
                    $("#ingatlan_erteke").attr("aria-invalid", "true");
                    return false;
                } else
                {
                    $(this).parent().parent().removeClass('input_error');
                    $("#ingatlan_erteke_error").html("");
                    $("#ingatlan_erteke_error").css("display", "none");
                    $("#ingatlan_erteke").attr("aria-invalid", "false");
                }
                if (szamoltmar)
                {
                    MaxApp.calcLayer();
                }
            });

            $("#meglevo_torleszto").on('blur', function () {


                MaxApp.torlFordithato();

                if (torlesztesreFordithato['10ev'] <= 0)
                {
                    $(this).parent().addClass('input_error');
                    $("#meglevo_torleszto_error").html("A megadott jövedelemhez képest túl nagy a törlesztőrészlet.");
                    hibauzenet = "A megadott jövedelemhez képest túl nagy a törlesztőrészlet.";
                    $("#meglevo_torleszto_error").css("display", "block");
                    $("#meglevo_torleszto").attr("aria-invalid", "true");
                    return false;
                } else
                {
                    $(this).parent().removeClass('input_error');
                    $("#meglevo_torleszto_error").html("");
                    $("#meglevo_torleszto_error").css("display", "none");
                    $("#meglevo_torleszto").attr("aria-invalid", "false");
                }


                if (szamoltmar)
                {
                    MaxApp.calcLayer();
                }


            });

            $("#kedvezmeny_jovairasm").on('change', function () {

                if (!$("#kedvezmeny_jovairasm").is(':checked'))
                {
                    $("#jovairasm").val("");
                    $("#jovairasm_div").removeClass("hidden_box_act");
                } else
                {
                    if ($("#jovairasm").val() == "")
                    {
                        $("#jovairasm").val(GSC.formatNumber($("#mjovedelem").val()));
                    }
                    $("#jovairasm_div").addClass("hidden_box_act");

                }

                if (szamoltmar)
                {
                    MaxApp.calc();
                }
            });

            $("#kedvezmeny_babavarom").on('change', function () {
                if (szamoltmar)
                {
                    MaxApp.calc();
                }
            });


            $("#kedvezmeny_biztositasm").on('change', function () {
                if (szamoltmar)
                {
                    MaxApp.calc();
                }
            });

            $("#mjovedelem").on('blur', function () {


                if (keresokSzama == 0)
                {
                    $("#egyedul").parent().addClass('input_error');
                    $("#kereso_error").html("Nem adta meg hány kereső van a háztartásban.");
                    hibauzenet = "Nem adta meg hány kereső van a háztartásban.";
                    $("#kereso_error").css("display", "block");
                    $("#mjovedelem").attr("aria-invalid", "true");
                    return false;
                } else
                {
                    $("#egyedul").parent().removeClass('input_error');
                    $("#kereso_error").html("");
                    $("#kereso_error").css("display", "none");
                    $("#mjovedelem").attr("aria-invalid", "false");
                }


                var v = 0;
                var hiba = "";
                v = GSC.unformatNumber($(this).val());
                if (v == "")
                {
                    return;
                }

                if (keresokSzama == 1)
                {
                    if (v < 193000)
                    {
                        hiba = "Minimum 193 000 ft jövedelem szükséges";
                        hibauzenet = hiba;
                    }
                } else if (keresokSzama == 2)
                {
                    if (v < 290000)
                    {
                        hiba = "Minimum 290 000 ft jövedelem szükséges";
                        hibauzenet = hiba;
                    }
                }


                if (hiba != "")
                {
                    $(this).parent().addClass('input_error');
                    $("#mjovedelem_error").html(hiba);
                    $("#mjovedelem_error").css("display", "block");

                    $("#jovairasm").val("");
                    MaxApp.hide();
                } else
                {
                    $("#nem_tudunk_kalkulalni").css("display", "none");
                    $(this).parent().removeClass('input_error');
                    $("#mjovedelem_error").html("");
                    $("#mjovedelem_error").css("display", "none");

                    if ($("#kedvezmeny_jovairasm").is(':checked'))
                    {
                        $("#jovairasm").val(GSC.formatNumber(v));
                    } else
                    {
                        $("#jovairasm").val("");
                    }
                }

                if (szamoltmar)
                {
                    MaxApp.calcLayer();
                }

            });

            $("#meletkor").on('blur', function () {

                MaxApp.meletkorBlur();
                if (szamoltmar)
                {
                    MaxApp.calcLayer();
                }
            });

        },
        meletkorBlur: function ()
        {
            var v = 0;
            var hiba = "";
            v = GSC.unformatNumber($("#meletkor").val());
            maxFutamido = 0;
            if (v < 18)
            {
                var hiba = "Hitelt kizárólag 18. életévüket betöltött személyek igényelhetnek.";
            }

            if (v >= 66)
            {
                var hiba = "Sajnos jelenleg nem tudunk kalkulálni, kérjük add meg adataid és visszahívunk.";
                MaxApp.hide();
            }

            if (hiba == "")
            {
                if (v <= (70 - 30))
                {
                    maxFutamido = 30;
                } else
                {
                    maxFutamido = (70 - 1) - v;
                }
            }





            if (hiba != "")
            {
                hibauzenet = hiba;
                $("#meletkor").parent().parent().addClass('input_error');
                $("#eletkor_error").html(hiba);
                $("#meletkor").closest("div").find('.input_error_txt').css("display", "block");
            } else
            {
                $("#meletkor").parent().parent().removeClass('input_error');
                $("#eletkor_error").html("");
                $("#meletkor").closest("div").find('.input_error_txt').css("display", "none");
            }


        },
        haviKamat: function (periodus, jovedelem_kategoria, eredetiHitelOsszeg)
        {
            periodus = periodus || 2;
            ret = 0;

/*
            if ((eredetiHitelOsszeg >= 30000000) && (maxconf['kamatok'][periodus]['kamat_teljes_futamido_30_m_felett'] != undefined)) {
                ret = maxconf['kamatok'][periodus]['kamat_teljes_futamido_30_m_felett'][jovedelem_kategoria];
            } else if ((eredetiHitelOsszeg >= 20000000) && (conf['kamatok'][periodus]['kamat_teljes_futamido_20_m_felett'] != undefined)) {
                ret = maxconf['kamatok'][periodus]['kamat_teljes_futamido_20_m_felett'][jovedelem_kategoria];
            } else if ((eredetiHitelOsszeg >= 10000000) && (conf['kamatok'][periodus]['kamat_teljes_futamido_10_m_felett'] != undefined)) {
                ret = maxconf['kamatok'][periodus]['kamat_teljes_futamido_10_m_felett'][jovedelem_kategoria];
            } else if ((eredetiHitelOsszeg < 5000000) && (conf['kamatok'][periodus]['kamat_teljes_futamido_5_m_alatt'] != undefined)) {
                ret = maxconf['kamatok'][periodus]['kamat_teljes_futamido_5_m_alatt'][jovedelem_kategoria];
            } else {
                ret = maxconf['kamatok'][periodus]['kamat_teljes_futamido'][jovedelem_kategoria];
            }
*/

            if ((eredetiHitelOsszeg >= 30000000) && (conf['kamatok'][periodus]['30000000'] != undefined)) {
                ret = conf['kamatok'][periodus]['30000000'][jovedelem_kategoria];
            } else if ((eredetiHitelOsszeg >= 10000000) && (conf['kamatok'][periodus]['10000000_29999999'] != undefined)) {
                ret = conf['kamatok'][periodus]['10000000_29999999'][jovedelem_kategoria];
            } else if ((eredetiHitelOsszeg >= 4000000) && (conf['kamatok'][periodus]['4000000_9999999'] != undefined)) {
                ret = conf['kamatok'][periodus]['4000000_9999999'][jovedelem_kategoria];
            }
            else {
                ret = conf['kamatok'][periodus]['4000000_9999999'][jovedelem_kategoria];
            }

            if ($("#kedvezmeny_jovairasm").is(':checked'))
            {
                // ret=ret- ;
            }
            if ($("#kedvezmeny_babavarom").is(':checked'))
            {
                if (periodus != 2)
                {
                    ret = ret - 0.2;
                }
            }
            if ($("#kedvezmeny_biztositasm").is(':checked'))
            {
                if (periodus != 2)
                {
                    ret = ret - 0.2;
                }
            }


            return ret;
        },
        max: function (futamido, jovedelem, kamat) {

            console.log("Max kamat: "+kamat);
            var max = 0;
            var honap = futamido * 12;
            kamat = kamat / 100;

            kamat = kamat / 12;

            max = jovedelem * (Math.pow(1 + kamat, honap) - 1) / (kamat * Math.pow(1 + kamat, honap));
            return max;
        },
        kategoria: function (hitelosszeg)
        {
            if ((hitelosszeg >= 30000000)) {
                ret = 5;
            } else if ((hitelosszeg >= 20000000)) {
                ret = 4;
            } else if ((hitelosszeg >= 10000000)) {
                ret = 3;
            } else if ((hitelosszeg < 5000000)) {
                ret = 2;
            } else {
                ret = 1;
            }


        },
        kategoriaVissza: function (kat)
        {
            if (kat == 5) {
                ret = 31000000;
            } else if ((kat == 4)) {
                ret = 22000000;
            } else if ((kat == 3)) {
                ret = 12000000;
            } else if ((kat == 2)) {
                ret = 6000000;
            } else {
                ret = 3000000;
            }


        },
        maxCalc: function (periodus, periodusKulcs, evekSzama)
        {

            // maxCalc: function(5, '10ev', 15)
            maxvisszafizetendo = torlesztesreFordithato[periodusKulcs] * (evekSzama * 12);

            if (maxvisszafizetendo > ingatlan_erteke_80)
            {
                maxvisszafizetendo = ingatlan_erteke_80;
            }
            kat = MaxApp.kategoria(maxvisszafizetendo);
            console.log("Max periodus: " + periodus);
            console.log("torlesztesreFordithato: " + torlesztesreFordithato[periodusKulcs]);
            console.log("évek: " + evekSzama);
            console.log("hónapok: " + evekSzama * 12);
            console.log("maxvisszafizetendo: " + maxvisszafizetendo);
            kamat = MaxApp.haviKamat(periodus, jovedelem_kategoria, maxvisszafizetendo);
            // alert(maxvisszafizetendo);
            // alert(kamat);
            console.log("kamat1: " + kamat);
            console.log(torlesztesreFordithato[periodusKulcs]);
            max = MaxApp.max(evekSzama, torlesztesreFordithato[periodusKulcs], kamat);
            console.log("mm " + max);
            if (max > ingatlan_erteke_80)
            {
                kamat = MaxApp.haviKamat(periodus, jovedelem_kategoria, ingatlan_erteke_80);
                max = ingatlan_erteke_80;
                console.log("kk " + kamat);
                console.log("kk max " + max);
            } else
            {

                if (kat != MaxApp.kategoria(max))
                {
                    max = MaxApp.kategoriaVissza(--kat);
                    kamat = MaxApp.haviKamat(periodus, jovedelem_kategoria, max);
                    max = MaxApp.max(evekSzama, torlesztesreFordithato[periodusKulcs], kamat);
                }
                
                kamat = MaxApp.haviKamat(periodus, jovedelem_kategoria, max);
            max = MaxApp.max(evekSzama, torlesztesreFordithato[periodusKulcs], kamat);


            }
            
            if (max>150000000)
            {
                max=150000000;
            }
            max = Math.floor((max / 100000)) * 100000;


            return max;

        },
        torlFordithato: function () {
            meglevo_torleszto = GSC.unformatNumber($("#meglevo_torleszto").val());


            hitelkartya_keret = GSC.unformatNumber($("#folyoszamla").val());
            if (hitelkartya_keret > 0)
            {
                hitelkartya_keret = hitelkartya_keret * 0.05;

            }




            jovedelem = GSC.unformatNumber($("#mjovedelem").val());

            if (jovedelem < 500000)
            {
                torlesztesreFordithato['6ho'] = (jovedelem * 0.25) - meglevo_torleszto - hitelkartya_keret;
                torlesztesreFordithato['5ev'] = (jovedelem * 0.35) - meglevo_torleszto - hitelkartya_keret;
                torlesztesreFordithato['10ev'] = (jovedelem * 0.5) - meglevo_torleszto - hitelkartya_keret;
            } else
            {
                torlesztesreFordithato['6ho'] = (jovedelem * 0.3) - meglevo_torleszto - hitelkartya_keret;
                torlesztesreFordithato['5ev'] = (jovedelem * 0.4) - meglevo_torleszto - hitelkartya_keret;
                torlesztesreFordithato['10ev'] = (jovedelem * 0.6) - meglevo_torleszto - hitelkartya_keret;
            }
            console.dir(torlesztesreFordithato);
        },
        hide: function ()
        {            
            
            $("#mennyit_button").css("display", "none");
            $("#nem_tudunk_kalkulalni").css("display", "block");
            $("#ujra_button").css("display", "block");
            $("#max_eredmeny").css("display", "none");

        },
        calc: function () {


            hibauzenet = "";
            $("#ingatlan_erteke").trigger("blur");
            $("#meletkor").trigger("blur");


            $("#mjovedelem").trigger("blur");

            if (hibauzenet != "")
            {
                $('html, body').animate({
                    scrollTop: $('.input_error:visible:first').offset().top - 100
                }, 1000);

                return false;
            }

            szamoltmar = true;

            $(".eredmeny_box").css("display", "none");

            $("#mennyit_button").css("display", "none");
            $("#ujra_button").css("display", "block");
            var max = 0;
            box_index = 1;
            var ret = new Array();

            // $("#meletkor").trigger("blur");
            MaxApp.meletkorBlur();

            maxconf = calcConf['piaci'];






            ingatlan_erteke_80 = (GSC.unformatNumber($("#ingatlan_erteke").val()) * 0.8);


            MaxApp.torlFordithato();

            if (jovedelem <= 199999)
            {
                jovedelem_kategoria = 4;
            } else if (jovedelem <= 399999)
            {
                jovedelem_kategoria = 3;
            } else if (jovedelem <= 799999)
            {
                jovedelem_kategoria = 2;
            } else if (jovedelem >= 800000)
            {
                jovedelem_kategoria = 1;
            }

            if (!$("#kedvezmeny_jovairasm").is(':checked'))
            {
                jovedelem_kategoria = 5;
            }


            var min_jovedelem = 0;
            var van_ajanlat = false;

            console.log(torlesztesreFordithato['10ev']);

            if (maxFutamido >= 10)
            {
                if (torlesztesreFordithato['10ev'] > min_jovedelem)
                {
                    // 10 év
                    var mf = maxFutamido;
                    if (maxFutamido > 20)
                    {
                        mf = 20;
                    }
                    max = MaxApp.maxCalc(3, '10ev', mf);
                    if (max>=4000000)
                    {
                    ret = MaxApp.calcTHM(max, torlesztesreFordithato['10ev'], mf, 3);
                    $("#box_" + box_index + "_max_desktop").data("torlesztesrefordithato", torlesztesreFordithato['10ev']);
                    MaxApp.fillBox(ret, max, mf, "Kamat (10 évig fix)");

                    van_ajanlat = true;
                    }
                }
            }

            if (maxFutamido >= 20)
            {
                if (torlesztesreFordithato['10ev'] > min_jovedelem)
                {

                    // 15 év
                    max = MaxApp.maxCalc(7, '10ev', 20);
                    if (max>=4000000)
                    {

                        ret = MaxApp.calcTHM(max, torlesztesreFordithato['10ev'], 20, 7);
                        $("#box_" + box_index + "_max_desktop").data("torlesztesrefordithato", torlesztesreFordithato['10ev']);
                        MaxApp.fillBox(ret, max, 20, "Kamat (20 évig fix)");

                        van_ajanlat = true;
                    }
                    else
                    {
                        box_index++;
                    }
                    // console.dir(ret);
                    // alert('xxx'+torlesztesreFordithato['10ev']);
                }

            }
            /*
            if (maxFutamido >= 15)
            {
                if (torlesztesreFordithato['10ev'] > min_jovedelem)
                {
                    // 15 év
                    max = MaxApp.maxCalc(5, '10ev', 15);
                    if (max>=4000000)
                    {
                    ret = MaxApp.calcTHM(max, torlesztesreFordithato['10ev'], 15, 5);
                    $("#box_" + box_index + "_max_desktop").data("torlesztesrefordithato", torlesztesreFordithato['10ev']);
                    MaxApp.fillBox(ret, max, 15, "Kamat (15 évig fix)");

                    van_ajanlat = true;
                    }
                    else
                    {
                       box_index++; 
                    }
                    // console.dir(ret);
                    // alert('xxx'+torlesztesreFordithato['10ev']);
                }

            } else
            {
                // box_index++;
            }

             */



            if (maxFutamido >= 10)
            {
                if (maxFutamido < 15)
                {
                    box_index++;
                }

                if (torlesztesreFordithato['10ev'] > min_jovedelem)
                {
                    
                    // 10 év
                    if (maxFutamido > 20)
                    {
                    max = MaxApp.maxCalc(3, '10ev', maxFutamido);
                    if (max>=4000000)
                    {
                    ret = MaxApp.calcTHM(max, torlesztesreFordithato['10ev'], maxFutamido, 3);
                    MaxApp.fillBox(ret, max, maxFutamido, "Kamat (10 évig fix)");
                    van_ajanlat = true;
                }
                    }


                    if (maxFutamido != 10)
                    {
                        max = MaxApp.maxCalc(3, '10ev', 10);
                        if (max>=4000000)
                    {
                        ret = MaxApp.calcTHM(max, torlesztesreFordithato['10ev'], 10, 3);
                        $("#box_" + box_index + "_max_desktop").data("torlesztesrefordithato", torlesztesreFordithato['10ev']);
                        MaxApp.fillBox(ret, max, 10, "Kamat (10 évig fix)");
                        van_ajanlat = true;
                    }
                    }
                    
                

                }


            }


            /*
            if (maxFutamido >= 5)
            {
                if (torlesztesreFordithato['5ev'] > min_jovedelem)
                {
                    // 5 év
                    box_index = 5;
                    console.log('5');
                    max = MaxApp.maxCalc(1, '5ev', maxFutamido);
                    if (max>=4000000)
                    {
                    ret = MaxApp.calcTHM(max, torlesztesreFordithato['5ev'], maxFutamido, 1);
                    $("#box_" + box_index + "_max_desktop").data("torlesztesrefordithato", torlesztesreFordithato['5ev']);
                    MaxApp.fillBox(ret, max, maxFutamido, "Kamat (5 évig fix)");

                    van_ajanlat = true;
                }
                    // console.dir(ret);

                }

            }
            */
             

            console.log("maxFutamido " + maxFutamido);
            /*
            if (maxFutamido >= 4)
            {
                console.log("xxxx " + torlesztesreFordithato['6ho'] + "|" + min_jovedelem);
                if (torlesztesreFordithato['6ho'] > min_jovedelem)
                {
                    box_index = 6;
                    // 6 hónap
                    console.log('5');
                    max = MaxApp.maxCalc(2, '6ho', maxFutamido);
                    if (max>=4000000)
                    {
                    ret = MaxApp.calcTHM(max, torlesztesreFordithato['6ho'], maxFutamido, 2);
                    $("#box_" + box_index + "_max_desktop").data("torlesztesrefordithato", torlesztesreFordithato['6ho']);
                    MaxApp.fillBox(ret, max, maxFutamido, "Kamat (6 hónapig fix)");

                    van_ajanlat = true;
                    }
                    // console.dir(ret);
                }

            }
            
             */

            if (van_ajanlat)
            {
                $("#nem_tudunk_kalkulalni").css("display", "none");
                $("#ujra_button").css("display", "block");
                $("#max_eredmeny").css("display", "block");

                $('html, body').animate({
                    scrollTop: $("#max_eredmeny").offset().top - 100
                }, 1000);
            } else
            {
                $("#nem_tudunk_kalkulalni").css("display", "block");
                $("#ujra_button").css("display", "block");
                $("#max_eredmeny").css("display", "none");
            }



            /*
             //   if (maxFutamido>=15)
             {
             // 10 év
             max=MaxApp.maxCalc(3, '10ev', 20);
             }
             */

            /*
             if (maxFutamido>10)
             {
             // 5 év
             console.log('5');
             max=MaxApp.maxCalc(1, '5ev', 20);
             
             
             ret=MaxApp.calcTHM(max,torlesztesreFordithato['5ev'], 20, 1);
             console.dir(ret);
             
             }
             */



            /*
             folyoszamla
             jovairasm
             kedvezmeny_babavarom
             kedvezmeny_biztositasm
             */

            //  haviKamat: function (i, periodus, jovedelem_kategoria, teljes, eredetiHitelOsszeg);

            /*
             var torleszto=180000;
             // var kamat=4.61;
             //var kamat=3.89;
             var kamat=3.74;
             var honap=120;
             var max=0;
             kamat=kamat/100;
             /// alert(kamat);
             kamat=kamat/12;
             // Math.pow()
             max= torleszto*(Math.pow(1+kamat,honap)-1)/(kamat*Math.pow(1+kamat,honap));
             // max= torleszto*(Math.pow(1+kamat,honap)-1);
             //   torleszto*(power(1+'kamat','honap')-1)/('kamat'*power(1+'kamat','honap'))
             alert(max);
             */
            /*        
             jövedelem*honap= teljes visszafizetendő
             teljes visszafizetendő >> hitelösszeg sáv >> kamat
             kamattal max meghatározása, ha a max nem fér bele a hitelosszeg sávba, akkor egy sávval visszább kell lépni
             */



        },
        fillBox: function (ret, max, futamido, periodus)
        {
            index = box_index;

            maxCalcData[index] = new Array();

            // maxCalcData[index]["layer_hitelosszeg"]=GSC.convertNumberToMillion(max) + " M";
            maxCalcData[index]["layer_hitelosszeg"] = GSC.formatNumber(max) + "";
            maxCalcData[index]["layer_futamido"] = GSC.formatNumber(futamido);
            // maxCalcData[index]["layer_elso_havi"]=GSC.formatNumber(Math.round(GSC.unformatNumber(ret['havi_torleszto']) / 1000)) + " e";

            // maxCalcData[index]["layer_elso_havi"]=GSC.formatNumber(ret['havi_torleszto']) + " e";
            maxCalcData[index]["layer_elso_havi"] = GSC.formatNumber(ret['havi_torleszto']) + "";


            // maxCalcData[index]["layer_teljes_visszafizetendo"]=ret['teljes_visszafizetendo_mobil'] ;
            maxCalcData[index]["layer_teljes_visszafizetendo"] = ret['teljes_visszafizetendo_desktop'];
            
            if (index==3)
            {
                if (futamido<=10)
                {
                    $("#leghosszabb").hide();
                }
                else
                {
                    $("#leghosszabb").show();
                }
            }

            var kamat = 0;
            kamat = ret['kamat'].replace(",", ".");
            kamat = kamat * 1;
            // alert(ret['kamat']);
            var kamatString = "";
            kamatString = kamat.toFixed(2) + " ";
            kamatString = kamatString.replace(".", ",");
            kamatString = kamatString.replace(" ", "");
            $("#kamat_div").html(kamatString + "%");

            maxCalcData[index]['layer_kamat'] = kamatString;
            maxCalcData[index]['layer_periodus'] = periodus;

            maxCalcData[index]['layer_thm'] = ret['thm'];
            // maxCalcData[index]["layer_teljes_dij"]=ret['teljes_dij_mobil'] ;
            maxCalcData[index]["layer_teljes_dij"] = ret['teljes_dij_desktop'];
            // maxCalcData[index]["layer_jovedelem"]=GSC.formatNumber(Math.round(GSC.unformatNumber($("#mjovedelem").val())) / 1000) + " e";
            maxCalcData[index]["layer_jovedelem"] = GSC.formatNumber($("#mjovedelem").val()) + " ";

            $("#max_eredmeny").css("display", "block");

            $("#box_" + index + "_fej").css("display", "block");

            if (index==2) {
                $("#box_" + index + "_title").html(futamido+" évig  fix kamat esetén");
                $("#box_" + index + "_info_title").prop('title', "A termék futamideje fixen "+futamido+" év, ez idő alatt a kamat változatlan.");
            }



            $("#box_" + index + "_max_desktop").html(GSC.formatNumber(max));
            $("#box_" + index + "_max_mobil").html(GSC.convertNumberToMillion(max));
            $("#box_" + index + "_futamido_evek").html(futamido);


            $("#box_" + index + "_torleszto").html(GSC.formatNumber(ret['havi_torleszto']));
            $("#box_" + index + "_thm").html(ret['thm']);


            $("#box_" + index + "_teljes_visszafizetendo_desktop").html(ret['teljes_visszafizetendo_desktop']);
            $("#box_" + index + "_teljes_visszafizetendo_mobil").html(ret['teljes_visszafizetendo_mobil']);



            $("#box_" + index + "_kamat").html(ret['kamat']);

            $("#box_" + index + "_teljes_dij_desktop").html(ret['teljes_dij_desktop']);
            $("#box_" + index + "_teljes_dij_mobil").html(ret['teljes_dij_mobil']);

            $("#box_" + index + "_periodus").html(periodus);


            $("#box_" + index).css("display", "block");

            box_index++;

        },
        calcTHM: function (hitel, jovedelem, evek, periodus)
        {

            var jov = 0;



            jov = jovedelem

            var ret = new Array();

            var honapok = evek * 12;



            var hitelOsszeg = GSC.unformatNumber(hitel);
            var eredetiHitelOsszeg = 0;

            var tamogatas = 0;
            var fizetendo = 0;
            var haviKoltseg = 0;
            var dijak = App.osszegez('dijak');
            var koltsegek = App.osszegez('koltsegek');
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
            var tipus = 'piaci';

            conf = calcConf['piaci'];

            if ((periodus != 2)) {
                koltsegek = (koltsegek * 1) + ((hitelOsszeg * 1) * 0); //Folyósítási költésg (0)
            }


            var n_hitelOsszeg = (-1) * (hitelOsszeg);
            var eredetiHitelOsszeg = hitelOsszeg;
            var eredetiHitelOsszeg2 = hitelOsszeg;
            kamat = MaxApp.haviKamat(periodus, jovedelem_kategoria, eredetiHitelOsszeg);



            kamat = kamat / 100;
            var eredetikamat = kamat;
            var h9 = 0;
            var e9 = 0;
            var l9 = 0;
            var kamattorlesztesek = 0;

            var pmt = Math.round(PMT(kamat / 12, honapok, n_hitelOsszeg));

            var d9 = 0;

            for (i = 1; i <= honapok; ++i)
            {
                kamat = MaxApp.haviKamat(periodus, jovedelem_kategoria, eredetiHitelOsszeg) / 100 / 12;


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




            kamat = MaxApp.haviKamat(periodus, jovedelem_kategoria, eredetiHitelOsszeg);

            var kamatString = "";
            kamatString = kamat.toFixed(2) + " ";
            kamatString = kamatString.replace(".", ",");
            kamatString = kamatString.replace(" ", "");

            ret['kamat'] = kamatString;

            hatodikEvtolFizetendo = havifizetendo[61] - dijak;
            elsoHaviReszlet = havifizetendo[1] - dijak;
//                 elsoHaviReszlet = havifizetendo[1];


            elsoHaviReszlet_ = elsoHaviReszlet;

            ret['havi_torleszto'] = GSC.formatNumber(elsoHaviReszlet);

            havifizetendo[0] = -eredetiHitelOsszeg + koltsegek * 1;

            var thm = (Math.pow(IRR2(havifizetendo, 0.01) + 1, 12) - 1) * 100;


            var thm_s = "";

            thm_s = thm;

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


            thm = thm * 1;

            thm = thm.toFixed(2);
            thm_s = thm;

            thm_s = thm_s.replace(".", ",");

            ret['thm'] = thm_s;


            ret['teljes_visszafizetendo_desktop'] = GSC.formatNumber(Math.round(teljes_visszafizetendo_osszeg));
            ret['teljes_visszafizetendo_mobil'] = GSC.convertNumberToMillion(Math.round(teljes_visszafizetendo_osszeg)) + " M";



            koltsegek += dijak * honapok;


            teljes_dij = Math.round(teljes_visszafizetendo_osszeg - hitelosszegeredeti);
            ret['teljes_dij_desktop'] = GSC.formatNumber(teljes_dij);
            ret['teljes_dij_mobil'] = GSC.convertNumberToMillion(teljes_dij) + " M";

            return ret;







        },

    }
}();



$(document).ready(function () {
    MaxApp.init();
});
