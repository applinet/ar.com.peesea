// jQuery$(document).ready(function() {	// Ajout des ressources existante	if(STIM04.accessMode != "ENTETENDUE") {		if((STIM04 !== undefined) && (STIM04.ressources !== undefined) & (STIM04.ressources.length > 0)) {			for(var i = 0, j = STIM04.ressources.length; i < j; i++) {				STIM04.ressources[i].idx = i + 1;				$("#STIM04_Ressources").append(STIM04_Ressource_GetForm(STIM04.ressources[i]));			}		}	}});// Bloc ressourcefunction STIM04_Ressource_GetForm(ressource) {		// Nettoyage des paramètres	if((ressource.type === undefined) || (typeof ressource.type != "string")) return "";	ressource.type = ressource.type.trim().toUpperCase();	if((ressource.subtype === undefined) || (typeof ressource.subtype != "string")) return "";	if((ressource.server === undefined) || (typeof ressource.server != "string")) return "";	if((ressource.url === undefined) || (typeof ressource.url != "string")) return "";	if((ressource.app === undefined) || (typeof ressource.app != "string")) return "";	if((ressource.dicts === undefined) || (typeof ressource.dicts != "string")) return "";	ressource.dicts = ressource.dicts.trim();	if((ressource.protocol === undefined) || (typeof ressource.protocol != "string")) return "";	ressource.protocol = ressource.protocol.trim().toUpperCase();	if((ressource.status === undefined) || (typeof ressource.status != "string")) return "";	ressource.status = ressource.status.trim().toUpperCase();	if((ressource.idx === undefined) || (typeof ressource.idx != "number")) ressource.idx = "?";	// URL de la base	var strDBPath = window.location.href.strLeft(".nsf") + ".nsf";	// Affichage d'un champ	var getFieldHTML = function(strLabel, strValue) {		return "<td></td><td class=\"FieldLegend\">" + strLabel + "&nbsp;:</td><td>" + strValue + "</td>";	};	// Tableau et colonne	var strHTML = "<table cellspacing=\"2\" cellpadding=\"0\" class=\"STIM04_Ressource\">";	strHTML += "<colgroup><col width=\"16\"><col width=\"173\"><col width=\"567\"></colgroup>";	// Ligne d'entête	strHTML += "<tr valign=\"middle\">";	strHTML += "<th colspan=\"3\" valign=\"middle\"" + ((ressource.status == "OK" || ressource.status == "KO") ? " class=\"" + ressource.status + "\"" : "") + "><span style=\"font-weight: bold;\" class=\"STIM04_Ressource_Title\">" + l_STIM04_Ressource_Title + ressource.idx + "</span></th>";	strHTML += "</tr>";	// Type de ressource	strTmp = "?";	switch(ressource.type) {		case "SERVER": strTmp = l_STIM04_Ressource_Type_Server; break;		case "VIP": strTmp = l_STIM04_Ressource_Type_VIP; break;		case "URL": strTmp = l_STIM04_Ressource_Type_URL; break;		case "OTHER": strTmp = l_STIM04_Ressource_Type_Other;	}	strHTML += "<tr>" + getFieldHTML(l_STIM04_Ressource_Type, strTmp) + "</tr>";	// Type de ressource ("Autre")	if(ressource.type == "OTHER")		strHTML += "<tr>" + getFieldHTML(l_STIM04_Ressource_SubType, ressource.subtype) + "</tr>";	// Serveur	if(ressource.type == "SERVER" || ressource.type == "OTHER") {		strHTML += "<tr>" + getFieldHTML(l_STIM04_Ressource_Server, ressource.server) + "</tr>";		if(ressource.server != "-" && ressource.server != "") {			if(ressource.dicts == "" || ressource.dicts == "-") {				strHTML += "<tr><td colspan=\"2\"></td><td><div class=\"small-help\" style=\"color: #CC3535; margin-bottom: 0.5em;\"><img src=\"/icons/vwicn011.gif\">&nbsp;" + l_STIM04_Ressource_Server_WarningNoDICT + "</div></td></tr>";			}			else if(ressource.dicts.match(/[3-4]/gi) != null) {				strHTML += "<tr><td colspan=\"2\"></td><td><div class=\"small-help\" style=\"color: #CC3535; margin-bottom: 0.5em;\"><img src=\"/icons/vwicn011.gif\">&nbsp;" + l_STIM04_Ressource_Server_WarningDICT + "</div></td></tr>";			}		}	}	// URL	if(ressource.type == "URL" || ressource.type == "VIP")		strHTML += "<tr>" + getFieldHTML(l_STIM04_Ressource_URL, ressource.url) + "</tr>";	// Application	if(ressource.type == "URL" || ressource.type == "VIP") {		strHTML += "<tr>" + getFieldHTML(l_STIM04_Ressource_App, ressource.app) + "</tr>";		if(ressource.app != "-" && ressource.app != "") {			if(ressource.dicts == "" || ressource.dicts == "-") {				strHTML += "<tr><td colspan=\"2\"></td><td><div class=\"small-help\" style=\"color: #CC3535; margin-bottom: 0.5em;\"><img src=\"/icons/vwicn011.gif\">&nbsp;" + l_STIM04_Ressource_App_WarningNoDICT + "</div></td></tr>";			}			else if(ressource.dicts.match(/[3-4]/gi) != null) {				strHTML += "<tr><td colspan=\"2\"></td><td><div class=\"small-help\" style=\"color: #CC3535; margin-bottom: 0.5em;\"><img src=\"/icons/vwicn011.gif\">&nbsp;" + l_STIM04_Ressource_App_WarningDICT + "</div></td></tr>";			}		}	}	// Protocole	strHTML += "<tr>" + getFieldHTML(l_STIM04_Ressource_Protocol, ressource.protocol) + "<td>"	// Fermeture	strHTML += "</table>";	return strHTML;}