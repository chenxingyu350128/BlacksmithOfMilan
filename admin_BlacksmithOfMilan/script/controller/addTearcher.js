angular.module('myApp')
.controller('AddTearcher',function ($scope,FileUploader,$http,$log,$state,$stateParams,videoService,modalBox) {
    //图片上传
    let uploader = $scope.uploader = new FileUploader(); /*实例化一个FileUploader对象*/
    uploader.url = '/a/picture/'; /*以下是设置了两个必须的属性*/
    uploader.queueLimit = 1; //文件个数
    uploader.queue = [];
    uploader.alias = "coverImage"
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        $scope.imgSrc = response.data;
        console.log("返回成功")
        console.log($scope.imgSrc)
    };
    uploader.onErrorItem = function (fileItem, response, status) {
        if (status === 413) {
            bootbox.alert('图片太大了。')
        }
    };
    uploader.onAfterAddingFile = function (fileItem) {
        console.log("上传成功")
        var reader = new FileReader();
        reader.addEventListener("load", function (e) {
            //文件加载完之后，更新angular绑定
            $scope.$apply(function () {
                $scope.iconUrl = e.target.result;
            });
        }, false);
        reader.readAsDataURL(fileItem._file);
    };
    $scope.keepTR = function () {
        modalBox.confirm( "是否选择保存",function () {
            var params = {
                avatar:$scope.imgSrc,
                nickName: $scope.teacherNm
            };
            videoService. postTeacher(params).then(function successCallback(response) {
                console.log(response);
                if (response.data.code === 0) {
                    $state.go("pageTab.videoDetails",{
                    },{
                    })
                }else{
                    modalBox.alert(response.data.msg)
                }
            });
        }) 
    };
    //点击取消
    $scope.CancelTR = function () {
        modalBox.confirm( "是否选择取消",function () {
            $state.go("pageTab.videoDetails")                    
        }) 
    }
});