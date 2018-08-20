var myApp = angular.module("myApp",[ 'ui.router','ui.bootstrap','ngAnimate', 'ngSanitize','ng.ueditor','angularFileUpload','oc.lazyLoad'])
console.log("你好")
myApp.config(function ($stateProvider,$urlRouterProvider) {
    let lazy = function (loading) {
        return ['$ocLazyLoad',function ($ocLazyLoad) {
            return $ocLazyLoad.load(loading)
        }]
    };
    $urlRouterProvider.otherwise('/backstagelogin');
    $stateProvider
    //风琴菜单
    .state("pageTab", {
        url: "/pageTab?page&size&username&userId&",
        templateUrl: "views/pageTab.html",
        controller: 'accordion',
        controllerAs: 'vm',
        //懒加载的对象写法
        // resolve:{
        //     loadMyFile:lazy([
        //         "script/controller/accordion.js"
        //     ])
        // },
        //懒加载的完整写法
        resolve:{  
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load("script/controller/accordion.js");
            }]
        } 
    })
    //后台登陆
    .state("backstagelogin", {
        url: "/backstagelogin",
        templateUrl: "views/backstagelogin.html",
        controller:'Backstagelogin',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/backstagelogin.js"
            ])
        }
    })
    //学生管理
    .state("pageTab.userManage", {
        url: "/userManage?pagesize&userId&nickName&grade&tel&email&status&minScore&maxScore&address",
        templateUrl: "views/userManage.html",
        controller: 'UserManage',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                'style/userManage.css',
                'script/controller/userManage.js',
                'script/directive/pagination/pagination.js'
            ])
        }
    })
    // 学生详情
    .state("pageTab.userDetails", {
        url: "/userDetails",
        templateUrl: "views/userDetails.html",
        controller: 'UserDetails',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                'style/userDetails.css',
                'script/controller/userDetails.js'
            ])
        }
    })
    //文章列表
    .state("pageTab.articleList", {
        url: "/articleList?&size&title&author&type&status&minCollection&maxCollection&minLike&maxLike&id",
        templateUrl: "views/articleList.html",
        controller: 'ArticleList',  
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/articleList.js"
            ])
        }
    })
    //视频列表
    .state("pageTab.videoList", {
        url: "/videoList?pagesize=10&id&status&title&type&grade&subject&nickName&minLike&maxLike&minCollection&maxCollection",
        templateUrl: "views/videoList.html",
        controller:'VideoList',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                'script/controller/videoList.js'
            ])
        },
    })
    //账户管理
    .state("pageTab.accountManage", {
        url: "/accountManage?role&admin",
        templateUrl: "views/accountManage.html",
        controller:'AccountManage',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/accountManage.js"
            ])
        }
    })
    //文章详情
    .state("pageTab.articleDetails", {
        url: "/articleDetails?id&author",
        templateUrl: "views/articleDetails.html",
        controller: 'ArticleDetails',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/articleDetails.js"
            ])
        }  
    })
    //视频详情
    .state("pageTab.videoDetails", {
        url: "/videoDetails?&id&status&title&type&grade&subject&nickName&bannerUrl&videoUrl&abstractVideo&textVideo",
        templateUrl: "views/videoDetails.html",
        controller: 'VideoDetails',
        controllerAs: 'vm',  
        resolve:{
            loadMyFile:lazy([
                "script/controller/videoDetails.js"
            ])
        },
    })
    //添加老师
    .state("pageTab.addTearcher", {
        url: "/addTearcher",
        templateUrl: "views/addTearcher.html",
        controller: 'AddTearcher',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "style/addTearcher.css",
                "script/controller/addTearcher.js",
            ])
        }  
    })
    //bannner管理
    .state("pageTab.bannerManage", {
        url: "/bannerManage",
        templateUrl: "views/bannerManage.html",
        controller: 'BannerManage',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/bannerManage.js"
            ])
        }  
    })
    //角色管理
    .state("pageTab.roleManage", {
        url: "/roleManage?page&pagesize",
        templateUrl: "views/roleManage.html",
        controller: 'RoleManage',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/roleManage.js",
                'script/directive/rolePagination/rolePagination.js',
                'style/roleManage.css'
            ])
        }  
    })
    //模块管理
    .state("pageTab.moduleManage", {
        url: "/moduleManage",
        templateUrl: "views/moduleManage.html",
        controller: 'ModuleManage',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/moduleManage.js"
            ])
        }  
    })
    //修改密码
    .state("pageTab.passwordChange", {
        url: "/passwordChange",
        templateUrl: "views/passwordChange.html",
        controller: 'PasswordChange',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/passwordChange.js"
            ])
        }  
    })
    //账户详情
    .state("pageTab.accountDetails", {
        url: "/accountDetails?id",
        templateUrl: "views/accountDetails.html",
        controller: 'AccountDetails',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/accountDetails.js"
            ])
        }  
    })
    //角色详情
    .state("pageTab.roleDetails", {
        url: "/roleDetails?id",
        templateUrl: "views/roleDetails.html",
        controller: 'RoleDetails',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                'script/controller/roleDetails.js',
                'style/roleDetail.css',
                'script/directive/forNg-repeatDom.js'
            ])
        }  
    })
    //模块详情
    .state("pageTab.moduleDetails", {
        url: "/moduleDetails?id",
        templateUrl: "views/moduleDetails.html",
        controller: 'ModuleDetails',
        controllerAs: 'vm',
        resolve:{
            loadMyFile:lazy([
                "script/controller/moduleDetails.js"
            ])
        }  
    })
});
