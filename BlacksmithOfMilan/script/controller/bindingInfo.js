angular.module('myApp')
    .controller('BindCtrl',function ($state,projectService,modalBox) {
        let vm=this;
        vm.id=JSON.parse(sessionStorage.getItem('userId'));
        projectService.getStudentInfo(vm.id).then(function(res){
            if(res.data.code===0){
                console.log(res);
                vm.Email=res.data.data.email||'未设置';
                vm.Tel=res.data.data.tel||'未设置';
            }else{
                modalBox.alert(res.data.msg);
            }
        });
        //返回
        vm.backToCard=function(){
            $state.go("student")
        };
        //绑定/重绑
        vm.modify=function () {
           $state.go("bindSuccess")
        }
    });