
angular.module('App').controller('ZufanglistController',function($ionicScrollDelegate,$ionicLoading,$ionicHistory,$state,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');
//		//根据导航栏绝对定位
//		$('.toptwo').css('top',$('.header').outerHeight())
//		$('.fyfabu').css('margin-top',$('.header').outerHeight()+40)
		$('#view-popover').css('top',$('.header').outerHeight())
		
		if($('#zufanglist .zufanglist').innerWidth()>375){
			$('#zufanglist .zufanglist').addClass('plus')
			$('#zufanglist .zufanglist').removeClass('zufanglist')
		}
	})
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.querydata={
		district:'区域',
		area:'',
		price:'租金',
		type:'房型',
		sort:'排序'
	}
	
	$scope.submitdata={
		pagesize:20,
		pagenum:0,
		type:2,
		query:'',
		district:'',
		street:'',
		minprize:'',
		maxprize:'',
		roomType:'',
		sort:''
	}
	
	$scope.districtdata=[{district:'不限',area:[]},
	{district:'思明',area:['不限','禾祥西','火车站','白鹭州','会展中心','富山','思北','松柏','鼓浪屿','滨北','莲前','莲花','吕厝','槟榔','禾祥东','文灶','文园路','莲前东','莲前西','前埔','观音山','厦大']},
	{district:'湖里',area:['不限','SM商圈','东渡','南山路','保税区','大唐','江头台湾街','枋湖','五缘湾','祥店','嘉园路','后铺','金尚','湖边水库','万达','高林']},
	{district:'同安',area:['不限','城北','城南','城西','城东']},
	{district:'集美',area:['不限','集美文教区','杏林湾片区','厦门北站片区','杏林新城','灌口片区']},
	{district:'海沧',area:['不限','海滨社区','蒿屿','沧林路','未来海岸','马青路','沧虹路']},
	{district:'翔安',area:['不限','马巷','内厝','新店','新圩','大嶝','翔安周边','隧道口']},
	{district:'其它',area:['漳洲','泉州','龙岩']}]
	$scope.pricedata=['不限','500元以下','501-800元','801-1500元','1501-2000元','2001-2500元','2501-3000元','3001-3500元','3501-5000元','5000元以上']
	$scope.typedata=['不限','一室','二室','三室','四室','五室','五室以上']
	$scope.sortdata=['不限','面积从大到小','面积从小到大','租金从低到高','租金从高到底']
	
	$scope.openchoose=function(index){
		$scope.topindex=index
		
		$('#zufanglist .pullchooselist').slideToggle('fast')
		$('#zufanglist .mask').toggle()
	}
	$scope.closechoose=function(){
		$('#zufanglist .pullchooselist').slideToggle('fast')
		$('#zufanglist .mask').toggle()
	}
	$scope.onlyclosechoose=function(){
		$('#zufanglist .pullchooselist').css('display','none')
		$('#zufanglist .mask').css('display','none')
	}
	
	$scope.changeareaindex=function($index,$event){
		$($event.target).addClass('clicked')
		$($event.target).siblings().removeClass('clicked')
		
		$scope.submitdata.pagenum=0;
		if($index==0){
			$scope.submitdata.district='';
			$scope.querydata.district='不限';
			$scope.submitdata.street='';
			$scope.querydata.area='';
			$scope.search($scope.submitdata);
			$ionicScrollDelegate.$getByHandle('mainscroll').scrollTop();
			$scope.closechoose()
		}
		$scope.areaindex=$index;
		//右侧返回顶部
		$ionicScrollDelegate.$getByHandle('zufangareascroll').scrollTop();
	}
  	
  	//选区域
  	$scope.changearea=function(area,$event){
  		$($event.target).addClass('clicked')
		$($event.target).siblings().removeClass('clicked')
		
  		$scope.submitdata.pagenum=0;
  		//区
  		$scope.querydata.district=$scope.districtdata[$scope.areaindex].district;
  		$scope.submitdata.district=$scope.districtdata[$scope.areaindex].district;
  		//街道
  		if(area=='不限'){
  			$scope.querydata.area='';
  			$scope.submitdata.street='';
  			
  		}else{
  			$scope.querydata.area=area; 
  			$scope.submitdata.street=area;
  		}
  		$scope.search($scope.submitdata);
  		$ionicScrollDelegate.$getByHandle('mainscroll').scrollTop();
  		$scope.closechoose();
  	}
 	
 	//选价格
 	$scope.changeprice=function($index,value,$event){
 		$($event.target).addClass('clicked')
		$($event.target).siblings().removeClass('clicked')
		
 		$scope.submitdata.pagenum=0;
  		$scope.querydata.price=value;
  		if($index==0){
  			$scope.submitdata.minprize='';
  			$scope.submitdata.maxprize='';
  		}else if($index==1){
  			$scope.submitdata.minprize='';
  			$scope.submitdata.maxprize=500;
  		}else if($index==2){
  			$scope.submitdata.minprize=501;
  			$scope.submitdata.maxprize=800;
  		}else if($index==3){
  			$scope.submitdata.minprize=801;
  			$scope.submitdata.maxprize=1500;
  		}else if($index==4){
  			$scope.submitdata.minprize=1501;
  			$scope.submitdata.maxprize=2000;
  		}else if($index==5){
  			$scope.submitdata.minprize=2001;
  			$scope.submitdata.maxprize=2500;
  		}else if($index==6){
  			$scope.submitdata.minprize=2501;
  			$scope.submitdata.maxprize=3000;
  		}else if($index==7){
  			$scope.submitdata.minprize=3001;
  			$scope.submitdata.maxprize=3500;
  		}else if($index==8){
  			$scope.submitdata.minprize=3501;
  			$scope.submitdata.maxprize=5000;
  		}else if($index==9){
  			$scope.submitdata.minprize=5001;
  			$scope.submitdata.maxprize='';
  		}
  		$scope.search($scope.submitdata);
  		$ionicScrollDelegate.$getByHandle('mainscroll').scrollTop();
  		$scope.closechoose();
  	}
 	
	//选房型
  	$scope.changetype=function($index,value,$event){
  		$($event.target).addClass('clicked')
		$($event.target).siblings().removeClass('clicked')
		
  		$scope.submitdata.pagenum=0;
  		$scope.querydata.type=value;
  		if($index==0){
  			$scope.submitdata.roomType='';
  		}else{
  			$scope.submitdata.roomType=$index;
  		}
  		$scope.search($scope.submitdata);
  		$ionicScrollDelegate.$getByHandle('mainscroll').scrollTop();
  		$scope.closechoose();
  	}
 	
	//选排序方法
  	$scope.changesort=function($index,value,$event){
  		$($event.target).addClass('clicked')
		$($event.target).siblings().removeClass('clicked')
		
  		$scope.submitdata.pagenum=0;
  		$scope.querydata.sort=value;
  		if($index==0){
  			$scope.submitdata.sort='';
  		}else{
  			$scope.submitdata.sort=$index;
  		}
  		$scope.search($scope.submitdata);
  		$ionicScrollDelegate.$getByHandle('mainscroll').scrollTop();
  		$scope.closechoose();
  	}
 	
 	//搜索方法
 	$scope.search=function(data){
 		$http.get($Factory.SecondVersion.alikehouse.url,{params:data}).then(function(resData){
//			console.log(resData)
  			$scope.renthousearr=resData.data;
  			$ionicScrollDelegate.$getByHandle('mainscroll').scrollTop();
  			$scope.noMore=false;
  			if($scope.renthousearr.length>=20){
  				$scope.noMore=true;
  			}
 		})
 		
 	}
 	$scope.search($scope.submitdata);
 	
 	//清空条件重新加载
 	$scope.reload=function(){
	 	$scope.querydata={
			district:'区域',
			area:'',
			price:'租金',
			type:'房型',
			sort:'排序'
		}
	 	$scope.submitdata={
			pagesize:20,
			pagenum:0,
			type:2,
			query:'',
			district:'',
			street:'',
			minprize:'',
			maxprize:'',
			roomType:'',
			sort:''
		}
	 	$http.get($Factory.SecondVersion.alikehouse.url,{params:$scope.submitdata}).then(function(resData){
  			$scope.sellhousearr=resData.data;
  			$scope.noMore=false;
  			if($scope.sellhousearr.length>=20){
  				$scope.noMore=true;
  			}
 		})
 		
 	}
 	
 	//上拉加载
 	function load(loadType){
		//要把 last 传到 后台
		$http.get($Factory.SecondVersion.alikehouse.url,{params:$scope.submitdata}).then(function(resData){
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
				$ionicLoading.show({
					template: '没有其它房源了',
					duration: 1000
				});
				$scope.noMore = false;
				return;
			}
			
			$scope.submitdata.pagenum += 1;
			$scope.renthousearr = $scope.renthousearr.concat(resData.data);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			
		}).catch(function(resData){
			$ionicLoading.show({
				template:'请求数据失败',
				//过三秒消失
				duration:3000
			})
		})
	}
	
	//传递 true 代表上拉，传递 false 代表下拉
	
	//在当前作用域添加loadMore方法
	$scope.zufanglistloadMore = function(infinite){
		$scope.submitdata.pagenum=0;
		load(infinite);
	}
	
	//监听渲染是否完成
	$scope.renderdone=true;
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        //渲染完成后执行的js
	    $scope.renderdone=false;
//	    $ionicScrollDelegate.$getByHandle('mainscroll').scrollTop();
    });
  	
})
