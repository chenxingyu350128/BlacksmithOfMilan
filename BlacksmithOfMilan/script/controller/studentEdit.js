angular.module('myApp')
    .controller('StudentEditCtrl',function ($scope,$timeout,$http,$stateParams,$state,projectService,modalBox) {
        let vm=this;
        vm.id=JSON.parse(sessionStorage.getItem('userId'));
        vm.isOpen=false;
        //先获取用户信息
        projectService.getStudentInfo(vm.id).then(function (res) {
            console.log(res);
            if (res.data.code===0){
                vm.uData=res.data.data;
                vm.nickName=vm.uData.nickName;
                vm.grade=vm.uData.grade;
                vm.beans=vm.uData.score;
                vm.avatar=vm.uData.avatar;
                vm.tel=vm.uData.tel;
                vm.email=vm.uData.email;
            }
            else{
                modalBox.alert(res.data.msg)
            }
        });
//**********// 头像更换jQueryWEUI
        $(function() {
            var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
                $gallery = $("#gallery"),
                $galleryImg = $("#galleryImg"),
                $uploaderInput = $("#uploaderInput"),
                $uploaderFiles = $("#uploaderFiles");
            $uploaderInput.on("change", function(e) {
                var url = window.URL || window.webkitURL || window.mozURL,
                    files = e.target.files;
                    vm.file = files[0];
                    if(url) {
                        vm.src = url.createObjectURL(vm.file);
                    } else {
                        vm.src = e.target.result;
                    }
                    console.log(vm.src);
                $uploaderFiles.append($(tmpl.replace('#url#', vm.src)));
            });
            var index; //第几张图片
            $uploaderFiles.on("click", "li", function() {
                index = $(this).index();
                $galleryImg.attr("style", this.getAttribute("style"));
                $gallery.fadeIn(100);
            });
            $gallery.on("click", function() {
                $gallery.fadeOut(100);
            });
            //删除图片
            $(".weui-gallery__del").click(function() {
                $uploaderFiles.find("li").eq(index).remove();
                $('#uploaderInput').val(undefined);
                $('.weui-uploader__input-box').show();
            });
        });
        //隐藏图片选择框
         $('.weui-uploader__input-box').on('change',function(){
             if(vm.src){
                 $(this).hide();
             }
             else{
                 $(this).show();
             }
         });
//**********//年级选择WEUI_picker
        vm.gradePicker=function(){
            weui.picker([
                {label: '初一', value: 1},
                {label: '初二', value: 2},
                {label: '初三', value: 3},
                {label: '高一', value: 4},
                {label: '高二', value: 5},
                {label: '高三', value: 6}], {
                container: '.cardEdit',
                defaultValue: [2],
                onConfirm: function (result) {//确定按钮函数
                    console.log(result);
                    vm.gradeName=result[0].label;
                    vm.grade=result[0].value;
                    $('#showGrade').text(vm.gradeName);
                },
                id: 'singleLinePicker'
            });
        };
//***********提交按钮
        vm.commitChange=function(){
            // vm.pickGrade=vm.pickGrade===undefined?1:vm.pickGrade;
            let formData=new FormData();
            if(vm.file){
                vm.fReader=new FileReader();
                vm.fReader.readAsDataURL(vm.file);
                formData.append('avatarImage',vm.file);
            }
            formData.append('id',vm.id);
            formData.append('nickName',vm.nickName);
            formData.append('grade',vm.grade);
            projectService.putStudentInfo(formData,vm.id).then(function (res) {
                if(res.data.code===0){
                    console.log(vm.grade);
                    console.log(typeof vm.grade);
                    console.log(res);
                    modalBox.alert('修改成功', function(){
                        $state.go('student')
                    })
                }
            });
        }
    });