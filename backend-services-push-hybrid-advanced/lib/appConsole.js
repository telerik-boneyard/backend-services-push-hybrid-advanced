(function ($, undefined) {

    window.appConsole = {
        log: function (message, isError, container) {
            var lastContainer = $(".console div:first", container),
                lastMessage = lastContainer.text();

            if (!lastContainer.length || message !== lastMessage) {
                $("<div" + (isError ? " class='error'" : "") + "/>")
                    .css({
                        marginTop: -24,
                        backgroundColor: isError ? "#ffbbbb" : "#bbddff"
                    })
                    .html(message)
                    .prependTo($(".console", container))
                    .animate({
                        marginTop: 0
                    }, 300)
                    .animate({
                        backgroundColor: isError ? "#ffdddd" : "#ffffff"
                    }, 800);
            } 
        },

        error: function (message) {
            this.log(message, true);
        },
        
        clear: function () {
        	$(".console").html("");
        }
    };
})(jQuery);