//Weboscope version 2.5 copyright weborama
//modif le 03 octobre 2002
function get_server()
{
	var portailurl = 'https://';
	var intraneturl = "http://recolte.weboscope.inetpsa.com/fcgi-bin/comptage.fcgi";
	var interneturl = "//recolte.mediametrics.mpsa.com/fcgi-bin/comptage.fcgi";

	var thispath = this.location.pathname;
	var thishost = this.location.host;
	if (thishost.indexOf("inetpsa.com") != -1)          
	{
		if (thispath.indexOf("/http://") == 0)
		{
			portailurl += this.location.host;
			var portailport = this.location.port;
			if ( parseInt(portailport) > 0 && portailport != '80') portailurl += ':' + portailport;
			return (portailurl + "/" + intraneturl);
		}
		else
		{
			return (intraneturl);
		}
	}
	else
	{
		return (this.location.protocol + interneturl);
	}
}

function webo_zpi(_WEBOZONE,_WEBOPAGE,_titre,_ACC)
{
	var _WEBOID = 940;
	var wbs_da=new Date();
	wbs_da=parseInt(wbs_da.getTime()/1000 - 60*wbs_da.getTimezoneOffset());
	var wbs_ref=''+escape(document.referrer);
	var wbs_ta='0x0';
	var wbs_co=0;
	var wbs_nav=navigator.appName;
	if(_titre==null) _titre='';
	if(_titre=='') _titre=document.title;
	if(_titre.indexOf('http')==0) _titre = '';
	_titre=escape(_titre);

	var info = escape('wbotitre=' + _titre);

	if (parseInt(navigator.appVersion)>=4)
	{
		wbs_ta=screen.width+"x"+screen.height;
		wbs_co=(wbs_nav!="Netscape")?screen.colorDepth:screen.pixelDepth;
	}
	if((_ACC != null)&&(wbs_nav!="Netscape"))
	{
		var reftmp = 'parent.document.referrer';
		if((_ACC<5)&&(_ACC>0))
		{
			for(_k=_ACC;_k>1;_k--) reftmp = 'parent.' + reftmp;
		}
		var mon_ref = eval(reftmp);

		if(document.referrer == parent.location || document.referrer=='') wbs_ref=''+escape(mon_ref)

	}
	var wbs_arg=get_server();
	wbs_arg+="?ID="+_WEBOID+"&ZONE="+_WEBOZONE+"&PAGE="+_WEBOPAGE;
	wbs_arg+="&ver=2&da2="+wbs_da+"&ta="+wbs_ta+"&co="+wbs_co+"&info="+info+ "&ref="+wbs_ref;
	var wbs_t= " border='0' height='1' width='1' alt=''>";
	if (parseInt(navigator.appVersion)>=3)
	{
		var webo_compteur = new Image(1,1);
		webo_compteur.src=wbs_arg;
	}
	else
	{
		document.write('<IMG SRC='+wbs_arg+wbs_t);
	}
}

webo_ok=1;