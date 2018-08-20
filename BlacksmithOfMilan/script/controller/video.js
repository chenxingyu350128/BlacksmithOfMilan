angular.module('myApp')
.controller('VideoCtrl',function ($scope,$http,$log,$state,$stateParams,projectService) {
  let vm=this;
  console.log($stateParams);
  vm.id=JSON.parse(sessionStorage.getItem('userId'));
  var id=$stateParams.id;

  projectService.getVideo(vm.id,id).then(function successCallback(response) {
    console.log(response)
    vm.list = response.data.data;
    //点赞
    if (vm.list.liked ==0) {
      vm.whiteup = true
      vm.redup = false
    }else{
      vm.whiteup = false
      vm.redup = true
    }
    vm.redclick = function () {
      if (vm.redup == true) {
        vm.redup = false
        vm.whiteup = true
        var params = {
          uid: vm.id,
          id:$stateParams.id,
          action:0,
          type:0
        }
        //点赞请求
        projectService.putVideoLike(params).then(function successCallback(response) {
          console.log(response)
        });
      }else if ( vm.whiteup == true) {
        vm.redup = true
        vm.whiteup = false
        var params={
          uid: vm.id,
          id:$stateParams.id,
          action:1,
          type:0
        };
        //点赞请求
        projectService.putVideoLike(params).then(function successCallback(response) {
          console.log(response)
        });
      }
    }
    //收藏
    if (vm.list.collected ==0) {
      vm.whiteheart = true;
      vm.redheart =false;
    }else{
      vm.whiteheart = false;
      vm.redheart =true;
    }
    vm.whiteclick = function () {
      if (vm.whiteheart == true) {
        vm.whiteheart = false
        vm.redheart =true
        var params = {
          uid: vm.id,
          id:$stateParams.id,
          action:1,
          type:1
        }
        projectService.putVideoLike(params).then(function successCallback(response) {
          console.log(response)
        });
      }else if (vm.redheart == true) {
        vm.whiteheart = true
        vm.redheart =false
        var params = {
          uid: vm.id,
          id:$stateParams.id,
          action:0,
          type:1
        }
        //收藏请求
        projectService.putVideoLike(params).then(function successCallback(response) {
          console.log(response)
        });     
      }
    }
  });
  //点赞
  vm.whiteup = true
  vm.redup = false
  vm.redclick = function () {
    if (vm.redup == true) {
      vm.redup = false
      vm.whiteup = true
      var params = {
        uid: vm.id,
        id:$stateParams.id,
        action:0,
        type:0
      }
      //点赞请求
      projectService.putVideoLike(params).then(function successCallback(response) {
        console.log(response)
      });
    }else if (vm.whiteup == true) {
      vm.redup = true
      vm.whiteup = false
      var params={
        uid: vm.id,
        id:$stateParams.id,
        action:1,
        type:0
      }
      projectService.putVideoLike(params).then(function successCallback(response) {
        console.log(response)
      });
    }
  }
});