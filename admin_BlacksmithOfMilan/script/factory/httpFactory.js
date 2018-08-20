myApp.factory('ajaxUrl', function () {
    return {
        //登录
        login: function(){
            return '/a/login'
        },
        //文章管理模块---------------------------------------------
        //文章列表接口
        getArticleList_url: function () {
            return '/a/article'
        },
        //文章上下架接口       
        putArticleList_url: function (cid) {
            return '/a/article/'+cid
        },
        //获取文章详情查看与编辑接口
        getArticleDetails_url: function (id) {
            return '/a/article/' +id
        },
        //文章新增和编辑保存
        postArticleDetails_jurl:function () {
            return '/a/article/'
        },
        //视频列表接口
        getVideoList_url:function () {
            return '/a/video/'
        },
        //视频上下架
        putVideoList_url:function (id,status,type) {
            return '/a/video/status'
        },
        //视频详情
        getVideoDetails_url:function (id) {
            return '/a/video/'+id
        },
        //更新/增加视频
        postVideoDetails_jurl:function () {
            return '/a/video/'
        },
        //获取所有老师
        getTeacherlist_url:function () {
            return '/a/teachers/'
        },
        //删除老师
        deleteTeacher_url:function (id) {
            return '/a/teacher/'+id
        },
        //添加老师
        postTeacher_url:function () {
            return '/a/teacher/'
        },
         //文章管理获取列表接口及新增
        getModuleManage_url : function () {
            return '/a/module/'
        },
        // 增加模块
        postModuleDetails_url: function () {
            return '/a/module/'
        },
        //编辑模块
        putModuleDetails_url: function () {
            return '/a/module/'
        },
        //删除模块
        deleteModuleManage_url: function (id) {
            return '/a/module/'+id
        },
        //模块详情
        getModuleDetails_url: function (id) {
            return '/a/module/'+id
        },
        //账户列表
        getAccountManage_url: function () {
            return '/a/buser/'
        },

        // 新增/更新用户
        postAccountDetails_url: function () {
            return '/a/buser/'
        },
        //删除用户
        deleteAccountManage_url: function (id) {
            return '/a/buser/'+id
        },
        //账户角色信息
        getAccountDetails_url: function (id) {
            return '/a/buser/'+id
        },
        //修改密码
        postPasswordChange_url: function (id) {
            return '/a/password/'+id
        },
        //注销/退出登录
        getLogout_url: function () {
            return '/a/logout/'
        },
        //获取账户模块数据
        postRole_url:function () {
            return '/a/afterlogin/'
        },
        //用户管理
        userManage: function (id) {
            return 'a/user/' + id
        },
        getUserList: function () {
            return 'a/user/'
        },
        getUserDetail: function (id) {
            return 'a/user/'+id
        },
        //角色管理
        getRoleList: function () {
            return 'a/role'
        },
        handleRole: function (id) {
            return 'a/role/'+id
        },
        addPermission: function () {
            return 'a/role/module'
        },
        editPermission: function (id) {
            return 'a/role/module/'+id
        }

    }
});