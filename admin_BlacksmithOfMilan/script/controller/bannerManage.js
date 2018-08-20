angular.module('myApp')
.controller('BannerManage',function ($scope,FileUploader,$http,$log,$state,$stateParams,articleService) {
    $scope.text=function () {
    }
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php' //换成自己的上传地址，本地演示不换也行
    });
    uploader.onAfterAddingFile = function (fileItem) {
        var reader = new FileReader();
        reader.addEventListener("load", function (e) {
            //文件加载完之后，更新angular绑定
            $scope.$apply(function () {
                $scope.iconUrl = e.target.result;
            });
        }, false);
        reader.readAsDataURL(fileItem._file);
    };
})
