<!--
//xmlhttp和xmldom对象
var GemelXHTTP = null;
var GemelXDOM = null;
var GemelContainer = null;
var GemelShowError = false;
var GemelShowWait = false;
var GemelErrCon = "";
var GemelErrDisplay = "下载数据失败";
var GemelWaitDisplay = "正在下载数据...";

//获取指定ID的元素

function $DE(id) {
    return document.getElementById(id);
}

//gcontainer 是保存下载完成的内容的容器
//mShowError 是否提示错误信息
//GemelShowWait 是否提示等待信息
//mErrCon 服务器返回什么字符串视为错误
//mErrDisplay 发生错误时显示的信息
//mWaitDisplay 等待时提示信息
//默认调用 GemelAjax('divid',false,false,'','','')

function GemelAjax(gcontainer,mShowError,mShowWait,mErrCon,mErrDisplay,mWaitDisplay)
{

    GemelContainer = gcontainer;
    GemelShowError = mShowError;
    GemelShowWait = mShowWait;
    if(mErrCon!="") GemelErrCon = mErrCon;
    if(mErrDisplay!="") GemelErrDisplay = mErrDisplay;
    if(mErrDisplay=="x") GemelErrDisplay = "";
    if(mWaitDisplay!="") GemelWaitDisplay = mWaitDisplay;


    //post或get发送数据的键值对
    this.keys = Array();
    this.values = Array();
    this.keyCount = -1;
    this.sendlang = 'gb2312';

    //请求头类型
    this.rtype = 'text';

    //初始化xmlhttp
    //IE6、IE5
    if(window.ActiveXObject) {
        try { GemelXHTTP = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { }
        if (GemelXHTTP == null) try { GemelXHTTP = new ActiveXObject("Microsoft.XMLHTTP");} catch (e) { }
    }
    else {
        GemelXHTTP = new XMLHttpRequest();
    }

    //增加一个POST或GET键值对
    this.AddKeyN = function(skey,svalue) {
        if(this.sendlang=='utf-8') this.AddKeyUtf8(skey, svalue);
        else this.AddKey(skey, svalue);
    };
    
    this.AddKey = function(skey,svalue) {
        this.keyCount++;
        this.keys[this.keyCount] = skey;
        svalue = svalue+'';
        if(svalue != '') svalue = svalue.replace(/\+/g,'$#$');
        this.values[this.keyCount] = escape(svalue);
    };

    //增加一个POST或GET键值对
    this.AddKeyUtf8 = function(skey,svalue) {
        this.keyCount++;
        this.keys[this.keyCount] = skey;
        svalue = svalue+'';
        if(svalue != '') svalue = svalue.replace(/\+/g,'$#$');
        this.values[this.keyCount] = encodeURI(svalue);
    };

    //增加一个Http请求头键值对
    this.AddHead = function(skey,svalue) {
        this.rkeyCount++;
        this.rkeys[this.rkeyCount] = skey;
        this.rvalues[this.rkeyCount] = svalue;
    };

    //清除当前对象的哈希表参数
    this.ClearSet = function() {
        this.keyCount = -1;
        this.keys = Array();
        this.values = Array();
        this.rkeyCount = -1;
        this.rkeys = Array();
        this.rvalues = Array();
    };


    GemelXHTTP.onreadystatechange = function() {
        //在IE6中不管阻断或异步模式都会执行这个事件的
        if(GemelXHTTP.readyState == 4){
            if(GemelXHTTP.status == 200)
            {
                if(GemelXHTTP.responseText!=GemelErrCon) {
                    GemelContainer.innerHTML = GemelXHTTP.responseText;
                }
                else {
                    if(GemelShowError) GemelContainer.innerHTML = GemelErrDisplay;
                }
                GemelXHTTP = null;
            }
            else { if(GemelShowError) GemelContainer.innerHTML = GemelErrDisplay; }
        }
        else { if(GemelShowWait) GemelContainer.innerHTML = GemelWaitDisplay; }
    };

    //检测阻断模式的状态
    this.BarrageStat = function() {
        if(GemelXHTTP==null) return;
        if(typeof(GemelXHTTP.status)!=undefined && GemelXHTTP.status == 200)
        {
            if(GemelXHTTP.responseText!=GemelErrCon) {
                GemelContainer.innerHTML = GemelXHTTP.responseText;
            }
            else {
                if(GemelShowError) GemelContainer.innerHTML = GemelErrDisplay;
            }
        }
    };

    //发送http请求头
    this.SendHead = function()
    {
        //发送用户自行设定的请求头
        if(this.rkeyCount!=-1)
        { 
            for(var i = 0;i<=this.rkeyCount;i++)
            {
                GemelXHTTP.setRequestHeader(this.rkeys[i],this.rvalues[i]);
            }
        }
        　if(this.rtype=='binary'){
        　GemelXHTTP.setRequestHeader("Content-Type","multipart/form-data");
    }else{
        GemelXHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
};

//用Post方式发送数据
this.SendPost = function(purl) {
    var pdata = "";
    var i=0;
    this.state = 0;
    GemelXHTTP.open("POST", purl, true);
    this.SendHead();
    //post数据
    if(this.keyCount!=-1)
    {
        for(;i<=this.keyCount;i++)
        {
            if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
            else pdata += "&"+this.keys[i]+'='+this.values[i];
        }
    }
    GemelXHTTP.send(pdata);
};

//用GET方式发送数据
this.SendGet = function(purl) {
    var gkey = "";
    var i=0;
    this.state = 0;
    //get参数
    if(this.keyCount!=-1)
    { 
        for(;i<=this.keyCount;i++)
        {
            if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
            else gkey += "&"+this.keys[i]+'='+this.values[i];
        }
        if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
        else  purl = purl + '&' + gkey;
    }
    GemelXHTTP.open("GET", purl, true);
    this.SendHead();
    GemelXHTTP.send(null);
};

//用GET方式发送数据，阻塞模式
this.SendGet2 = function(purl) {
    var gkey = "";
    var i=0;
    this.state = 0;
    //get参数
    if(this.keyCount!=-1)
    { 
        for(;i<=this.keyCount;i++)
        {
            if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
            else gkey += "&"+this.keys[i]+'='+this.values[i];
        }
        if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
        else  purl = purl + '&' + gkey;
    }
    GemelXHTTP.open("GET", purl, false);
    this.SendHead();
    GemelXHTTP.send(null);
    //firefox中直接检测XHTTP状态
    this.BarrageStat();
};

//用Post方式发送数据
this.SendPost2 = function(purl) {
    var pdata = "";
    var i=0;
    this.state = 0;
    GemelXHTTP.open("POST", purl, false);
    this.SendHead();
    //post数据
    if(this.keyCount!=-1)
    {
        for(;i<=this.keyCount;i++)
        {
            if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
            else pdata += "&"+this.keys[i]+'='+this.values[i];
        }
    }
    GemelXHTTP.send(pdata);
    //firefox中直接检测XHTTP状态
    this.BarrageStat();
};


} // End Class GemelAjax

//初始化xmldom
function InitXDom() {
    if(GemelXDOM!=null) return;
    var obj = null;
    // Gecko、Mozilla、Firefox
    if (typeof(DOMParser) != "undefined") { 
        var parser = new DOMParser();
        obj = parser.parseFromString(xmlText, "text/xml");
    }
    // IE
    else { 
        try { obj = new ActiveXObject("MSXML2.DOMDocument");} catch (e) { }
        if (obj == null) try { obj = new ActiveXObject("Microsoft.XMLDOM"); } catch (e) { }
    }
    GemelXDOM = obj;
};



//读写cookie函数
function GetCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end   = document.cookie.indexOf(";",c_start);
            if (c_end == -1)
            {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return null
}

function SetCookie(c_name,value,expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" +escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()); //使设置的有效时间正确。增加toGMTString()
}

-->
