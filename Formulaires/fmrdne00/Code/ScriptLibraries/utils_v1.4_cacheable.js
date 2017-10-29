// Cette fonction écrit un texte dans le documentfunction Print(pTxt) {	// Test du nombre d'arguments passés en paramètre et si ils sont > 1	// On va parcourir le contenu de la première chaîne pour le remplacer par les arguments suivants	if (arguments.length > 1){		// Expression régulière pour retrouver les $1, $2, etc dans la chaîne en premier paramètre		var expReg = new RegExp(/\$\d/g);		var res = pTxt.match(expReg);		// Si on a trouvé une chaîne correspondante		if (res) {			// On parcoure la liste des $ trouvés et on les remplace par les arguments			var i = 0;			while (i < res.length) {				var arg = "";				// Test si l'argument existe dans les paramètres de la fonction				if (arguments[i+1] != undefined)					arg = arguments[i+1];									pTxt = pTxt.replace(res[i], arg);				i++;			}		}	}	// Affichage du texte	document.write(pTxt);}// Suppression des espaces surnuméraires (deprecated)function Trim(pStr) {	try {		Ereg = /  /;		while(Ereg.test(pStr)) {			pStr = pStr.replace(/  /gi, " ");		}		pStr = pStr.replace(/^\s/gi, "");		pStr = pStr.replace(/\s$/gi, "");		pStr = pStr.replace(/^\r/gi, "");		pStr = pStr.replace(/\r$/gi, "");		pStr = pStr.replace(/^\n/gi, "");		pStr = pStr.replace(/\n$/gi, "");		return pStr;	}	catch(Err) {		return pStr;	}}// Traduction d'un texte dans la langue de l'utilisateur courant.// Attend en paramètre le texte à traduire sous la forme "_FR:Texte FR##_EN:Texte EN..."function t(pTxt, pLng) {	var p1 = pTxt.indexOf("_" + pLng + ":");	if(p1 != -1) {		var pTxt = pTxt.substr(p1, pTxt.length);		var p2 = pTxt.indexOf("##");		if(p2 != -1)			return pTxt.slice(4, p2);		else			return "?";	}	else {		return "?";	}}// Conversion nouvelle ligne en <br> et inversementString.prototype.nl2br = function() {	var br;	if(typeof arguments[0] != 'undefined')		br = arguments[0];	else		br = '<br />';	return this.replace(/\r\n|\r|\n/g, br);} String.prototype.br2nl = function() {	var nl;	if(typeof arguments[0] != 'undefined')		nl = arguments[0];	else		nl = '\r\n';	return this.replace(/\<br(\s*\/|)\>/g, nl);}// Conversion espace insécables en espaces et inversementString.prototype.nbsp2sp = function() { return this.replace(/&nbsp;/gi, " "); }String.prototype.sp2nbsp = function() { return this.replace(/\s/gi, "&nbsp;"); }// TrimString.prototype.trim = function() { return this.replace(/^\s+/, "").replace(/\s+$/, ""); };String.prototype.ltrim = function() { return this.replace(/^\s+/, ""); };String.prototype.rtrim = function() { return this.replace(/\s+$/, ""); };// @Left/@Right/@LeftBack/@RightBack equivalentsString.prototype.strLeft = function() { return (this.indexOf(arguments[0]) == -1 | arguments[0] == "") ? "" : this.split(arguments[0])[0]; };String.prototype.strRight = function() { idx = this.indexOf(arguments[0]); return (idx == -1 | arguments[0] == "") ? "" : this.substr(idx + arguments[0].length); };String.prototype.strLeftBack = function() { arr = this.split(arguments[0]); arr.pop(); return (arguments[0] == null | arguments[0] == "") ? "" : arr.join(arguments[0]) };String.prototype.strRightBack = function() { arr = this.split(arguments[0]); return (this.indexOf(arguments[0]) == -1 | arguments[0] == "") ? "" : arr.pop() };// @UrlQueryString equivalentString.prototype.urlQueryString = function() {	if(this.indexOf(arguments[0]) == -1 | arguments[0] == "") return "";	var name = arguments[0];	name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");	var regex = new RegExp("[\?&]" + name + "=([^&#]*)");	var results = regex.exec(this);	if( results == null ) return "";	else return results[1];}