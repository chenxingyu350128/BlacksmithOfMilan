console.log("这是文章详情页面")
angular.module('myApp')
.controller('ArticleDetails',function ($scope,FileUploader,$http,$log,$state,$stateParams,articleService,types,modalBox) {
    if ($stateParams.id&&$stateParams.author==undefined) {
        //富文本
        $scope.conta = true;
        $scope.button1 = true
        $scope.button2 = true
        //编辑页面保存数据跳转文章列表
    }else if ($stateParams.author) {
        console.log("这是查看页面");
        // 禁用编辑功能
        // editor.$textElem.attr('contenteditable', false)
        $scope.buttonshow = true
        $scope.onebutton = "返回"
        $scope.onlick = function () {
            $state.go("pageTab.articleList");
        }
        //文本内容
        $scope.textare = true;
        $scope.one = true;
        $scope.two = true;
        $scope.three = true;
        $scope.four = true;
        $scope.five = true;
        $scope.six = true;
        var id = $stateParams.id;
    }else{
        //富文本
        $scope.conta = true;
        $scope.button1 = true
        $scope.button2 = true
    }
    //获取详情数据
    if ($stateParams.id) {
        var id = $stateParams.id;
        articleService.getArticleDetails(id).then(function successCallback(response) {
            console.log(response);
            if (response.data.code===0) {
                $scope.content = response.data.data;
                // 标题
                $scope.titletext = $scope.content.title;
                // 类型
                $scope.typeselect = $scope.content.type.toString();
                // 图片
                $scope.iconUrl = $scope.content.cover;
                // 作者
                $scope.authortext = $scope.content.author;
                //摘要
                $scope.abstracttext =$scope.content.abstractArticle;
                //正文
                editor.txt.text($scope.content.textArticle) 
                $scope.abstracttext2 = $scope.content.textArticle
                sessionStorage.setItem("abstractArticle",$scope.content.abstractArticle)    
            }else{
                modalBox.alert(response.data.msg)
            }
            
        });
    }
    //点击保存
    $scope.onkeep = function () {
        if ($scope.cover==undefined) {
            $scope.articleImg = $scope.iconUrl
        }else{
            $scope.articleImg = $scope.cover
        }
        var abstractArticle = sessionStorage.getItem("abstractArticle")
        modalBox.confirm( "是否选择保存",function () {
            if ($stateParams.id) {
                var data = {
                    id:$stateParams.id,
                    status:1,
                    title: $scope.titletext,
                    type:$scope.typeselect,
                    cover: $scope.articleImg,
                    author:$scope.authortext,
                    abstractArticle:abstractArticle,
                    textArticle:editor.txt.text()
                }
                
            }else{
                var data = {
                    id:$stateParams.id,
                    status:1,
                    title: $scope.titletext,
                    type:$scope.typeselect,
                    cover: $scope.articleImg,
                    author:$scope.authortext,
                    abstractArticle:$scope.authortext,
                    textArticle:editor.txt.text()
                }

            }
        
            articleService.postArticleDetails(data).then(function successCallback(response) {
                console.log(response);
                if (response.data.code == 0) {
                    $state.go("pageTab.articleList");
                }else{
                    modalBox.alert(response.data.msg)
                }
            });                    
        }) 
    }
    //取消跳转列表页面
    $scope.cancel = function () {
        modalBox.confirm( "是否选择取消",function () {
            $state.go("pageTab.articleList")                    
        }) 
    }
    //状态下拉菜单
    $scope.typesites = types
    //图片上传
    let uploader = $scope.uploader = new FileUploader(); /*实例化一个FileUploader对象*/
    uploader.url = '/a/picture/'; /*以下是设置了两个必须的属性*/
    uploader.alias = "coverImage";
    uploader.queueLimit = 1; //文件个数
    uploader.queue = [];
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        $scope.cover = response.data;
        console.log("返回成功");
    };
    uploader.onErrorItem = function (fileItem, response, status) {
        if (status === 413) {
            bootbox.alert('图片太大了。');
        }
    };
    uploader.onAfterAddingFile = function (fileItem) {
        var reader = new FileReader();
        reader.addEventListener("load", function (e) {
            //文件加载完之后，更新angular绑定
            $scope.$apply(function () {
                $scope.iconUrl = e.target.result;
            });
        }, false);
        reader.readAsDataURL(fileItem._file);
    };
    //富文本
    var E = window.wangEditor
    var editor = new E('#div1','#div2')
    // 自定义菜单配置
    editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
    ]
    editor.create()
} );