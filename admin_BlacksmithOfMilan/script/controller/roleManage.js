/*
code by cxx1225,coding is interesting--2018.8.11 22:50*
*/
angular.module('myApp')
.controller('RoleManage',function ($scope,$http,$state,$stateParams,roleManage,modalBox) {
    // let vm=this;
    $scope.aid=sessionStorage.getItem('aid');//用户id
    $scope.result=JSON.parse(sessionStorage.getItem('result'));
    $scope.showList=JSON.parse(sessionStorage.getItem('showList'));
    $scope.showResult=JSON.parse(sessionStorage.getItem('showResult'));
    if(!$scope.aid){
        $scope.showResult=false;
        $scope.showList=true;
        sessionStorage.setItem('showList',JSON.stringify($scope.showList));
        sessionStorage.setItem('showResult',JSON.stringify($scope.showResult));
        roleManage.getRoleList().then(function (res) {
            if(res.data.code===0){
                console.log(res);
                $scope.roleList=res.data.data.rows;
                sessionStorage.setItem('roleList',JSON.stringify($scope.roleList));
                $scope.total=res.data.data.total;
                $scope.page=res.data.data.page;
                $scope.size=res.data.data.pagesize;
            }
        });
    }
    $scope.roleList=JSON.parse(sessionStorage.getItem('roleList'));
    console.log($scope.roleList);
    $scope.search=function () {
        if($scope.aid){
            $('.footer').hide();
            $scope.showResult=true;
            $scope.showList=false;
            sessionStorage.setItem('showList',JSON.stringify($scope.showList));
            sessionStorage.setItem('showResult',JSON.stringify($scope.showResult));
            roleManage.searchRole($scope.aid).then(function (res) {
                if(res.data.code===0){
                    sessionStorage.setItem('aid',$scope.aid);
                    $scope.result=res.data.data;
                    sessionStorage.setItem('result',JSON.stringify($scope.result));
                    $state.go($state.current, {}, {reload:true})
                }
            })
        }else{//选择全部即$scope.rid=undefined时
            sessionStorage.removeItem('aid');
            sessionStorage.removeItem('result');
            $state.go($state.current,{},{reload:true});
        }
    };
    //删除角色
    $scope.deleteRole=function (id) {
        modalBox.confirm('确定删除该角色吗？',function(){
            roleManage.deleteRole(id).then(function (res) {
                if(res.data.code===0){
                    $state.go($state.current,{},{reload:true});
                    modalBox.alert('删除成功');
                }else{
                    modalBox.alert(res.data.msg)
                }
            })
        })
    };
    //编辑角色
    $scope.editRole=function (id) {
        $state.go('pageTab.roleDetails',{
            id: id
        })
    };
    //新增
    $scope.addRole=function () {
        $state.go('pageTab.roleDetails')
    };
});