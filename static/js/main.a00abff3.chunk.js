(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,n){e.exports=n(59)},32:function(e,t,n){},33:function(e,t,n){e.exports=n.p+"static/media/logo.06e73328.svg"},34:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var a,r,l,c,u=n(0),o=n.n(u),i=n(18),s=n.n(i),f=(n(32),n(33),n(34),n(3)),m=n(1),d=n(19),v=n.n(d),b=n(4),p=(n(45),n(56),b.a.table(a||(a=Object(f.a)(["\n  border-collapse: collapse;\n  margin: 0 auto;\n"])))),j=function(e){var t=e.size;return o.a.createElement("div",{className:"Play0"},o.a.createElement("svg",{width:t,height:t},o.a.createElement("circle",{stroke:"#FFDE03",fill:"none",strokeWidth:6,cx:t/2,cy:t/2,r:(t-6)/2})))},y=b.a.tr(r||(r=Object(f.a)(["\n  :last-child {\n    border-bottom: none;\n  }\n"]))),E=b.a.td(l||(l=Object(f.a)(["\n  width: ","px;\n  height: ","px;\n  text-align: center;\n"])),function(e){return e.size},function(e){return e.size}),h=[[null,null,null],[null,null,null],[null,null,null]],O=function(e){var t=e.table,n=void 0===t?h:t,a=e.cellClick,r=e.cellSize,l=void 0===r?100:r;return o.a.createElement(p,null,o.a.createElement("tbody",null,n.map(function(e,t){return o.a.createElement(y,{key:t},e.map(function(e,n){return o.a.createElement(E,{size:l,key:n,onClick:function(){return a(t,n)}},o.a.createElement("div",{className:"svgfile"},null===e?"":"x"===e?o.a.createElement("p",{className:"PlayX"},"X"):o.a.createElement(j,{size:.5*l})))}))})))},g=n(22),w=n(7),k=n(13),x=n.n(k),C=[[null,null,null],[null,null,null],[null,null,null]],S=!1,P={playerLetter:"o"},G=function(){var e=Object(u.useState)(x()(C)),t=Object(m.a)(e,2),n=t[0],a=t[1],r=Object(u.useState)(null),l=Object(m.a)(r,2),c=l[0],o=l[1],i=Object(u.useState)(!1),s=Object(m.a)(i,2),f=s[0],d=s[1],v=Object(u.useState)(0),b=Object(m.a)(v,2),p=b[0],j=b[1],y=Object(u.useState)("x"),E=Object(m.a)(y,2),h=E[0],O=E[1],k=Object(u.useState)(!1),G=Object(m.a)(k,2),A=G[0],F=G[1],z=Object(u.useState)(S?"human":"ki"),M=Object(m.a)(z,2),N=M[0],R=M[1],L=function(e){var t=parseInt((e-1)/3,10);return{row:t,col:e-1-3*t}},I=function(){for(var e,t,a,r=0;r<9&&(e=L(r),t=e.row,a=e.col,null!==n[t][a]);r++);return e},T=Object(u.useCallback)(function(e,t){a(function(n){var a=Object(g.a)(n);return a[e][t]=h,a}),O(function(e){return"x"===e?"o":"x"}),j(function(e){return e+1})},[h]);Object(u.useEffect)(function(){if(p>0){var e=function(e){var t,n=function(e){var t,n,a=Object(w.a)(e);try{for(a.s();!(n=a.n()).done;){var r=n.value.join("");if(r==="x".repeat(3)?t="x":r==="o".repeat(3)&&(t="o"),t)break}}catch(l){a.e(l)}finally{a.f()}return t},a=n(e),r=[];if(!a){var l,c=Object(w.a)(e);try{for(c.s();!(l=c.n()).done;){var u,o=l.value,i=0,s=Object(w.a)(o);try{for(s.s();!(u=s.n()).done;){var f=u.value;Array.isArray(r[i])||(r[i]=[]),r[i].push(f),i++}}catch(y){s.e(y)}finally{s.f()}}}catch(y){c.e(y)}finally{c.f()}t=n(r)}var m=Array.from(new Array(3)).map(function(t,n){return e[n][n]}).join(""),d=3,v=Array.from(new Array(3)).map(function(t,n){return e[n][--d]}).join(""),b=function(e){return(m===e.repeat(3)||v===e.repeat(3))&&e},p=b("x"),j=b("o");return a||t||p||j}(n);if(e)o(e),d(!0);else if("ki"===N){if(h===P.playerLetter){var t=I();T(t.row,t.col)}}}p>=9&&d(!0)},[p,n,h,I,T,N]),Object(u.useEffect)(function(){if(f){if(null===c)return void F(!0);F(!0)}},[f,c]);return[n,{gameStatus:{activePlayer:h,currentPlayerText:function(e){},gameMode:N,gameover:f,round:p,showGameover:A,winner:c},actions:{handleCellClick:function(e,t){f||null!==n[e][t]||"ki"===N&&h===P.playerLetter||T(e,t)},handleRestart:function(){a(x()(C)),o(null),O("x"),j(0),d(!1)},hideGameoverModal:function(){return F(!1)},setGameMode:R}}]},A=function(){var e=G(),t=Object(m.a)(e,2),n=t[0],a=t[1],r=a.gameStatus,l=a.actions;return o.a.createElement(o.a.Fragment,null,!r.gameover&&o.a.createElement("span",null,r.currentPlayerText(r.activePlayer)),o.a.createElement(O,{table:n,cellClick:l.handleCellClick}),o.a.createElement(v.a,{appElement:document.getElementById("root"),isOpen:r.showGameover,onRequestClose:l.hideGameoverModal,className:"madalGame"},o.a.createElement("h1",null,"Game over"),o.a.createElement("h2",null,r.winner?"Player ".concat(r.winner," won!"):"Draw!"),o.a.createElement("div",{className:"Restart"},o.a.createElement(F,{onClick:function(){l.hideGameoverModal(),l.handleRestart()}},"Restart game?"))))},F=b.a.button(c||(c=Object(f.a)(["\n  outline: none;\n"])));var z=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(A,null))},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,60)).then(function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,l=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),l(e),c(e)})};s.a.createRoot(document.getElementById("root")).render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(z,null))),M()}},[[25,1,2]]]);
//# sourceMappingURL=main.a00abff3.chunk.js.map