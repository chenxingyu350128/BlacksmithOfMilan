angular.module('myApp')
.controller('accordion',function ($scope,sidebar, $http, $log, $state, $stateParams,moduleService) {
    $scope.sidebar = sidebar;
    if ($stateParams.username) {
        $scope.login = true;
    }
    //注销账户
    $scope.logoff = function () {
        moduleService.getLogout().then(function successCallback(response) {
            console.log(response)
            if (response.data.code==0) {
                $state.go("backstagelogin")
            }else{
                alert(response.data.msg)
            }
        });
    };
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;
    $scope.isColl =true;
    //状态保存
    let open = JSON.parse(sessionStorage.getItem('open'));
    if (open === null) { 
        $scope.collapse = function () {
            let arr = [];
            for (let i = 0; i < $scope.sidebar.length; i++) {
                arr[i] = 1;
            }
            return arr;
        }();
    } else {
        $scope.collapse = JSON.parse(sessionStorage.getItem('open'));
    }
    $scope.Turn = function (index) {
        $scope.collapse[index] ? $scope.collapse[index] = 0 : $scope.collapse[index] = 1; 
        sessionStorage.setItem('open', JSON.stringify($scope.collapse));
    };
    //获取用户模块信息
    moduleService.postRole().then(function successCallback(response) {
        // console.log(response);
        $scope.list = response.data.data.modules;
        $scope.username = response.data.data.username;
        $scope.role = response.data.data.role.roleName;
    });
    moduleService.getModuleManage().then(function succesCallback(response) {
        // console.log(response);
        var playerState = response.data.data;
        $scope.names = response.data.data;
    }),function errorCallback(response) {
        //请求失败执行代码
    };
});
