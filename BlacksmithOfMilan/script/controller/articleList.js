angular.module('myApp')
.controller('AListCtrl',function ($scope,$http,$log,$state,$stateParams,projectService,clickPng) {
  let vm=this;
  vm.userId = JSON.parse(sessionStorage.getItem('userId'));
  // //渲染banner图片
  projectService.getArticleBanner().then(function successCallback(response) {

    console.log(response);
    var articleimg = response.data.data;
    // sessionStorage.setItem('articleImage',JSON.stringify(articleimg));


      // 轮播图插件
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;
  $scope.urlClick1 = function (id) {
       console.log(id);
       $state.go("article",{
           id: id
       })
  };
  // let articleimg=JSON.parse(sessionStorage.getItem('articleImage'));
  $scope.addSlide = function(i) {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: articleimg[i].url,
      text: articleimg[i].title,
      id: currIndex++,
      url:articleimg[i].id
    });
    console.log(slides)
  };
  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };
  for (let i = 0; i < articleimg.length; i++) {
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
  });


  var params = {
    uid:vm.userId,
    size:$stateParams.size

  }
  projectService.getArticleList(params).then(function successCallback(response) {
    console.log(response);
    if(response.data.code===0){
        $scope.list = response.data.data.rows;
        var pagesize = response.data.data.pagesize;
        // sessionStorage.setItem('size',JSON.stringify(pagesize));
        // sessionStorage.setItem('list',JSON.stringify($scope.list));
        $scope.clickAdd = function () {
          pagesize += 5;
          $state.go("articleList",{
              size: pagesize,
          },{
              reload:true
          })
      };
    }else{
      modalBox.alert(response.data.msg)
  }
  });
  // var pagesize = JSON.parse(sessionStorage.getItem('size'));
  // $scope.list = JSON.parse(sessionStorage.getItem('list'));
  
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
  $scope.sizeLimited=function(x){
    return x.substring(0,25)+'...'
  };
  // 点击详情
  vm.Describe = function (id) {
    $state.go("article",{
      id:id
    })
  }

});