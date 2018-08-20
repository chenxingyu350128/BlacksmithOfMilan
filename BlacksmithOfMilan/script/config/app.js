let app=angular.module('myApp',['ui.router','ngMessages','ui.bootstrap','oc.lazyLoad'])
.config(function($stateProvider,$urlRouterProvider){
    let _ocLazy = function (file) {
        return ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load(file)
        }]
    };
    $urlRouterProvider.when('/','/home');
    $stateProvider
    .state('home',{
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'style/home.css',
                'script/controller/home.js'

            ])
        }
    })//签到页
    .state('building',{
        url: '/building',
        templateUrl: 'views/building.html',
        controller: 'Building',
        controllerAs: 'vm',
        resolve: {
            loadMyFiles : _ocLazy([
                'script/controller/building.js'
            ])
        }
    })
    .state('sign',{
        url: '/sign',
        templateUrl: 'views/sign.html',
        controller: 'SignCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFiles : _ocLazy([
                'style/sign.css',
                'script/controller/signIn.js'
            ])
        }
    })//学生证首页
    .state('student',{
        url: '/student',
        templateUrl: 'views/student.html',
        controller: 'StudentCardCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'style/student.css',
                'script/controller/student.js'
            ])
        }
    })//资料编辑
    .state('studentEdit',{
        url: '/student/edit',
        templateUrl: 'views/studentEdit.html',
        controller: 'StudentEditCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'style/studentEdit.css',
                // 'script/directive/uploadImage/uploadImage.js',
                'script/controller/studentEdit.js'
            ])
        }
    })//绑定
    .state('bindingInfo',{
        url: '/student/binding',
        templateUrl: 'views/bindingInfo.html',
        controller: 'BindCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'style/bindInfo.css',
                'script/controller/bindingInfo.js'
            ])
        }
    })//绑定成功页
    .state('bindSuccess',{
        url: '/student/bindOver',
        templateUrl: 'views/bindOver.html',
        controller: 'BindOverCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'script/controller/bindOver.js',
                'style/bindInfo.css'
            ])
        }
    })//文章列表
    .state('articleList',{
        url: '/articleList?size&page',
        templateUrl: 'views/articleList.html',
        controller: 'AListCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'script/controller/articleList.js',
                // "script/libs/iscroll.js",
                // 'script/controller/upload.js'

            ])
        }
    })//文章详情
    .state('article',{
        url: '/article?id&size',
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'script/controller/article.js'
            ])
        }
    })//视频列表
    .state('videoList',{
        url: '/videoList?size&grade&subject',
        templateUrl: 'views/videoList.html',
        controller: 'VListCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'script/controller/videoList.js',
                // 'script/controller/upload.js'
            ])
        }
    })//视频详情
    .state('video',{
        url: '/video?id',
        templateUrl: 'views/video.html',
        controller: 'VideoCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'script/controller/video.js'
            ])
        }
    })//学生证我的收藏
    .state('myKeep',{
        url: '/myKeep',
        templateUrl: 'views/myKeep.html',
        controller: 'MyKeepCtrl',
        controllerAs: 'vm',
        resolve: {
            loadMyFile: _ocLazy([
                'style/myKeep.css',
                'script/directive/forNg-repeatDom.js',
                'script/controller/myKeep.js',

            ])
        }
    })
});
app.run(function($state){
    $state.go('home');
});