<!--
//Version  : 1
//Création : 06/10/2006
//
//Paramètres : 
//	URLINT (obligatoire) : URL d'accès en interne et URL d'accès en externe séparé par un "|"
//	(ex : http://formation.inetpsa.com|https://form.mpsa.com)
//
function getURL(_URLINTEXT)
{

	//Variables ==============================================================
	var urlInt, urlExt, getURL = "";
	var positionSep, tailleURL, indexOfHttp = 0;
	var defaultDomaine = "mpsa";

	//Définition des des URL interne et externe ==============================
	positionSep = _URLINTEXT.indexOf("|");
	tailleURL = _URLINTEXT.length;

	//Pas d'URL externe spécifiée en paramètre
	if (positionSep == -1) {
		urlInt = _URLINTEXT;
		// URL par défaut
		urlExt = _URLINTEXT.replace(/inetpsa/,"mpsa");
		urlExt = urlExt.replace(/http:/,"https:");
	}else{
		urlInt = _URLINTEXT.substring(0,positionSep);
		urlExt = _URLINTEXT.substring(positionSep+1,tailleURL);
	}

	//Retourne la bonne URL selon le cas =====================================
	var indexOfHttp = location.href.indexOf("http:");
	
	//Gateway : https://portail.inetpsa.com + urlInt
	if (indexOfHttp!=-1) {
		getURL=location.href.substring(0,indexOfHttp) + urlInt;
	//Intranet : urlInt
	}else if (indexOfHttp==0){
		getURL=urlInt;
	//Reverse Proxy : urlExt
	}else{
		getURL=urlExt;
	}
	
	return getURL;
}
//-->
