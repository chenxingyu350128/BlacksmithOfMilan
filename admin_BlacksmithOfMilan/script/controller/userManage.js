angular.module('myApp')
.controller('UserManage',function ($scope,$http,$state,$stateParams,userManage,gradesites,statusList,modalBox) {
    // let vm=this;
    $scope.gradeList=gradesites;
    console.log($scope.gradeList);
    $scope.statusList=statusList;
    $scope.page=$stateParams.page;
    $scope.size=$stateParams.size;
    $scope.userId=$stateParams.userId;
    $scope.nickName=$stateParams.nickName;
    $scope.grade=$stateParams.grade;
    $scope.tel=$stateParams.tel;
    $scope.email=$stateParams.email;
    $scope.status=$stateParams.status;
    $scope.address=$stateParams.address;
    $scope.minScore=$stateParams.minScore;
    $scope.maxScore=$stateParams.maxScore;
    //获取用户列表
    userManage.getUserList().then(function (res) {
        if(res.data.code===0){
            $scope.userList = res.data.data.rows;
            $scope.size = res.data.data.pagesize;
            $scope.total = res.data.data.total;
            sessionStorage.setItem('userTotal',JSON.stringify($scope.total));
            $scope.page = res.data.data.page;
        }else{
            modalBox.alert(res.data.msg);
        }
    });
    $scope.total=JSON.parse(sessionStorage.getItem('userTotal'));
    //清除带的参数
    let clearData={
        page: 1,
        size: $scope.size,
        userId: undefined,
        nickName: undefined,
        grade: undefined,
        tel: undefined,
        email: undefined,
        status: undefined,
        minScore: undefined,
        maxScore: undefined,
        address: undefined
    };
    //按条件搜索学生
    $scope.search=function(){
        $state.go($state.current,
            {
                page: $scope.page,
                size: $scope.size,
                userId: $scope.userId,
                nickName: $scope.nickName,
                grade: $scope.grade,
                tel: $scope.tel,
                email: $scope.email,
                status: $scope.status,
                minScore: $scope.minScore,
                maxScore: $scope.maxScore,
                address: $scope.address
            },
            {reload:true})
    };
    //清空搜索项
    $scope.clear=function(){
        $state.go($state.current,clearData,{reload:true})
    };
    //查看学生详细信息
    $scope.viewUser=function (userId) {
        $state.go('pageTab.userDetails',{userId:userId})
    };
    //冻结，解冻操作
    $scope.freeze=function (userId,userStatus) {
        if(userStatus){
            $scope.preCoast='确认冻结该用户吗？';
            $scope.appCoast='冻结成功！';
        }else{
            $scope.preCoast='确认解冻该用户吗？';
            $scope.appCoast='解冻成功！';
        }
        modalBox.confirm($scope.preCoast,function () {
            userManage.userStatusManage(userId).then(function (res) {
                if(res.data.code===0){
                    $state.go($state.current,{},{reload:true});
                    modalBox.alert($scope.appCoast);
                }else{
                    modalBox.alert(res.data.msg);
                }
            });
        });
    }
});