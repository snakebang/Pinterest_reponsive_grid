#基于原pointerest_grid 插件的改版

##添加了根据屏幕的width响应的功能

原插件有一个single_column_breakpoint参数:
    * single_column_breakpoint：指定在视口多大时一行只显示一个网格
但是不是很好用,所以我将此参数删除,改为breakpoint 参数:
>                 $("#demo").pinterest_grid({
>                                   breakpoint: [[0,1],[480,2],[640,3],[960,4],[1280,5]]
>                               });
根据屏幕大小改变行数,
类似与owl-carousel插件的响应式功能,但是此为可选参数,你也可以不设置此参数来禁用响应式功能
>保留了原插件的默认参数:   no_columns: 3