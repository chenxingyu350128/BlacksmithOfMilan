myApp.factory('$request', function ($http, $q, url) {
    let service = {};
    service.ajax = function (method, url, data, headers) {
        var defer = $q.defer();
        $http({
            method: method,
            url: url,
            params: data,
            headers: headers
        }).then(function (res) {
                defer.resolve(res);
            },
            function (xhr) {
                defer.reject(res);
            });
        return defer.promise;
    };
    return service;
}).factory('articleService', function ($http, ajaxUrl) {
    return {
        //获取文章列表
        getArticleList: function (params) {
            return $http.get(ajaxUrl.getArticleList_url(), {
                params: params
            })
        },
        //文章上下架
        putArticleList: function (cid) {
            return $http.put(ajaxUrl.putArticleList_url(cid), {
                
            })
            
        },
        //获取文章详情
        getArticleDetails: function (id,params) {
            return $http.get(ajaxUrl.getArticleDetails_url(id), {
                params: params
            })
        },
        //文章新增和编辑保存
        postArticleDetails: function (data) {
            return $http.post(ajaxUrl.postArticleDetails_jurl(), data)
        },



    
    }
}).factory("videoService",function ($http, ajaxUrl) {
    return{
        //获取视频模块列表
        getVideoList: function (params) {
            return $http.get(ajaxUrl. getVideoList_url(), {
                params: params
            })
        },
        //视频上下架
         putVideoList: function (data) {
            return $http.put(ajaxUrl.putVideoList_url(data), data)
            
        },
        //视频详情
        getVideoDetails: function (id,params) {
            return $http.get(ajaxUrl.getVideoDetails_url(id), {
                params: params
            })
        },
        //更新/增加视频
        postVideoDetails: function (data) {
            return $http.post(ajaxUrl.postVideoDetails_jurl(), data)
        },
        //获取所有老师
        getTeacherlist: function (params) {
            return $http.get(ajaxUrl.getTeacherlist_url(), {
                params: params
            })
        },
        //删除老师
        deleteTeacher: function (id,params) {
            return $http.delete(ajaxUrl.deleteTeacher_url(id), {
                params: params
            })
        },
        //添加老师
        postTeacher: function (params) {
            return $http({
                method: 'post',
                url: ajaxUrl.postTeacher_url(),
                params: params,
            })
        },
    }
}).factory('moduleService', function ($http, ajaxUrl) {
    return {
        //获取模块列表
        getModuleManage: function (params) {
            return $http.get(ajaxUrl.getModuleManage_url(), {
                params: params
            })
        },
        //增加模块
        postModuleDetails: function (data) {
            return $http.post(ajaxUrl.postModuleDetails_url(), data)
        },
        //编辑模块
        putModuleDetails: function (data) {
            return $http.put(ajaxUrl.putModuleDetails_url(), data)
        },
        //删除模块
        deleteModuleDetails: function (id,params) {
            return $http.delete(ajaxUrl.deleteModuleManage_url(id), {
                params:params
            })
        },
        //模块详情
        getModuleDetails: function (id,params) {
            return $http.get(ajaxUrl.getModuleDetails_url(id), {
                params: params
            })
        },
        //注销
        getLogout: function () {
            return $http.get(ajaxUrl.getLogout_url(), {
                
            })
        },
        //获取用户模块数据
        postRole: function () {
            return $http.post(ajaxUrl.postRole_url(), {
                
            })
        },
    }
}).factory('accountService',function ($http,ajaxUrl) {
    return {
        //账户列表
        getAccountManage: function (params) {
            // return $http.get(ajaxUrl.getAccountManage_url(), {
            //     params: params
            // })
            return $http({
                method: 'get',
                url: ajaxUrl.getAccountManage_url(),
                params: params,
            })
        },
        // 新增/更新用户
        postAccountDetails: function (params) {
            return $http({
                method: 'post',
                url: ajaxUrl.postAccountDetails_url(),
                params: params,
            })
        },
         //删除用户
        deleteAccountManage: function (id,params) {
            return $http.delete(ajaxUrl.deleteAccountManage_url(id), {
                params: params
            })
        },
        //账户角色信息
        getAccountDetails: function (id,params) {
            
            return $http({
                method: 'get',
                url: ajaxUrl.getAccountDetails_url(id),
                params: params,
            })
        },
        //修改密码
        postPasswordChange: function (id,params) {
            // return $http.post(ajaxUrl.postPasswordChange_url(id), {
            //     params: params
            // })
            return $http({
                method: 'post',
                url: ajaxUrl.postPasswordChange_url(id),
                params: params,
            })
        },
    }
    //用户管理（学生）
}).factory('userManage',function($http,ajaxUrl,$stateParams) {
    return {
        //冻结/解冻
        userStatusManage: function (id) {
            return $http.put(ajaxUrl.userManage(id), {
                params: $stateParams
            })
        },
        //获取用户列表
        getUserList: function(id){
            return $http.get(ajaxUrl.getUserList(id),{params: $stateParams});
        },//用户详情
        getUserDetail: function(id){
            return $http.get(ajaxUrl.getUserDetail(id),{params: $stateParams});
        },//后台登录
        login: function (username,password) {
            return $http({
                method: 'POST',
                url: ajaxUrl.login(),
                params: {
                    username: username,
                    password: password
                }
            })
        }
    }//角色管理（管理人员）
}).factory('roleManage',function ($http,$stateParams,ajaxUrl) {
    return {
        getRoleList: function () {
            return $http({
                method: 'GET',
                url: ajaxUrl.getRoleList(),
                params: $stateParams,
                dataType: 'json'
            })
        },
        searchRole: function (id) {
            return $http({
                method: 'GET',
                url: ajaxUrl.handleRole(id),
                params: $stateParams,
                dataType: 'json'
            })
        },
        deleteRole: function (id) {
            return $http({
                method: 'DELETE',
                url: ajaxUrl.handleRole(id),
                params: $stateParams,
                dataType: 'json'
            })
        },
        addRole: function(DTO){
            return $http({
                method: 'POST',
                url: ajaxUrl.getRoleList(),
                data: DTO

            })
        },
        editRole: function(id,DTO){
          return $http({
              method: 'PUT',
              url: ajaxUrl.handleRole(id),
              data: DTO

          })
        },
        addPermission: function(){
            return $http({
                method: 'GET',
                url: ajaxUrl.addPermission(),
                params: $stateParams
            })
        },
        editPermission: function(id){
            return $http({
                method: 'GET',
                url: ajaxUrl.editPermission(id),
                params: $stateParams
            })
        }
    }
});