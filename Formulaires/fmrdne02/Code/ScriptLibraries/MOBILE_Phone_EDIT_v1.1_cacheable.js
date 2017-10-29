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

	// Type de téléphone
	var jqoTmp = $("input[name=MOBILE_Phone_Type]:checked");
	if(jqoTmp.length > 0) {
		jqoTmp.eq(0).click();
	}
	else {
		$("#MOBILE_SmartphoneModel").empty().append("<option></option>").parents("tr").eq(0).hide();
		$("#MOBILE_Phone_Label").empty().parents("tr").eq(0).hide();
		$("#MOBILE_FAN").empty().parents("tr").eq(0).hide();
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
	
	// Chargement des modèles après choix du pays
	$("input[name=MOBILE_Phone_Type]:checked").click();

}

// Choix du site
function MOBILE_Site_OnChange() {

	// Pas de site, ou pas un smartphone, déselection et masquage du site transcodifié
	var strSite = $("#MOBILE_Site").val().trim().toUpperCase();
	var jqoTmp = $("input[name='MOBILE_Phone_Type']:checked");
	if((strSite == "") || (jqoTmp.length == 0) || (jqoTmp.val() != "SMARTPHONE")) {
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

// Choix du type de téléphone
function MOBILE_Phone_Type_OnClick(pThis) {
	if($(pThis).val() == "SMARTPHONE") {
		$("#MOBILE_Site").change();
		$("#MOBILE_IMEI_Image").attr("src", window.location.href.substring(0, window.location.href.indexOf(".nsf") + 4) + "/mandatoryfield.gif");
		$("#MOBILE_SmartphoneModel_AJAXLoader").show();
		$("#MOBILE_SmartphoneModel").empty().append(MOBILE_GetSmartphoneModelOptions($("#MOBILE_Country").val(), strActualSmartphoneModel)).parents("tr").eq(0).show();
		$("#MOBILE_SmartphoneModel_AJAXLoader").hide();
		$("#MOBILE_Phone_Label").val("").parents("tr").eq(0).hide();
		$("#MOBILE_FAN").parents("tr").eq(0).show();
	}
	else if($(pThis).val() == "AUTRE") {
		$("#MOBILE_TrueSite").empty().append("<option></option>").hide();
		$("#MOBILE_IMEI_Image").attr("src", "/icons/ecblank.gif");
		$("#MOBILE_SmartphoneModel").empty().append("<option></option>").parents("tr").eq(0).hide();
		$("#MOBILE_Phone_Label").parents("tr").eq(0).show();
		$("#MOBILE_FAN").val("").parents("tr").eq(0).hide();
	}
	else {
		$("#MOBILE_TrueSite").empty().append("<option></option>").hide();
		$("#MOBILE_IMEI_Image").attr("src", window.location.href.substring(0, window.location.href.indexOf(".nsf") + 4) + "/mandatoryfield.gif");
		$("#MOBILE_SmartphoneModel").empty().append("<option></option>").parents("tr").eq(0).hide();
		$("#MOBILE_Phone_Label").val("").parents("tr").eq(0).hide();
		$("#MOBILE_FAN").val("").parents("tr").eq(0).hide();
	}
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

// Renvoi des <option> (Modèle) pour un pays
function MOBILE_GetSmartphoneModelOptions(strKey, strSelected) {

	// Si pas de pays sélectionné
	if(strKey == "") {
		return "<option>" + l_MOBILE_ChooseACountry + "</option>";
	}
	else {
		var strReturn = "";

		// Chargement des modèles
		$.ajax({
			url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_SmartphoneModel_Lookup_ByCountry?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase(),
			async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

			// Echec de la requête
			error: function() { alert(l_Forms_Err_AJAX); },

			// Réussite de la requête, lecture du XML, construction des options
			success: function(xml) {
				$(xml).find("viewentry").each(function() {
					var strSmartphoneModel = $(this).find("entrydata[name='MOBILE_SmartphoneModel']").find("text").text().trim();
					strReturn += "<option value=\"" + strSmartphoneModel + "\"" + (strSmartphoneModel.toUpperCase() == strSelected.trim().toUpperCase() ? " selected" : "") + ">" + strSmartphoneModel + "</option>";
				});
			}
		});
	
		return "<option></option>" + strReturn;
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
	
	// Infrastructure, pays, FlottesID, site
	if($("input[name=MOBILE_Infra]:checked").length == 0) { DisplayErrMsgOnField("MOBILE_Infra", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Infra + "\""); return false; }
	if($("#MOBILE_Country").val().trim() == "") { DisplayErrMsgOnField("MOBILE_Country", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Country + "\""); return false; }
	if($("#MOBILE_FlotteID").val().trim() == "") { DisplayErrMsgOnField("MOBILE_FlotteID", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_FlotteID + "\""); return false; }
	if($("#MOBILE_Site").val().trim() == "") { DisplayErrMsgOnField("MOBILE_Site", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }

	// Type de téléphone
	var jqoTmp = $("input[name=MOBILE_Phone_Type]:checked");
	if(jqoTmp.length == 0) { DisplayErrMsgOnField("MOBILE_Phone_Type", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Phone_Type + "\""); return false; }
	var strPhoneType = jqoTmp.val();
	
	// Site transcodifié si besoin
	if(strPhoneType == "SMARTPHONE") {
		var jqoTmp = $("#MOBILE_TrueSite");
		if(jqoTmp.css("display") != "none") {
			if(jqoTmp.val().trim() == "") { $("#MOBILE_TrueSite").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }
		}
	}

	// IMEI
	if(strPhoneType != "AUTRE") {
		if($("#MOBILE_IMEI").val().trim() == "") { DisplayErrMsgOnField("MOBILE_IMEI", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_IMEI + "\""); return false; }
		var ereg = /^\d{15}$/;
		if(ereg.test($("#MOBILE_IMEI").val().trim()) == false) { DisplayErrMsgOnField("MOBILE_IMEI", l_MOBILE_IMEI_ErrWrongFormat + "\""); return false; }
	}
	
	// Modèle de smartphone
	if((strPhoneType == "SMARTPHONE") && ($("#MOBILE_SmartphoneModel").val().trim() == "")) { DisplayErrMsgOnField("MOBILE_SmartphoneModel", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SmartphoneModel + "\""); return false; }
	
	// Libellé autre téléphone
	if((strPhoneType == "AUTRE") && ($("#MOBILE_Phone_Label").val().trim() == "")) { DisplayErrMsgOnField("MOBILE_Phone_Label", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Phone_Label + "\""); return false; }
	
	// FAN
	if(strPhoneType == "SMARTPHONE") {
		if($("#MOBILE_FAN").val().trim() == "") { DisplayErrMsgOnField("MOBILE_FAN", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_FAN + "\""); return false; }
		var ereg = /^\w{6,15}$/;
		if(ereg.test($("#MOBILE_FAN").val().trim()) == false) { DisplayErrMsgOnField("MOBILE_FAN", l_MOBILE_FAN_ErrWrongFormat + "\""); return false; }
	}
}