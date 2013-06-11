/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2012 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
(function(b,c,a){a.Plugins.SlideShowCaptions={defaultOptions:{captionClassName:"SSSlideCaption"},initialize:function(a,c){var g=this;b.extend(c,b.extend({},g.defaultOptions,c));a.bind("attach-behavior",function(){g._attachBehavior(a)})},_attachBehavior:function(a){var b=a._findWidgetElements("."+a.options.captionClassName);if(b.length)a._sscpCaptions=b,b.css("display","none"),a.slides.bind("wp-panel-show",function(a,d){b.eq(d.panelIndex).css("display","block")}),a.slides.bind("wp-panel-hide",function(a,
d){b.eq(d.panelIndex).css("display","none")}),a.bind("ready",function(){b.eq(a.slides.activeIndex).css("display","block")})}};a.Plugins.SlideShowLabel={defaultOptions:{labelClassName:"SlideShowLabel"},initialize:function(a,c){var g=this;b.extend(c,b.extend({},g.defaultOptions,c));a.bind("attach-behavior",function(){g._attachBehavior(a)})},_attachBehavior:function(a){var b=this,c=a._findWidgetElements("."+a.options.labelClassName);if(c.length)a._$sslpLabels=c,a.slides.bind("wp-panel-show",function(){b._updateLabels(a)}),
a.bind("ready",function(){b._updateLabels(a)})},_findAllTextNodes:function(a,b){b=b||[];switch(a.nodeType){case 3:b.push(a);break;case 1:if(a.nodeName.toLowerCase()!=="script")for(var c=a.firstChild;c;)this._findAllTextNodes(c,b),c=c.nextSibling}a.nextSibling&&this._findAllTextNodes(a.nextSibling,b);return b},_updateLabels:function(a){var b=this,c=a.slides,h=c.activeIndex+1,i=c.$element.length;a._$sslpLabels.each(function(){for(var a=b._findAllTextNodes(this),c=a.length,d=0,g=function(a){return++d===
1?h:d===2?i:a},n=0;n<c;n++){var o=a[n],p=o.nodeValue,q=p.replace(/\d+/g,g);if(q!==p)o.nodeValue=q}})}};a.Plugins.Lightbox={defaultOptions:{lightboxPartsSelector:".PamphletLightboxPart",closeBtnClassName:"PamphletCloseButton"},initialize:function(a,c){var g=this;b.extend(c,b.extend({},g.defaultOptions,c));a._sslbpAutoPlay=c.autoPlay;c.autoPlay=!1;a.bind("before-transform-markup",function(){g._beforeTransformMarkup(a)});a.bind("attach-behavior",function(){g._attachBehavior(a)})},_beforeTransformMarkup:function(b){b._sslbpShownInitially=
!0;var c=b._findWidgetElements("."+b.options.slideClassName);if(c.filter(":hidden").length==0)b._sslbpSlideOffset=c.offset();else{b._sslbpShownInitially=!1;var g=b._findWidgetElements("."+b.options.viewClassName);b._sslbpSlideOffset={top:a.Utils.getCSSIntValue(g,"top")+a.Utils.getCSSIntValue(c,"top"),left:a.Utils.getCSSIntValue(g,"left")+a.Utils.getCSSIntValue(c,"left")}}},_attachBehavior:function(a){var b=this,c=a.options;a.tabs.$element.bind(c.event,function(){b._openLightbox(a)});a.slides.bind("wp-panel-before-show",
function(){b._openLightbox(a)});a._$sslbpCloseBtn=a._findWidgetElements("."+c.closeBtnClassName).bind("click",function(){b._closeLightbox(a)});b._initializeMarkup(a)},_initializeMarkup:function(c){var f=c.options,g=c._findWidgetElements("."+f.viewClassName),h=c.slides.$element,i=g,j=c._sslbpSlideOffset,m=h.outerWidth(),k=h.outerHeight(),l=c._findWidgetElements(f.lightboxPartsSelector),i=b(g[0].parentNode).filter("."+f.clipClassName);i.length===0&&(i=g);l.each(function(f,g){var h=b(g),i=c._sslbpShownInitially?
h.offset():{top:a.Utils.getCSSIntValue(h,"top"),left:a.Utils.getCSSIntValue(h,"left")};h.css({left:i.left-j.left,top:i.top-j.top})}).addClass("popup_element");var n=b('<div id="'+(g.attr("id")||"")+'"></div>').css({left:0,top:0,width:"auto",height:"auto",padding:0,margin:0,zIndex:"auto"});g.removeAttr("id");var o=b("<div class='overlayWedge'></div>").insertBefore(h[0]);n.append(g.children().not("."+f.slideClassName));g.append(h);n.css({visibility:"hidden"}).appendTo(document.body);var g=n.outerWidth(),
p=n.outerHeight();n.detach().css({visibility:""});i.css({padding:0,left:0,top:0,width:m,height:k,borderWidth:0,background:"none",position:"absolute"});f.transitionStyle==="fading"&&h.css({left:0,top:0,position:"absolute"});f=-m/2;k=-k/2;i=b("<div class='LightboxContent'></div>").css({position:"absolute"}).append(i).append(l).museOverlay({autoOpen:!1,offsetLeft:f,offsetTop:k,overlayExtraWidth:g,overlayExtraHeight:p,$overlaySlice:n,$overlayWedge:o,onClose:function(){c.stop()}});b.browser.msie&&b.browser.version<
9&&(n=n[0],a.Utils.needPIE(),PIE.detach(n),PIE.attach(n));c._$sslbpOverlay=i;c._csspIsImageSlideShow||h.each(function(){a.Utils.detachIframesAndObjectsToPauseMedia(b(this))})},_openLightbox:function(c){var f=c._$sslbpOverlay;f.data("museOverlay").isOpen||(f.museOverlay("open"),c._sslbpAutoPlay&&c.play());c._csspIsImageSlideShow||a.Utils.attachIframesAndObjectsToResumeMedia(b(c.slides.activeElement))},_closeLightbox:function(c){c._$sslbpOverlay.data("museOverlay").isOpen&&(c.stop(),c._$sslbpOverlay.museOverlay("close"),
c._csspIsImageSlideShow||a.Utils.detachIframesAndObjectsToPauseMedia(b(c.slides.activeElement)))}};a.Plugins.ContentSlideShow={defaultOptions:{displayInterval:3E3,transitionDuration:500,transitionStyle:"fading",contentLayout_runtime:"stack",event:"click",deactivationEvent:"none",hideAllContentsFirst:!1,shuffle:!1},slideShowOverrides:{slideshowClassName:"SlideShowWidget",viewClassName:"SlideShowContentPanel",slideClassName:"SSSlide",slideLinksClassName:"SSSlideLinks",slideLinkClassName:"SSSlideLink",
slideLinkActiveClassName:"SSSlideLinkSelected",slideCountClassName:"SSSlideCount",firstBtnClassName:"SSFirstButton",lastBtnClassName:"SSLastButton",prevBtnClassName:"SSPreviousButton",nextBtnClassName:"SSNextButton",playBtnClassName:"SSPlayButton",stopBtnClassName:"SSStopButton",closeBtnClassName:"SSCloseButton",heroFitting:"fitContentProportionally",thumbFitting:"fillFrameProportionally",lightboxPartsSelector:".SlideShowCaptionPanel, .SSFirstButton, .SSPreviousButton, .SSNextButton, .SSLastButton, .SlideShowLabel, .SSCloseButton",
lightboxEnabled_runtime:!1},compositionOverrides:{slideshowClassName:"PamphletWidget",viewClassName:"ContainerGroup",slideClassName:"Container",slideLinkClassName:"Thumb",slideLinkActiveClassName:"PamphletThumbSelected",prevBtnClassName:"PamphletPrevButton",nextBtnClassName:"PamphletNextButton",lightboxPartsSelector:".PamphletLightboxPart"},initialize:function(d,f){var g=this,h=d.$element.hasClass("SlideShowWidget"),i=h?g.slideShowOverrides:g.compositionOverrides;d._csspIsImageSlideShow=h;d._csspIsDynamicSlideshow=
h&&d.$element.parent().hasClass("mu-query");b.extend(f,b.extend({},g.defaultOptions,i,f));if(f.hideAllContentsFirst)f.defaultIndex=-1;if(f.lightboxEnabled_runtime)f.contentLayout_runtime="lightbox";h&&(c.Widget.ContentSlideShow.slideImageIncludePlugin.initialize(d,f),a.Plugins.SlideShowLabel.initialize(d,f),a.Plugins.SlideShowCaptions.initialize(d,f));f.transitionStyle=="fading"?c.Widget.ContentSlideShow.fadingTransitionPlugin.initialize(d,f):a.Browser.Features.Touch?c.Widget.ContentSlideShow.swipeTransitionPlugin.initialize(d,
f):c.Widget.ContentSlideShow.filmstripTransitionPlugin.initialize(d,f);f.contentLayout_runtime==="lightbox"&&a.Plugins.Lightbox.initialize(d,f);f.shuffle===!0&&c.Widget.ContentSlideShow.shufflePlayPlugin.initialize(d,f);d.bind("transform-markup",function(){g._transformMarkup(d)});d.bind("attach-behavior",function(){g._attachBehavior(d)})},_transformMarkup:function(a){var c=a.options,g=a._findWidgetElements("."+c.viewClassName);if(c.transitionStyle!=="fading"){var h=b('<div class="'+c.clipClassName+
'"/>'),i=a._findWidgetElements("."+c.slideClassName),c=i.outerWidth(),i=i.outerHeight(),j={position:"relative",width:c+"px",height:i+"px",overflow:"hidden"};if(g.css("position")==="absolute")j.position="absolute",j.left=g.css("left"),j.top=g.css("top");h.css(j);g.css({position:"relative",top:"0",left:"0",width:c+"px",height:i+"px",margin:"0",padding:"0",overflow:"hidden"}).wrap(h)}else g.css({width:"0",height:"0"});a._csspIsDynamicSlideshow&&this._layoutThumbs(a)},_attachBehavior:function(c){var f=
c.options,g=c.tabs,h=c.slides.$element,i=f.slideLinkActiveClassName;c._csspIsDynamicSlideshow&&(this._setupImagePositioning(c,c.slides.$element,f.heroFitting),this._setupImagePositioning(c,c.tabs.$element,f.thumbFitting));if(g&&(f.event==="mouseover"||f.event==="mouseover_canRollout")){var j=g.$element,m=this._hitTest;j.bind("mouseenter",function(){var a=b(this),i=j.index(a);g.selectTab(i);if(f.deactivationEvent==="mouseout_trigger"||f.deactivationEvent==="mouseout_both"){var n=h.eq(i),o=function(g){var h=
m(g,a);f.deactivationEvent==="mouseout_both"&&(h=h||m(g,n));h||(b(document).unbind("mousemove",o),c.slides.hidePanel(i))};b(document).bind("mousemove",o)}})}g&&i&&(f.hideAllContentsFirst||g.$element.eq(g.options.defaultIndex).addClass(i),c.slides.bind("wp-panel-show",function(a,b){g.$element.eq(b.panelIndex).addClass(i)}).bind("wp-panel-hide",function(a,b){g.$element.eq(b.panelIndex).removeClass(i)}));this._attachStopOnClickHandler(c,c.$firstBtn);this._attachStopOnClickHandler(c,c.$lastBtn);this._attachStopOnClickHandler(c,
c.$previousBtn);this._attachStopOnClickHandler(c,c.$nextBtn);this._attachStopOnClickHandler(c,c.$playBtn);this._attachStopOnClickHandler(c,c.$stopBtn);g&&f.contentLayout_runtime!=="lightbox"&&this._attachStopOnClickHandler(c,g.$element);c._csspIsImageSlideShow||c.slides.bind("wp-panel-hide",function(c,d){a.Utils.detachIframesAndObjectsToPauseMedia(b(d.panel))}).bind("wp-panel-show",function(c,d){a.Utils.attachIframesAndObjectsToResumeMedia(b(d.panel))})},_attachStopOnClickHandler:function(a,b){b.bind("click",
function(){a.stop()})},_hitTest:function(a,b){b.outerWidth()===0&&(b=b.children(".popup_anchor").children(".popup_element").eq(0));var c=b.offset(),c={x:c.left,y:c.top,width:b.outerWidth(),height:b.outerHeight()};return a.pageX>=c.x&&a.pageX<=c.x+c.width&&a.pageY>=c.y&&a.pageY<=c.y+c.height},_layoutThumbs:function(c){var f=c.options,g=a.Utils.getStyleValue;c._findWidgetElements("."+f.slideLinksClassName).each(function(){var c=b(this).find("."+f.slideLinkClassName);firstThumb=c[0];tWidth=g(firstThumb,
"width");tHeight=g(firstThumb,"height");gapH=g(firstThumb,"margin-right");gapV=g(firstThumb,"margin-bottom");borderL=g(firstThumb,"border-left-width");borderR=g(firstThumb,"border-right-width");borderT=g(firstThumb,"border-top-width");borderB=g(firstThumb,"border-bottom-width");gWidth=g(this,"width");paddingL=g(this,"padding-left");paddingT=g(this,"padding-top");maxNumThumb=Math.floor((gWidth+gapH)/(tWidth+borderL+borderR+gapH));gStyle=this.runtimeStyle?this.runtimeStyle:this.style;numRow=Math.ceil(c.length/
maxNumThumb);firstRowNum=c.length<maxNumThumb?c.length:maxNumThumb;leftPos=leftMostPos=a.Utils.pixelRound((gWidth-(tWidth+borderL+borderR)*firstRowNum-gapH*(firstRowNum-1))/2)+paddingL;topPos=paddingT;numInRow=1;gStyle.height=(tHeight+borderT+borderB)*numRow+gapV*(numRow-1)+"px";c.each(function(){numInRow>firstRowNum&&(numInRow=1,leftPos=leftMostPos,topPos+=tHeight+borderT+borderB+gapV);numInRow++>1&&(leftPos+=tWidth+borderL+borderR+gapH);var a=this.runtimeStyle?this.runtimeStyle:this.style;a.marginRight=
"0px";a.marginBottom="0px";a.left=leftPos+"px";a.top=topPos+"px"})})},_setupImagePositioning:function(a,c,g){var h=this;c.each(function(){var a=this;b(a).find("img").each(function(){var c=this;c.complete?h._positionImage(c,a,g):b(c).load(function(){h._positionImage(c,a,g)})})})},_positionImage:function(b,c,g){var c=b.width,h=b.height,i=a.Utils.getNaturalWidth(b),j=a.Utils.getNaturalHeight(b);if(!(c==i&&h==j)){var m=i,k=j;if(g=="fillFrameProportionally")i>c&&j>h&&(g=i/c,m=j/h,g<m?(k=j/g,m=c):(k=h,
m=i/m));else if(g=="fitContentProportionally"&&(i>c||j>h))g=i/c,m=j/h,g>m?(k=j/g,m=i/g):(k=j/m,m=i/m);b=b.runtimeStyle?b.runtimeStyle:b.style;b.width=a.Utils.pixelRound(m)+"px";b.height=a.Utils.pixelRound(k)+"px";b.marginTop=a.Utils.pixelRound((h-k)/2)+"px";b.marginLeft=a.Utils.pixelRound((c-m)/2)+"px"}}};b.extend(c.Widget.ContentSlideShow.slideImageIncludePlugin.defaultOptions,{imageIncludeClassName:"ImageInclude",slideLoadingClassName:"SSSlideLoading"});c.Widget.ContentSlideShow.prototype.defaultPlugins=
[a.Plugins.ContentSlideShow]})(jQuery,WebPro,Muse,window);
