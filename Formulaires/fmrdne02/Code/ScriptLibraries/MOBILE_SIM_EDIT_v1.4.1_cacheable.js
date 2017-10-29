// A l'ouverture de la page
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });

	// Chargement des FlotteID
	$("#MOBILE_Country").change();

	// Liste des sites, triée
	arrSites.sort(function(a, b) {
		return a[1] > b[1];
	});
	var strOptions = "<option" + (strActualSite == "" ? " selected": "")+ " value=\"\"></option>";
	for(var i = 0, j = arrSites.length; i < j; i++) {
		strOptions += "<option" + (strActualSite == arrSites[i][0] ? " selected": "")+ " value=\"" + arrSites[i][0] + "\">" + arrSites[i][1] + "</option>";
	}
	$("#MOBILE_Site").empty().append(strOptions).change(MOBILE_Site_OnChange).change();

	// SIM téléphone
	var jqoTmp = $("input[name=MOBILE_SIM_Type]:checked");
	if((jqoTmp.length > 0) && (jqoTmp.val() == "SIMPHONE")) {
		$("input[name=MOBILE_SIM_Smartphone]").eq(0).parents("tr").eq(0).show();

		// Type de SIM
		var jqoTmp = $("input[name=MOBILE_SIM_Smartphone]:checked");
		if((jqoTmp.length > 0) && (jqoTmp.val() == "Y"))
			$("input[name=MOBILE_SIM_Tethering]").eq(0).parents("tr").eq(0).show();
		else
			$("input[name=MOBILE_SIM_Tethering]").eq(0).parents("tr").eq(0).hide();
	}
	// SIM 3G
	else {
		$("input[name=MOBILE_SIM_Smartphone]").eq(0).parents("tr").eq(0).hide();
		$("input[name=MOBILE_SIM_Tethering]").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
	}
});

// Choix du pays
function MOBILE_Country_OnChange() {

	// Pas de pays, déselection et masquage du domaine de facturation
	var jqoCountry = $("#MOBILE_Country");
	if(jqoCountry.val().trim() == "") {
		$("#MOBILE_FlotteID").empty().append("<option></option>").parents("tr").hide();
	}
	// Pays quelconque, construction de la liste des domaines de facturation
	else {
		$("#MOBILE_Country_AJAXLoader").show();
		var strDBPath = window.location.href.strLeft(".nsf") + ".nsf";
		var strOptions = "";
	
		// Chargement des domaines actifs
		var strTemp = MOBILE_GetFlotteIDOptions("ON§" + jqoCountry.val().trim().toUpperCase(), strActualFlotteID);
		if(strTemp != "") strOptions += "<optgroup label=\"" + l_MOBILE_DomFact_StatusOn + "\">" + strTemp + "</optgroup>";

		// Chargement des domaines inactifs
		var strTemp = MOBILE_GetFlotteIDOptions("OFF§" + jqoCountry.val().trim().toUpperCase(), strActualFlotteID);
		if(strTemp != "") strOptions += "<optgroup label=\"" + l_MOBILE_DomFact_StatusOff + "\">" + strTemp + "</optgroup>";

		// Ajout des options, affichage du champ
		if(strOptions != "")
			$("#MOBILE_FlotteID").empty().append("<option></option>" + strOptions).parents("tr").show();
		else
			$("#MOBILE_FlotteID").empty().append("<option></option>").parents("tr").hide();

		$("#MOBILE_Country_AJAXLoader").hide();
	}
}

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

// Choix type de SIM
function MOBILE_SIM_Type_OnClick(pThis) {
	if($(pThis).val() == "SIMPHONE")
		$("input[name=MOBILE_SIM_Smartphone]").eq(0).parents("tr").eq(0).show();
	else {
		$("input[name=MOBILE_SIM_Smartphone]").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
		$("input[name=MOBILE_SIM_Tethering]").eq(0).parents("tr").eq(0).hide();
	}
}

// Choix option smartphone
function MOBILE_SIM_Smartphone_OnClick(pThis) {
	if($(pThis).val() == "Y")
		$("input[name=MOBILE_SIM_Tethering]").eq(0).parents("tr").eq(0).show();
	else
		$("input[name=MOBILE_SIM_Tethering]").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
}

