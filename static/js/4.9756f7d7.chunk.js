(this["webpackJsonprawg-client"]=this["webpackJsonprawg-client"]||[]).push([[4],{134:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n(7),c=n.n(r),a=n(13),u=n(137),o=n.n(u),s=n(8),i=n(146),f=o.a.create({baseURL:s.a,timeout:1e4});function p(e){return l.apply(this,arguments)}function l(){return(l=Object(a.a)(c.a.mark((function e(t){var n,r,a,u,o=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:"GET",r=o.length>2?o[2]:void 0,a=o.length>3?o[3]:void 0,u=o.length>4?o[4]:void 0,e.abrupt("return",f({method:n,url:t,data:r,params:a,cancelToken:u}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}f.interceptors.request.use((function(e){var t="".concat(e.url,"&key=").concat(s.i);return e.url.includes("?")||(t=t.replace("&","?")),e.url=t,Promise.resolve(e)}),(function(e){return Promise.reject(e)})),f.interceptors.response.use((function(e){return i(e.data)}),(function(e){return e.response?Promise.reject(e.response):e.request?Promise.reject(e.request):Promise.reject(e.message)}))},135:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return a})),n.d(t,"a",(function(){return u}));var r="GENRE_COLLECTION_TYPE",c="GENRE_COLLECTION_TYPE",a="TAG_COLLECTION_TYPE",u="GAME_COLLECTION_TYPE"},136:function(e,t,n){"use strict";n.d(t,"c",(function(){return f})),n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return d}));var r=n(7),c=n.n(r),a=n(13),u=n(5),o=n(134),s=n(98),i=function(e){return{type:u.d,payload:{collectionKey:e}}},f=function(e,t,n){return{type:u.e,payload:{collectionKey:e,fetchedData:t,nextUrl:n}}},p=function(e,t,n){return function(){var r=Object(a.a)(c.a.mark((function r(a){var u,s,p;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a(i(e)),r.next=4,Object(o.a)(t,n);case 4:u=r.sent,s=u.next,p=u.results,a(f(e,p,s)),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),console.log("fetchGames error",r.t0);case 12:case"end":return r.stop()}}),r,null,[[0,9]])})));return function(e){return r.apply(this,arguments)}}()},l=function(e,t){return function(){var n=Object(a.a)(c.a.mark((function n(r,a){var u,o,i,f,l;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:u=a(),o=Object(s.a)(u),i=o[e],l=!!(f=!!i)&&i.loading,f&&!l&&t&&r(p(e,t));case 7:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()},d=function(e,t){return function(){var n=Object(a.a)(c.a.mark((function n(r,a){var u,o,i,f,l,d;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:u=a(),o=Object(s.a)(u),i=o[e],l=!!(f=!!i)&&i.loading,d=!!f&&i.games.length>0,f&&(d||l)||r(p(e,t));case 7:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()}},170:function(e,t,n){"use strict";n.r(t);var r=n(53),c=n(52),a=n(7),u=n.n(a),o=n(13),s=n(5),i=n(136),f=n(98),p=n(8),l=n(134),d=function(e,t){return{type:s.f,payload:{collectionKey:e,screenshots:t}}},h=function(e,t){return function(){var n=Object(o.a)(u.a.mark((function n(r){var c,a,o;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c="".concat(p.c.replace(":slug",e),"/screenshots?page_size=20"),n.next=3,Object(l.a)(c);case 3:a=n.sent,o=a.results,r(d(t,o));case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},v=function(e,t){return function(){var n=Object(o.a)(u.a.mark((function n(r){var c,a;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(l.a)(t);case 2:c=n.sent,(a=c.id)&&(r(Object(i.c)(e,[c],null)),r(h(a,e)));case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},b=n(91),O=n(75),j=n(74),g=n(133),m=n(135),y=Object(g.a)(f.f,(function(e){return[m.a,e].join("|")})),w=Object(g.a)(f.a,y,(function(e,t){var n=e[t];return n&&n.games.length>0?n.games[0]:null})),k=Object(g.a)([f.a,y],(function(e,t){var n=e[t];return n&&n.screenshots?n.screenshots:[]}));t.default=Object(r.b)((function(e){return{game:w(e),collectionKey:y(e),slug:Object(f.f)(e),screenshots:k(e),isAuthenticated:Object(f.c)(e),likes:Object(f.d)(e)}}),{fetchGameIfNeeded:function(e,t){return function(){var n=Object(o.a)(u.a.mark((function n(r,c){var a,o,s,i,l,d;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=c(),o=Object(f.a)(a),s=o[t],l=!!(i=!!s)&&s.games.length>0,i&&l||(d=p.c.replace(":slug",e),r(v(t,d)));case 6:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()},playFullVideo:b.b,changeRoute:O.a,toggleLike:j.h})(c.b)}}]);
//# sourceMappingURL=4.9756f7d7.chunk.js.map