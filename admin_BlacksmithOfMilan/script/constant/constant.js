
myApp.constant('sidebar', [
    {
        firstLevel: '用户管理',
        secondLevel: [      
            {title: '用户列表',url: 'pageTab.userManage'},          
        ]
    },
    {
        firstLevel: '内容管理',
        secondLevel: [
            {title: '文章管理',url: 'pageTab.articleList'},
            {title: '视频管理',url: 'pageTab.videoList'},
        ]
    },
    {
        firstLevel: '后台管理',
        secondLevel: [
            {title: '账户管理',url: 'pageTab.accountManage'},
            {title: '角色管理',url: 'pageTab.roleManage'},
            {title: '修改密码',url: 'pageTab.passwordChange'},
            {title: '模块管理',url: 'pageTab.moduleManage'},          
        ]
    }
])
.constant('statusList',[
    {value:undefined,status:'全部'},
    {value:0,status:'冻结'},
    {value:1,status:'正常'}]
    
)

// .constant('gradeList',[
//     {value:undefined,grade:'全部'},
//     {value:1,grade:'初一'},
//     {value:2,grade:'初二'},
//     {value:3,grade:'初三'},
//     {value:4,grade:'高一'},
//     {value:5,grade:'高二'},
//     {value:6,grade:'高三'}
// ])
//
//

.constant('sites',[
    {
        site: "全部",
        numb: undefined, 
    },
    {
        site: "下架",
        numb: "0", 
    },
    {
        site: "上架",
        numb: "1",
    }
])

.constant('sitesbutton',[
    {
        site: "全部",
        numb: undefined, 
    },
    {
        site: "上架",
        numb: "0", 
    },
    {
        site: "下架",
        numb: "1",
    }
])



.constant('types',[
    {
        site: "全部",
        numb: undefined, 
    },
    {
        site: "card文章",
        numb: "0", 
    },
    {
        site: "banner文章",
        numb: "1",
    }
])


.constant('gradesites',[
    {
        site:"全部",
        numb:undefined
    },{
        site:"初一",
        numb:'1'
    },{
        site:"初二",
        numb:'2'
    },{
        site:"初三",
        numb:'3'
    },{
        site:"高一",
        numb:'4'
    },{
        site:"高二",
        numb:'5'
    },{
        site:"高三",
        numb:'6'
    }])
    
    
    .constant('subjectsites',[
        {
            site: "全部",
            numb: undefined, 
        },
        {
            site:"语文",
            numb:1
        },{
            site:"数学",
            numb:2
        },{
            site:"外语",
            numb:3
        },{
            site:"政治",
            numb:4
        },{
            site:"历史",
            numb:5
        },{
            site:"地理",
            numb:6
        },{
            site:"生物",
            numb:7
        },{
            site:"物理",
            numb:8
        },{
            site:"化学",
            numb:9
        }]);
        
        
        
        
        
        
        
        
        
        
        