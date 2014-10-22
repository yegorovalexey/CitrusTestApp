// GoogleAnalytics

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'js/analytics.js', 'ga');
	
	ga('create', 'UA-2170097-20', 'auto', {'allowLinker': true});
	ga('require', 'linker');
	ga('linker:autoLink', ['citrus.ua'] );

$(document).on('click', '.gas', function(){
	var g=$(this), gac = g.attr('gac') || null , gaa = g.attr('gaa') || null, gam = g.attr('gam') || null;
	ga('send', 'event', gac, gaa, gam);
});

$(document).on('pageshow', '[data-role=page], [data-role=dialog]', function (event, ui) {
    try {
        if ($.mobile.activePage.attr("data-url")) {
            ga('send', 'pageview', window.location.hash); // remove quotes
        } else {
            ga('send', 'pageview');
        }
    } catch (err) {}
});

// GoogleAnalytics


// Инициализайция Jquery Mobile
$(document).bind('mobileinit', function () {

	
});

//  Эвент перед созданием страницы Jquery Mobile
$(document).delegate("#main", "pagebeforecreate", function () {
		
}); 

// Эвент создания страницы main Jquery Mobile
$( document ).on( "pagecreate", "#main", function() {
		
			 
});

$( document ).on( "pageinit", "#search-page", function() {

		//$("#search-page-search-input").focus();
       // return false;
			 
});


// Эвент создания страницы описка Jquery Mobile
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example
$( document ).on( "pagecreate", "#search-page", function() {
		
		$("#search-page-search-input").keyup(function() {
		  clearTimeout(typingTimer);
		  
		  typingTimer = setTimeout(InitSearch, doneTypingInterval);
		 
		});
		//on keydown, clear the countdown 
		$('#search-page-search-input').keydown(function(){
		    clearTimeout(typingTimer);
		}); 
});
// Эвент создания страницы Jquery Mobile

$(document).delegate("#products-list", "pagebeforecreate", function () {
		
}); 
$( document ).on( "pageshow", "#filter-page", function() {
	
	$('#filter-listview').listview("refresh");
});
$( document ).on( "pageshow", "#filter-values-page", function() {
	
	$('#filter-props-values-listview').listview("refresh");
});
$( document ).on( "pageshow", "#sort-page", function() {
	
	$('#sort-listview').listview("refresh");
});
$( document ).on( "pageshow", "#main", function() {

	ShowLoading();
	LoadMainPageData();		 
});
$( document ).on( "pageshow", "#page-cart", function() {
	
	$("#cart-list").removeClass("edit_mode");
	$("#cart_edit_button").html("Редактировать");
	StartLoadingBasketItems();		
});
$( document ).on( "pageshow", "#page-order", function() {
	
	ShowLoading();
	MobileUser.UserInfo(FillOrderPageFields);
		
});
$( document ).on( "pageshow", "#news-page", function() {
	
	InitNews();
		
});
$( document ).on( "pageshow", "#actions-page", function() {
	
	InitActions();
		
});

$( document ).on( "pageshow", "#maps-page", function() {
	ShowLoading();
	$('#map_canvas, #pano').height($(document).height());
	$.getScript("/js/gmap.js").done(function() {
		gmapLoadScript();
	});
});

$( document ).on( "pageshow", "#online-page", function() {
	ShowLoading();
	$.getScript("/js/online.js").done(function() {
		onlineLoadScript();
	});
});

var owlcarouselproductcard = undefined;
$( document ).on( "pageshow", "#product-card", function() {

			
	
			// Карточка товара
			var productId = "";
			var u = $.mobile.path.parseUrl(  document.URL );
			if(u.href.search("product-id=") !== -1)
			{			
				if( u.hash != undefined){
					 $("#product-card-content").hide();
					 
					 var  productId = u.hash.replace( /.*product-id=/, "" );	
					
					
					 loadProductCard(productId);			
					
				}else{
					alert("hash not found");
					
				}
				
			}

		  ReinitowlProductCard();
			
		   

	
});
 

