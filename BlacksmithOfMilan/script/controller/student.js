angular.module('myApp')
    .controller('StudentCardCtrl',function ($http,$state,$stateParams,projectService,modalBox) {
        let vm=this;
        vm.id=JSON.parse(sessionStorage.getItem('userId'));
        projectService.getStudentInfo(vm.id).then(function (res) {
            console.log(res);
            if (res.data.code===0){
                vm.uData=res.data.data;
                vm.username=vm.uData.nickName;
                vm.grade=vm.uData.grade||1;
                vm.beans=vm.uData.score;
                vm.avatar=vm.uData.avatar;
                vm.tel=vm.uData.tel;
                vm.email=vm.uData.email;
            }
           else{
                modalBox.alert(res.data.msg)
            }
        });
        vm.closeApp=function(){
            wx.closeWindow()
        };
        vm.back=function(){
            $state.go('home');
        };
        vm.studentEdit=function(){
          $state.go('studentEdit')
        };
        vm.myKeep=function(){
           $state.go('myKeep')
        };
        vm.accountSet=function(){
            $state.go('bindingInfo')
        };
    });