function getCookie(n) {
    var t = document.cookie.match("(^|;) ?" + n + "=([^;]*)(;|$)");
    return t ? t[2] : null
}

function OnBeginAdd() {
    if (!JSON.parse(unescape(decodeURI(getCookie("MdCurLoc"))))) return $modalPendente = $(this).parents(".modal"), $clickPendente = $(this).find(":submit"), $modalPendente && $modalPendente.modal("hide"), ShowAjaxModal("/endereco/listarendereco", "cepModal"), !1;
    $(globalSpinner).appendTo("#itemModal .modal-content")
}

function OnSuccessAdd(n) {
    n && (n.status && (n.status === 201 || n.status === 200) ? ($.notify("<i class='fa fa-" + n.icon + "'><\/i> " + n.message), atualizarCarrinho(), $("#itemModal").modal("hide")) : ($("#etapa1").hide(), $("#etapa2").html(n).show(), $("#btnItemSubmit span").html("Adicionar"), $("#btnItemSubmit i").toggleClass("fa-arrow-right", !1), $("#btnItemSubmit i").toggleClass("fa-plus", !0)), $("#itemModal .modal-content .spinner-parent").remove())
}

function atualizarCarrinho() {
    $("#carrinho").append(globalSpinner).load("https://app.menudino.com.br/pedido/carrinho?resume=true", function () {
        $.validator.unobtrusive.parse(this);
        $("[data-cart-open]").html($("#carrinho a").html());
        $("<span> Ver Pedido<\/span>").insertAfter("#verCarrinho a em");
        $(".carrinho-qtd").parent().animo({
            animation: "tada"
        });
        $("#verCarrinho").toggleClass("hide", !(Number($(".carrinho-qtd").html()) > 0))
    });
    $("#pedidoModal .modal-content").append(globalSpinner).load("https://app.menudino.com.br/pedido/carrinho", function () {
        $.validator.unobtrusive.parse(this)
    });
    $("[data-load]").each(function () {
        $(this).append(globalSpinner).load($(this).data("load"), function () {
            $.validator.unobtrusive.parse(this)
        })
    })
}

function initAutocomplete() {
    $("#HabilitarGoogleAutocomplete") && $("#HabilitarGoogleAutocomplete").val() === "True" && !autocomplete && (document.getElementById("Logradouro") === null || document.getElementById("Logradouro").disabled || (autocomplete = new google.maps.places.Autocomplete(document.getElementById("Logradouro")), autocomplete.addListener("place_changed", fillInAddress)))
}

function fillInAddress() {
    var n = autocomplete.getPlace(),
        f, o, r, u, s, h, t, i, e;
    for (u = $("#Estabelecimento.EndEstado").val(), n.types[0] !== "route" && (h = n.place_id), t = 0; t < n.address_components.length; t++) i = n.address_components[t].types[0], i === "route" ? f = n.address_components[t].short_name || n.address_components[t].long_name : i === "sublocality_level_1" || i === "sublocality" ? o = n.address_components[t].long_name : i === "administrative_area_level_2" || i === "locality" ? r = n.address_components[t].long_name : i === "administrative_area_level_1" ? u = n.address_components[t].short_name : i === "postal_code" ? s = n.address_components[t].long_name : i === "country" && n.address_components[t].short_name !== "BR" ? u = r = "" : i === "street_number" && $("#Numero").val(n.address_components[t].short_name || n.address_components[t].long_name);
    !f && n.formatted_address && (f = n.formatted_address.split(",")[0]);
    f && r && u ? ($("#Logradouro").val(f), e = $("#Cidade"), e.empty(), e.append($("<option selected><\/option>").val(r).text(r)), e.attr("value", e.val()), $("#Cidade").val(r), $("#Estado").val(u), $("#Estado").attr("value", u), $("#Bairro").val(o), $("#Cep").val(s), $("#PlaceIdGoogle").val(h), $("#Numero").focus()) : ($("#Logradouro").val(null), $("#Cidade").val(null), $("#Estado").val(null), $("#Bairro").val(null), $("#Cep").val(null), $("#PlaceIdGoogle").val(null), $("#EnderecoCompletoGoogle").val(null))
}

