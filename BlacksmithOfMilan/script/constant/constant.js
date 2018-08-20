angular.module('myApp')

.constant('gradesites',
    [{
        site:"全部",
        numb:''
    },
{
    site:"初一",
    numb:1
},{
    site:"初二",
    numb:2
    
},{
    site:"初三",
    numb:3
    
},{
    site:"高一",
    numb:4
    
},{
    site:"高二",
    numb:5
    
},{
    site:"高三",
    numb:6
    
}]

)
.constant('subjectsites',[
    {
        site:"全部",
        numb:''},
    {
    site:"语文",
    numb:'1'},
        {
    site:"数学",
    numb:'2'
    
},{
    site:"外语",
    numb:'3'
    
},{
    site:"政治",
    numb:'4'
    
},{
    site:"历史",
    numb:'5'
    
},{
    site:"地理",
    numb:'6'
    
},{
    site:"生物",
    numb:'7'
    
},{
    site:"物理",
    numb:'8'
    
},{
    site:"化学",
    numb:'9'
    
}]

)
.constant('clickPng',[
    '../images/student/keepIt.png',
    '../images/student/redKeepIt.png',
    '../images/student/feelNice.png',
    '../images/student/redFeelNice.png'
]);
