// A l'ouverture de la page
$(document).ready(function() {

	// Liste des sites, triée
	arrSites.sort(function(a, b) {
		return a[1] > b[1];
	});
	var strOptions = "<option" + (strActualSite == "" ? " selected": "")+ " value=\"\"></option>";
	for(var i = 0, j = arrSites.length; i < j; i++) {
		strOptions += "<option" + (strActualSite == arrSites[i][0] ? " selected": "")+ " value=\"" + arrSites[i][0] + "\">" + arrSites[i][1] + "</option>";
	}
	$("#MOBILE_Site").empty().append(strOptions).change(MOBILE_Site_OnChange).change();
});

// Choix du site
function MOBILE_Site_OnChange() {

	// Pas de site, ou pas un smartphone, déselection et masquage du site transcodifié
	var strSite = $("#MOBILE_Site").val().trim().toUpperCase();
	var jqoTmp = $("#MOBILE_Phone_Type");
	if((strSite == "") || (jqoTmp.val() != "SMARTPHONE")) {
		$("#MOBILE_TrueSite").empty().append("<option></option>").hide();
	}
	// Site quelconque
	else {
		var strOptions = "";

		// Chargement des sites transcodifiés
		var strOptions = MOBILE_GetTrueSiteOptions(strSite, strActualTrueSite);

		// Ajout des options
		if(strOptions != "") {
			$("#MOBILE_TrueSite").empty().append("<option></option>" + strOptions).show();
		}
		else {
			$("#MOBILE_TrueSite").empty().append("<option></option>").hide();
		}
	}
}

// Récupération du code site REFLEX (on s'assure que l'on reçoit bien 3 caractères avant de faire la requete AJAX)
function MOBILE_GetReflexSite(strKey) {
	strKey = strKey.trim().toUpperCase();
	if(strKey.length != 3) return "";	
	
	var strReturn = "";
	$.ajax({
		url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_TranscodifREFLEX_Lookup_ForStock?ReadViewEntries&RestrictToCategory=" + strKey + "&Count=1",
		async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

		// Echec de la requête
		error: function() { alert(l_Forms_Err_AJAX); },

		// Réussite de la requête, lecture du XML
		success: function(xml) {
			var jqoTmp = $(xml).find("entrydata[name='MOBILE_TranscodifREFLEX_REFLEX']");
			if(jqoTmp.length == 1) {
				strReturn = jqoTmp.find("text").text().trim().toUpperCase();
			}
		}
	});
	return strReturn;
}

// Renvoi des <option> (site transcodifié) pour un site "chapeau"
function MOBILE_GetTrueSiteOptions(strKey, strSelected) {
	var strReturn = "";
	$.ajax({
		url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_TranscodifLDAP_Lookup_ForStock?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase() + "&Count=1000",
		async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

		// Echec de la requête
		error: function() { alert(l_Forms_Err_AJAX); },

		// Réussite de la requête, lecture du XML, construction des options
		success: function(xml) {
			$(xml).find("viewentry").each(function() {
				var strSiteCode = $(this).find("entrydata[name='MOBILE_TranscodifLDAP_LDAP']").find("text").text().trim().toUpperCase();
				var strSiteLabel = $(this).find("entrydata[name='MOBILE_TranscodifLDAP_Label']").find("text").text();
				strReturn += "<option value=\"" + strSiteCode + "\"" + (strSelected.trim().toUpperCase() == strSiteCode ? " selected" : "") + ">" + strSiteLabel + " (" + strSiteCode + ")</option>";				
			});
		}
	});
	return strReturn;
}

// Soumission
function MOBILE_Submit() {
	
	var strSite = $("#MOBILE_Site").val().trim();
	if(strSite == "") { DisplayErrMsgOnField("MOBILE_Site", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }

	// Dans le cas d'un smartphone
	if($("#MOBILE_Phone_Type").val() == "SMARTPHONE") {

		// Site transcodifié si besoin
		var jqoTmp = $("select[id='MOBILE_TrueSite']");
		var strTrueSite = "";
		if(jqoTmp.css("display") != "none") {
			strTrueSite = jqoTmp.val().trim().toUpperCase();
			if(strTrueSite == "") { $("#MOBILE_TrueSite").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }
		}

		// Etat
		var jqoTmp = $("#MOBILE_Etat");
		if(jqoTmp.length != 0)
			var strStatus = jqoTmp.val().trim().toUpperCase();
		else
			var strStatus = "";

		// FAN ?
		var strFAN = $("#MOBILE_FAN").val().trim();
		if(strFAN == "") { alert(l_MOBILE_StockEquipments_Err_NoFAN); return false; }	

		// On ne peut pas changer de site et d'état en même temps
		if(((strSite != strActualSite) || (strTrueSite != strActualTrueSite)) && (strActualStatus == "PANNE") && (strStatus != strActualStatus)) {
			alert(l_MOBILE_StockEquipments_Err_PanneOrSiteOnly);
			return false;
		}

		// Si le site a changé, appel WS MAJStock
		if((strSite != strActualSite) || (strTrueSite != strActualTrueSite)) {

			// Site transcodifié, on l'utilise pour Reflex
			if(strTrueSite != "") strSite = strTrueSite;						
						
			// Transcodification REFLEX disponible ?
			var strReflexSite = MOBILE_GetReflexSite(strSite)
			if(strReflexSite == "") { alert(l_MOBILE_StockEquipments_Err_NoTranscodifREFLEX); return false; }

			var boolContinue = false;
			$.ajax({
				url: MOBILE_WS_MAJStock.replace("%fan%", strFAN).replace("%site%", MOBILE_TranscodifREFLEX[strSite]),
				async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

				// Echec de la requête
				error: function() { 
					alert(l_Forms_Err_AJAX);
				},

				// Réussite de la requête
				success: function(xml) {
								
					// Code retour
					var strCR = $(xml).find("RC").text().trim();
								
					// OK
					if(strCR == "0") {
						boolContinue = true;
					}										
					// KO
					else {
						if(strCR == "1") {
							alert(l_MOBILE_WS_MAJStock_KOCR_1.replace("%cr%", strCR));
						}
						else if(strCR == "2") {
							alert(l_MOBILE_WS_MAJStock_KOCR_2.replace("%cr%", strCR));
						}
						else if(strCR == "3") {
							alert(l_MOBILE_WS_MAJStock_KOCR_3.replace("%cr%", strCR));
						}
						else {
							alert(l_MOBILE_WS_MAJStock_NoCR.replace("%cr%", strCR));
						}
					}
				}
			});
			if(!boolContinue) return false;
		}
		// Si l'état a changé, suite à un retour de panne, appel WS RetourPanne
		else if((strActualStatus == "PANNE") && (strStatus != strActualStatus)) {

			var boolContinue = false;
			$.ajax({
				url: MOBILE_WS_RetourPanne.replace("%fan%", strFAN),
				async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

				// Echec de la requête
				error: function() { 
					alert(l_Forms_Err_AJAX);
				},

				// Réussite de la requête
				success: function(xml) {
								
					// Code retour
					var strCR = $(xml).find("RC").text().trim();
								
					// OK
					if(strCR == "0") {
						boolContinue = true;
					}										
					// KO
					else {
							alert(l_MOBILE_WS_RetourPanne_NoCR.replace("%cr%", strCR));
					}
				}
			});
			if(!boolContinue) return false;
		}
	}
}