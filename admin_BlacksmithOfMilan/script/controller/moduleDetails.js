angular.module('myApp')
.controller('ModuleDetails',function ($scope,FileUploader,$http,$log,$state,$stateParams,moduleService,modalBox) {
    if ($stateParams.id) {
        var id =$stateParams.id
        moduleService.getModuleDetails(id).then(function successCallback(response) {
            console.log(response);
            $scope.modules = response.data.data;
            $scope.title = $scope.modules.source;
            $scope.sonid = $scope.modules.id;
            $scope.URL =  $scope.modules.url;
            $scope.fatherid = $scope.modules.parentId;
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }
    // 点击保存
    $scope.onkeep = function () {
        modalBox.confirm( "是否选择保存",function () {
            var data = {
                id:$scope.sonid,
                parentId:$scope.fatherid,
                source:$scope.title,
                url:$scope.URL
            };
            if ($stateParams.id) {
                moduleService.putModuleDetails(data).then(function successCallback(response) {
                    console.log(response);
                    if (response.data.code === 0) {
                        $state.go("pageTab.moduleManage")               
                    }else{
                        modalBox.alert(response.data.msg)
                    }
                });     
            }else{
                moduleService.postModuleDetails(data).then(function successCallback(response) {
                    console.log(response);
                    if (response.data.code === 0) {
                        $state.go("pageTab.moduleManage")               
                    }else{
                        modalBox.alert(response.data.msg)
                    }
                });     
            }
        })     
    }
    //取消
    $scope.oncancel = function () {
        modalBox.confirm( "是否选择取消",function () {
            $state.go("pageTab.moduleManage")                    
        })  
    }
});