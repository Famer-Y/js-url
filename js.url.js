/**
 * version : 1.0.2
 * author  : Famer-Y
 * github  : https://github.com/Famer-Y/js-url
 */
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.JsUrl = factory(global)
}("undefined" !== typeof window ? window : this, (function (window) {
    'use strict';
    var url;
    function urlRegExp() {
        return /((([A-Za-z]{3,7}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-\/]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    }

    function suffixRegExp() {
        var countries = ['ad','ae','af','ag','ai','al','am','ao','ar','at','au','az','bb','bd','be','bf','bg','bh','bi','bj','bl','bm','bn','bo','br','bs','bw','by','bz','ca','cf','cg','ch','ck','cl','cm','cn','co','cr','cs','cu','cy','cz','de','dj','dk','do','dz','ec','ee','eg','es','et','fi','fj','fr','ga','gb','gd','ge','gf','gh','gi','gm','gn','gr','gt','gu','gy','hk','hn','ht','hu','ie','il','in','iq','ir','is','it','jm','jo','jp','ke','kg','kh','kp','kr','kt','kw','kz','la','lb','lc','li','lk','lr','ls','lt','lu','lv','ly','ma','mc','md','mg','ml','mm','mn','mo','ms','mt','mu','mv','mw','mx','my','mz','na','ne','ng','ni','nl','no','np','nr','nz','om','pa','pe','pf','pg','ph','pk','pl','pr','pt','py','qa','ro','ru','sa','sb','sc','sd','se','sg','si','sk','sl','sm','sn','so','sr','st','sv','sy','sz','td','tg','th','tj','tm','tn','to','tr','tt','tw','tz','ua','ug','uk','us','uy','uz','vc','ve','vn','ye','yu','za','zm','zr','zw'];
        var suffixes = ['\.com','\.net','\.org','\.gov','\.mobi','\.info','\.biz','\.cc','\.tv','\.asia','\.me','\.travel','\.tel','\.name','\.co','\.so','\.fm','\.eu','\.edu','\.coop','\.pro','\.nu','\.io','\.as','\.club','\.im','\.zone','\.tk','\.ws','\.gs','\.re','\.rs','\.guru','\.ac','\.hr','\.su'];
        for (var i = 0, l = countries.length; i < l; i++) {
            var country = countries[i];
            suffixes.push('\.com?'+country);
            suffixes.push('\.org?'+country);
            suffixes.push('\.gov?'+country);
            suffixes.push(country);
        }
        return new RegExp('([^\.]*)(' + suffixes.join('|') + ')$', 'mi')
    }

    function protocol() {
        var matches = url.match(/^[A-Za-z\-]{3,7}:(?=(\/\/|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-\/])/);
        return !!matches ? matches[0] : '';
    }

    function sub() {
        var u = hostname()
            .replace(/^w{3,3}\./, '');
        return u;
    }

    function domain() {
        var matches = suffixRegExp().exec(sub());
        return !!matches ? (matches[1] + matches[2]) : '';
    }

    function host() {
        var u = origin()
            .replace(new RegExp('^' + regexp(protocol())), '')
            .replace(/^\/\//, '');
        return u;
    }

    function hostname() {
        var u = host()
            .replace(new RegExp(':' + regexp(port()) + '$'), '');
        return u;
    }

    function hash() {
        var matches = url.match(/#.*?$/);
        return !!matches ? matches[0] : '';
    }

    function origin() {
        var u = url
            .replace(new RegExp(regexp(hash()) + '$'), '')
            .replace(new RegExp(regexp(search()) + '$'), '')
            .replace(new RegExp(regexp(pathname()) + '$'), '');
        return u;
    }

    function search() {
        var u = url.replace(new RegExp(regexp(hash()) + '$'), '');
        var matches = u.match(/\?.*?$/);
        return !!matches ? matches[0] : '';
    }

    function pathname() {
        var u = url
            .replace(new RegExp(regexp(hash()) + '$'), '')
            .replace(new RegExp(regexp(search()) + '$'), '');
        var matches = u.match(/(?<=\/\/.*?)\/.+?$/);
        return  !!u ? (!!matches ? matches[0] : '/') : '';
    }

    function port() {
        var u = host();
        var matches = u.match(/:([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/);
        return !!matches ? matches[1] : '';
    }

    function isURL(url) {
        return urlRegExp().test(url) ? true : false;
    }

    function regexp(str) {
        return str.replace(/([\$\(\)\*\+\.\[\?\\\^\{\|])/g, '\\$1');
    }

    function JsUrl(input) {
        url = (input || window.location).toString();
        url = decodeURIComponent(encodeURIComponent(url));
        if (!isURL(url)) {
            console.warn('[%s] is an invalid url.', url);
        }

        return {
            url,
            sub: sub(),
            hash: hash(),
            host: host(),
            port: port(),
            domain: domain(),
            search: search(),
            origin: origin(),
            hostname: hostname(),
            pathname: pathname(),
            protocol: protocol()
        }
    }

    return JsUrl;
})));