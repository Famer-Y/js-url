/**
 * github : https://github.com/Famer-Y/js-url
 */
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.url = factory(global)
}(typeof window !== "undefined" ? window : this, (function (window) {
    'use strict';

    function urlRegExp() {
        return /((([A-Za-z]{3,}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
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

    function protocol(url) {
        var matches = url.match(/^[A-Za-z\-]{3,}:(?=(\/\/|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-])/);
        return !!matches ? matches[0] : '';
    }

    function sub(url) {
        url = hostname(url)
            .replace(/^w{3,3}\./, '');
        return url;
    }

    function domain(url) {
        url = sub(url);
        var matches = suffixRegExp().exec(url);
        return !!matches ? (matches[1] + matches[2]) : '';
    }

    function host(url) {
        url = origin(url);
        url = url
            .replace(new RegExp('^' + regexp(protocol(url))), '')
            .replace(/^\/\//, '');
        return url;
    }

    function hostname(url) {
        url = host(url);
        url = url
            .replace(new RegExp(':' + regexp(port(url)) + '$'), '');
        return url;
    }

    function hash(url) {
        var matches = url.match(/#.*$/);
        return !!matches ? matches[0] : '';
    }

    function origin(url) {
        url = url
            .replace(new RegExp(regexp(hash(url)) + '$'), '')
            .replace(new RegExp(regexp(search(url)) + '$'), '')
            .replace(new RegExp(regexp(pathname(url)) + '$'), '');
        return url;
    }

    function search(url) {
        url = url.replace(new RegExp(regexp(hash(url)) + '$'), '');
        var matches = url.match(/\?.*/);
        return !!matches ? matches[0] : '';
    }

    function pathname(url) {
        url = url
            .replace(new RegExp(regexp(hash(url)) + '$'), '')
            .replace(new RegExp(regexp(search(url)) + '$'), '');
        var matches = url.match(/(?<=\/\/[^\/]+)\/.+$/);
        return  !!url ? (!!matches ? matches[0] : '/') : '';
    }

    function port(url) {
        var matches = url.match(/:([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/);
        return !!matches ? matches[1] : '';
    }

    function isURL(url) {
        return urlRegExp().test(url) ? true : false;
    }

    function regexp(str) {
        return str.replace(/([\$\(\)\*\+\.\[\?\\\^\{\|])/ig, '\\$1');
    }

    function url(url) {
        url = (url || window.location).toString();
        url = decodeURIComponent(url);
        if (!isURL(url)) {
            console.debug('[%s] is an invalid url.', url);
            url = "";
        }

        return {
            url,
            sub      : sub(url),
            hash     : hash(url),
            host     : host(url),
            port     : port(url),
            domain   : domain(url),
            search   : search(url),
            origin   : origin(url),
            hostname : hostname(url),
            pathname : pathname(url),
            protocol : protocol(url)
        }
    }

    return url;
})));