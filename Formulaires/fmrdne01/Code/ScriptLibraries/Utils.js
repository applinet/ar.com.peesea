// Cette fonction écrit un texte dans le documentfunction Print(pTxt) {	// Test du nombre d'arguments passés en paramètre et si ils sont > 1	// On va parcourir le contenu de la première chaîne pour le remplacer par les arguments suivants	if (arguments.length > 1){		// Expression régulière pour retrouver les $1, $2, etc dans la chaîne en premier paramètre		var expReg = new RegExp(/\$\d/g);		var res = pTxt.match(expReg);		// Si on a trouvé une chaîne correspondante		if (res) {			// On parcoure la liste des $ trouvés et on les remplace par les arguments			var i = 0;			while (i < res.length) {				var arg = "";				// Test si l'argument existe dans les paramètres de la fonction				if (arguments[i+1] != undefined)					arg = arguments[i+1];									pTxt = pTxt.replace(res[i], arg);				i++;			}		}	}	// Affichage du texte	document.write(pTxt);}