angular.module('myApp')
    .factory('ajaxUrl',function () {
        return {
            /*********************
             *微信授权登录/获取用户信息
             **********************************/
            // 发送code
            userInfo:function () {
                return  '/u/login';
            },
            /********************
             * 签到
             **********************************/
            //签到页面展示/同用户签到
            userSign:function (id) {
                return '/u/sign/'+id

            },
            /********************
             * 学生卡
             **********************************/
            //学生证同学生资料编辑
            studentInfo:function (id) {
                return '/u/user/'+id
            },
            //文章收藏列表
            favoArticleList:function (id) {
                return '/u/user/' + id + '/article'
            },
            //视频收藏列表
            favoVideoList:function (id) {
                return '/u/user/' + id + '/video'
            },
            //手机验证码/同手机绑定
            getTelCode:function (id) {
                return '/u/user/'+id+'/tel'
            },
            //邮箱验证码/同邮箱绑定
            getEmailCode:function (id) {
                return '/u/user/'+id+'/email'
            },


            //获取文章列表
            getArticleList_url:function () {
                return '/u/article'
            },
            //获取文章banner图片
            getArticleBanner_url:function () {
                return "/u/article/banners"
            },
            //获取文章详情
            getArticle_url:function (id) {
                return '/u/article/'+id
                
            },
            //文章点赞收藏
            putArticleLike_url:function (id) {
                return '/u/article/'+id
                
            },
            //获取视频列表
            getVideoList_url:function () {
                return '/u/videos'
                
            },
            //获取视频banner图
            getVideoBanner_url:function () {
                return '/u/video/banners'
                
            },
            //获取视频详情
            getVideo_url:function () {
                return '/u/video'
                
            },
            //视频点赞收藏
            putVideoLike_url:function () {
                return '/u/video'
                
            },




            
          

            /********************
             * 文学部
             **********************************/
        }
    });