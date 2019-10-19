/* Gambiarra - Correção do inicio das palavras */
function removeWord() {
    var div = '.categories';
    var word = /\d+ - /g;
    div = typeof (div) == 'string' ? document.querySelector(div) : div;
    div.innerHTML = div.innerHTML.replace(word, '');
}
removeWord();

/* Gambiarra - Apagar Ver Mais */
function removeWord2() {
    var div = '.cardapio-header';
    var word = 'Ver mais';
    div = typeof (div) == 'string' ? document.querySelector(div) : div;
    div.innerHTML = div.innerHTML.replace(word, '');
}
removeWord2();

/* Gambiarra - Apagar Ver Mais */
function removeWord3() {
    var div = '.cardapio-header';
    var word = '  -';
    div = typeof (div) == 'string' ? document.querySelector(div) : div;
    div.innerHTML = div.innerHTML.replace(word, '');
}
removeWord3();


/* Gambiarra - Apagar Ver Mais */
function removeWord4() {
    var div = '.navbar-header';
    var word = 'navbar-brand hidden-xs';
    div = typeof (div) == 'string' ? document.querySelector(div) : div;
    div.innerHTML = div.innerHTML.replace(word, 'navbar-brand');
}
removeWord4();


/* Gambiarra - Converter Texto em Badge */
function addBadge() {
    var div = '.media-body';
    var word = '<div class="name">Promo |';
    div = typeof (div) == 'string' ? document.querySelector(div) : div;
    div.innerHTML = div.innerHTML.replace(word, '<span class="badge badge-success">Promo</span><div class="name">');
}
addBadge();


/* Capitalização de Título */
(function ($) {
    $.fn.toTitleCase = function () {
        return $(this).each(function () {
            var ignore = "e,o,no,com,ou,em,a,para".split(",");
            var theTitle = $(this).text();
            var split = theTitle.split(" ");

            for (var x = 0; x < split.length; x++) {
                if (x > 0) {
                    if (ignore.indexOf(split[x].toLowerCase()) < 0) {
                        split[x] = split[x].replace(/\w\S*/g, function (txt) {
                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        });
                    }
                } else {
                    split[x] = split[x].replace(/\w\S*/g, function (txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                }
            }
            title = split.join(" ");
            $(this).text(title);
        });
    };
})(jQuery);

$('.name').toTitleCase();

/* Modal Promo do Dia (ATIVAR) */
/*
$(window).on('load', function() {
    $('#promoDeuMatch').modal('show');
});*/


/* Inserção de Conteúdo - Logo Reduzido */
$(".navbar-brand").prepend('<div class="brand-logo-t"><img src="https://lucasavance.github.io/md/menudino/images/logo-color-t.png" alt="Deu Match Burguer" class="img-responsive"></div>');

/* Inserção de Conteúdo - Body */
$("body").append('<div class="status_restaurante"></div>');

/* Inserção de Conteúdo - Footer */
$("footer").prepend('<span><a href="https://deumatchburguer.com/">Deu Match&reg; Burguer</span><br />');

/* Inserção de Conteúdo - Informações Restaurante */
$(".cardapio-body").prepend('<ul class="dm-infos"><li><h3>Endereço para retirada<a class="endereco"></a></h3></li><li><h3>Tempo de Entrega<a href="#" data-toggle="modal" data-target="#detalhesAtendimentoModal"><i class="fa fa-clock-o"></i> <span class="tempoentrega"></span></a></h3></li></ul>');

/* Inserção de Conteúdo - Informações Restaurante - Design */
$("#detalhesAtendimentoModal .bg-danger").prepend('<i class="fa fa-clock-o"></i>');


/* Alteração de Localização - Endereço */
$("address").clone().prependTo(".endereco");

/* Alteração de Localização - Tempo Entrega */
$(".tempoEstimadoSelected").clone().prependTo(".tempoentrega");

/* Alteração de Localização - Status Fechado */
$(".label-fechado").clone().prependTo(".status_restaurante");

/* Alteração de Localização - Status Aberto */
$(".label-aberto").clone().prependTo(".status_restaurante");


/* Modal Lanches */

/*Inserção de Conteúdo - Header

$("#itemModal").on("show.bs.modal", function () {
    $("#itemModal .modal-content").html("");
        console.log('Teste Funcioando');
    $(document).ajaxComplete(function () {

/*
        // Inserir Título
        $("#itemModal .modal-title").prependTo(".panel-body");

        // Remover Título e Colocar Menu Superior
        $(".modal-header").empty().append('<button type="button" class="btn btn-corpofechar-pedido" data-dismiss="modal"><i class="fa fa-arrow-left btn-fechar-pedido"></i></button><p class="pedido-titulo">Detalhes do Pedido</p>');

        // Inserir Imagem no topo
        $(".modal-body").prepend('<div class="capa-lanche"></div>');
        $("#produtoModalImagePath").prependTo(".capa-lanche");

    });
});
*/


/* Limpeza de Conteúdo do Modal */
/*
$(".modal").on("hidden.bs.modal", function () {
    $("#itemModal .modal-content").empty();
});
 */

/* Abrir Link de Compra */
/*
 $('[data-name="Frango Frito"]').click();
*/


/* ANIVERSÁRIO */
$(".cardapio-header .inner h1").empty().append('Todos os lanches com valor promocional, de <b>01/10</b> até <b>31/10</b>.');

