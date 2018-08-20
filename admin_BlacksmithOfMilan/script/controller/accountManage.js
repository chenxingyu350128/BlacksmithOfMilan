angular.module('myApp')
.controller('AccountManage',function ($scope,FileUploader,$http,$log,$state,$stateParams,accountService,modalBox) {
    //新增账户
    $scope.addText = function () {
        $state.go("pageTab.accountDetails");
    };
    //编辑账户
    $scope.onlineEditor = function (id) {
        $state.go("pageTab.accountDetails",{
            id:id
        },{
        });
    };
    //删除账户
    $scope.delete = function (userId) {
        modalBox.confirm( "是否删除此条数据",function () {
            var  userID = userId;
            //删除账户请求
            accountService.deleteAccountManage(userID).then(function successCallback(response) {
                console.log(response);
                if (response.data.code === 0) {
                    console.log('删除成功')
                    $state.go("pageTab.accountManage",{
                    },{
                        reload:true
                    })  
                }else{
                    modalBox.alert(response.data.msg)
                }
            });
        }) 
    }
    //渲染账户管理列表
    params={
        page:$stateParams.page,
        roleId:$stateParams.role,
        username:$stateParams.admin
    }
    //渲染账户管理列表请求
    accountService.getAccountManage(params).then(function successCallback(response) {
        console.log(response);
        if (response.data.code ===0) {
            $scope.list = response.data.data.rows[0].t;
            console.log($scope.list);
            //状态保存
            //当前页数
            $scope.pagenum = $stateParams.page
            $scope.text1 = $stateParams.admin;
            // $scope.rolea = $stateParams.role ;
            $scope.bigTotalItems = response.data.data.total;
            $scope.bigCurrentPage = $stateParams.page;
            $scope.maxSize = 5;
            var roleslist = response.data.data.rows[0].roleVOS;
            for (let i = 0; i < roleslist.length; i++) {
                const item = roleslist[i];
                var key = "site";
                item[key]=item["roleName"];
                delete item["roleName"];
            };
            // var all = {site:"全部",id:""}
            // roleslist.unshift(all)
            $scope.rolelist  = roleslist; 
        }else{
            modalBox.alert(response.data.msg)
        }
       
    });
    if($stateParams.role){
        console.log("123456")
    $scope.rolea = parseInt($stateParams.role)  ;

    }

    //搜索功能
    $scope.searchon = function () {
        $state.go("pageTab.accountManage",{
            role:$scope.rolea,
            admin:$scope.text1
        },{
            reload:true
        });
    };
    //重置功能
    $scope.rest = function () {
        $state.go("pageTab.accountManage",{
            role:null,
            admin:null
        },{
            reload:true
        });
    };
     //点击跳转页数
     $scope.entry = function () {
        $state.go("pageTab.moduleManage",{
          page:$scope.pagenum
        },{
          reload:true
        })
      }
    //跳页正则判断
    $scope.changepage = function () {
        $scope.pagenum = $scope.pagenum.replace(/[^\d]/g,'');
        if (parseInt($scope.pagenum)===0) {
            $scope.pagenum=1
            
        }  
    }
    // 翻页
    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.bigCurrentPage);
        $state.go("pageTab.accountManage",{
            page:$scope.bigCurrentPage
        },{
            reload:true
        });
    };
});