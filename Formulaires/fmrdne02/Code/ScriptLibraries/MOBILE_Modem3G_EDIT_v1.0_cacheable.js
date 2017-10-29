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
	$("#MOBILE_Site").empty().append(strOptions);
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
	$("#MOBILE_Modem3GModel").empty().append(MOBILE_GetModem3GModelOptions($("#MOBILE_Country").val(), strActualModem3GModel)).parents("tr").eq(0).show();

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
function MOBILE_GetModem3GModelOptions(strKey, strSelected) {

	// Si pas de pays sélectionné
	if(strKey == "") {
		return "<option>" + l_MOBILE_ChooseACountry + "</option>";
	}
	else {
		var strReturn = "";

		// Chargement des modèles
		$.ajax({
			url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_Modem3GModel_Lookup_ByCountry?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase(),
			async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

			// Echec de la requête
			error: function() { alert(l_Forms_Err_AJAX); },

			// Réussite de la requête, lecture du XML, construction des options
			success: function(xml) {
				$(xml).find("viewentry").each(function() {
					var strModemModel = $(this).find("entrydata[name='MOBILE_Modem3GModel']").find("text").text().trim();
					strReturn += "<option value=\"" + strModemModel + "\"" + (strModemModel.toUpperCase() == strSelected.trim().toUpperCase() ? " selected" : "") + ">" + strModemModel + "</option>";
				});
			}
		});
	
		return "<option></option>" + strReturn;
	}
}

// Soumission
function MOBILE_Submit() {
	if($("#MOBILE_Country").val().trim() == "") { DisplayErrMsgOnField("MOBILE_Country", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Country + "\""); return false; }
	if($("#MOBILE_FlotteID").val().trim() == "") { DisplayErrMsgOnField("MOBILE_FlotteID", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_FlotteID + "\""); return false; }
	if($("#MOBILE_Site").val().trim() == "") { DisplayErrMsgOnField("MOBILE_Site", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }
	if($("#MOBILE_IMEI").val().trim() == "") { DisplayErrMsgOnField("MOBILE_IMEI", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_IMEI + "\""); return false; }
	var ereg = /^\d{15}$/;
	if(ereg.test($("#MOBILE_IMEI").val().trim()) == false) { DisplayErrMsgOnField("MOBILE_IMEI", l_MOBILE_IMEI_ErrWrongFormat + "\""); return false; }
	if($("#MOBILE_Modem3GModel").val().trim() == "") { DisplayErrMsgOnField("MOBILE_Modem3GModel", l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Modem3GModel + "\""); return false; }
}