function OnBeginCep() {
    $(globalSpinner).appendTo("#entregaModal .modal-content")
}

function OnSuccessCep(n) {
    n && (n === !0 ? (atualizarCarrinho(), $("#entregaModal").modal("hide"), $("#entregaModal .modal-content .spinner-parent").remove(), uuidClicado && ($("a[data-uuid='" + uuidClicado + "']").trigger("click"), uuidClicado = null)) : ($("#entregaModal .modal-content").html(n), initMasks()))
}

function OnBeginSpinner() {
    $(globalSpinner).appendTo($(this))
}

function OnSuccessBuscarCep(n) {
    $("#cepModal").html(n);
    initMasks();
    $.validator.unobtrusive.parse($("#cepModal"))
}

function OnBeginCompletarEndereco() {
    var n = $(this).validate();
    if ($("#Complemento").val() === "" && !$("#chkComplemento").prop("checked")) return n.showErrors({
        Complemento: "Informe um complemento ou marque 'Não tenho'."
    }), $("#Complemento").focus(), !1;
    $(globalSpinner).appendTo($(this))
}

function OnSuccessCompletarEndereco(n) {
    n && (n === !0 ? (atualizarCarrinho(), $("#cepModal").modal("hide"), $("#cepModal .modal-content .spinner-parent").remove(), $clickPendente ? $clickPendente.parents(".modal").modal("show") : uuidClicado && ($("a[data-uuid='" + uuidClicado + "']").trigger("click"), uuidClicado = null)) : ($("#cepModal").html(n), initMasks(), $.validator.unobtrusive.parse($("#cepModal"))))
}

function ShowAjaxModal(n, t) {
    $(globalSpinner).appendTo("#" + t + " .modal-content");
    $.ajax({
        type: "GET",
        url: n,
        success: function (n) {
            $("#" + t).html(n);
            $("#" + t).modal({
                backdrop: "static",
                keyborard: !1
            });
            $("#" + t).modal("show");
            initMasks();
            $.validator.unobtrusive.parse($("#" + t))
        },
        error: function () {
            $("#" + t + " .modal-content .spinner-parent").remove()
        }
    })
}
var uuidClicado = null,
    $modalPendente, $clickPendente, placeSearch, autocomplete;
