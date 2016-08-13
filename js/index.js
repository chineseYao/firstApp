$(function(){
	var imgUrlObj=['img/577f7a1dN827f207b.jpg','img/577f84b3Nc04483df.jpg','img/578458daNf55336ba.jpg','img/5784a2ebN4ac88cd1.jpg','img/5784aaf5Nd0160bb2.jpg','img/5785a544N67404058.jpg'];
	
	document.getElementById('dd_inner').onmouseover = function(e){
		var t=this;
		var targe=e.srcElement?e.srcElement:e.target;
		var num=e.target.dataset.index;
		if(num){
			num=parseInt(num);
			var titleDom=$('#dorpdown_layer');
			var dom=$(t).find('div').eq(num);
			$(t).find('.act').removeAttr('class');
			dom.addClass('act');
			titleDom.find('.act').removeAttr('class')
			titleDom.find('ul').eq(num).addClass('act')
			if(titleDom.css('display')!='block'){
				titleDom.show()
			}
		}
	    
	}  
  document.getElementById('dd_main').onmouseout = function(e){//fadeOut
		var t=this;
		CarouselFigureFun.mouseTouchCompatibility(e,t,true,function(){
			$('#dd_inner .act').removeAttr('class');
			$('#dorpdown_layer').hide();
		})
	}  
	var CarouselFigureFun={
		curr:0,
		imgLength:0,
		time:null,
		isMove:true,
		time2:null,
		init:function(){
			var t=this;
			t.imgLength=imgUrlObj.length;
			for(var i=(t.imgLength-1);i>=0;i--){
				$('#CarouselFigure_main').append('<li '+(i?'':'class="act" style="opacity:1"')+'><img src="'+imgUrlObj[i]+'"/></li>');
				$('#CarouselFigure_spot').append('<span data-index="'+i+'" id="carFigSpot'+i+'" '+(i==t.imgLength-1?'class="act"':'')+'></span>')
			}
			t.curr=t.imgLength-1;
			t.Interval();
			$('#CarouselFigure_spot').on('mouseover','span',function(){
				if(t.isMove){
					t.isMove=false;
					clearInterval(t.time);
					t.curr=parseInt(this.dataset.index);
					t.switchImg(parseInt(this.dataset.index))
				}
			})
			$('#CarouselFigure_spot').on('mouseout','span',function(){
				if(!t.isMove){
					t.isMove=true;
					t.Interval();
				}
			})
		},switchImg:function(num){
			var $imgAct=$('#CarouselFigure_main .act');
			var $imgs=$('#CarouselFigure_main li');
			$imgAct.removeAttr('class');
			$imgs.eq(num).addClass('act').animate({'opacity':'1'},800,function(){
				$imgAct.removeAttr('style');
			});
			$('#CarouselFigure_spot .act').removeAttr('class');
			$('#carFigSpot'+num).addClass('act');
		},
		Interval:function(){
			var t=this;
			t.time=setInterval(function(){
				if(!t.curr){t.curr=t.imgLength}
				t.switchImg(--t.curr)
			},3000);
		},
		mouseTouchCompatibility:function(e,t,type,fun){/*true-退*/
			if( !e ) e = window.event;  
			var reltg = e.relatedTarget ? e.relatedTarget :(type?e.toElement:e.fromElement);  
			while( reltg && reltg != t ) reltg = reltg.parentNode;  
			if( reltg != t ){
			   fun();
			}  
		}
		
	}
	CarouselFigureFun.init()
})
