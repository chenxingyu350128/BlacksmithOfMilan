angular.module('myApp')
.controller('ArticleCtrl',function ($scope,$http,$log,$state,$stateParams,projectService,modalBox,clickPng) {
    console.log($stateParams.id);
    let vm=this;
    vm.userId = JSON.parse(sessionStorage.getItem('userId'));
    var id = vm.userId;
    var params = {
        uid: vm.userId,
        aid:$stateParams.id
    };
    //获取文章详情
    projectService.getArticle(id,params).then(function successCallback(response) {
        console.log(response);
        if (response.data.code==0) {
            vm.list = response.data.data;
            vm.liked = response.data.data.liked;
            vm.collected = response.data.data.collected;
            sessionStorage.setItem('liked',JSON.stringify(vm.liked));
            sessionStorage.setItem('collected',JSON.stringify(vm.collected));
        }else{
            modalBox.alert(response.data.msg)
        }
    });
    //点赞
    let liked=JSON.parse(sessionStorage.getItem('liked'));
    let collected=JSON.parse(sessionStorage.getItem('collected'));
    console.log(liked);
    console.log(collected);
    vm.whiteup = liked?false:true;
    vm.redup = !vm.whiteup;
    vm.whiteheart = collected?false:true;
    vm.redheart = !vm.whiteheart;
    console.log('no $');
    vm.redclick = function () {
        vm.liked=!vm.liked;
        vm.whiteup=!vm.whiteup;
        vm.redup=!vm.whiteup;
        var params = {
            uid: vm.userId,
            id:$stateParams.id,
            action:1,
        };
        //点赞请求
        projectService.putArticleLike(params).then(function successCallback(response) {
            console.log(response);
            if(response.data.code===0){
                console.log('liked__success');
                $state.go($state.current,{},{reload:true});
            }else{
                modalBox.alert(response.data.msg)
            }
        })
    };
    //收藏
    vm.whiteclick = function () {
        vm.collected=!vm.collected;
        vm.whiteheart=!vm.whiteheart;
        vm.redheart=!vm.whiteup;
        var params = {
            uid: vm.userId,
            id:$stateParams.id,
            action:0
        };
        //收藏请求
        projectService.putArticleLike(params).then(function successCallback(response) {
            console.log(response);
            if(response.data.code===0){
                console.log('collect__success');
                $state.go($state.current,{},{reload:true});
            }else{
                modalBox.alert(response.data.msg)
            }
        })
    };
    vm.notKeep=clickPng[0];
    vm.keep=clickPng[1];
    vm.dislike=clickPng[2];
    vm.like=clickPng[3];
    vm.likeSrc=function(e){
        return e===0?vm.dislike:vm.like;
    };
    vm.collectSrc=function(e){
        return e===0?vm.notKeep:vm.keep;
    };
});