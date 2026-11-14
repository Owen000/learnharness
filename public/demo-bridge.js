(function(){
var send=function(m){try{parent.postMessage(m,"*")}catch(e){}};
var lastH=0,lastVH=0;
var post=function(){
var b=document.body;
if(!b){send({type:"demo-resize",height:document.documentElement.scrollHeight});return}
var h=Math.max(b.scrollHeight,b.getBoundingClientRect().height);
var cs=getComputedStyle(b);
h+=(parseFloat(cs.marginTop)||0)+(parseFloat(cs.marginBottom)||0);
h=Math.ceil(h);
var vh=window.innerHeight;
if(lastH&&vh!==lastVH&&h>vh&&Math.abs((h-vh)-(lastH-lastVH))<=1)return;
lastH=h;lastVH=vh;
send({type:"demo-resize",height:h})
};
if(typeof ResizeObserver!=="undefined"){new ResizeObserver(post).observe(document.documentElement)}
window.addEventListener("resize",post);
window.addEventListener("load",post);
window.addEventListener("error",function(e){send({type:"demo-error",message:e.message||String(e)})});
setTimeout(post,50);
setTimeout(post,400);
})();
