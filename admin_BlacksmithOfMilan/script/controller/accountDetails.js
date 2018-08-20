angular.module('myApp')
.controller('AccountDetails',function ($scope,FileUploader,$http,$log,$state,$stateParams,accountService,modalBox) {
    if ($stateParams.id) {
        var id = $stateParams.id
        //账户角色信息
        accountService.getAccountDetails(id).then(function successCallback(response) {
            if (response.data.code===0) {
                console.log(response);
                $scope.list = response.data.data.t;
                console.log($scope.list);
                $scope.roleId = response.data.data.t.roleVO.id;
                var roleslist = response.data.data.roleVOS;
                for (let i = 0; i < roleslist.length; i++) {
                    const item = roleslist[i];
                    var key = "site"
                    item[key]=item["roleName"];
                    delete item["roleName"]
                }
                // var all = {site:"全部",id:""}
                // roleslist.unshift(all)
                
                $scope.rolelist  = roleslist;

                // 状态保存
                $scope.role =$scope.roleId;
                $scope.admin = $scope.list.username;
                
            }else{
                modalBox.alert(response.data.msg)
            }
       
        });
    }

    //点击保存
    $scope.onkeep = function () {
        modalBox.confirm( "是否选择保存",function () {
            var params={
                id:$stateParams.id,
                username:$scope.admin,
                password:$scope.password,
                roleId:$scope.role,
                by:$stateParams.userId,
            }
            //编辑模块请求
            accountService.postAccountDetails(params).then(function successCallback(response) {
                console.log(response);
                if (response.data.code ===0) {
                    $state.go("pageTab.accountManage")                  
                }else{
                    modalBox.alert(response.data.msg)
                }
            });
        })   
    }
    //取消
    $scope.oncancel = function () {
        modalBox.confirm( "是否选择取消",function () {
            $state.go("pageTab.accountManage")                    
        }) 
    }
    if ($stateParams.id==undefined){
        var params={
            page:$stateParams.page
        }
        //获取模块详情
        accountService.getAccountManage(params).then(function successCallback(response) {
            console.log(response);
            if (response.data.code===0) {
                $scope.list = response.data.data.rows[0].t;
                console.log($scope.list);
                $scope.bigTotalItems = response.data.data.total;
                $scope.bigCurrentPage = $stateParams.page;
                $scope.maxSize = 5;
                var roleslist = response.data.data.rows[0].roleVOS
                for (let i = 0; i < roleslist.length; i++) {
                    const item = roleslist[i];
                    var key = "site"
                    item[key]=item["roleName"];
                    delete item["roleName"];
                }
                var all = {site:"全部",id:""}
                roleslist.unshift(all)
                $scope.rolelist  = roleslist;        
            }else{
                modalBox.alert(response.data.msg)
            }
       
        }, function errorCallback(response) {
        });
    }
});