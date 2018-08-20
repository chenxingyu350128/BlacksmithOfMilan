angular.module('myApp',[])
.controller('VListCtrl',function ($scope,$http,$log,$state,$stateParams,projectService,modalBox,gradesites,subjectsites,clickPng) {
  let vm=this;
  vm.id=JSON.parse(sessionStorage.getItem('userId'));
  //渲染banner图
  vm.defaultImage='http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcrsd2TcCfqBxia7fhkibGZZnHySrYIjuUGBIIYCVdBZ7HEH506j06Pa4rkfGtLkr99R3EOqicXoqZg/132';
  projectService.getVideoBanner().then(function successCallback(response) {
    console.log(response);
    if (response.data.code==0) {
      var bannerimg = response.data.data;
      // sessionStorage.setItem('bannerimg',JSON.stringify(bannerimg));
      
      //轮播图
      // let bannerimg=JSON.parse(sessionStorage.getItem('bannerimg'));
      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      $scope.active = 0;
      var slides = $scope.slides = [];
      var currIndex = 0;
      console.log(bannerimg[0].url);
      $scope.bannerImages=[];
      for(let i=0;i<bannerimg.length;i++){
        $scope.bannerImages[i]=bannerimg[i].url;
      }
      $scope.addSlide = function(i) {
        var newWidth = 600 + slides.length + 1;
        slides.push({
          image: bannerimg[i].url,
          text: bannerimg[i].title,
          id: currIndex++,
          url:bannerimg[i].id
        });
        console.log(slides)
      };
      $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
      };
      for (let i = 0; i < bannerimg.length; i++) {
        $scope.addSlide(i);
      }
      // Randomize logic below
      function assignNewIndexesToSlides(indexes) {
        for (let i = 0, l = slides.length; i < l; i++) {
          slides[i].id = indexes.pop();
        }
      }
      function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
          indexes[i] = i;
        }
        return shuffle(indexes);
      }
      // http://stackoverflow.com/questions/962802#962890
      function shuffle(array) {
        var tmp, current, top = array.length;
        if (top) {
          while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
          }
        }
        return array;
      }
    }else{
      modalBox.alert(response.data.msg)
    }
  });
  
  //点击跳转视频详情
  vm.urlClick = function (id) {
    console.log(id);
    $state.go("video",{
      id:id
    })
  };
  //渲染视频列表
  var params = {
    uid: vm.id,
    pagesize:$stateParams.size,
    grade:$stateParams.grade,
    subject:$stateParams.subject
  };
  projectService.getVideoList(params).then(function successCallback(response) {
    console.log(response)
    if (response.data.code==0) {
      vm.list = response.data.data.rows;
      vm.img1 = vm.list[0].bannerUrl
      var pagesize = response.data.data.pagesize
      // sessionStorage.setItem('pagesize',JSON.stringify(pagesize));
      //点击加载更多数据
      // var pagesize =parseInt(JSON.parse(sessionStorage.getItem('pagesize'))) ;
      vm.clickAdd = function () {
        $state.go("videoList",{
          size:pagesize+=5,
        },{
          reload:true
        })
      };
    }else{
      modalBox.alert(response.data.msg)
    }
    //限制显示内容字数
    vm.list.forEach(function (value,indexes,array) {
      var ccc= value.textVideo
      if (ccc.length>20) {
        value.textVideo = ccc.substring(0,20)+'...';
      }
    });
    //改变图片颜色，渲染点赞状态
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
  
  //点击进入详情页面
  vm.clickvideo = function (id) {
    $state.go("video",{
      id:id
    })
  };
  var time;
  window.onload = function () {
    var pl=document.getElementById("player");
    console.log(pl)
    time = pl.duration;
    console.log(time)
    time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + "秒";
    console.log(time)
    var addspan = document.getElementById("seo")
    var timecontent = document.createTextNode(time)
    var timespan = document.createElement("span")
    timespan.appendChild(timecontent)
    addspan.appendChild(timespan)
    document.body.appendChild(timespan)
    this.console.log("视频时长")
  };
  //点击下拉框
  $scope.gradeshow = false
  $scope.subjectshow =false
  //失焦事件
  $scope.type = function () {
    $scope.gradeshow = false
    $scope.subjectshow =false
    console.log("失焦事件")
  };
  $scope.gradeone = true;
  // $scope.gradetwo = true;
  //点击显示年级
  $scope.clickgrade = function () {
    $scope.gradeshow = true
    $scope.subjectshow =false
  };
  //点击显示科目
  $scope.clicksubject = function () {
    $scope.subjectshow =true
    $scope.gradeshow = false
  };
  //年级
  $scope.gradesites = gradesites;
  //点击选择科目
  $scope.ongrade = function (site) {
    console.log(site);
    $state.go("videoList",{
      grade:site
    },{
      reload:true
    })
  };
  // 点击下拉
  //学科
  $scope.subjectsites = subjectsites;
  //点击选择年级
  $scope.onsubject =function (site) {
    console.log(site);
    $state.go("videoList",{
      subject:site
    },{
      reload:true
    })
  }
});