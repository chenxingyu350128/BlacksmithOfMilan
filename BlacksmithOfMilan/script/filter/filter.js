app.filter('grade',function (gradesites) {
   return function (value) {
       if(!!value){
           return gradesites[value-1].site
       }
   }
})
.filter('subject',function (subjectsites) {
    return function (subject) {
        if(!!subject){
            return subjectsites[subject-1].site
        }
    }
})
.filter('status',function () {
    return function (status) {
        switch (status){
            case 0:
                return '正常';
            case 1:
                return '冻结';
        }
    }
})
.filter('cardGrade',function () {
    return function (grade) {
        switch (grade){
            case null:
                return '未设置';
            case 1:
                return '初一';
            case 2:
                return '初二';
            case 3:
                return '初三';
            case 4:
                return '高一';
            case 5:
                return '高二';
            case 6:
                return '高三';
        }
    }
})
.filter('timeFormat',function () {
    return function (time) {
        let today=Number(new Date()),
            timeGap=today-time;
        if(timeGap>=86400000){
            let daysAgo=Math.floor(timeGap/86400000);
            return daysAgo + '天前';
        }else{
            let hoursCalc=timeGap/3600000;
            let hoursAgo=hoursCalc<1?1:Math.floor(hoursCalc);
            return hoursAgo + '小时前';

        }
    }
})
.filter('videoLength',function () {
    return function (url) {
        var a= document.getElementById('videoSrc').src;
            a=url;
        document.getElementById('videoSrc').addEventListener('loadedmetadata',function () {
            return $(this).duration;
        })
    }
})
.filter('type',function () {
    return function (type) {
        switch (type){
            case 0:
                return 'card文章';
            case 1:
                return 'banner文章';
        }
    }
});