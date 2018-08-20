angular.module('myApp')
.factory('projectService', ['$http', 'ajaxUrl','$stateParams', '$httpParamSerializer', function ($http, ajaxUrl,$stateParams, $httpParamSerializer) {
    return {
        // 获取token值
        getUserInfo: function (code) {
            return $http.get(ajaxUrl.userInfo(),{
                params: {code: code},
            });
        },
        //获取服务器时间
        // getToday: function () {
        //     return $http.head(location.href);
        // },
        //取签到数据
        getSignList: function (id) {
            return $http.get(ajaxUrl.userSign(id), {params: $stateParams})
        },
        //存签到数据
        putSignList: function (id) {
            return $http.put(ajaxUrl.userSign(id),{id: id},{
                params: $stateParams,
                headers: {'Content-type': 'application/x-www-form-urlencoded'}
            })
        },
        //学生证信息
        getStudentInfo: function(id){
            return $http.get(ajaxUrl.studentInfo(id),{params: $stateParams});
        },
        //学生资料修改
        putStudentInfo: function(formData,id){
            return  $http({
                method: 'POST',
                url: ajaxUrl.studentInfo(id),
                data: formData,
                dataType: 'json',
                headers: {"Content-Type": undefined},
            })
        },
        //手机绑定/更改
        getTelCode: function(id,tel){
            return $http.get(ajaxUrl.getTelCode(id),{params: {tel: tel}})
        },
        bindTel: function(binding){
            return $http({
                method: 'PUT',
                url: ajaxUrl.getTelCode(binding.id),
                params: binding
            })
            
        },
        //邮箱绑定/更改
        getEmailCode: function(id,email){
            return $http.get(ajaxUrl.getEmailCode(id),{params:{email: email}})
        },
        bindEmail: function(binding){
            return $http({
                method: 'PUT',
                url: ajaxUrl.getEmailCode(binding.id),
                params: binding
            })
        },
        //文章收藏
        favoAtcList: function(id){
            return $http.get(ajaxUrl.favoArticleList(id),{params: {userId: id}})
        },
        //视频收藏
        favoVdoList: function(id){
            return $http.get(ajaxUrl.favoVideoList(id),{params: {userId: id}})
        },
        
        //文章列表
        getArticleList: function (params) {
            return $http({
                method: 'get',
                url: ajaxUrl.getArticleList_url(),
                params: params
                
            })
            
        },
        //获取文章banner图片
        getArticleBanner: function (params) {
            return $http({
                method: 'get',
                url: ajaxUrl.getArticleBanner_url(),
                params: params,
                
            })
            
        },
        //获取文章详情
        getArticle: function (id,params) {
            return $http({
                method: 'get',
                url: ajaxUrl.getArticle_url(id),
                params: params,
                
            })
            
        },
        //文章点赞收藏
        putArticleLike: function (params) {
            return $http({
                method: 'put',
                url: ajaxUrl.putArticleLike_url(params.id),
                params: params,
                
            })
            
        },
        //视频列表
        getVideoList: function (params) {
            return $http({
                method: 'get',
                url: ajaxUrl.getVideoList_url(),
                params: params,
                
            })
            
        },
        //获取视频banner图片
        getVideoBanner: function (params) {
            return $http({
                method: 'get',
                url: ajaxUrl.getVideoBanner_url(),
                params: params,
                
            })
            
        },
        //获取视频详情
        getVideo: function (uid,id) {
            return $http({
                method: 'get',
                url: ajaxUrl.getVideo_url(),
                params: {
                    uid: uid,
                    id: id
                },
                
            })
            
        },
        //视频点赞收藏
        putVideoLike: function (params) {
            return $http({
                method: 'put',
                url: ajaxUrl.putVideoLike_url(),
                params: params,
                
            })
            
        },
        
        
        
    }
}])
.factory('bootBox',function(){
    return {
        
    }
});