$(document).ready(function () {
    function f() {
        $("#notfound").removeClass("hidden");
        $(".categories > li").each(function () {
            $(this).children(".products").children("li:not(.hidden)").length > 0 ? ($(this).removeClass("hidden"), $("#notfound").addClass("hidden")) : $(this).addClass("hidden")
        })
    }
    var n;
    $(".modal").on("shown.bs.modal", function () {
        $("html").addClass("freezePage");
        $("body").addClass("freezePage")
    });
    $(".modal").on("hidden.bs.modal", function () {
        $("html").removeClass("freezePage");
        $("body").removeClass("freezePage")
    });
    $(document).on("click", 'a[href="#"]', function (n) {
        n.preventDefault ? n.preventDefault() : n.returnValue = !1
    });
    $("form.navbar-form").submit(function (n) {
        n.preventDefault();
        $("html, body").animate({
            scrollTop: $(".cardapio-body").offset().top
        }, 500)
    });
    jQuery.expr[":"].contains = jQuery.expr.createPseudo(function (n) {
        return function (t) {
            return jQuery(t).text().toUpperCase().indexOf(n.toUpperCase()) >= 0
        }
    });
    var t = 0,
        i = 0,
        r = 0,
        u = 0;
    $(document).on("touchstart", ".modal-content", function (n) {
        t = n.originalEvent.changedTouches[0].screenX;
        r = n.originalEvent.changedTouches[0].screenY
    });
    $(document).on("touchend", ".modal-content", function (n) {
        i = n.originalEvent.changedTouches[0].screenX;
        u = n.originalEvent.changedTouches[0].screenY;
        Math.abs(i - t) > Math.abs(u - r) && Math.abs(u - r) < 50 && Math.abs(i - t) > 50 && (i > t ? $(this).parents(".modal").modal("hide") : i < t)
    });
    $("#itemModal").on("show.bs.modal", function (n) {
        var t, i;
        $clickPendente ? ($clickPendente.trigger("click"), $clickPendente = null) : (t = $(n.relatedTarget), uuidClicado = t.data("uuid"), $("#itemModal .modal-content").html(""), i = $(globalSpinner), i.appendTo("#itemModal .modal-content"), $("#itemModal .modal-content").load("https://app.menudino.com.br/pedido/cardapioitem/" + uuidClicado, function () {
            if ($.validator.unobtrusive.parse(this), window.matchMedia("(max-width: 767px)").matches) {
                var n = $("#itemModal .modal-header").outerHeight(!0) || 67;
                $("#itemModal .modal-body").css("padding-top", n + 15 + "px")
            }
        }))
    });
    $(document).on("change", "input[name*=CodigoTamanhoSelecionado]", function () {
        var n = $('input[name*="CodigoTamanhoSelecionado"]:checked').data("qtdmaximapartes");
        n > 1 ? $("#QuantidadeMaximaPartes").html(" até " + n + " sabores") : $("#QuantidadeMaximaPartes").html("");
        $("#todasPartes").toggleClass("hide", n < 2);
        $("input[name*=CodigosPartesSelecionadas]").prop("checked", !1);
        $("input[name*=CodigosPartesSelecionadas]#parte-inteira").val($(this).val());
        $("input[name*=CodigosPartesSelecionadas]#parte-inteira").prop("checked", !0).change();
        $("input[name*=CodigosPartesSelecionadas]#parte-inteira").data("precovenda", parseFloat($(this).data("precovenda"))).change();
        $("#collapseSelectedPartes div.parte").addClass("hide");
        $("#collapseSelectedPartes div.parte-" + $(this).data("sigla")).removeClass("hide")
    });
    $(document).on("change", "input[name*=CodigosPartesSelecionadas]", function () {
        var t = $('input[name*="CodigoTamanhoSelecionado"]:checked').data("qtdmaximapartes"),
            n = $("input[name*=CodigosPartesSelecionadas]:checked").length;
        n === 1 ? ($(".meioameio").toggleClass("hide", !0), $("#Quantidade").data("val-range-max", $("#Quantidade").data("val-range-max-old")), $("#Quantidade").removeData("val-range-max-old")) : n > t ? ($(this).prop("checked", !1), $(this).parent().animo({
            animation: "shake"
        }), $("#QuantidadeMaximaPartes").parent().animo({
            animation: "shake"
        })) : $(".meioameio").removeClass("hide")
    });
    $(document).on("change", "input[name*=ComplementosSelecionados]", function () {});
    $(document).on("change", "#Quantidade,#Observacoes,input[name*=ComplementosSelecionados],input[name*=CodigoTamanhoSelecionado],input[name*=CodigosPartesSelecionadas]", function () {
        var i = parseFloat($("#Produto_ValorVenda").val().replace(",", ".")),
            n = parseFloat($("#Quantidade").val() || 1),
            t, f, r, u;
        !n || n < $("#Quantidade").data("val-range-min") ? (n = $("#Quantidade").data("val-range-min"), $("#Quantidade").val(n)) : n > $("#Quantidade").data("val-range-max") && (n = $("#Quantidade").data("val-range-max"), $("#Quantidade").val(n));
        t = $("input[name*=CodigosPartesSelecionadas]:checked").length;
        $("input[name*=CodigoTamanhoSelecionado]:checked").length > 0 && (t === 0 ? i = parseFloat($("input[name*=CodigoTamanhoSelecionado]:checked").data("precovenda")) : (f = $("#CobrarPeloMaiorValor").val() === "true", r = [], $("input[name*=CodigosPartesSelecionadas]:checked").each(function () {
            r.push(parseFloat($(this).data("precovenda")))
        }), f ? i = Math.max.apply(Math, r) : (i = 0, $.each(r, function () {
            i += this / t
        }))));
        u = 0;
        $("input[type=number][name*=ComplementosSelecionados]").each(function () {
            var n = $(this).val(),
                i;
            !n || n < $(this).data("val-range-min") ? (n = $(this).data("val-range-min"), $(this).val(n)) : n > $(this).data("val-range-max") && (n = $(this).data("val-range-max"), $(this).val(n));
            n > 0 && (i = parseFloat($(this).data("precovenda")), this.name.indexOf("PartesSelecionadas") > -1 && (i = i / t), u += $(this).val() * i)
        });
        $("#PrecoTotal").text("R$ " + Number(n * (i + u)).toFixed(2).replace(".", ",")).animo({
            animation: "tada"
        });
        $("#produtoModalNome").text(function () {
            var n = $("#Produto_NomeProduto").val();
            return t > 1 && (n = $("#Produto_NomePersonalizado").val()), $("input[name*=CodigoTamanhoSelecionado]:checked").length && (n += " " + $("input[name*=CodigoTamanhoSelecionado]:checked").data("nome")), n
        });
        $("#resumo").html(function () {
            var n = "",
                i;
            return $("input[type=number][name^=ComplementosSelecionados]").each(function () {
                $(this).val() > 0 && (n !== "" && (n += ", "), n += $(this).val() + "x " + $(this).data("nome"))
            }), $("#Observacoes").val() && (n !== "" && (n += ", "), n += $("#Observacoes").val()), i = t > 1, i ? (n !== "" && (n = "<i>" + n + "<\/i><br />"), $("input[name*=CodigosPartesSelecionadas]:checked").each(function () {
                n += "<i class='fa fa-adjust fa-rotate-180'><\/i> 1/" + t + " " + $(this).data("nome");
                var i = "";
                $("input.parte-" + $(this).val() + "-complemento").each(function () {
                    $(this).val() > 0 && (i += " " + $(this).val() + "x " + $(this).data("nome"))
                });
                i !== "" && (n += ":<i>" + i + "<\/i>");
                n += "<br />"
            }), $("#btnItemSubmit span").html("Continuar")) : $("#btnItemSubmit span").html("Adicionar"), $("#btnItemSubmit i").toggleClass("fa-arrow-right", i), $("#btnItemSubmit i").toggleClass("fa-plus", !i), $("#resumo").toggleClass("hide", n === ""), n
        });
        window.matchMedia("(max-width: 767px)").matches && $("#itemModal .modal-body").css("padding-top", $("#itemModal .modal-header").outerHeight(!0) + 15 + "px")
    });
    $("#search").on("input propertychange paste", function () {
        $(".products > li").removeClass("hidden");
        $(".products .name").find("mark").contents().unwrap();
        var n = $(this).val();
        n !== "" && n.length > 2 && n.split(" ").forEach(function (n) {
            if (n.length > 2) {
                $('.products > li:not(:contains("' + n + '"))').addClass("hidden");
                var t = new RegExp("(" + n.trim().split(/\s+/).join("|") + ")(?!([^<]+)?>)", "gi");
                $(".products .name").html(function (n, i) {
                    return i.replace(t, "<mark>$1<\/mark>")
                })
            }
        });
        f()
    });
    $(document).on("click", ".btn-minus", function () {
        var n = $(this).parent().siblings("input"),
            t = parseInt($(n).val()) - 1;
        $(n).val(t).change()
    });
    $(document).on("click", ".btn-plus", function () {
        var n = $(this).parent().siblings("input"),
            t = parseInt($(n).val()) + 1;
        $(n).val(t).change()
    });
    $(document).on("click", ".btnRemover", function (n) {
        n.preventDefault();
        n.stopPropagation();
        var t = $(this).closest("tr");
        $.post("https://app.menudino.com.br/pedido/delitem", {
            codigoPedidoItem: $(this).data("id")
        }, function (n) {
            $.notify("<i class='fa fa-" + n.icon + "'><\/i> " + n.message);
            atualizarCarrinho()
        });
        t.hide("slow", function () {
            t.remove()
        })
    });
    $(document).on("click", ".btnRemoverTodos", function (n) {
        n.preventDefault();
        n.stopPropagation();
        $.post("https://app.menudino.com.br/pedido/delallitem", null, function (n) {
            $.notify("<i class='fa fa-" + n.icon + "'><\/i> " + n.message);
            atualizarCarrinho()
        })
    });
    $(document).on("click", ".cboTipoEntrega", function (n) {
        if (n.preventDefault(), n.stopPropagation(), $(this).hasClass("active")) $("#cepModal").modal("hide");
        else {
            var t = $(this).data("id");
            t === 1 ? ShowAjaxModal("/endereco/buscarcep", "cepModal") : $.post("https://app.menudino.com.br/pedido/definirretirarnoestabelecimento", {
                codigoTipoEntrega: t
            }, function (n) {
                $("#cepModal").modal("hide");
                $.notify("<i class='fa fa-" + n.icon + "'><\/i> " + n.message);
                atualizarCarrinho()
            })
        }
    });
    atualizarCarrinho();
    $(document).on("click", "[data-cart-open]", function (n) {
        n.preventDefault();
        n.stopPropagation();
        $("#carrinho > a").trigger("click")
    });
    $("#carrinho").on("hidden.bs.dropdown", function () {
        $(".navbar-collapse").collapse("hide")
    });
    n = !1;
    $(document).on("hide.bs.modal", function (t) {
        n ? n = !1 : history.pushState({
            show: !1,
            modal: t.target.id
        }, t.target.id, location.href)
    });
    $(document).on("show.bs.modal", function (t) {
        n && (n = !1);
        var i = null;
        t.relatedTarget && t.relatedTarget.dataset ? i = t.relatedTarget.dataset.uuid : history.pushState({
            show: !0,
            modal: t.target.id,
            uuid: i
        }, t.target.id, location.href)
    });
    $(window).on("popstate", function (t) {
        n = !0;
        var i = t.originalEvent.state;
        i ? i.modal && (i.show ? i.uuid ? $("a[data-uuid='" + i.uuid + "']").trigger("click") : $("#" + i.modal).modal("show") : ($("#" + i.modal).data("bs.modal") || {}).isShown && ($("#" + i.modal).modal("hide"), $("body").removeClass("modal-open"), $(".modal-backdrop").remove())) : ($(".modal").data("bs.modal") || {}).isShown && ($(".modal").modal("hide"), $("body").removeClass("modal-open"), $(".modal-backdrop").remove())
    });
    $(document).on("click", ".btnTipoEntrega", function () {
        $(".btnTipoEntrega").toggleClass("active", !1);
        $("#TipoEntrega_Codigo").val($(this).data("id"));
        $("#divEnderecoEstabelecimento").toggleClass("hide", $(this).data("id") === 1);
        $(this).toggleClass("active", !0)
    });
    $(document).on("change", "#chkComplemento", function () {
        this.checked ? ($("#Complemento").val(""), $("#Complemento").prop("readonly", !0)) : $("#Complemento").prop("readonly", !1)
    });
    $(document).on("change", "#Cidade", function () {
        $(this).attr("value", $(this).val())
    });
    $(document).on("change", "#Estado", function () {
        $(this).attr("value", $(this).val());
        $.post("/endereco/carregarcidades", {
            estado: $(this).val()
        }, function (n) {
            var t = $("#Cidade");
            t.empty();
            t.append($("<option value selected><\/option>").text("Cidade"));
            t.attr("value", t.val());
            $.each(n, function (n, i) {
                t.append($("<option><\/option>").val(i).text(i))
            })
        })
    });
    $("[data-load]").each(function () {
        $(this).append(globalSpinner).load($(this).data("load"), function () {
            $.validator.unobtrusive.parse(this)
        })
    })
})
