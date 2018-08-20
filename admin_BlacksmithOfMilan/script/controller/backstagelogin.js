angular.module('myApp')
.controller('Backstagelogin',function ($scope,FileUploader,$http,$log,$state,$stateParams,articleService,userManage) {
    let vm=this;
    console.log($scope);
    //账户登陆
    vm.login=function(){
        userManage.login(vm.username,vm.password).then(function (res) {
            console.log(res);
            if(res.data.code===0){
                vm.username=res.data.data.username;
                vm.userId = res.data.data.userId;
                vm.role = res.data.data.role;
                $state.go('pageTab',{
                    username:vm.username,
                    userId:vm.userId,
                    role:vm.role
                });//通过$stateParams传到主框架页面
                //账户不存在
            }else if (res.data.code===98) {
                $scope.admin = true;
                setTimeout(function () {
                    $scope.admin = false;
                    $scope.$apply()
                },2000)
                //密码错误
            }else if (res.data.code===97) {
                $scope.password = true;
                setTimeout(function () {
                    $scope.password = false;
                    $scope.$apply()
                },2000)
            };
        });
    };
});