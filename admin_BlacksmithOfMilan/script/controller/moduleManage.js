angular.module('myApp')
.controller('ModuleManage',function ($scope,FileUploader,$http,$log,$state,$stateParams,moduleService,modalBox) {
  //新增
  $scope.addText = function () {
    $state.go("pageTab.moduleDetails");
  }
  //编辑
  $scope.onlineEditor = function (id) {
    $state.go("pageTab.moduleDetails",{
      id:id
    },{
    });
  };
  //删除数据
  $scope.delete = function (id) {
    modalBox.confirm( "是否删除此条数据",function () {
      var userid =id
      moduleService.deleteModuleDetails(userid).then(function successCallback(response) {
        console.log(response)
        if (response.data.code === 0) {
          console.log('删除成功')
          $state.go("pageTab.moduleManage",{
          },{
            reload:true
          })
        }else{
          modalBox.alert(response.data.msg)
        }
      });                    
    }) 
  }
  //获取模块列表数据
  var params = {
    page:$stateParams.page
  }
  moduleService.getModuleManage(params).then(function successCallback(response) {
    console.log(response)
    if (response.data.code===0) {
      $scope.modulelist = response.data.data.rows;
      //页数保存
      $scope.pagenum = $stateParams.page
      //分页
      $scope.bigTotalItems = response.data.data.total;
      $scope.bigCurrentPage = $stateParams.page;
      $scope.maxSize = 5; 
    }else{
      modalBox.alert(response.data.msg)
  }
   
  }
  , function errorCallback(response) {
    // 请求失败执行代码
  });
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
    $state.go("pageTab.moduleManage",{
      page:$scope.bigCurrentPage
    },{
      reload:true
    })
  };
});