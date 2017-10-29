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

	// Pas de site, déselection et masquage du site transcodifié
	var strSite = $("#MOBILE_Site").val().trim().toUpperCase();
	if(strSite == "") {
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
	if($("#MOBILE_Site").val().trim() == "") { DisplayErrMsgOnField("MOBILE_Site", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }

	// Site transcodifié si besoin
	var jqoTmp = $("select[id='MOBILE_TrueSite']");
	var strTrueSite = "";
	if(jqoTmp.css("display") != "none") {
		strTrueSite = jqoTmp.val().trim().toUpperCase();
		if(strTrueSite == "") { $("#MOBILE_TrueSite").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }
	}

	if($("input[name=MOBILE_SIM_Lendable]:checked").length == 0) { DisplayErrMsgOnField("MOBILE_SIM_Lendable", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Lendable + "\""); return false; }
}