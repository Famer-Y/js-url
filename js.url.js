/**
 * version : 1.0.3
 * author  : Famer
 * github  : https://github.com/Famer-Y/js-url
 */
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.JsUrl = factory(global)
}("undefined" !== typeof window ? window : this, (function (window) {
    'use strict';
    function suffixRegExp() {
        var countries = ['ac','ad','ae','af','ag','ai','al','am','ao','aq','ar','as','at','au','aw','ax','az','ba','bb','bd','be','bf','bg','bh','bi','bj','bm','bn','bo','br','bs','bt','bv','bw','by','bz','ca','cc','cd','cf','cg','ch','ci','ck','cl','cm','cn','co','cr','cu','cv','cw','cx','cy','cz','de','dj','dk','dm','do','dz','ec','ee','eg','er','es','et','eu','fi','fj','fk','fm','fo','fr','ga','gd','ge','gf','gg','gh','gi','gl','gm','gn','gp','gq','gr','gs','gt','gu','gw','gy','hk','hm','hn','hr','ht','hu','id','ie','il','im','in','io','iq','ir','is','it','je','jm','jo','jp','ke','kg','kh','ki','km','kn','kp','kr','kw','ky','kz','la','lb','lc','li','lk','lr','ls','lt','lu','lv','ly','ma','mc','md','me','mg','mh','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','mx','my','mz','na','nc','ne','nf','ng','ni','nl','no','np','nr','nu','nz','om','pa','pe','pf','pg','ph','pk','pl','pm','pn','pr','ps','pt','pw','py','qa','re','ro','rs','ru','rw','sa','sb','sc','sd','se','sg','sh','si','sj','sk','sl','sm','sn','so','sr','ss','st','su','sv','sx','sy','sz','tc','td','tf','tg','th','tj','tk','tl','tm','tn','to','tr','tt','tv','tw','tz','ua','ug','uk','us','uy','uz','va','vc','ve','vg','vi','vn','vu','wf','ws','ye','yt','za','zm','zw'];
        var suffixes = ['\.com','\.net','\.org','\.gov','\.mobi','\.info','\.biz','\.cc','\.tv','\.asia','\.me','\.travel','\.tel','\.name','\.co','\.so','\.fm','\.eu','\.edu','\.coop','\.pro','\.nu','\.io','\.as','\.club','\.im','\.zone','\.tk','\.ws','\.gs','\.re','\.rs','\.guru','\.ac','\.hr','\.su'];
        for (var i = 0, l = countries.length; i < l; i++) {
            var country = countries[i];
            suffixes.push('\.' + country);
        }
        return new RegExp('([^\.]*)(' + suffixes.join('|') + ')$', 'mi')
    }

    function sub(hostname) {
        return hostname.replace(/^w{3,3}\./, '');
    }

    function domain(sub) {
        var matches = suffixRegExp().exec(sub);
        return !!matches ? (matches[1] + matches[2]) : sub;
    }

    function JsUrl(input) {
        let url = (input || window.location).toString();
        url = decodeURIComponent(encodeURIComponent(url));
        url = new URL(url);
        url.sub = sub(url.hostname);
        url.domain = domain(url.sub);
        return url;
    }

    return JsUrl;
})));