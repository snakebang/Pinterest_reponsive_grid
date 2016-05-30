/*
    Pinterest Grid Plugin
    Copyright 2014 Mediademons
    @author smm 16/04/2014

    usage:

     $(document).ready(function() {

        $('#blog-landing').pinterest_grid({
            no_columns: 4
        });

    });
*/
;
(function($, window, document, undefined) {
    var pluginName = 'pinterest_grid',
        defaults = {
            padding_x: 10,
            padding_y: 10,
            no_columns: 3,
            margin_bottom: 50,
            breakpoint: null
        },
        $article,
        article_width;

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function() {
        var self = this,
            resize_finish;

        $(window).resize(function() {
            clearTimeout(resize_finish);
            resize_finish = setTimeout(function() {
                self.make_layout_change(self);
            }, 100);
        });

        self.make_layout_change(self);
    };

    Plugin.prototype.calculate = function(columns) {
        var self = this,
            tallest = 0,
            row = 0,
            $container = $(this.element),
            container_width = $container.width();
        $article = $container.children();
        article_width = ($container.width() - self.options.padding_x * columns) / columns;

        $article.each(function() {
            $(this).css('width', article_width);
        });



        $article.each(function(index) {
            var current_column,
                left_out = 0,
                top = 0,
                $this = $(this),
                prevAll = $this.prevAll(),
                tallest = 0;


            current_column = index % columns;

            for (var t = 0; t < columns; t++) {
                $this.removeClass('c' + t);
            }

            if (index % columns === 0) {
                row++;
            }

            $this.addClass('c' + current_column);
            $this.addClass('r' + row);

            prevAll.each(function(index) {
                if ($(this).hasClass('c' + current_column)) {
                    top += $(this).outerHeight() + self.options.padding_y;
                }
            });


            left_out = (index % columns) * (article_width + self.options.padding_x);


            $this.css({
                'left': left_out,
                'top': top,
                'display': 'block'
            });
        });

        this.tallest($container, columns);
        $(window).resize();
    };

    Plugin.prototype.tallest = function(_container, columns) {
        var column_heights = [],
            largest = 0;

        for (var z = 0; z < columns; z++) {
            var temp_height = 0;
            _container.find('.c' + z).each(function() {
                temp_height += $(this).outerHeight();
            });
            column_heights[z] = temp_height;
        }

        largest = Math.max.apply(Math, column_heights);
        _container.css('height', largest + (this.options.padding_y + this.options.margin_bottom));
    };

    Plugin.prototype.make_layout_change = function(_self) {
        _width = $(window).width();
        if (_self.options.breakpoint) {
            var _arr = _self.options.breakpoint;
            var end = _arr.length - 1;
            if (_width > _arr[end][0]) {
                _self.calculate(_arr[end][1])
            } else {
                for (i = 0; i < end; i++) {
                    if (_width > _arr[i][0] && _width < _arr[i+1][0]){
                        _self.calculate(_arr[i][1]);
                    }
                }
            }

            //            _self.options.breakpoint.forEach(function(element){
            //                if($(window).width() >= element[0]){
            //                    _self.calculate(element[1]);
            //                }
            //            })
        } else {
            _self.calculate(_self.options.no_columns)
        }
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);