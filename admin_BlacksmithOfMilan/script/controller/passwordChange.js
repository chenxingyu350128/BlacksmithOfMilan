angular.module('myApp')
.controller('PasswordChange',function ($scope,FileUploader,$http,$log,$state,$stateParams,accountService,moduleService,modalBox) {
    //点击修改密码
    $scope.onlick = function () {
        modalBox.confirm( "是否选择修改密码",function () {
            var userID =$stateParams.userId;
            var params={
                passwordSaved: $scope.passwordSaved,
                passwordNew: $scope.passwordNew,
                passwordConfirm: $scope.passwordConfirm,
            };
            accountService.postPasswordChange(userID,params).then(function successCallback(response) {
                console.log(response);
                if (response.data.code ===0) {
                    moduleService.getLogout().then(function successCallback(response) {
                        console.log(response)
                        if (response.data.code===0) {
                            $state.go("backstagelogin")
                        }else{
                            alert(response.data.msg)
                        }
                    });                   
                }else{
                    modalBox.alert(response.data.msg)
                }                
            });
        }) 
    };
  
    $scope.passwordEntry = function () {
        if ($scope.passwordNew!=$scope.passwordConfirm) {
        $scope.Entry = true;
        console.log("密码不一致")
            
        }else{
        $scope.Entry = false;

        }
        
    }
     


});