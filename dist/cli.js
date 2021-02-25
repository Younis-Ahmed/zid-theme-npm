!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o(require("archiver")):"function"==typeof define&&define.amd?define(["archiver"],o):"object"==typeof exports?exports.cli=o(require("archiver")):e.cli=o(e.archiver)}(global,(function(e){return o={306:e=>{"use strict";e.exports=JSON.parse('{"name":"zid-theme","version":"1.0.1","description":"A CLI to process zid theme folder","main":"bin/zid-theme","repository":"https://github.com/zidsa/zid-theme-npm","bin":{"zid-theme":"bin/zid-theme"},"files":["bin/","dist/"],"publishConfig":{"access":"public"},"author":"omar <omar.csse@gmail.com>","license":"MIT","private":false,"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":["cli","zid","zid-theme"],"dependencies":{"archiver":"^5.2.0"}}')},739:(e,o,r)=>{const t=r(798),n=r(254),l=r(306),s=r(647),i=r(596);e.exports=e=>{let o=e.slice(2);o.length<1&&(n.log(),n.log("no argument passed\n","red"),n.log("available commands:\n"),i(),process.exit(9)),["--version","-v","--v","version"].includes(o[0])&&(n.log(`v${l.version}`,"green"),process.exit(0)),t[o[0]]||(n.log(),n.log(`Invalid argument ${o[0]}\n`,"red"),n.log("available commands:\n"),i(),process.exit(9)),"build"==o[0]?(build_args=s(o),t.build(build_args.build_name,build_args.build_path)):"help"==o[0]&&t.help()}},674:e=>{e.exports={red:"[1;31m ",green:"[1;32m ",yellow:"[1;33m ",blue:"[1;34m ",purple:"[1;35m ",cyan:"[1;36m "}},254:(e,o,r)=>{const t=r(674),n=(e="",o="green")=>{let r=t[o]+`  ${e}`;console.log(r)},l={log:n,error:e=>{n(),n(`${e}\n`,"red"),process.exit(9)}};e.exports=l},234:(e,o,r)=>{const t=r(747),n=r(254);e.exports=e=>{t.unlinkSync(e),n.log(`.DS_Store deleted - path: ${e}\n\n`,"yellow")}},596:(e,o,r)=>{const t=r(254),n=r(798);e.exports=()=>{for(command in n)t.log(`• ${command}`);t.log()}},312:e=>{e.exports={root:["query.json","layout.zid","header.zid","footer.zid","templates","modules","locals","common","assets"],templates:[".zid"],common:[".zid",".html"],modules:[".zid",".html"],assets:[".js",".ts",".css",".scss",".map",".png",".jpg",".jpeg",".gif",".svg",".woff",".woff2",".otf",".ttf",".eot"],locals:[".json"]}},647:(e,o,r)=>{const t=r(622),n=r(254);e.exports=e=>{e[1]&&"--name"!==e[1]&&"--path"!==e[1]&&n.error(`Invalid Argument ${e[1]}`),e[3]&&"--name"!==e[3]&&"--path"!==e[3]&&n.error(`Invalid Argument ${e[3]}`),"--name"!=e[2]&&"--path"!=e[2]||n.error(`Invalid Argument ${e[2]} for ${e[1]}`),"--name"!=e[4]&&"--path"!=e[4]||n.error(`Invalid Argument ${e[4]} for ${e[3]}`);let o=process.cwd(),r=t.basename(process.cwd());for(let n=1;n<e.length;n++)"--name"==e[n]&&e[n+1]?r=e[n+1]:"--path"==e[n]&&e[n+1]&&(o=t.resolve(process.cwd(),e[n+1]||"."),r=t.basename(o));return{build_path:o,build_name:r}}},290:(e,o,r)=>{const t=r(622);e.exports=(e,o)=>{let r=t.extname(e);return!!o.includes(r)||r}},971:e=>{e.exports=(e,o)=>{let r=[];for(let t=0;t<o.length;t++)e.includes(o[t])||r.push(o[t]);return 0===r.length||JSON.stringify(r)}},790:(e,o,r)=>{const t=r(747),n=r(622),l=r(312),s=r(234),i=r(290),a=r(971);r(254),e.exports=e=>new Promise(((o,r)=>{let d=t.readdirSync(e),c=a(d,l.root);if(!0!==c)return r(`Unable to find:\n   ${c}\n\n   - Make sure theme path is correct or add required files\n`);for(const o of d){let a={filename:o,path:n.resolve(e,o)},d=null;if(".DS_Store"==o?s(a.path):d=t.lstatSync(a.path),d&&d.isDirectory()&&l.root.includes(o)){let e=t.readdirSync(a.path);for(const t of e){if(".DS_Store"==t){s(n.resolve(a.path,t));continue}let e=i(t,l[o]);if(!0!==e)return r(`Invalid extension ${e}\n   ${t} in ${o} folder\n`)}}}return o("Theme validated")}))},123:(e,o,r)=>{const t=r(747),n=r(622),l=r(543),s=r(254),i=r(790),a=r(312),d=l("zip");e.exports=async(e,o)=>{try{let e=await i(o);s.log(e)}catch(e){s.error(e)}const r=t.createWriteStream(n.resolve(o,`${e}.zip`));for(folder in r.on("close",(function(){s.log(d.pointer()+" total bytes"),s.log(`${e}.zip successfully created!\n`)})),d.pipe(r),["layout.zid","header.zid","footer.zid"].forEach((e=>{d.append(t.createReadStream(n.resolve(o,e)),{name:e})})),a)if("root"!==folder){let e=t.readdirSync(n.resolve(o,folder));d.append(null,{name:`${folder}/`}),e.forEach((e=>{let r=n.resolve(o,folder,e);d.append(t.createReadStream(r),{name:`${folder}/${e}`})}))}d.finalize()}},373:(e,o,r)=>{const t=r(254),n=r(123);e.exports=(e,o)=>{t.log(),n(e,o).then((e=>t.log(e))).catch((e=>t.error(e)))}},798:(e,o,r)=>{const t=r(373),n=r(371);e.exports={build:t,help:n}},371:(e,o,r)=>{const t=r(254);e.exports=()=>{t.log(),t.log("help:\n","cyan"),t.log("available commands:\n","cyan"),t.log("•  build args[ --name optional => default:cwd name, --path optional => default:cwd ]"),t.log("   example-1: zid-theme build --name omar --path .","yellow"),t.log("   example-2: zid-theme build\n\n","yellow"),t.log("•  help"),t.log("   example: zid-theme help\n","yellow")}},543:o=>{"use strict";o.exports=e},747:e=>{"use strict";e.exports=require("fs")},622:e=>{"use strict";e.exports=require("path")}},r={},function e(t){if(r[t])return r[t].exports;var n=r[t]={exports:{}};return o[t](n,n.exports,e),n.exports}(739);var o,r}));