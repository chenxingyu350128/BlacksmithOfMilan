//******I done that cxx  --2018.8.14
angular.module('myApp')
.controller('RoleDetails',function ($scope,$http,$state,$stateParams,modalBox,roleManage) {
    $scope.id=$stateParams.id;
    $scope.title=$scope.id?'角色编辑':'角色新增';
    $scope.all=false;
    //全选/反选
    $scope.selectAll=function () {
        $scope.all=!$scope.all;
    };
    //取消按钮
    $scope.cancel=function () {
        modalBox.confirm('确定取消吗？',function () {
            $state.go('pageTab.roleManage');
        })
    };
    //页面载入标准模板data
    roleManage.addPermission().then(function (res) {
        if(res.data.code===0){
            console.log(res);
            $scope.list=res.data.data;
        }
    });
    // if($scope.id){
    //
    // }
    //初始化数组
    let editId=[],
        commitId=[],
        rootId=[];
    $scope.$on('ngRepeatFinished', function () {  //点击事件，收集要上传的ID
        if($scope.id) {
            roleManage.editPermission($scope.id).then(function (res) {
                if(res.data.code===0){
                    console.log(res);
                    $scope.getlist=res.data.data.modules;
                    $scope.roleName=res.data.data.roleName;
                    for (let i = 0; i < $scope.getlist.length; i++) {
                        let z=commitId.includes($scope.getlist[i].id);
                        if(!z){
                            rootId.push($scope.getlist[i].id);
                        }
                        for (let j = 0; j < $scope.getlist[i].sonModules.length; j++) {
                            let z=commitId.includes($scope.getlist[i].sonModules[j].id);
                            if(!z){
                                editId.push($scope.getlist[i].sonModules[j].id)
                            }
                        }
                    }
                    commitId=editId.concat(rootId);
                    let units = $('.permission').find('.unit');
                    let roots = $('.permission').find('.root');
                    for (let i = 0; i < units.length; i++) {
                        let value = parseInt(units[i].value);
                        if (commitId.includes(value)) {
                            units[i].checked = true;
                        }
                    }
                    for (let i = 0; i < roots.length; i++) {
                        let value = parseInt(roots[i].value);
                        if (commitId.includes(value)) {
                            roots[i].checked = true;
                        }
                    }
                }else{
                    modalBox.alert(res.data.msg)
                }

            });
            console.log(rootId);
            console.log(editId);
            commitId=editId.concat(rootId);
            console.log(commitId);
            //初始数据渲染
            let units = $('.permission').find('.unit');
            let roots = $('.permission').find('.root');
            for (let i = 0; i < units.length; i++) {
                let value = parseInt(units[i].value);
                if (commitId.includes(value)) {
                    units[i].checked = true;
                }
            }
            for (let i = 0; i < roots.length; i++) {
                let value = parseInt(roots[i].value);
                if (commitId.includes(value)) {
                    roots[i].checked = true;
                }
            }
        }
        //点击勾选
        $scope.single=function (yid,xid) {
            //子ID增删
            let v=commitId.indexOf(yid);
            v<0?commitId.push(yid):commitId.splice(v,1);
//******父ID增删判断条件搭建开始
            let lv1 = $('.permission').find('.mainHeader');
            console.log(lv1);
            let box1=[];
            for(let i=0;i<lv1.length;i++){
                let lv2=lv1.eq(i).find('.unit');
                console.log(lv2);
                let box2=[];
                for(let j=0;j<lv2.length;j++){
                    box2[j]=parseInt(lv2[j].value);
                }
                box1[i]=box2;
            }
            console.log(box1);
            let judge=[
                box1[0].some(pass),
                box1[1].some(pass),
                box1[2].some(pass)
            ];
            function pass(arr){
                return commitId.includes(arr)
            }
//******父ID增删判断条件搭建完毕
         //父ID增删
            let roots = $('.permission').find('.root');
            roots[xid-1].checked = judge[xid-1];
            let z=commitId.indexOf(xid);
            if(z===-1&&judge[xid-1]){
                commitId.push(xid);
            }
            if(z>=0&&!judge[xid-1]){
                commitId.splice(z,1);
            }
            console.log(commitId);
        };
        //保存提交
        $scope.save=function () {
            sessionStorage.setItem('commitId',JSON.stringify(commitId));
            console.log(commitId);
            $scope.ids=$scope.all?[1,2,3,4,5,6,7,8,9,10]:commitId;
            let roleModuleDTO={
                ids: $scope.ids,
                roleName: $scope.roleName
            };//三目运算符
            modalBox.confirm($scope.id?'是否保存此次编辑？':'是否确定新增该管理员？',$scope.id?function () {
                console.log(commitId);
                roleManage.editRole($scope.id,roleModuleDTO).then(function (res) {
                    console.log(res);
                    if(res.data.code===0){
                        $state.go('pageTab.roleManage');
                        modalBox.alert('编辑成功');
                    }else{
                        modalBox.alert(res.data.msg)
                    }
                })
                }:function () {
                roleManage.addRole(roleModuleDTO).then(function (res) {
                    console.log(res);
                    if(res.data.code===0){
                        $state.go('pageTab.roleManage');
                        modalBox.alert('新增成功');
                    }else{
                        modalBox.alert(res.data.msg)
                    }
                })
                }
            );
        };
    });
});