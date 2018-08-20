angular.module('myApp')
.controller('HomeCtrl',function ($http,$state,projectService,modalBox) {
    let vm=this;
    function getQueryString(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
    console.log(getQueryString('code'));
    // // 如果code码有值并且sessionStorage的token没有值时（即第一次进入页面），发送code，获取token
    if(getQueryString('code')&& !sessionStorage.getItem('userInfo')){
        let code = getQueryString('code');
        console.log(code);
        projectService.getUserInfo(code).then(function (res) {
            console.log(res);
            if(res.data.code === 0){
                console.log(res);
                sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
                vm.userId=res.data.data.id;
                sessionStorage.setItem('userId',JSON.stringify(vm.userId));
            }else if(res.data.code=96) {
               modalBox.confirm('账户状态异常，请联系管理员');
               vm.forbid=true;
            }
        })
    }
    vm.unfinished=function(){
        $state.go('building')
    };
});