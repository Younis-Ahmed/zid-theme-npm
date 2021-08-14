!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("archiver")):"function"==typeof define&&define.amd?define(["archiver"],t):"object"==typeof exports?exports.cli=t(require("archiver")):e.cli=t(e.archiver)}(global,(function(e){return(()=>{var t={285:(e,t,r)=>{const n=r(173),o=r(622),i=r(396),a=r(333),s=n.FileSystem.require();s.existsSync=s.existsSync||o.existsSync;const l={readEntries:!1,method:n.Constants.NONE};function c(e){var t=o.posix.normalize("/"+e.split("\\").join("/"));return o.join(".",t)}e.exports=function(e,t){let r=null;const f=Object.assign(Object.create(null),l);if(e&&"object"==typeof e&&(e instanceof Uint8Array||(Object.assign(f,e),e=f.input?f.input:void 0,f.input&&delete f.input),e instanceof Uint8Array&&(r=e,f.method=n.Constants.BUFFER,e=void 0)),Object.assign(f,t),e&&"string"==typeof e){if(!s.existsSync(e))throw new Error(n.Errors.INVALID_FILENAME);f.method=n.Constants.FILE,f.filename=e,r=s.readFileSync(e)}const u=new a(r,f);function d(e,t){e=o.resolve(o.normalize(e));for(var r=t.split("/"),n=0,i=r.length;n<i;n++){var a=o.normalize(o.join(e,r.slice(n,i).join(o.sep)));if(0===a.indexOf(e))return a}return o.normalize(o.join(e,o.basename(t)))}function E(e){var t;return e&&u&&("string"==typeof e&&(t=u.getEntry(e)),"object"==typeof e&&void 0!==e.entryName&&void 0!==e.header&&(t=u.getEntry(e.entryName)),t)?t:null}function m(e){const{join:t,normalize:r,sep:n}=o.posix;return t(".",r(n+e.split("\\").join(n)+n))}return{readFile:function(e,t){var r=E(e);return r&&r.getData(t)||null},readFileAsync:function(e,t){var r=E(e);r?r.getDataAsync(t):t(null,"getEntry failed for:"+e)},readAsText:function(e,t){var r=E(e);if(r){var n=r.getData();if(n&&n.length)return n.toString(t||"utf8")}return""},readAsTextAsync:function(e,t,r){var n=E(e);n?n.getDataAsync((function(e,n){n?t(e,n):e&&e.length?t(e.toString(r||"utf8")):t("")})):t("")},deleteFile:function(e){var t=E(e);t&&u.deleteEntry(t.entryName)},addZipComment:function(e){u.comment=e},getZipComment:function(){return u.comment||""},addZipEntryComment:function(e,t){var r=E(e);r&&(r.comment=t)},getZipEntryComment:function(e){var t=E(e);return t&&t.comment||""},updateFile:function(e,t){var r=E(e);r&&r.setData(t)},addLocalFile:function(e,t,r,o){if(!s.existsSync(e))throw new Error(n.Errors.FILE_NOT_FOUND.replace("%s",e));{t=t?m(t):"";var i=e.split("\\").join("/").split("/").pop();t+=r||i;const n=s.statSync(e);this.addFile(t,s.readFileSync(e),o,n)}},addLocalFolder:function(e,t,r){var i;if(r instanceof RegExp?(i=r,r=function(e){return i.test(e)}):"function"!=typeof r&&(r=function(){return!0}),t=t?m(t):"",e=o.normalize(e),!s.existsSync(e))throw new Error(n.Errors.FILE_NOT_FOUND.replace("%s",e));var a=n.findFiles(e),l=this;a.length&&a.forEach((function(n){var i=o.relative(e,n).split("\\").join("/");if(r(i)){var a=s.statSync(n);a.isFile()?l.addFile(t+i,s.readFileSync(n),"",a):l.addFile(t+i+"/",Buffer.alloc(0),"",a)}}))},addLocalFolderAsync:function(e,t,r,i){var a;i instanceof RegExp?(a=i,i=function(e){return a.test(e)}):"function"!=typeof i&&(i=function(){return!0}),r=r?m(r):"",e=o.normalize(e);var l=this;s.open(e,"r",(function(a){if(a&&"ENOENT"===a.code)t(void 0,n.Errors.FILE_NOT_FOUND.replace("%s",e));else if(a)t(void 0,a);else{var c=n.findFiles(e),f=-1,u=function(){if((f+=1)<c.length){var n=c[f],a=o.relative(e,n).split("\\").join("/");a=a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\x20-\x7E]/g,""),i(a)?s.stat(n,(function(e,o){e&&t(void 0,e),o.isFile()?s.readFile(n,(function(e,n){e?t(void 0,e):(l.addFile(r+a,n,"",o),u())})):(l.addFile(r+a+"/",Buffer.alloc(0),"",o),u())})):u()}else t(!0,void 0)};u()}}))},addLocalFolderPromise:function(e,t){return new Promise(((r,n)=>{const{filter:o,zipPath:i}=Object.assign({},t);this.addLocalFolderAsync(e,((e,t)=>{t&&n(t),e&&r(this)}),i,o)}))},addFile:function(e,t,r,n){let o=E(e);const a=null!=o;a||(o=new i,o.entryName=e),o.comment=r||"";const l="object"==typeof n&&n instanceof s.Stats;l&&(o.header.time=n.mtime);var c=o.isDirectory?16:0;if("win32"!==process.platform){let e=o.isDirectory?16384:32768;e|=l?4095&n.mode:"number"==typeof n?4095&n:o.isDirectory?493:420,c=(c|e<<16)>>>0}o.attr=c,o.setData(t),a||u.setEntry(o)},getEntries:function(){return u?u.entries:[]},getEntry:function(e){return E(e)},getEntryCount:function(){return u.getEntryCount()},forEach:function(e){return u.forEach(e)},extractEntryTo:function(e,t,r,i,a){i=i||!1,r=void 0===r||r;var l=E(e);if(!l)throw new Error(n.Errors.NO_ENTRY);var f=c(l.entryName),m=d(t,a&&!l.isDirectory?a:r?f:o.basename(f));if(l.isDirectory)return m=o.resolve(m,".."),u.getEntryChildren(l).forEach((function(e){if(!e.isDirectory){var a=e.getData();if(!a)throw new Error(n.Errors.CANT_EXTRACT_FILE);var s=c(e.entryName),l=d(t,r?s:o.basename(s)),f=e.attr?(e.attr>>>0|0)>>16&4095:0;n.writeFileTo(l,a,i,f)}})),!0;var h=l.getData();if(!h)throw new Error(n.Errors.CANT_EXTRACT_FILE);if(s.existsSync(m)&&!i)throw new Error(n.Errors.CANT_OVERRIDE);var p=l.attr?(l.attr>>>0|0)>>16&4095:0;return n.writeFileTo(m,h,i,p),!0},test:function(e){if(!u)return!1;for(var t in u.entries)try{if(t.isDirectory)continue;if(!u.entries[t].getData(e))return!1}catch(e){return!1}return!0},extractAllTo:function(e,t,r){if(t=t||!1,!u)throw new Error(n.Errors.NO_ZIP);u.entries.forEach((function(o){var i=d(e,c(o.entryName.toString()));if(o.isDirectory)n.makeDir(i);else{var a=o.getData(r);if(!a)throw new Error(n.Errors.CANT_EXTRACT_FILE);var l=o.attr?(o.attr>>>0|0)>>16&4095:0;n.writeFileTo(i,a,t,l);try{s.utimesSync(i,o.header.time,o.header.time)}catch(e){throw new Error(n.Errors.CANT_EXTRACT_FILE)}}}))},extractAllToAsync:function(e,t,r){if(r||(r=function(){}),t=t||!1,u){var i=u.entries,a=i.length;i.forEach((function(i){if(!(a<=0)){var l=o.normalize(c(i.entryName.toString()));if(i.isDirectory)return n.makeDir(d(e,l)),void(0==--a&&r(void 0));i.getDataAsync((function(c,f){if(!(a<=0))if(f)r(new Error(f));else{if(!c)return a=0,void r(new Error(n.Errors.CANT_EXTRACT_FILE));var u=i.attr?(i.attr>>>0|0)>>16&4095:0;n.writeFileToAsync(d(e,l),c,t,u,(function(t){try{s.utimesSync(o.resolve(e,l),i.header.time,i.header.time)}catch(e){r(new Error("Unable to set utimes"))}if(!(a<=0))return t?void(0==--a&&r(void 0)):(a=0,void r(new Error("Unable to write")))}))}}))}}))}else r(new Error(n.Errors.NO_ZIP))},writeZip:function(e,t){if(1===arguments.length&&"function"==typeof e&&(t=e,e=""),!e&&f.filename&&(e=f.filename),e){var r=u.compressToBuffer();if(r){var o=n.writeFileTo(e,r,!0);"function"==typeof t&&t(o?null:new Error("failed"),"")}}},writeZipPromise:function(e,t){const{overwrite:r,perm:o}=Object.assign({overwrite:!0},t);return new Promise(((t,i)=>{!e&&f.filename&&(e=f.filename),e||i("ADM-ZIP: ZIP File Name Missing"),this.toBufferPromise().then((a=>{n.writeFileToAsync(e,a,r,o,(e=>e?t(e):i("ADM-ZIP: Wasn't able to write zip file")))}),i)}))},toBufferPromise:function(){return new Promise(((e,t)=>{u.toAsyncBuffer(e,t)}))},toBuffer:function(e,t,r,n){return this.valueOf=2,"function"==typeof e?(u.toAsyncBuffer(e,t,r,n),null):u.compressToBuffer()}}}},907:(e,t,r)=>{var n=r(173),o=n.Constants;e.exports=function(){var e=20,t=10,r=0,i=0,a=0,s=0,l=0,c=0,f=0,u=0,d=0,E=0,m=0,h=0,p=0;switch(process.platform){case"win32":e|=2560;default:e|=768}var g={};function y(e){e=new Date(e),a=(e.getFullYear()-1980&127)<<25|e.getMonth()+1<<21|e.getDate()<<16|e.getHours()<<11|e.getMinutes()<<5|e.getSeconds()>>1}return y(+new Date),{get made(){return e},set made(t){e=t},get version(){return t},set version(e){t=e},get flags(){return r},set flags(e){r=e},get method(){return i},set method(e){switch(e){case o.STORED:this.version=10;case o.DEFLATED:default:this.version=20}i=e},get time(){return new Date(1980+(a>>25&127),(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1)},set time(e){y(e)},get crc(){return s},set crc(e){s=e},get compressedSize(){return l},set compressedSize(e){l=e},get size(){return c},set size(e){c=e},get fileNameLength(){return f},set fileNameLength(e){f=e},get extraLength(){return u},set extraLength(e){u=e},get commentLength(){return d},set commentLength(e){d=e},get diskNumStart(){return E},set diskNumStart(e){E=e},get inAttr(){return m},set inAttr(e){m=e},get attr(){return h},set attr(e){h=e},get offset(){return p},set offset(e){p=e},get encripted(){return 1==(1&r)},get entryHeaderSize(){return o.CENHDR+f+u+d},get realDataOffset(){return p+o.LOCHDR+g.fnameLen+g.extraLen},get dataHeader(){return g},loadDataHeaderFromBinary:function(e){var t=e.slice(p,p+o.LOCHDR);if(t.readUInt32LE(0)!==o.LOCSIG)throw new Error(n.Errors.INVALID_LOC);g={version:t.readUInt16LE(o.LOCVER),flags:t.readUInt16LE(o.LOCFLG),method:t.readUInt16LE(o.LOCHOW),time:t.readUInt32LE(o.LOCTIM),crc:t.readUInt32LE(o.LOCCRC),compressedSize:t.readUInt32LE(o.LOCSIZ),size:t.readUInt32LE(o.LOCLEN),fnameLen:t.readUInt16LE(o.LOCNAM),extraLen:t.readUInt16LE(o.LOCEXT)}},loadFromBinary:function(g){if(g.length!==o.CENHDR||g.readUInt32LE(0)!==o.CENSIG)throw new Error(n.Errors.INVALID_CEN);e=g.readUInt16LE(o.CENVEM),t=g.readUInt16LE(o.CENVER),r=g.readUInt16LE(o.CENFLG),i=g.readUInt16LE(o.CENHOW),a=g.readUInt32LE(o.CENTIM),s=g.readUInt32LE(o.CENCRC),l=g.readUInt32LE(o.CENSIZ),c=g.readUInt32LE(o.CENLEN),f=g.readUInt16LE(o.CENNAM),u=g.readUInt16LE(o.CENEXT),d=g.readUInt16LE(o.CENCOM),E=g.readUInt16LE(o.CENDSK),m=g.readUInt16LE(o.CENATT),h=g.readUInt32LE(o.CENATX),p=g.readUInt32LE(o.CENOFF)},dataHeaderToBinary:function(){var e=Buffer.alloc(o.LOCHDR);return e.writeUInt32LE(o.LOCSIG,0),e.writeUInt16LE(t,o.LOCVER),e.writeUInt16LE(r,o.LOCFLG),e.writeUInt16LE(i,o.LOCHOW),e.writeUInt32LE(a,o.LOCTIM),e.writeUInt32LE(s,o.LOCCRC),e.writeUInt32LE(l,o.LOCSIZ),e.writeUInt32LE(c,o.LOCLEN),e.writeUInt16LE(f,o.LOCNAM),e.writeUInt16LE(u,o.LOCEXT),e},entryHeaderToBinary:function(){var n=Buffer.alloc(o.CENHDR+f+u+d);return n.writeUInt32LE(o.CENSIG,0),n.writeUInt16LE(e,o.CENVEM),n.writeUInt16LE(t,o.CENVER),n.writeUInt16LE(r,o.CENFLG),n.writeUInt16LE(i,o.CENHOW),n.writeUInt32LE(a,o.CENTIM),n.writeUInt32LE(s,o.CENCRC),n.writeUInt32LE(l,o.CENSIZ),n.writeUInt32LE(c,o.CENLEN),n.writeUInt16LE(f,o.CENNAM),n.writeUInt16LE(u,o.CENEXT),n.writeUInt16LE(d,o.CENCOM),n.writeUInt16LE(E,o.CENDSK),n.writeUInt16LE(m,o.CENATT),n.writeUInt32LE(h,o.CENATX),n.writeUInt32LE(p,o.CENOFF),n.fill(0,o.CENHDR),n},toString:function(){return'{\n\t"made" : '+e+',\n\t"version" : '+t+',\n\t"flags" : '+r+',\n\t"method" : '+n.methodToString(i)+',\n\t"time" : '+this.time+',\n\t"crc" : 0x'+s.toString(16).toUpperCase()+',\n\t"compressedSize" : '+l+' bytes,\n\t"size" : '+c+' bytes,\n\t"fileNameLength" : '+f+',\n\t"extraLength" : '+u+' bytes,\n\t"commentLength" : '+d+' bytes,\n\t"diskNumStart" : '+E+',\n\t"inAttr" : '+m+',\n\t"attr" : '+h+',\n\t"offset" : '+p+',\n\t"entryHeaderSize" : '+(o.CENHDR+f+u+d)+" bytes\n}"}}}},854:(e,t,r)=>{t.EntryHeader=r(907),t.MainHeader=r(519)},519:(e,t,r)=>{var n=r(173),o=n.Constants;e.exports=function(){var e=0,t=0,r=0,i=0,a=0;return{get diskEntries(){return e},set diskEntries(r){e=t=r},get totalEntries(){return t},set totalEntries(r){t=e=r},get size(){return r},set size(e){r=e},get offset(){return i},set offset(e){i=e},get commentLength(){return a},set commentLength(e){a=e},get mainHeaderSize(){return o.ENDHDR+a},loadFromBinary:function(s){if((s.length!==o.ENDHDR||s.readUInt32LE(0)!==o.ENDSIG)&&(s.length<o.ZIP64HDR||s.readUInt32LE(0)!==o.ZIP64SIG))throw new Error(n.Errors.INVALID_END);s.readUInt32LE(0)===o.ENDSIG?(e=s.readUInt16LE(o.ENDSUB),t=s.readUInt16LE(o.ENDTOT),r=s.readUInt32LE(o.ENDSIZ),i=s.readUInt32LE(o.ENDOFF),a=s.readUInt16LE(o.ENDCOM)):(e=n.readBigUInt64LE(s,o.ZIP64SUB),t=n.readBigUInt64LE(s,o.ZIP64TOT),r=n.readBigUInt64LE(s,o.ZIP64SIZ),i=n.readBigUInt64LE(s,o.ZIP64OFF),a=0)},toBinary:function(){var n=Buffer.alloc(o.ENDHDR+a);return n.writeUInt32LE(o.ENDSIG,0),n.writeUInt32LE(0,4),n.writeUInt16LE(e,o.ENDSUB),n.writeUInt16LE(t,o.ENDTOT),n.writeUInt32LE(r,o.ENDSIZ),n.writeUInt32LE(i,o.ENDOFF),n.writeUInt16LE(a,o.ENDCOM),n.fill(" ",o.ENDHDR),n},toString:function(){return'{\n\t"diskEntries" : '+e+',\n\t"totalEntries" : '+t+',\n\t"size" : '+r+' bytes,\n\t"offset" : 0x'+i.toString(16).toUpperCase()+',\n\t"commentLength" : 0x'+a+"\n}"}}}},753:(e,t,r)=>{e.exports=function(e){var t=r(761),n={chunkSize:1024*(parseInt(e.length/1024)+1)};return{deflate:function(){return t.deflateRawSync(e,n)},deflateAsync:function(r){var o=t.createDeflateRaw(n),i=[],a=0;o.on("data",(function(e){i.push(e),a+=e.length})),o.on("end",(function(){var e=Buffer.alloc(a),t=0;e.fill(0);for(var n=0;n<i.length;n++){var o=i[n];o.copy(e,t),t+=o.length}r&&r(e)})),o.end(e)}}}},4:(e,t,r)=>{t.Deflater=r(753),t.Inflater=r(269),t.ZipCrypto=r(729)},269:(e,t,r)=>{e.exports=function(e){var t=r(761);return{inflate:function(){return t.inflateRawSync(e)},inflateAsync:function(r){var n=t.createInflateRaw(),o=[],i=0;n.on("data",(function(e){o.push(e),i+=e.length})),n.on("end",(function(){var e=Buffer.alloc(i),t=0;e.fill(0);for(var n=0;n<o.length;n++){var a=o[n];a.copy(e,t),t+=a.length}r&&r(e)})),n.end(e)}}}},729:(e,t,r)=>{const{randomFillSync:n}=r(417),o=new Uint32Array(256).map(((e,t)=>{for(let e=0;e<8;e++)0!=(1&t)?t=t>>>1^3988292384:t>>>=1;return t>>>0})),i=(e,t)=>Math.imul(e,t)>>>0,a=(e,t)=>o[255&(e^t)]^e>>>8,s=()=>"function"==typeof n?n(Buffer.alloc(12)):s.node();s.node=()=>{const e=Buffer.alloc(12),t=e.length;for(let r=0;r<t;r++)e[r]=256*Math.random()&255;return e};const l={genSalt:s};function c(e){const t=Buffer.isBuffer(e)?e:Buffer.from(e);this.keys=new Uint32Array([305419896,591751049,878082192]);for(let e=0;e<t.length;e++)this.updateKeys(t[e])}c.prototype.updateKeys=function(e){const t=this.keys;return t[0]=a(t[0],e),t[1]+=255&t[0],t[1]=i(t[1],134775813)+1,t[2]=a(t[2],t[1]>>>24),e},c.prototype.next=function(){const e=(2|this.keys[2])>>>0;return i(e,1^e)>>8&255},e.exports={decrypt:function(e,t,r){if(!e||!Buffer.isBuffer(e)||e.length<12)return Buffer.alloc(0);const n=function(e){const t=new c(e);return function(e){const r=Buffer.alloc(e.length);let n=0;for(let o of e)r[n++]=t.updateKeys(o^t.next());return r}}(r);if(n(e.slice(0,12))[11]!==t.crc>>>24)throw"ADM-ZIP: Wrong Password";return n(e.slice(12))},encrypt:function(e,t,r,n=!1){null==e&&(e=Buffer.alloc(0)),Buffer.isBuffer(e)||(e=Buffer.from(e.toString()));const o=function(e){const t=new c(e);return function(e,r,n=0){r||(r=Buffer.alloc(e.length));for(let o of e){const e=t.next();r[n++]=o^e,t.updateKeys(o)}return r}}(r),i=l.genSalt();i[11]=t.crc>>>24&255,n&&(i[10]=t.crc>>>16&255);const a=Buffer.alloc(e.length+12);return o(i,a),o(e,a,12)},_salter:function(e){Buffer.isBuffer(e)&&e.length>=12?l.genSalt=function(){return e.slice(0,12)}:l.genSalt="node"===e?s.node:s}}},991:e=>{e.exports={LOCHDR:30,LOCSIG:67324752,LOCVER:4,LOCFLG:6,LOCHOW:8,LOCTIM:10,LOCCRC:14,LOCSIZ:18,LOCLEN:22,LOCNAM:26,LOCEXT:28,EXTSIG:134695760,EXTHDR:16,EXTCRC:4,EXTSIZ:8,EXTLEN:12,CENHDR:46,CENSIG:33639248,CENVEM:4,CENVER:6,CENFLG:8,CENHOW:10,CENTIM:12,CENCRC:16,CENSIZ:20,CENLEN:24,CENNAM:28,CENEXT:30,CENCOM:32,CENDSK:34,CENATT:36,CENATX:38,CENOFF:42,ENDHDR:22,ENDSIG:101010256,ENDSUB:8,ENDTOT:10,ENDSIZ:12,ENDOFF:16,ENDCOM:20,END64HDR:20,END64SIG:117853008,END64START:4,END64OFF:8,END64NUMDISKS:16,ZIP64SIG:101075792,ZIP64HDR:56,ZIP64LEAD:12,ZIP64SIZE:4,ZIP64VEM:12,ZIP64VER:14,ZIP64DSK:16,ZIP64DSKDIR:20,ZIP64SUB:24,ZIP64TOT:32,ZIP64SIZB:40,ZIP64OFF:48,ZIP64EXTRA:56,STORED:0,SHRUNK:1,REDUCED1:2,REDUCED2:3,REDUCED3:4,REDUCED4:5,IMPLODED:6,DEFLATED:8,ENHANCED_DEFLATED:9,PKWARE:10,BZIP2:12,LZMA:14,IBM_TERSE:18,IBM_LZ77:19,FLG_ENC:0,FLG_COMP1:1,FLG_COMP2:2,FLG_DESC:4,FLG_ENH:8,FLG_STR:16,FLG_LNG:1024,FLG_MSK:4096,FILE:2,BUFFER:1,NONE:0,EF_ID:0,EF_SIZE:2,ID_ZIP64:1,ID_AVINFO:7,ID_PFS:8,ID_OS2:9,ID_NTFS:10,ID_OPENVMS:12,ID_UNIX:13,ID_FORK:14,ID_PATCH:15,ID_X509_PKCS7:20,ID_X509_CERTID_F:21,ID_X509_CERTID_C:22,ID_STRONGENC:23,ID_RECORD_MGT:24,ID_X509_PKCS7_RL:25,ID_IBM1:101,ID_IBM2:102,ID_POSZIP:18064,EF_ZIP64_OR_32:4294967295,EF_ZIP64_OR_16:65535,EF_ZIP64_SUNCOMP:0,EF_ZIP64_SCOMP:8,EF_ZIP64_RHO:16,EF_ZIP64_DSN:24}},190:e=>{e.exports={INVALID_LOC:"Invalid LOC header (bad signature)",INVALID_CEN:"Invalid CEN header (bad signature)",INVALID_END:"Invalid END header (bad signature)",NO_DATA:"Nothing to decompress",BAD_CRC:"CRC32 checksum failed",FILE_IN_THE_WAY:"There is a file in the way: %s",UNKNOWN_METHOD:"Invalid/unsupported compression method",AVAIL_DATA:"inflate::Available inflate data did not terminate",INVALID_DISTANCE:"inflate::Invalid literal/length or distance code in fixed or dynamic block",TO_MANY_CODES:"inflate::Dynamic block code description: too many length or distance codes",INVALID_REPEAT_LEN:"inflate::Dynamic block code description: repeat more than specified lengths",INVALID_REPEAT_FIRST:"inflate::Dynamic block code description: repeat lengths with no first length",INCOMPLETE_CODES:"inflate::Dynamic block code description: code lengths codes incomplete",INVALID_DYN_DISTANCE:"inflate::Dynamic block code description: invalid distance code lengths",INVALID_CODES_LEN:"inflate::Dynamic block code description: invalid literal/length code lengths",INVALID_STORE_BLOCK:"inflate::Stored block length did not match one's complement",INVALID_BLOCK_TYPE:"inflate::Invalid block type (type == 3)",CANT_EXTRACT_FILE:"Could not extract the file",CANT_OVERRIDE:"Target file already exists",NO_ZIP:"No zip file was loaded",NO_ENTRY:"Entry doesn't exist",DIRECTORY_CONTENT_ERROR:"A directory cannot have content",FILE_NOT_FOUND:"File not found: %s",NOT_IMPLEMENTED:"Not implemented",INVALID_FILENAME:"Invalid filename",INVALID_FORMAT:"Invalid or unsupported zip format. No END header found"}},455:(e,t,r)=>{var n=r(147).require(),o=r(622);n.existsSync=n.existsSync||o.existsSync,e.exports=function(e){var t=e||"",r={directory:!1,readonly:!1,hidden:!1,executable:!1,mtime:0,atime:0},i=null;return t&&n.existsSync(t)?(i=n.statSync(t),r.directory=i.isDirectory(),r.mtime=i.mtime,r.atime=i.atime,r.executable=0!=(73&i.mode),r.readonly=0==(128&i.mode),r.hidden="."===o.basename(t)[0]):console.warn("Invalid path: "+t),{get directory(){return r.directory},get readOnly(){return r.readonly},get hidden(){return r.hidden},get mtime(){return r.mtime},get atime(){return r.atime},get executable(){return r.executable},decodeAttributes:function(e){},encodeAttributes:function(e){},toString:function(){return'{\n\t"path" : "'+t+',\n\t"isDirectory" : '+r.directory+',\n\t"isReadOnly" : '+r.readonly+',\n\t"isHidden" : '+r.hidden+',\n\t"isExecutable" : '+r.executable+',\n\t"mTime" : '+r.mtime+'\n\t"aTime" : '+r.atime+"\n}"}}}},147:(e,t,r)=>{t.require=function(){var e=r(747);if(process&&process.versions&&process.versions.electron)try{originalFs=r(965),Object.keys(originalFs).length>0&&(e=originalFs)}catch(e){}return e}},173:(e,t,r)=>{e.exports=r(646),e.exports.FileSystem=r(147),e.exports.Constants=r(991),e.exports.Errors=r(190),e.exports.FileAttr=r(455)},646:(e,t,r)=>{var n=r(147).require(),o=r(622);n.existsSync=n.existsSync||o.existsSync,e.exports=function(){var e=[],t=r(991),i=r(190),a=o.sep;function s(e){var t=e.split(a)[0];e.split(a).forEach((function(e){if(e&&":"!==e.substr(-1,1)){var r;t+=a+e;try{r=n.statSync(t)}catch(e){n.mkdirSync(t)}if(r&&r.isFile())throw i.FILE_IN_THE_WAY.replace("%s",t)}}))}function l(e,t,r){"boolean"==typeof t&&(r=t,t=void 0);var i=[];return n.readdirSync(e).forEach((function(s){var c=o.join(e,s);n.statSync(c).isDirectory()&&r&&(i=i.concat(l(c,t,r))),t&&!t.test(c)||i.push(o.normalize(c)+(n.statSync(c).isDirectory()?a:""))})),i}return{makeDir:function(e){s(e)},crc32:function(t){"string"==typeof t&&(t=Buffer.from(t));var r=Buffer.alloc(4);if(!e.length)for(var n=0;n<256;n++){for(var o=n,i=8;--i>=0;)0!=(1&o)?o=3988292384^o>>>1:o>>>=1;o<0&&(r.writeInt32LE(o,0),o=r.readUInt32LE(0)),e[n]=o}for(var a=0,s=0,l=t.length,c=~a;--l>=0;)c=e[255&(c^t[s++])]^c>>>8;return a=~c,r.writeInt32LE(4294967295&a,0),r.readUInt32LE(0)},methodToString:function(e){switch(e){case t.STORED:return"STORED ("+e+")";case t.DEFLATED:return"DEFLATED ("+e+")";default:return"UNSUPPORTED ("+e+")"}},writeFileTo:function(e,t,r,i){if(n.existsSync(e)){if(!r)return!1;if(n.statSync(e).isDirectory())return!1}var a,l=o.dirname(e);n.existsSync(l)||s(l);try{a=n.openSync(e,"w",438)}catch(t){n.chmodSync(e,438),a=n.openSync(e,"w",438)}if(a)try{n.writeSync(a,t,0,t.length,0)}catch(e){throw e}finally{n.closeSync(a)}return n.chmodSync(e,i||438),!0},writeFileToAsync:function(e,t,r,i,a){"function"==typeof i&&(a=i,i=void 0),n.exists(e,(function(l){if(l&&!r)return a(!1);n.stat(e,(function(r,c){if(l&&c.isDirectory())return a(!1);var f=o.dirname(e);n.exists(f,(function(r){r||s(f),n.open(e,"w",438,(function(r,o){r?n.chmod(e,438,(function(){n.open(e,"w",438,(function(r,o){n.write(o,t,0,t.length,0,(function(){n.close(o,(function(){n.chmod(e,i||438,(function(){a(!0)}))}))}))}))})):o?n.write(o,t,0,t.length,0,(function(){n.close(o,(function(){n.chmod(e,i||438,(function(){a(!0)}))}))})):n.chmod(e,i||438,(function(){a(!0)}))}))}))}))}))},findFiles:function(e){return l(e,!0)},getAttributes:function(e){},setAttributes:function(e){},toBuffer:function(e){return Buffer.isBuffer(e)?e:0===e.length?Buffer.alloc(0):Buffer.from(e,"utf8")},readBigUInt64LE:function(e,t){var r=Buffer.from(e.slice(t,t+8));return r.swap64(),parseInt(`0x${r.toString("hex")}`)},Constants:t,Errors:i}}()},396:(e,t,r)=>{var n=r(173),o=r(854),i=n.Constants,a=r(4);e.exports=function(e){var t=new o.EntryHeader,r=Buffer.alloc(0),s=Buffer.alloc(0),l=!1,c=null,f=Buffer.alloc(0);function u(){return e&&Buffer.isBuffer(e)?(t.loadDataHeaderFromBinary(e),e.slice(t.realDataOffset,t.realDataOffset+t.compressedSize)):Buffer.alloc(0)}function d(e){return 8==(8&t.flags)||n.crc32(e)===t.dataHeader.crc}function E(e,o,i){if(void 0===o&&"string"==typeof e&&(i=e,e=void 0),l)return e&&o&&o(Buffer.alloc(0),n.Errors.DIRECTORY_CONTENT_ERROR),Buffer.alloc(0);var s=u();if(0===s.length)return e&&o&&o(s),s;if(t.encripted){if("string"!=typeof i&&!Buffer.isBuffer(i))throw new Error("ADM-ZIP: Incompatible password parameter");s=a.ZipCrypto.decrypt(s,t,i)}var c=Buffer.alloc(t.size);switch(t.method){case n.Constants.STORED:if(s.copy(c),d(c))return e&&o&&o(c),c;throw e&&o&&o(c,n.Errors.BAD_CRC),new Error(n.Errors.BAD_CRC);case n.Constants.DEFLATED:var f=new a.Inflater(s);if(!e){if(f.inflate(c).copy(c,0),!d(c))throw new Error(n.Errors.BAD_CRC+" "+r.toString());return c}f.inflateAsync((function(e){e.copy(c,0),d(c)?o&&o(c):o&&o(c,n.Errors.BAD_CRC)}));break;default:throw e&&o&&o(Buffer.alloc(0),n.Errors.UNKNOWN_METHOD),new Error(n.Errors.UNKNOWN_METHOD)}}function m(r,o){if((!c||!c.length)&&Buffer.isBuffer(e))return r&&o&&o(u()),u();if(c.length&&!l){var i;switch(t.method){case n.Constants.STORED:return t.compressedSize=t.size,i=Buffer.alloc(c.length),c.copy(i),r&&o&&o(i),i;default:case n.Constants.DEFLATED:var s=new a.Deflater(c);if(!r){var f=s.deflate();return t.compressedSize=f.length,f}s.deflateAsync((function(e){i=Buffer.alloc(e.length),t.compressedSize=e.length,e.copy(i),o&&o(i)})),s=null}}else{if(!r||!o)return Buffer.alloc(0);o(Buffer.alloc(0))}}function h(e,t){return(e.readUInt32LE(t+4)<<4)+e.readUInt32LE(t)}function p(e){var r,n,o,a;e.length>=i.EF_ZIP64_SCOMP&&(r=h(e,i.EF_ZIP64_SUNCOMP),t.size===i.EF_ZIP64_OR_32&&(t.size=r)),e.length>=i.EF_ZIP64_RHO&&(n=h(e,i.EF_ZIP64_SCOMP),t.compressedSize===i.EF_ZIP64_OR_32&&(t.compressedSize=n)),e.length>=i.EF_ZIP64_DSN&&(o=h(e,i.EF_ZIP64_RHO),t.offset===i.EF_ZIP64_OR_32&&(t.offset=o)),e.length>=i.EF_ZIP64_DSN+4&&(a=e.readUInt32LE(i.EF_ZIP64_DSN),t.diskNumStart===i.EF_ZIP64_OR_16&&(t.diskNumStart=a))}return{get entryName(){return r.toString()},get rawEntryName(){return r},set entryName(e){var o=(r=n.toBuffer(e))[r.length-1];l=47===o||92===o,t.fileNameLength=r.length},get extra(){return f},set extra(e){f=e,t.extraLength=e.length,function(e){for(var t,r,n,o=0;o<e.length;)t=e.readUInt16LE(o),o+=2,r=e.readUInt16LE(o),o+=2,n=e.slice(o,o+r),o+=r,i.ID_ZIP64===t&&p(n)}(e)},get comment(){return s.toString()},set comment(e){s=n.toBuffer(e),t.commentLength=s.length},get name(){var e=r.toString();return l?e.substr(e.length-1).split("/").pop():e.split("/").pop()},get isDirectory(){return l},getCompressedData:function(){return m(!1,null)},getCompressedDataAsync:function(e){m(!0,e)},setData:function(e){c=n.toBuffer(e),!l&&c.length?(t.size=c.length,t.method=n.Constants.DEFLATED,t.crc=n.crc32(e),t.changed=!0):t.method=n.Constants.STORED},getData:function(e){return t.changed?c:E(!1,null,e)},getDataAsync:function(e,r){t.changed?e(c):E(!0,e,r)},set attr(e){t.attr=e},get attr(){return t.attr},set header(e){t.loadFromBinary(e)},get header(){return t},packHeader:function(){var e=t.entryHeaderToBinary(),o=n.Constants.CENHDR;return r.copy(e,o),o+=r.length,t.extraLength&&(f.copy(e,o),o+=t.extraLength),t.commentLength&&s.copy(e,o),e},toString:function(){return'{\n\t"entryName" : "'+r.toString()+'",\n\t"name" : "'+(l?r.toString().replace(/\/$/,"").split("/").pop():r.toString().split("/").pop())+'",\n\t"comment" : "'+s.toString()+'",\n\t"isDirectory" : '+l+',\n\t"header" : '+t.toString().replace(/\t/gm,"\t\t").replace(/}/gm,"\t}")+',\n\t"compressedData" : <'+(e&&e.length+" bytes buffer"||"null")+'>\n\t"data" : <'+(c&&c.length+" bytes buffer"||"null")+">\n}"}}}},333:(e,t,r)=>{const n=r(396),o=r(854),i=r(173);e.exports=function(e,t){var r=[],a={},s=Buffer.alloc(0),l=new o.MainHeader,c=!1;const f=Object.assign(Object.create(null),t);function u(){c=!0,a={},r=new Array(l.diskEntries);for(var t=l.offset,o=0;o<r.length;o++){var s=t,f=new n(e);f.header=e.slice(s,s+=i.Constants.CENHDR),f.entryName=e.slice(s,s+=f.header.fileNameLength),f.header.extraLength&&(f.extra=e.slice(s,s+=f.header.extraLength)),f.header.commentLength&&(f.comment=e.slice(s,s+f.header.commentLength)),t+=f.header.entryHeaderSize,r[o]=f,a[f.entryName]=f}}return e?function(t){for(var r=e.length-i.Constants.ENDHDR,n=Math.max(0,r-65535),o=n,a=e.length,c=-1,f=0;r>=o;r--)if(80===e[r])if(e.readUInt32LE(r)!==i.Constants.ENDSIG)if(e.readUInt32LE(r)!==i.Constants.END64SIG){if(e.readUInt32LE(r)==i.Constants.ZIP64SIG){c=r,a=r+i.readBigUInt64LE(e,r+i.Constants.ZIP64SIZE)+i.Constants.ZIP64LEAD;break}}else o=n;else c=r,f=r,a=r+i.Constants.ENDHDR,o=r-i.Constants.END64HDR;if(!~c)throw new Error(i.Errors.INVALID_FORMAT);l.loadFromBinary(e.slice(c,a)),l.commentLength&&(s=e.slice(f+i.Constants.ENDHDR)),t&&u()}(f.readEntries):c=!0,{get entries(){return c||u(),r},get comment(){return s.toString()},set comment(e){s=i.toBuffer(e),l.commentLength=s.length},getEntryCount:function(){return c?r.length:l.diskEntries},forEach:function(t){c?r.forEach(t):function(t){const r=l.diskEntries;let o=l.offset;for(let a=0;a<r;a++){let r=o;const a=new n(e);a.header=e.slice(r,r+=i.Constants.CENHDR),a.entryName=e.slice(r,r+=a.header.fileNameLength),o+=a.header.entryHeaderSize,t(a)}}(t)},getEntry:function(e){return c||u(),a[e]||null},setEntry:function(e){c||u(),r.push(e),a[e.entryName]=e,l.totalEntries=r.length},deleteEntry:function(e){c||u();var t=a[e];if(t&&t.isDirectory){var n=this;this.getEntryChildren(t).forEach((function(t){t.entryName!==e&&n.deleteEntry(t.entryName)}))}r.splice(r.indexOf(t),1),delete a[e],l.totalEntries=r.length},getEntryChildren:function(e){if(c||u(),e.isDirectory){var t=[],n=e.entryName,o=n.length;return r.forEach((function(e){e.entryName.substr(0,o)===n&&t.push(e)})),t}return[]},compressToBuffer:function(){c||u(),r.length>1&&r.sort((function(e,t){var r=e.entryName.toLowerCase(),n=t.entryName.toLowerCase();return r<n?-1:r>n?1:0}));var e=0,t=[],n=[],o=0;l.size=0,l.offset=0,r.forEach((function(r){var i=r.getCompressedData();r.header.offset=o;var a=r.header.dataHeaderToBinary(),s=r.rawEntryName.length,c=r.extra.toString(),f=Buffer.alloc(s+c.length);r.rawEntryName.copy(f,0),f.fill(c,s);var u=a.length+f.length+i.length;o+=u,t.push(a),t.push(f),t.push(i);var d=r.packHeader();n.push(d),l.size+=d.length,e+=u+d.length})),e+=l.mainHeaderSize,l.offset=o,o=0;var a=Buffer.alloc(e);t.forEach((function(e){e.copy(a,o),o+=e.length})),n.forEach((function(e){e.copy(a,o),o+=e.length}));var f=l.toBinary();return s&&Buffer.from(s).copy(f,i.Constants.ENDHDR),f.copy(a,o),a},toAsyncBuffer:function(e,t,n,o){c||u(),r.length>1&&r.sort((function(e,t){var r=e.entryName.toLowerCase(),n=t.entryName.toLowerCase();return r>n?-1:r<n?1:0}));var a=0,f=[],d=[],E=0;l.size=0,l.offset=0,function(t){var r=arguments.callee;if(t.length){var c=t.pop(),u=c.entryName+c.extra.toString();n&&n(u),c.getCompressedDataAsync((function(n){o&&o(u),c.header.offset=E;var m,h=c.header.dataHeaderToBinary();try{m=Buffer.alloc(u.length,u)}catch(e){m=new Buffer(u)}var p=h.length+m.length+n.length;E+=p,f.push(h),f.push(m),f.push(n);var g=c.packHeader();if(d.push(g),l.size+=g.length,a+=p+g.length,t.length)r(t);else{a+=l.mainHeaderSize,l.offset=E,E=0;var y=Buffer.alloc(a);f.forEach((function(e){e.copy(y,E),E+=e.length})),d.forEach((function(e){e.copy(y,E),E+=e.length}));var I=l.toBinary();s&&s.copy(I,i.Constants.ENDHDR),I.copy(y,E),e(y)}}))}}(r)}}}},965:(e,t,r)=>{"use strict";var n=r(747);e.exports=n},526:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={red:"[1;31m ",green:"[1;32m ",yellow:"[1;33m ",blue:"[1;34m ",purple:"[1;35m ",cyan:"[1;36m "}},86:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(526),o=(e="",t="green")=>{let r=n.default[t]+`  ${e}`;console.log(r)},i={log:o,error:e=>{o(),o(`Error: ${e}\n`,"red"),process.exit(9)}};t.default=i},98:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(747),o=r(86);t.default=e=>{n.unlinkSync(e),o.default.log(`.DS_Store deleted - path: ${e}\n\n`,"yellow")}},960:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(747),o=r(58),i=r(622),a=r(285),s=r(86),l=(e,t)=>{new a(i.resolve(__dirname,"starter.zip")).extractAllTo(t,!0),s.default.log(),s.default.log(`${e} project successfully created 🎉!\n`),s.default.log("Happy Coding </>!\n")};t.default=e=>{const t=i.resolve(".",e);if(n.existsSync(t)){s.default.log(`project ${e} already exist`,"yellow");const r=o.createInterface({input:process.stdin,output:process.stdout});return r.question("   Do you want to overwrite? Y/[n]: ",(n=>{let o=n.toLowerCase();"yes"!==o&&"y"!==o||l(e,t),r.close()})),void r.on("close",(function(){s.default.log(),process.exit(0)}))}l(e,t)}},951:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(86),o=r(242);t.default=()=>{for(let e of o.commands)n.default.log(`• ${e.name}`);n.default.log()}},559:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={structure:{root:["query.json","layout.twig","header.twig","footer.twig","templates","modules","locals","common","assets"],templates:["404.twig","account-addresses.twig","account-orders.twig","account-profile.twig","blog.twig","blogs.twig","categories.twig","category.twig","faqs.twig","cart.twig","home.twig","product.twig","products.twig","search.twig","shipping-and-payments.twig"],common:[".twig"],modules:[".twig"],assets:[".js",".ts",".css",".scss",".map",".png",".jpg",".jpeg",".gif",".svg",".woff",".woff2",".otf",".ttf",".eot"],locals:[".json"]},optinal_root_files:["query.json","modules"],optinal_files:{root:["query.json","modules"],templates:["search.twig","blogs.twig"],common:[],modules:[],assets:[],locals:[]},root_allowed_files:["query.json","layout.twig","header.twig","footer.twig"],need_structure_validation:["templates"],MAX_ASSETS_FILE_SIZE_2MB:2e6,MAX_ZIP_FILE_SIZE_50MB:5e7}},175:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(747),o=r(622),i=r(559),a=r(98),s=r(86),l=(e,t)=>{let r=o.extname(e);return!!t.includes(r)||r},c=(e,t,r)=>{let n=[];for(let o=0;o<r.length;o++)t.includes(r[o])||i.default.optinal_files[e].includes(r[o])||n.push(r[o]);return 0===n.length||JSON.stringify(n)},f=(e,t)=>{let r=n.lstatSync(t);r.size>=i.default.MAX_ASSETS_FILE_SIZE_2MB&&s.default.log(`WARNING: ${e} in assets is larger than 2MB: ${u(r.size)}`,"yellow")},u=e=>{let t="";return t=e>=1073741824?(e/1e9).toFixed(2)+"GB":e>=1048576?(e/1e6).toFixed(2)+"MB":e>=1024?(e/1e3).toFixed(2)+"KB":e>1?e+" bytes":1==e?e+" byte":"0 bytes",t};t.default={validate_theme:e=>new Promise(((t,r)=>{let s=n.readdirSync(e),u=c("root",s,i.default.structure.root);if(!0!==u)return r(`Unable to find:\n   ${u}\n\n   - Make sure theme path is correct or add required files\n`);for(const t of s){let s={filename:t,path:o.resolve(e,t)},u=null;if(".DS_Store"==t?a.default(s.path):u=n.lstatSync(s.path),u&&u.isDirectory()&&i.default.structure.root.includes(t)){let e=n.readdirSync(s.path);if(i.default.need_structure_validation.includes(t)){let n=c(t,e,i.default.structure[t]);if(!0!==n)return r(`Unable to find in templates folder:\n   ${n}\n\n   - Make sure theme path is correct or add required files\n`)}for(const n of e){let e=o.resolve(s.path,n);if(".DS_Store"!=n){if("assets"==t&&f(n,e),!i.default.need_structure_validation.includes(t)){let e=l(n,i.default.structure[t]);if(!0!==e)return r(`Invalid extension ${e}\n   ${n} in ${t} folder\n`)}}else a.default(e)}}}return t("Theme validated")})),validate_extension:l,validate_structure:c,validate_build_args:e=>{e[1]&&("--name"!==e[1]&&"--path"!==e[1]?s.default.error(`Invalid Argument ${e[1]}`):"--name"==e[1]&&"--path"==e[2]?s.default.error("--name argument cannot be empty"):"--path"==e[1]&&"--name"==e[2]&&s.default.error("--path argument cannot be empty")),e[3]&&"--name"!==e[3]&&"--path"!==e[3]&&s.default.error(`Invalid Argument ${e[3]}`),"--name"!=e[2]&&"--path"!=e[2]||s.default.error(`Invalid Argument ${e[2]} for ${e[1]}`),"--name"!=e[4]&&"--path"!=e[4]||s.default.error(`Invalid Argument ${e[4]} for ${e[3]}`);let t=process.cwd(),r=o.basename(process.cwd());for(let n=1;n<e.length;n++)"--name"==e[n]&&e[n+1]?r=e[n+1]:"--path"==e[n]&&e[n+1]&&(t=o.resolve(process.cwd(),e[n+1]||"."));return e.includes("--path")&&!e.includes("--name")&&(r=o.basename(t)),{build_path:t,build_name:r}},validate_new_args:e=>(e[1]||s.default.error("project name required"),{theme_name:e[1]}),formatSizeUnits:u}},591:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}l((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=r(747),i=r(622),a=r(543),s=r(86),l=r(175),c=r(559),f=a("zip");t.default=(e,t)=>n(void 0,void 0,void 0,(function*(){let r=i.resolve(t,`${e}.zip`);try{let e=yield l.default.validate_theme(t);s.default.log(),s.default.log(e)}catch(e){s.default.error(e)}const n=o.createWriteStream(r);n.on("finish",(function(){f.pointer()>=c.default.MAX_ZIP_FILE_SIZE_50MB&&(o.rmSync(r),s.default.log("Total size: "+l.default.formatSizeUnits(f.pointer()),"yellow"),s.default.error(`${e}.zip has to be less than 50MB`)),s.default.log("Total size: "+l.default.formatSizeUnits(f.pointer())),s.default.log(`${e}.zip successfully created 🎉!\n`)})),f.pipe(n),c.default.root_allowed_files.forEach((e=>{let r=i.resolve(t,e);o.existsSync(r)&&f.append(o.createReadStream(r),{name:e})}));for(let e in c.default.structure){let r=i.resolve(t,e);if("root"!==e&&o.existsSync(r)){let n=o.readdirSync(r);f.append("",{name:`${e}/`}),n.forEach((r=>{let n=i.resolve(t,e,r);f.append(o.createReadStream(n),{name:`${e}/${r}`})}))}}yield f.finalize()}))},785:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(86),o=r(591);t.default=(e,t)=>{n.default.log();try{o.default(e,t)}catch(e){n.default.error(e)}}},242:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CLI_Commands=t.version=t.help=t.new_=t.build=t.commands=void 0;const n=r(785);t.build=n.default;const o=r(707);t.help=o.default;const i=r(276);t.version=i.default;const a=r(41);t.new_=a.default;const s=new Set(["version","v","--version","--v","build","new","help"]);t.CLI_Commands=s,t.commands=[{name:"build",command:"build args[ --name optional => default:cwd name, --path optional => default:cwd ]",examples:["example-1: zid-theme build --name omar --path ./folder","example-2: zid-theme build"]},{name:"new",command:"new args[ theme name: name_your_theme]",examples:["example: zid-theme new best_theme"]},{name:"help",command:"help",examples:["example: zid-theme help"]},{name:"version",command:"[version, v, --version, --v]",examples:["example: zid-theme --v"]}]},707:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(86),o=r(242);t.default=()=>{n.default.log(),n.default.log("help:\n","cyan"),n.default.log("available commands:\n","cyan");for(let e of o.commands)n.default.log(`•  ${e.command}`),e.examples.forEach((e=>n.default.log(`   ${e}`,"yellow"))),n.default.log()}},41:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(86),o=r(960);t.default=e=>{n.default.log();try{o.default(e)}catch(e){n.default.error(e)}}},276:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(86),o=r(306);t.default=()=>{n.default.log(`v${o.version}`,"green")}},306:e=>{"use strict";e.exports=JSON.parse('{"name":"zid-theme","version":"1.1.2","description":"A CLI to process zid theme folder","main":"bin/zid-theme","repository":"https://github.com/zidsa/zid-theme-npm","bin":{"zid-theme":"bin/zid-theme"},"files":["bin/zid-theme","dist/"],"publishConfig":{"access":"public"},"author":"omar <omar.csse@gmail.com>","license":"MIT","private":false,"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":["cli","zid","zid-theme"],"dependencies":{"adm-zip":"^0.5.5","archiver":"^5.2.0"},"devDependencies":{"@types/adm-zip":"^0.4.34","@types/archiver":"^5.1.0","@types/node":"^14.14.31","original-fs":"^1.1.0","ts-loader":"^8.0.17","typescript":"^4.2.2","webpack":"^5.24.2","webpack-cli":"^4.5.0"}}')},543:t=>{"use strict";t.exports=e},417:e=>{"use strict";e.exports=require("crypto")},747:e=>{"use strict";e.exports=require("fs")},622:e=>{"use strict";e.exports=require("path")},58:e=>{"use strict";e.exports=require("readline")},761:e=>{"use strict";e.exports=require("zlib")}},r={};function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{}};return t[e].call(o.exports,o,o.exports,n),o.exports}var o={};return(()=>{"use strict";var e=o;const t=n(242),r=n(86),i=n(175),a=n(951);e.default=e=>{let n=e.slice(2);if(n.length<1&&(r.default.log(),r.default.log("no argument passed\n","red"),r.default.log("available commands:\n"),a.default(),process.exit(9)),["--version","-v","--v","version"].includes(n[0])&&(t.version(),process.exit(0)),t.CLI_Commands.has(n[0])||(r.default.log(),r.default.log(`Invalid argument ${n[0]}\n`,"red"),r.default.log("available commands:\n"),a.default(),process.exit(9)),"build"==n[0]){const e=i.default.validate_build_args(n);t.build(e.build_name,e.build_path)}else if("new"==n[0]){const e=i.default.validate_new_args(n);t.new_(e.theme_name)}else"help"==n[0]&&t.help()}})(),o.default})()}));