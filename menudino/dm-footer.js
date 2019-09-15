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



/* Alteração de Localização - Endereço */
$("address").clone().prependTo(".endereco");

/* Alteração de Localização - Tempo Entrega */
$(".tempoEstimadoSelected").clone().prependTo(".tempoentrega");

/* Alteração de Localização - Status Fechado */
$(".label-fechado").clone().prependTo(".status_restaurante");

/* Alteração de Localização - Status Aberto */
$(".label-aberto").clone().prependTo(".status_restaurante");


/* Modal Lanches */

/*Inserção de Conteúdo - Header */

$("#itemModal").on("show.bs.modal", function (n) {
    $(document).ajaxComplete(function () {
        console.log('Teste Funcioando');

        // Remover Título e Colocar Menu Superior
        $(".modal-header").empty().append('<button type="button" class="btn btn-corpofechar-pedido" data-dismiss="modal"><i class="fa fa-arrow-left btn-fechar-pedido"></i></button><p class="pedido-titulo">Detalhes do Pedido</p>');

        // Inserir Imagem no topo
        $(".modal-body").prepend('<div class="capa-lanche"></div>');
        $("#produtoModalImagePath").prependTo(".capa-lanche");

        // Inserir Título
        $(".modal-title .product-title").prependTo(".panel-body .text-justify");
    })
});


/* Abrir Link de Compra */
/*
 $('[data-name="Frango Frito"]').click();
*/


function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

var decoded = decodeURIComponent(original);
