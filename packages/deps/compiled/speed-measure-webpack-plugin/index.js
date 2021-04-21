module.exports=(()=>{var e={970:e=>{let t=0;const n=({func:e,smp:n,context:s,timeEventName:r,pluginName:i,endType:o})=>(...a)=>{const u=t++;const p=()=>n.addTimeEvent("plugins",r,"end",{id:u,allowFailure:true});n.addTimeEvent("plugins",r,"start",{id:u,name:i});p();const c=e=>m(e,i,n);let l;if(o==="wrapDone")l=e.apply(s,a.map(e=>m(e,i,n,p)));else if(o==="async"){const t=a.slice(0,a.length-1);const n=a[a.length-1];l=e.apply(s,t.map(c).concat((...e)=>{p();n(...e)}))}else if(o==="promise")l=e.apply(s,a.map(c)).then(e=>{p();return e});else l=e.apply(s,a.map(c));p();return l};const s=(e,t,s,r)=>(function(i,o){const a=t+"/"+r+"/"+i;const u=n({func:o,smp:s,context:this,timeEventName:a,pluginName:t,endType:"wrapDone"});return e.plugin(i,u)});const r=(e,t,s,r,i)=>(function(o,a){const u=t+"/"+r+"/"+i;const p=n({func:a,smp:s,context:this,timeEventName:u,pluginName:t});return e.call(this,o,p)});const i=(e,t,s,r,i)=>(function(o,a){const u=t+"/"+r+"/"+i;const p=n({func:a,smp:s,context:this,timeEventName:u,pluginName:t,endType:"async"});return e.call(this,o,p)});const o=(e,t,s,r,i)=>(function(o,a){const u=t+"/"+r+"/"+i;const p=n({func:a,smp:s,context:this,timeEventName:u,pluginName:t,endType:"promise"});return e.call(this,o,p)});const a=[];const u=(e,t,n,s)=>{const u=e.hooks;if(!u)return u;const p=a.find(e=>e.pluginName===t&&(e.orig===u||e.wrapped===u));if(p)return p.wrapped;const c=e=>{const a=new Proxy(u[e],{get:(u,p)=>{const c=Reflect.get(u,p);if(p==="tap"&&typeof c==="function")return r(c,t,n,s,e).bind(a);if(p==="tapAsync"&&typeof c==="function")return i(c,t,n,s,e).bind(a);if(p==="tapPromise"&&typeof c==="function")return o(c,t,n,s,e).bind(a);return c},set:(e,t,n)=>{return Reflect.set(e,t,n)},deleteProperty:(e,t)=>{return Reflect.deleteProperty(e,t)}});return a};const l=Object.keys(u).reduce((e,t)=>{e[t]=c(t);return e},{});a.push({orig:u,wrapped:l,pluginName:t});return l};const p=["Compiler","Compilation","MainTemplate","Parser","NormalModuleFactory","ContextModuleFactory"];const c=[];const l=(e,t)=>{const n=c.find(n=>n.pluginName===t&&(n.orig===e||n.wrapped===e));if(n)return n.wrapped};const m=(e,t,n,r)=>{if(!e)return e;const i=l(e,t);if(i)return i;const o=e=>e&&e.constructor&&e.constructor.name;const a=e=>{const t=o(e);return p.includes(t)};const m=a(e);const d=Object.keys(e).map(t=>e[t]).some(a);let f;if(!m&&!d){const t=e.name==="next";f=t&&r?function(){r();return e.apply(this,arguments)}:e}else{const r=new Proxy(e,{get:(e,i)=>{const a=Reflect.get(e,i);if(m&&i==="plugin")return s(e,t,n,o(e)).bind(r);if(m&&i==="hooks")return u(e,t,n,o(e));if(m&&i==="compiler"){const e=l(a,t);if(e){return e}}if(typeof a==="function"){const e=a.bind(r);if(i==="constructor")Object.defineProperty(e,"name",{value:a.name});return e}return a},set:(e,t,n)=>{return Reflect.set(e,t,n)},deleteProperty:(e,t)=>{return Reflect.deleteProperty(e,t)}});f=r}c.push({pluginName:t,orig:e,wrapped:f});return f};e.exports.clear=(()=>{c.length=0;a.length=0});e.exports.WrappedPlugin=class WrappedPlugin{constructor(e,t,n){this._smp_plugin=e;this._smp_pluginName=t;this._smp=n;this.apply=this.apply.bind(this);const s=this;return new Proxy(e,{get(e,t){if(t==="apply"){return s.apply}return e[t]},set:(e,t,n)=>{return Reflect.set(e,t,n)},deleteProperty:(e,t)=>{return Reflect.deleteProperty(e,t)}})}apply(e){return this._smp_plugin.apply(m(e,this._smp_pluginName,this._smp))}}},563:(e,t,n)=>{const s=n(808);e.exports.fg=((e,t)=>{let n=s.bold;if(t>1e4)n=n.red;else if(t>2e3)n=n.yellow;else n=n.green;return n(e)});e.exports.bg=(e=>s.bgBlack.green.bold(e))},698:(e,t,n)=>{const s=n(622);const r=n(747);const i=n(808);const{WrappedPlugin:o,clear:a}=n(970);const{getModuleName:u,getLoaderNames:p,prependLoader:c,tap:l}=n(677);const{getHumanOutput:m,getMiscOutput:d,getPluginsOutput:f,getLoadersOutput:h,smpTag:g}=n(364);const y=s.dirname(r.realpathSync(__filename));e.exports=class SpeedMeasurePlugin{constructor(e){this.options=e||{};this.timeEventData={};this.smpPluginAdded=false;this.wrap=this.wrap.bind(this);this.getOutput=this.getOutput.bind(this);this.addTimeEvent=this.addTimeEvent.bind(this);this.apply=this.apply.bind(this);this.provideLoaderTiming=this.provideLoaderTiming.bind(this)}wrap(e){if(this.options.disable)return e;if(Array.isArray(e))return e.map(this.wrap);if(typeof e==="function")return(...t)=>this.wrap(e(...t));e.plugins=(e.plugins||[]).map(e=>{const t=Object.keys(this.options.pluginNames||{}).find(t=>e===this.options.pluginNames[t])||e.constructor&&e.constructor.name||"(unable to deduce plugin name)";return new o(e,t,this)});if(e.optimization&&e.optimization.minimizer){e.optimization.minimizer=e.optimization.minimizer.map(e=>{return new o(e,e.constructor.name,this)})}if(e.module&&this.options.granularLoaderData){e.module=c(e.module)}if(!this.smpPluginAdded){e.plugins=e.plugins.concat(this);this.smpPluginAdded=true}return e}getOutput(){const e={};if(this.timeEventData.misc)e.misc=d(this.timeEventData.misc);if(this.timeEventData.plugins)e.plugins=f(this.timeEventData.plugins);if(this.timeEventData.loaders)e.loaders=h(this.timeEventData.loaders);if(this.options.outputFormat==="json")return JSON.stringify(e,null,2);if(typeof this.options.outputFormat==="function")return this.options.outputFormat(e);return m(e,{verbose:this.options.outputFormat==="humanVerbose"})}addTimeEvent(e,t,n,s={}){const r=s.allowFailure;delete s.allowFailure;const i=this.timeEventData;if(!i[e])i[e]={};if(!i[e][t])i[e][t]=[];const o=i[e][t];const a=(new Date).getTime();if(n==="start"){s.start=a;o.push(s)}else if(n==="end"){const n=o.find(e=>{const t=!e.end||!s.fillLast;const n=e.id!==undefined&&e.id===s.id;const r=!s.id&&e.name!==undefined&&e.name===s.name;return t&&(n||r)});const i=n||s.fillLast&&o.find(e=>!e.end);if(!i){console.error("Could not find a matching event to end",e,t,s);if(r)return;throw new Error("No matching event!")}i.end=a}}apply(e){if(this.options.disable)return;l(e,"compile",()=>{this.addTimeEvent("misc","compile","start",{watch:false})});l(e,"done",()=>{a();this.addTimeEvent("misc","compile","end",{fillLast:true});const e=typeof this.options.outputTarget==="string";i.enabled=!e;const t=this.getOutput();i.enabled=true;if(e){const e=r.existsSync(this.options.outputTarget)?r.appendFileSync:r.writeFileSync;e(this.options.outputTarget,t+"\n");console.log(g()+"Outputted timing info to "+this.options.outputTarget)}else{const e=this.options.outputTarget||console.log;e(t)}this.timeEventData={}});l(e,"compilation",e=>{l(e,"normal-module-loader",e=>{e[y]=this.provideLoaderTiming});l(e,"build-module",e=>{const t=u(e);if(t){this.addTimeEvent("loaders","build","start",{name:t,fillLast:true,loaders:p(e.loaders)})}});l(e,"succeed-module",e=>{const t=u(e);if(t){this.addTimeEvent("loaders","build","end",{name:t,fillLast:true})}})})}provideLoaderTiming(e){const t={id:e.id};if(e.type!=="end"){t.loader=e.loaderName;t.name=e.module}this.addTimeEvent("loaders","build-specific",e.type,t)}}},364:(e,t,n)=>{const s=6e4;const r=1e3;const i=n(808);const{fg:o,bg:a}=n(563);const{groupBy:u,getAverages:p,getTotalActiveTime:c}=n(677);const l=(e,t={})=>{if(t.verbose){return e.toLocaleString()+" ms"}const n=Math.floor(e/s);const i=(e-n*s)/r;const o=Math.floor(i);const a=o>0?2:3;const u=Math.min(i-o,.99);const p=o+u.toPrecision(a).replace(/^0/,"").replace(/0+$/,"").replace(/^\.$/,"");let c="";if(n>0)c+=n+" min"+(n>1?"s":"")+", ";c+=p+" secs";return c};const m=()=>a(" SMP ")+" ⏱  ";e.exports.smpTag=m;e.exports.getHumanOutput=((e,t={})=>{const n=e=>l(e,t);let s="\n\n"+m()+"\n";if(e.misc){s+="General output time took "+o(n(e.misc.compileTime,t),e.misc.compileTime);s+="\n\n"}if(e.plugins){s+=m()+"Plugins\n";Object.keys(e.plugins).sort((t,n)=>e.plugins[n]-e.plugins[t]).forEach(t=>{s+=i.bold(t)+" took "+o(n(e.plugins[t]),e.plugins[t]);s+="\n"});s+="\n"}if(e.loaders){s+=m()+"Loaders\n";e.loaders.build.sort((e,t)=>t.activeTime-e.activeTime).forEach(e=>{s+=e.loaders.map(o).join(", and \n")+" took "+o(n(e.activeTime),e.activeTime)+"\n";let r=[];if(t.verbose){r.push(["median",n(e.averages.median)]);r.push(["mean",n(e.averages.mean)]);if(typeof e.averages.variance==="number")r.push(["s.d.",n(Math.sqrt(e.averages.variance))]);r.push(["range","("+n(e.averages.range.start)+" --\x3e "+n(e.averages.range.end)+")"])}if(e.loaders.length>1){Object.keys(e.subLoadersTime).forEach(t=>{r.push([t,n(e.subLoadersTime[t])])})}r.push(["module count",e.averages.dataPoints]);const i=r.reduce((e,t)=>Math.max(e,t[0].length),0);r.forEach(e=>{const t=i-e[0].length;s+="  "+e[0]+" ".repeat(t)+" = "+e[1]+"\n"})})}s+="\n\n";return s});e.exports.getMiscOutput=(e=>({compileTime:e.compile[0].end-e.compile[0].start}));e.exports.getPluginsOutput=(e=>Object.keys(e).reduce((t,n)=>{const s=e[n];const r=u("name",s);return r.reduce((e,t)=>{e[t[0].name]=(e[t[0].name]||0)+c(t);return e},t)},{}));e.exports.getLoadersOutput=(e=>{const t=u("loaders",e.build);const n=e["build-specific"]||[];const s=t.map(e=>{const t=p(e);const s=c(e);const r=u("loader",n.filter(t=>e.find(e=>e.name===t.name)));const i=r.reduce((e,t)=>{e[t[0].loader]=c(t);return e},{});return{averages:t,activeTime:s,loaders:e[0].loaders,subLoadersTime:i}});return{build:s}})},677:(e,t,n)=>{const s=(e,t)=>Array.isArray(e)?Array.isArray(t)&&e.every(e=>t.includes(e))&&t.every(t=>e.includes(t)):e===t;const r=e=>{const t=[];const n=[...e];while(n.length){const e=n.pop();const s=t.findIndex(t=>t.start>=e.start&&t.start<=e.end||t.end>=e.start&&t.end<=e.end);if(s===-1){t.push(e)}else{const r=t.splice(s,1)[0];n.push({start:Math.min(e.start,e.end,r.start,r.end),end:Math.max(e.start,e.end,r.start,r.end)})}}return t};const i=e=>e*e;const o=e=>e.reduce((e,t)=>e+t,0)/e.length;const a=e=>e.sort()[Math.floor(e.length/2)];const u=(e,t)=>e.reduce((e,n)=>e+i(n-t),0)/(e.length-1);const p=e=>e.reduce((e,t)=>({start:Math.min(t,e.start),end:Math.max(t,e.end)}),{start:Number.POSITIVE_INFINITY,end:Number.NEGATIVE_INFINITY});e.exports.getModuleName=(e=>e.userRequest);e.exports.getLoaderNames=(e=>e&&e.length?e.map(e=>e.loader||e).map(e=>e.replace(/\\/g,"/").replace(/^.*\/node_modules\/(@[a-z0-9][\w-.]+\/[a-z0-9][\w-.]*|[^\/]+).*$/,(e,t)=>t)).filter(e=>!e.includes("speed-measure-webpack-plugin")):["modules with no loaders"]);e.exports.groupBy=((e,t)=>{const n=[];(t||[]).forEach(t=>{const r=n.find(n=>s(n[0][e],t[e]));if(r)r.push(t);else n.push([t])});return n});e.exports.getAverages=(e=>{const t=e.map(e=>e.end-e.start);const n={};n.dataPoints=e.length;n.median=a(t);n.mean=Math.round(o(t));n.range=p(t);if(e.length>1)n.variance=Math.round(u(t,n.mean));return n});e.exports.getTotalActiveTime=(e=>{const t=r(e);return t.reduce((e,t)=>e+t.end-t.start,0)});const c=e=>{if(!e)return e;if(Array.isArray(e))return e.map(c);if(e.loader){e.use=[e.loader];delete e.loader}if(e.use){if(!Array.isArray(e.use))e.use=[e.use];e.use.unshift("speed-measure-webpack-plugin/loader")}if(e.oneOf){e.oneOf=c(e.oneOf)}if(e.rules){e.rules=c(e.rules)}if(Array.isArray(e.resource)){e.resource=c(e.resource)}if(e.resource&&e.resource.and){e.resource.and=c(e.resource.and)}if(e.resource&&e.resource.or){e.resource.or=c(e.resource.or)}return e};e.exports.prependLoader=c;e.exports.hackWrapLoaders=((e,t)=>{const s=n=>{return function(){const s=n.apply(this,arguments);if(e.includes(arguments[0])){if(s.__smpHacked)return s;s.__smpHacked=true;return t(s,arguments[0])}return s}};if(typeof System==="object"&&typeof System.import==="function"){System.import=s(System.import)}const r=n(282);r.prototype.require=s(r.prototype.require)});const l=e=>e.replace(/(\-\w)/g,e=>e[1].toUpperCase());e.exports.tap=((e,t,n)=>{if(e.hooks){return e.hooks[l(t)].tap("smp",n)}return e.plugin(t,n)})},808:e=>{"use strict";e.exports=require("@umijs/deps/compiled/chalk")},747:e=>{"use strict";e.exports=require("fs")},282:e=>{"use strict";e.exports=require("module")},622:e=>{"use strict";e.exports=require("path")}};var t={};function __nccwpck_require__(n){if(t[n]){return t[n].exports}var s=t[n]={exports:{}};var r=true;try{e[n](s,s.exports,__nccwpck_require__);r=false}finally{if(r)delete t[n]}return s.exports}__nccwpck_require__.ab=__dirname+"/";return __nccwpck_require__(698)})();