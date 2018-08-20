angular.module('myApp').controller('UserDetails',function ($scope,$http,$state,$stateParams,userManage,modalBox) {
    // let vm=this;
    $scope.params=$stateParams;
    $scope.id=$scope.params.userId;
    userManage.getUserDetail($scope.id).then(function (res) {
        if(res.data.code===0){
            $scope.userDetail=res.data.data;
        }else{
            modalBox.alert(res.data.msg)
        }
    });
});