$( document ).on( "pageshow", "#products-list", function() {

if(!product_list_page_loded){
	ShowLoading();
}
});
$( document ).on( "pageshow", "#login-page", function() {
	//$(".screen-center").css("margin-top", $("#login-page").height()/2 - 82);
	//$(".screen-center").show();
	$("#phone").val("+380");	
	$('#sendCodeButton').attr("disabled","disabled");
});
$( document ).on( "pageshow", "#sms-page", function() {
	//$(".screen-center").css("margin-top", $("#login-page").height()/2 - 82);
	//$(".screen-center").show();
	$("#sms_code").val("");
	
});
$( document ).on( "pageshow", "#text-page", function() {
	// Текстовая страница
			var Id = "";
			var u = $.mobile.path.parseUrl( document.URL );
			if(u.href.search("id=") !== -1)
			{			
				if( u.hash != undefined){										 
					 var  Id = u.hash.replace( /.*id=/, "" );	
					 var data ="";
					 if(u.href.search("detail_text=Y") !== -1)
					 {
					 	data ="&detail_text=Y";
					 }								
					 LoadTextPage(Id,data);						
				}else{
					alert("404");
				}
				
			}else{
				alert("404");
			}
});

$(document).on('click', '#main-search-input', function() {
	$.mobile.changePage('#search-page');
});

$( document ).on( "pageshow", "#search-page", function() {


});
// Эвент перехода на новую страницу

$( document ).on( "pagebeforeshow", "#products-list", function(event, data) {
	if(data.prevPage != undefined){
		
		var prev_id = data.prevPage.attr('id');
		if(prev_id == "filter-page" || prev_id == "filter-values-page"){
			
		}else{
			FilterEnums.Clear();
		}
	}
			
});
var product_list_page_loded = false;
$(document).bind( "pagebeforechange", function( e, data ) {
	
	if ( typeof data.toPage === "string" ) {
	
		if( data.toPage.indexOf("#products-list") !==  -1 )
		{ 
			if($.mobile.activePage != undefined){
				var prev_id = $.mobile.activePage.attr('id');
				if(prev_id == "filter-page" || prev_id == "filter-values-page"){
					
				}else{
					FilterEnums.Clear();
				}
			}	
			
			
			 // Страница каталог товаров
			 
			if ( data.toPage.search(re) !== -1 ) {
				
				var u = $.mobile.path.parseUrl( data.toPage ),
					re = "category-items=";		
				if ( data.toPage.search(re) !== -1 ) {
					
					showCategory( u, data.options );
					var LazyList = LazyListView("products-listview");
				
				}else{
					
						ShowLoading();
						showCategory( u, data.options );
					
				}	
            }
		 }
		 
		
		  if( data.toPage.indexOf("#search-page") !==  -1 )
		 {
		 	//LoadSearchResults(0);
		 }    
                			
	}
	
	
	
});

// Эвент инициализации страницы
$(document).on("pageinit", "#products-list", function () {
	
	
				 
});


var start_page;

// Эвент создания DOM
$(document).ready(function() {	

	

		start_page = document.URL;	
		 $( ".navPanelChild" ).each(function(key,value) {
			  var navpanelCopy = $( "#nav-panel" ).clone();
		  	  var id = $(value).attr("id");
			 
			  navpanelCopy.attr("id",id);
		  	  $(value).replaceWith(navpanelCopy);
		      
			  
			
			  
		  });
		 
		    
		 // $('.ui-link').remove();
	
	
});


// инициализация события vclick
//$( document ).on( "pageinit", function() {	
$(document).ready(function() {	

	
    OutedStart();
	if(MobileUser.DeviceReady){
		navigator.splashscreen.hide();
	}
	InitpushNotifications();
	var eventstring = "click";
	 
	 if(navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i)){
	 	eventstring = "vclick";
		
	 }
	 
	 var ua = navigator.userAgent.toLowerCase();
	 var isAndroid = ua.indexOf("android") > -1;
	 if(isAndroid){
	 	eventstring = "vclick";
		//alert("android");
	 }
	 $('.cit_panel_href').on(eventstring,function(event)
			 	{
					event.stopPropagation();
					event.preventDefault();
					
					$($(this).attr('link') ).panel( "open" );					
			 	}
	 );		
	  $('.panel-menu-item').on("click",function(event)
		  {
		 			event.stopPropagation();
		  }
	  );		
	 $('.vclick_link').on(eventstring,function()
			 	{
					
					
					$.mobile.changePage( $(this).attr('link') );	
							
			 	}
	 );	
	  $('.vclick_simple_panel_close').on("click",function()
			 	{
					$(".ui-panel-open").panel("close");
					$.mobile.changePage( $(this).attr('link') );	
					
			 	}
	 );
	 
	 
	 
	 
	 
});



$( document ).on( "pageshow", function() {	
	$(".ui-panel-open").panel("close");
});