// Renvoi des <option> (FlotteID) pour une clé "status§pays" de domaines de facturation
function MOBILE_GetFlotteIDOptions(strKey, strSelected) {
	var strReturn = "";

	// Chargement des domaines de facturation actifs
	$.ajax({
		url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_DomFact_Lookup_ForApprob?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase() + "&Count=1000",
		async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

		// Echec de la requête
		error: function() {
			alert(l_Forms_Err_AJAX);
		},

		// Réussite de la requête, lecture du XML, construction des options
		success: function(xml) {
			$(xml).find("viewentry").each(function() {
				var strFlotteID = $(this).find("entrydata[name='FlotteID']").find("text").text().trim().toUpperCase();
				strReturn += "<option value=\"" + strFlotteID + "\"" + (strFlotteID == strSelected.trim().toUpperCase() ? " selected" : "")+ ">" + strFlotteID + "</option>";
			});
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
	if($("input[name=MOBILE_Infra]:checked").length == 0) { DisplayErrMsgOnField("MOBILE_Infra", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Infra + "\""); return false; }
	if($("#MOBILE_Country").val().trim() == "") { DisplayErrMsgOnField("MOBILE_Country", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Country + "\""); return false; }
	if($("#MOBILE_FlotteID").val().trim() == "") { DisplayErrMsgOnField("MOBILE_FlotteID", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_FlotteID + "\""); return false; }
	
	var strSite = $("#MOBILE_Site").val().trim().toUpperCase(); 
	if(strSite == "") { DisplayErrMsgOnField("MOBILE_Site", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }

	// Site transcodifié si besoin
	var jqoTmp = $("#MOBILE_TrueSite");
	if(jqoTmp.css("display") != "none") {
		if(jqoTmp.val().trim() == "") { $("#MOBILE_TrueSite").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }
	}

	var jqoTmp = $("input[name=MOBILE_SIM_Type]:checked");
	if(jqoTmp.length == 0) { DisplayErrMsgOnField("MOBILE_SIM_Type", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Type + "\""); return false; }
	var strSIMType = jqoTmp.val().trim().toUpperCase();
	var boolSmartphone = false;
	if(strSIMType == "SIMPHONE") {
		var jqoTmp = $("input[name=MOBILE_SIM_Smartphone]:checked");
		if(jqoTmp.length == 0) { DisplayErrMsgOnField("MOBILE_SIM_Smartphone", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Smartphone + "\""); return false; }
		boolSmartphone = (jqoTmp.val().trim().toUpperCase() == "Y");
	}
	if($("#MOBILE_USIM").val().trim() == "") { DisplayErrMsgOnField("MOBILE_USIM", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_USIM + "\""); return false; }

	// Format d'USIM, sauf à l'international
	if(strSite != "INT") {
		//var ereg = /^89\d{18}$/;
		var ereg = /^[0-9]{13,20}$/
		var strUSIM = $("#MOBILE_USIM").val().trim();
		if(!ereg.test(strUSIM)) { DisplayErrMsgOnField("MOBILE_USIM", l_MOBILE_USIM_ErrWrongFormat + "\""); return false; }
		//if(!luhn10(strUSIM)) { $("#MOBILE_USIM").focus(); alert(l_MOBILE_USIM_ErrLuhn10 + "\""); return false; }
	}	
	
	var strTmp = $("#MOBILE_SIM_PhoneNumber").val();
	if(strTmp.trim() != "") {
		var ereg = /[^0-9]/;
		if(ereg.test(strTmp)) { DisplayErrMsgOnField("MOBILE_SIM_PhoneNumber", l_MOBILE_SIM_PhoneNumber_ErrWrongFormat); return false; }
	}

	if($("#MOBILE_PUK").val().trim() == "") { DisplayErrMsgOnField("MOBILE_PUK", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_PUK + "\""); return false; }
	if($("input[name=MOBILE_SIM_Roaming]:checked").length == 0) { DisplayErrMsgOnField("MOBILE_SIM_Roaming", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Roaming + "\""); return false; }
	if(boolSmartphone && ($("input[name=MOBILE_SIM_Tethering]:checked").length == 0)) { DisplayErrMsgOnField("MOBILE_SIM_Tethering", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Tethering + "\""); return false; }
	if($("input[name=MOBILE_SIM_Lendable]:checked").length == 0) { DisplayErrMsgOnField("MOBILE_SIM_Lendable", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Lendable + "\""); return false; }
}