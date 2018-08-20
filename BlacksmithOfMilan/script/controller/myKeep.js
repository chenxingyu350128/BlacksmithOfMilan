angular.module('myApp')
    .controller('MyKeepCtrl',function ($scope,$http,$state,$stateParams,projectService,modalBox,clickPng) {
        let vm=this;
        //返回
        vm.id=JSON.parse(sessionStorage.getItem('userId'));
        vm.backToCard=function () {
            $state.go("student")
        };
        //nav切换
        vm.choice=1;
        vm.favoriteVideo=function () {
            vm.choice=1;
        };
        vm.favoriteArticle=function () {
            vm.choice=2;
        };
        //文章获取
        projectService.favoAtcList(vm.id).then(function (res) {
            console.log(res);
            if(res.data.code===0){
                vm.AList=res.data.data.rows;
            }else{
                modalBox.alert(res.data.msg)
            }
        });
        //视频获取
        projectService.favoVdoList(vm.id).then(function (res) {
            console.log(res);
            if(res.data.code===0){
                vm.VList=res.data.data.rows;
            }else{
                modalBox.alert(res.data.msg)
            }
        });
        vm.numberLimited=function(text){
            if(!!text){
                let a=text.length>25;
                return  a?(text.substring(0,24)+'...'):text.substring(0,24);
            }
        };
        //点赞/收藏图标变化
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
        //跳转到对应视频
        vm.jumpToVideo=function (id,status) {
            if(!status){
                modalBox.alert('该视频已下架，无法观看')
            }else{
                $state.go('video',{id: id})
            }
        };
        //跳转到对应文章
        vm.jumpToArticle=function (id,status) {
            if(!status){
                modalBox.alert('该文章已下架，无法观看')
            }else{
                $state.go('article',{id: id})
            }
        }
    });