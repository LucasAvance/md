function removeWord() {
    var div = '.categories';
    var word = /\d+ - /g;
    div = typeof (div) == 'string' ? document.querySelector(div) : div;
    div.innerHTML = div.innerHTML.replace(word, '');
}
removeWord();


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
