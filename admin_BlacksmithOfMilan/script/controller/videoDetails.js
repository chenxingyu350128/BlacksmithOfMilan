angular.module('myApp')
.controller('VideoDetails',function ($scope,FileUploader,$sce,$http,$log,$state,$stateParams,videoService,gradesites,subjectsites,sites,types,modalBox) {
    $scope.typeone = function () {
        if ($scope.classification==1) {
            $scope.uploaderShow = true
        }else{
            $scope.uploaderShow = false
        };
    };
    if ($stateParams.id&&$stateParams.nickName == undefined) {
        //富文本
        $scope.conta = true;
        console.log("这是编辑页面");
        $scope.button1 = true
        $scope.button2 = true
    }else if ($stateParams.nickName) {
        console.log("这是查看页面");
        // 禁用编辑功能
        // editor.$textElem.attr('contenteditable', false);
        $scope.buttonshow = true
        $scope.onebutton = "返回"
        //返回
        $scope.onlick = function () {
            $state.go("pageTab.videoList");
        };
        //文本内容
        $scope.textare = true;
        // 禁用
        $scope.one = true;
        $scope.two = true;
        $scope.three = true;
        $scope.four = true;
        $scope.five = true;
        $scope.six = true;
        $scope.seven = true;
        $scope.eight = true;
        $scope.nine = true;
        $scope.ten = true;
        $scope.eleven = true;
    } else{
        //富文本
        $scope.conta = true;
        //新增保存数据跳转视频列表
        $scope.button1 = true
        $scope.button2 = true
    }
    if ($stateParams.id) {
        var id = $stateParams.id;
        videoService.getVideoDetails(id).then(function successCallback(response) {
            console.log(response);
            if (response.data.code===0) {
                $scope.content = response.data.data.video;
                //渲染老师列表
                var teachers = response.data.data.teachers;
                for (let i = 0; i < teachers.length; i++) {
                    const item = teachers[i];
                    var key = "site"
                    item[key]=item["nickName"];
                    delete item["nickName"]
                }
                console.log(teachers); 
                $scope.teacher = teachers;
                $scope.zehao = teachers[15];
                //年级
                console.log($scope.content.grade)
                $scope.gradeselect = $scope.content.grade.toString();
                
                //科目
                $scope.subjectselect = $scope.content.subject;
                //标题
                $scope.titleinput = $scope.content.title;
                //类型
                $scope.classification = $scope.content.type.toString();
                //老师昵称
                $scope.tcname = $scope.content.teacherId;
                //banner图
                $scope.iconUrl = $scope.content.bannerUrl;
                //简介
                $scope.brief = $scope.content.abstractVideo;
                //视频链接
                $scope.videoUrl = $scope.content.videoUrl;
                //正文
                
                editor.txt.text( $scope.content.textVideo) 
                $scope.abstracttext2 = $scope.content.textVideo;
                var filterResult = teachers.filter(function(item,index,array) {
                    return (item.id == $scope.content.teacherId);
                });
                console.log(filterResult); 
                $scope.teacherImg = filterResult[0].avatar
                console.log($scope.htmlContent);
                //编辑页面保存数据跳转视频列表
                console.log($scope.classification)
                if ($scope.classification==1) {
                    $scope.uploaderShow = true
                }else{
                    $scope.uploaderShow = false
                }
                $scope.typeone = function () {
                    if ($scope.classification==1) {
                        $scope.uploaderShow = true
                    }else{
                        $scope.uploaderShow = false
                    }
                };
                $sce.trustAsResourceUrl($scope.videoUrl);
            }else{
                modalBox.alert(response.data.msg)
            }
        }, function errorCallback(response) {
            // 请求失败执行代码
        });    
    }
    //预览
    $scope.preview = function () {
        if ($scope.passwordConfirm !=$scope.passwordNew) {
            console.log("123455")
            
        }
        
        
    }
    //点击保存
    $scope.onkeep = function () {
        if ($scope.cover==undefined) {
            $scope.articleImg = $scope.iconUrl
        }else{
            $scope.articleImg = $scope.cover
        }
        modalBox.confirm( "是否选择保存",function () {
            if ($stateParams.id) {
                var data = {
                    id:$stateParams.id,
                    grade:$scope.gradeselect,
                    subject:$scope.subjectselect,
                    teacherId:$scope.tcname,
                    title:$scope.titleinput,
                    type:$scope.classification,
                    bannerUrl:$scope.articleImg,
                    abstractVideo:$scope.brief,
                    videoUrl:$scope.videoUrl,
                    textVideo:editor.txt.text(),
                    // 不能更改的参数
                    collection:$scope.content.collection,
                    status:$scope.content.status,
                    userLike:$scope.content.userLike,
                };
            }else{
                var data = {
                    id:$stateParams.id,
                    grade:$scope.gradeselect,
                    subject:$scope.subjectselect,
                    teacherId:$scope.tcname,
                    title:$scope.titleinput,
                    type:$scope.classification,
                    bannerUrl:$scope.articleImg,
                    abstractVideo:$scope.brief,
                    videoUrl:$scope.videoUrl,
                    textVideo:editor.txt.text(),
                };
            }
            videoService.postVideoDetails(data).then(function successCallback(response) {
                console.log(response);
                if (response.data.code === 0) {
                    $state.go("pageTab.videoList");
                }else{
                    modalBox.alert(response.data.msg)
                }
                //保存
            });
        }) 
    }
    //渲染老师页面
    videoService.getTeacherlist().then(function successCallback(response) {
        console.log(response);
        //渲染老师列表
        if (response.data.code===0) {
            var teachers = response.data.data;
            for (let i = 0; i < teachers.length; i++) {
                const item = teachers[i];
                var key = "site"
                item[key]=item["nickName"];
                delete item["nickName"];
            }
            console.log(teachers);
            $scope.teacher = teachers
            $scope.zehao = teachers[15]   
        }else{
            modalBox.alert(response.data.msg)
        }    
    }, function errorCallback(response) {
        // 请求失败执行代码
    });
    $scope.test = function () {
        $state.go("pageTab.videoDetails",{
        },{
        })
    }
    //取消返回
    $scope.cancel =function () {
        modalBox.confirm( "是否选择取消",function () {
            $state.go("pageTab.videoList")                    
        }) 
    }
    //删除老师信息
    $scope.deleteteacher = function () {
        modalBox.confirm( "是否选择删除",function () {
            var id = $scope.tcname;
            videoService.deleteTeacher(id).then(function successCallback(response) {
                console.log(response);
                if (response.data.code == 0) {
                    $state.go("pageTab.videoDetails",{
                    },{
                        reload:true
                    })
                }else{
                    modalBox.alert(response.data.msg)
                }
            });                 
        }) 
    }
    let uploader = $scope.uploader = new FileUploader(); /*实例化一个FileUploader对象*/
    uploader.url = '/a/picture/'; /*以下是设置了两个必须的属性*/
    uploader.queueLimit = 1; //文件个数
    uploader.queue = [];
    uploader.alias = "coverImage";
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        $scope.cover = response.data;
        console.log("返回成功");
        console.log(response);
        console.log($scope.cover);
    };
    uploader.onErrorItem = function (fileItem, response, status) {
        if (status === 413) {
            bootbox.alert('图片太大了。')
        }
    };
    uploader.onAfterAddingFile = function (fileItem) {
        console.log("上传成功");
        var reader = new FileReader();
        reader.addEventListener("load", function (e) {
            //文件加载完之后，更新angular绑定
            $scope.$apply(function () {
                $scope.iconUrl = e.target.result;
            });
        }, false);
        reader.readAsDataURL(fileItem._file);
    };
    //状态
    $scope.sites = types
    //年级
    $scope.gradesites =gradesites
    //学科
    $scope.subjectsites = subjectsites
    $scope.addTearch = function () {
        $state.go("pageTab.addTearcher")
    };
    //富文本
    var E = window.wangEditor
    var editor = new E('#div1', '#div2')
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