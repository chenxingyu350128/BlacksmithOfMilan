angular.module('myApp').directive('upLoad',function ($http) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'script/directive/uploadImage/uploadImage.html',
        scope: {
            img: '=',
        },
        link: function (scope) {
            scope.img = {
                url:'http://developer.189.cn/kcfinder/upload/1f309dfe5706ddfbe6fbeaaf45299b43/%E5%9B%BE%E7%89%87/%E5%8F%91%E6%96%87/400(1).jpg?_=1503301030896'
            };
            mui.init();
            $(function() {
                var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
                    $gallery = $("#gallery"),
                    $galleryImg = $("#galleryImg"),
                    $uploaderInput = $("#uploaderInput"),
                    $uploaderFiles = $("#uploaderFiles");

                $uploaderInput.on("change", function(e) {
                    var src, url = window.URL || window.webkitURL || window.mozURL,
                        files = e.target.files;
                    for(var i = 0, len = files.length; i < len; ++i) {
                        var file = files[i];

                        if(url) {
                            src = url.createObjectURL(file);
                        } else {
                            src = e.target.result;
                        }

                        $uploaderFiles.append($(tmpl.replace('#url#', src)));
                    }
                });
                var index; //第几张图片
                $uploaderFiles.on("click", "li", function() {
                    index = $(this).index();
                    $galleryImg.attr("style", this.getAttribute("style"));
                    $gallery.fadeIn(100);
                });
                $gallery.on("click", function() {
                    $gallery.fadeOut(100);
                });
                //删除图片
                $(".weui-gallery__del").click(function() {
                    $uploaderFiles.find("li").eq(index).remove();
                });
            });
        }
    }
});