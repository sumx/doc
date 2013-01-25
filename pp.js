try {
    (function(){
        if (window.ONLINESERVERCONFIG) {
        
            window.ONLINESERVERCONFIG.showiconConfig = null;
            var preciseMatchURL = window.ONLINESERVERCONFIG.preciseMatchURL,
			vagueMatchURL = window.ONLINESERVERCONFIG.vagueMatchURL, 
			showiconConfig, 
			isContinueMatch = true, 
			item, 
			hostName = window.location.hostname, 
			pathname = window.location.pathname, 
			currentUrl = [hostName, pathname].join("");
            
            for (var i = 0, len = preciseMatchURL.length; i < len; ++i) {
                item = preciseMatchURL[i];
                if (item.url && (currentUrl == item.url)) {
                    window.ONLINESERVERCONFIG.showiconConfig = item;
                    isContinueMatch = false;
                    break;
                }
            }
            
            if (isContinueMatch) {
                for (var i = 0, len = vagueMatchURL.length; i < len; ++i) {
                    item = vagueMatchURL[i];
                    if (item.url && (currentUrl.indexOf(item.url) > -1)) {
                        window.ONLINESERVERCONFIG.showiconConfig = item;
                        break;
                    }
                }
            }
        }
        	
		
        if (window.ONLINESERVERCONFIG.showiconConfig) {
            var showiconConfig = window.ONLINESERVERCONFIG.showiconConfig;
            var onlineService = document.getElementById('onlineService'),
			percent = showiconConfig.showProbability;
            
			
			//useragent check
			var userAgent=navigator.userAgent.toLowerCase();
			var check = function(regex){
	            return regex.test(userAgent);
	        }
			var isOpera = check(/opera/);
			var isIE=!isOpera && check(/msie/);
			var isIE6=isIE && check(/msie 6/);
			
			var CONST = {
	            "serverUrl":window.CLIVEONLINESERVERURL||"http://clive.hzd73.alipay.net/csrouter.htm",
	            "iconClassName": "lim:live:icon",
	            "imageUrl": "https://i.alipayobjects.com/e/201112/1gsKVOdh4r.gif",
	            "winAttr": "toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=750,height=600"
	        };
	        
	        var calPicUrl = function(){
	            var ONLINESERVERIMGURL = {
	                S: "https://i.alipayobjects.com/e/201202/2WBn80CHuF.png",
	                L: "https://i.alipayobjects.com/e/201208/3MDxbrsuK1.png"
	            };
	            var getPageWidth = function(){
	                var c;
	                if (window.innerHeight && window.scrollMaxY) {
	                    c = window.innerWidth + window.scrollMaxX
	                }
	                else {
	                    if (document.body.scrollHeight > document.body.offsetHeight) {
	                        c = document.body.scrollWidth
	                    }
	                    else {
	                        c = document.body.offsetWidth
	                    }
	                }
	                var b;
	                if (self.innerHeight) {
	                    if (document.documentElement.clientWidth) {
	                        b = document.documentElement.clientWidth
	                    }
	                    else {
	                        b = self.innerWidth
	                    }
	                }
	                else {
	                    if (document.documentElement && document.documentElement.clientHeight) {
	                        b = document.documentElement.clientWidth
	                    }
	                    else {
	                        if (document.body) {
	                            b = document.body.clientWidth
	                        }
	                    }
	                }
	                var a, d;
	                if (c < b) {
	                    a = c
	                }
	                else {
	                    a = b
	                }
	                d = {
	                    pageWidth: a,
	                    windowWidth: b
	                };
	                return d
	            };
	            var onlineServerImgUrl = ONLINESERVERIMGURL.L;
	            try {
	                var rect = getPageWidth(), width = rect.windowWidth;
	                onlineServerImgUrl = (width < 1134) ? ONLINESERVERIMGURL.S : ONLINESERVERIMGURL.L;
	            } 
	            catch (ex) {
	            
	            }
	            return onlineServerImgUrl;
	            
	        }
	        
	        function bind(el, name, func){
	            if (window.attachEvent) {
	                el.attachEvent("on" + name, func);
	            }
	            else {
	                el.addEventListener(name, func, false);
	            }
	        };
	        
	        function $(name, ctx){
	            var childs = (ctx || document.body).getElementsByTagName('*'), length = childs.length, els = [];
				var pattern = new RegExp("(^|\\s)" + name + "(\\s|$)");
	            for (var i = 0; i < length; i++) {
	                if (pattern.test(childs[i].className)) {
	                    els.push(childs[i]);
	                }
	            }
	            return els;
	        };
	        
	        function getProtocol(){
	            var protocol = document.location.protocol;
	            protocol = (protocol == "file:") ? "http:" : protocol;
	            return protocol;
	        };
			
	        function openWin(){
	            var serverUrl = CONST["serverUrl"], queryString = ["sourceId=", window.ONLINESERVERCONFIG.showiconConfig.sourceId].join(""), el = this;
	            if (getProtocol() == "https:") {
	                serverUrl.replace("http:", "https:");
	            }
	            try {
	                window.open(serverUrl + "?" + queryString+"&enterurl="+encodeURIComponent(document.URL), "newCliveWindow", CONST["winAttr"]);
	            } 
	            catch (ex) {
	            }
	        };
	        
	        function init(el){
				//if not ie6 position fixed
				if(!isIE6){
					el.style.position="fixed";
				}
	            bind(el, "click", function(){
	                openWin.apply(el);
	            });
	            var image = (calPicUrl()) || CONST["imageUrl"];
	            try {
	                el.innerHTML = "<a href='javascript:void(0)' onclick='return false;'><img src='" + image + "' style='cursor:pointer;border:none'/></a>";
	            } 
	            catch (e) {
	            }
	        };				
            
            var initOnlineService = function(){
                var icons = $(CONST["iconClassName"]);
                if (icons.length > 0) {
                    for (var i = 0; i < icons.length; i++) {
                        if (onlineService) {
                            var random = Math.random();
                            if ((showiconConfig.showProbability < 1) && (random < percent)) {
                                init(icons[i]);
                            }
                            else 
                                if (showiconConfig.showProbability == 1) {
                                    init(icons[i]);
                                }
                        }
                        
                    }
                }
            }
            
            if (window.Cashier && Cashier.Cache) {
                //E.domReady(function(){
                    initOnlineService();
                //})
            }
            else {
				initOnlineService();
            }
            
            //如果是ie6
			if (isIE6) {
				(function(){
					var DURATION = 500, INTERVAL = 20;
					var os = {
						top: 66,
						right: 0,
						width: 88,
						height: 70,
						fixed: false
					}, win = window, doc = document, body = doc.body, docE = win.documentElement, target = doc.getElementById("onlineService"), getWidth = function(){
						return Math.max(win.innerWidth || 0, docE ? docE.clientWidth : body.clientWidth);
					}, getHeight = function(){
						return Math.max(win.innerHeight || 0, docE ? docE.clientHeight : body.clientHeight);
					}, getScrollLeft = function(){
						return Math.max(doc.documentElement.scrollLeft, body.scrollLeft);
					}, getScrollTop = function(){
						return Math.max(doc.documentElement.scrollTop, body.scrollTop);
					}, setY = function(top){
						target.style.top = top + 'px';
						lastTop = top;
					}, dispatchEvent = function(element, eventName, fn){
						if (element.attachEvent) {
							element.attachEvent('on' + eventName, function(e){
								fn.call(element, e);
							});
						}
						else {
							if (element.addEventListener) {
								element.addEventListener(eventName, fn, false);
							}
							else {
								element['on' + eventName] = fn;
							}
						}
					}, lastTop = -1, lastLeft = -1, timer, handler = function(){
					
						var top = getScrollTop();
						if (os.hasOwnProperty('top')) 
							top += os.top;
						else 
							top -= os.bottom - os.height;
						
						if (lastTop < 0 || Math.abs(top - y) <= INTERVAL) { // init or distance is too short
							setY(top);
						}
						else { // animate
							var y = parseInt(target.style.top, 10), dy = (top - y) / INTERVAL;
							timer && win.clearInterval(timer);
							timer = win.setInterval(function(){
								setY(y + dy);
							}, INTERVAL);
							win.setTimeout(function(){
								win.clearInterval(timer);
								setY(top);
							}, DURATION + 10);
						}
					};
					if (os.hasOwnProperty('left')) {
						target.style.left = os.left + 'px';
					}
					else {
						target.style.right = os.right + 'px';
					}
					handler();
					dispatchEvent(win, 'resize', handler);
					dispatchEvent(win, 'scroll', handler);
				})();
			}
        }
    })();
} 
catch (ex) {
	if(window.console&&window.console.log){
		console.log(ex);
	}
}