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
        var countries = ['ac','ad','ae','af','ag','ai','al','am','ao','aq','ar','as','at','au','aw','ax','az','ba','bb','bd','be','bf','bg','bh','bi','bj','bm','bn','bo','br','bs','bt','bv','bw','by','bz','ca','cc','cd','cf','cg','ch','ci','ck','cl','cm','cn','co','cr','cu','cv','cw','cx','cy','cz','de','dj','dk','dm','do','dz','ec','ee','eg','er','es','et','eu','fi','fj','fk','fm','fo','fr','ga','gd','ge','gf','gg','gh','gi','gl','gm','gn','gp','gq','gr','gs','gt','gu','gw','gy','hk','hm','hn','hr','ht','hu','id','ie','il','im','in','io','iq','ir','is','it','je','jm','jo','jp','ke','kg','kh','ki','km','kn','kp','kr','kw','ky','kz','la','lb','lc','li','lk','lr','ls','lt','lu','lv','ly','ma','mc','md','me','mg','mh','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','mx','my','mz','na','nc','ne','nf','ng','ni','nl','no','np','nr','nu','nz','om','pa','pe','pf','pg','ph','pk','pl','pm','pn','pr','ps','pt','pw','py','qa','re','ro','rs','ru','rw','sa','sb','sc','sd','se','sg','sh','si','sj','sk','sl','sm','sn','so','sr','ss','st','su','sv','sx','sy','sz','tc','td','tf','tg','th','tj','tk','tl','tm','tn','to','tr','tt','tv','tw','tz','ua','ug','uk','us','uy','uz','va','vc','ve','vg','vi','vn','vu','wf','ws','ye','yt','za','zm','zw'];
        var suffixes = ['\.com','\.net','\.org','\.gov','\.mobi','\.info','\.biz','\.cc','\.tv','\.asia','\.me','\.travel','\.tel','\.name','\.co','\.so','\.fm','\.eu','\.edu','\.coop','\.pro','\.nu','\.io','\.as','\.club','\.im','\.zone','\.tk','\.ws','\.gs','\.re','\.rs','\.guru','\.ac','\.hr','\.su'];
        for (var i = 0, l = countries.length; i < l; i++) {
            var country = countries[i];
            suffixes.push('\.' + country);
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