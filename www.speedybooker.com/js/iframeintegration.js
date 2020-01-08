//CPR: Don't use Jquery in this file
if (window.addEventListener)
    window.addEventListener("message", messageReceived, false);
else
    window.attachEvent("onmessage", messageReceived);

var iframename = null;
var iframeLoad = null;
var currencySymbol = "£";

function messageReceived(event) {
    var e = event || e.event;
    var message = e.data.toString();

    if (message.indexOf("iframename=") != -1) {

        var iframeid = getParameterByName("?" + message, "iframename");
        var iframeheight = parseInt(getParameterByName("?" + message, "height"));
        iframename = iframeid;

        var iFrameElem = null;
        iFrameElem = document.getElementById(iframename);

        if (iFrameElem) iFrameElem.style.height = (iframeheight) + "px";
    }

    if (message.indexOf("basket=") != -1) {

        message = message.replace("basket=", "");

        var insertDiv = document.createElement('div');
        insertDiv.innerHTML = message;

        var basketPopup = document.getElementById('BasketPopup');
        if (typeof (basketPopup) != 'undefined' && basketPopup != null) {
            basketPopup.remove();
        }
        document.body.appendChild(insertDiv);
    }

    if (message.indexOf("removepopup=") != -1) {
        var basketPopup = document.getElementById('BasketPopup');
        if (typeof (basketPopup) != 'undefined' && basketPopup != null) {
            basketPopup.remove();
        }
    }

    if (message.indexOf("checksession=") != -1) {
        AddSessionIfNeedInIframe();
    }

    if (message.indexOf("iframeheight=") != -1) {

        var height = parseInt(message.substring(message.indexOf("iframeheight=") + 13));
        var iFrameElem = GetCommonIframe();
        if (iFrameElem) iFrameElem.style.height = (height) + "px";

    } else if (e.data.indexOf("scroll") >= 0 ) {
        var iframeOffset = 0;
            if (iframename == null) {
                iframeOffset = document.getElementById('tbniframe').offsetTop;
            }
            else {
                iframeOffset = document.getElementById(iframename).offsetTop;
            }
            var scrollTo = e.data.replace('scroll=', '');
            window.scrollTo(0,parseInt(scrollTo) + parseInt(iframeOffset));
    }


    var iFrameElem = GetCommonIframe();
    if (iFrameElem) {
        if (typeof iFrameElem.css === "function") {
            setTimeout(function () { iFrameElem.css('overflow', 'hidden'); }, 1000);
            iFrameElem.css('overflow', '');
        }
        iFrameElem.contentWindow.postMessage('parent=' + window.top.location.href, '*');
    }

    if (window.jQuery && typeof $ === "function") {
        // Code for https://www.chu.cam.ac.uk/conferences/services/bandb/
        // May apply to other vendors if they use iframe in .flex-video 
        if ($('#tbniframe').parent('.flex-video').length > 0) {
            ($('#tbniframe').parent('.flex-video').attr("style", "padding-bottom: " + height + "px"));
        }
    }
}

function GetCommonIframe() {
    if (iframename != null) {
        var retval = document.getElementById(iframename)
        if (retval) return retval;
    }
    var retval = document.getElementById("TBNiframe")
    if (retval) return retval;

    var retval = document.getElementById("tbniframe")
    if (retval) return retval;
}

function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function GetBrowser() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
        name: M[0],
        version: M[1]
    };
}
function SafariCheck() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
//add on load event check local storage for session guid if !exist create, find iframe and append sessionguid to url
var AddSessionIfNeedInIframe = function (e) {

    var sessionId = "";
    iframeLoad = document.querySelectorAll('iframe[src*="speedybooker.com"], iframe[src*="192.168.1.127"], iframe[src*="localhost"], iframe[src*="192.168.1.150"], iframe[id="tbniframe"]');

    var src = encodeURI(iframeLoad[0].src);

    //var browser = GetBrowser();

    //var versionInt = parseInt(browser.version);
    //var isOlderSafari = browser.name.toLowerCase() == 'safari' && versionInt < 12;

    var mylog = "";
    try {
        if (iframeLoad != undefined && src.indexOf("sessionid") == -1 && SafariCheck()) {
            if (window.localStorage.getItem('SessionID') !== null) {
                sessionId = window.localStorage.getItem('SessionID');

                mylog += "SessionID" + sessionId;
            }
            else {
                var newSessionUUID = createUUID();
                var currentURL = window.location.href;

                mylog += "UUID" + newSessionUUID;
                mylog += "URL" + currentURL;
                window.localStorage.setItem('SessionID', newSessionUUID);
                sessionId = newSessionUUID;
            };
            redirectURL = iframeLoad[0].src + "&sessionid=" + sessionId;
            iframeLoad[0].src = redirectURL;
        }
        else {
            var iframe = document.getElementById('tbniframe').contentWindow;
            iframe.postMessage("hideloader=" + 'true', '*');
        }
    }
    catch (e) {
    }
}

function BasketSubmit() {
    var submitButton = document.getElementById('SubmitButton');
    if (typeof (submitButton) != 'undefined' && submitButton != null) {
        var vendorId = submitButton.getAttribute('data-vendorid');
        //console.log(vendorId)
        var iframe = document.getElementById('tbniframe').contentWindow;
        iframe.postMessage("submitbasket=" + '{ "vendorId": "' + vendorId + '"}', '*');

        document.getElementById('BasketPopup').style.display = "none";
    }
};