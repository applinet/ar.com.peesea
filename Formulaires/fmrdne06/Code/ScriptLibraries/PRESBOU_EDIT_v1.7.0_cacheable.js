// Namespace
var PRESBOU = PRESBOU || {};
PRESBOU.actions = PRESBOU.actions || {};
PRESBOU.fields = PRESBOU.fields || {};
PRESBOU.utils = PRESBOU.utils || {};


// jQuery
$(document).ready(function() {

	// On charge le commentaire
	PRESBOU.fields.comments = {value: $("#PRESBOU_Comments_Cell").html().replace(/<br>/gi, "") };


});

// Modification
PRESBOU.actions.edit = function() {
	var i;
	var strDBPath = window.location.href.strLeft(".nsf") + ".nsf";
	var strMandatoryImg = "<img src=\"" + strDBPath + "/mandatoryfield_cacheable.gif?OpenImageResource\" border=\"0\" width=\"16\" height=\"16\" align=\"top\">"

	// Switch de l'IHM
	$("#ButtonsTop_1").hide();
	$("#ButtonsTop_2").show();
	$("#ButtonsBottom_1").hide();
	$("#ButtonsBottom_2").show();

	// Pays
	var strOptions = "<option></option>";
	var oTmp = PRESBOU.fields.country;
	for(i = 0; i < oTmp.available.length; i++) {
		strOptions += "<option value=\"" + oTmp.available[i] + "\"" + (oTmp.available[i].toUpperCase().trim() == oTmp.value.toUpperCase().trim() ? " selected" : "") + ">" + Forms_Countries[CurrentUserLng][oTmp.available[i]] + "</option>";
	}
	$("#PRESBOU_Country_Cell").html("<select id=\"PRESBOU_Country\" name=\"PRESBOU_Country\" onChange=\"PRESBOU.utils.prestations.load();\">" + strOptions+ "</select>").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);
	fmr.ui.sortDropdownByText(document.getElementById("PRESBOU_Country"))

	// Site
	var strOptions = "<option></option>";
	var oTmp = PRESBOU.fields.site;
	for(i = 0; i < oTmp.available.length; i++) {
		strOptions += "<option value=\"" + oTmp.available[i] + "\"" + (oTmp.available[i].toUpperCase().trim() == oTmp.value.toUpperCase().trim() ? " selected" : "") + ">" + FMR_Sites_By3Code[oTmp.available[i]] + "</option>";
	}
	$("#PRESBOU_Site_Cell").html("<select id=\"PRESBOU_Site\" name=\"PRESBOU_Site\" onChange=\"PRESBOU.utils.prestations.load();\">" + strOptions+ "</select>").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);
	fmr.ui.sortDropdownByText(document.getElementById("PRESBOU_Site"))

	// Marché
	$("#PRESBOU_Marche_Cell").html("<input type=\"text\" id=\"PRESBOU_Marche\" name=\"PRESBOU_Marche\" value=\"" + PRESBOU.fields.marche.value + "\" style=\"width: 100%;\" onChange=\"PRESBOU.utils.prestations.load();\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);
	
	// CAF
	$("#PRESBOU_CAF_Cell").html("<input type=\"text\" id=\"PRESBOU_CAF\" name=\"PRESBOU_CAF\" value=\"" + PRESBOU.fields.caf.value + "\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);

	// Référence client
	$("#PRESBOU_ClientRef_Cell").html("<input type=\"text\" id=\"PRESBOU_ClientRef\" name=\"PRESBOU_ClientRef\" value=\"" + PRESBOU.fields.clientRef.value + "\">");

	// Date de livraison PDV
	$("#PRESBOU_PDVDeliveryDate_Cell").html("<input type=\"text\" id=\"PRESBOU_PDVDeliveryDate\" name=\"PRESBOU_PDVDeliveryDate\" value=\"" + PRESBOU.fields.pdvDeliveryDate.value + "\" style=\"cursor: pointer; text-align: center;\" size=\"10\" maxlength=\"10\" onFocus=\"blur();\" onClick=\"PRESBOU.fields.pdvDeliveryDate.datePicker(this);\">&nbsp;<img height=\"19\" width=\"19\" align=\"top\" onclick=\"PRESBOU.fields.pdvDeliveryDate.datePicker(this);\" style=\"cursor:pointer\" src=\"" + strDBPath + "/calendrier_cacheable.gif?OpenImageResource\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);

	// Silhouette
	var strOptions = "<option></option>";
	var oTmp = PRESBOU.fields.silhouette;
	for(i = 0; i < oTmp.available.length; i++) {
		strOptions += "<option value=\"" + oTmp.available[i] + "\"" + (oTmp.available[i].toLowerCase().trim() == oTmp.value.toLowerCase().trim() ? " selected" : "") + ">" + oTmp.available[i] + "</option>";
	}
	$("#PRESBOU_Silhouette_Cell").html("<select id=\"PRESBOU_Silhouette\" name=\"PRESBOU_Silhouette\" onChange=\"PRESBOU.utils.prestations.load();\">" + strOptions+ "</select>").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);

	// Version
	$("#PRESBOU_Version_Cell").html("<input type=\"text\" id=\"PRESBOU_Version\" name=\"PRESBOU_Version\" value=\"" + PRESBOU.fields.version.value + "\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);

	// Concessionnaire livraison
	$("#PRESBOU_DlvrDealer_FRRCode_Cell").html("<input type=\"text\" id=\"PRESBOU_DlvrDealer_FRRCode\" name=\"PRESBOU_DlvrDealer_FRRCode\" value=\"" + PRESBOU.fields.dealers.dlvr.frrCode.value + "\" onChange=\"this.value = this.value.trim().toUpperCase(); PRESBOU.fields.dealers.dlvr.change();\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);
	$("#PRESBOU_DlvrDealer_AdrCode_Cell").html("<input type=\"text\" id=\"PRESBOU_DlvrDealer_AdrCode\" name=\"PRESBOU_DlvrDealer_AdrCode\" value=\"" + PRESBOU.fields.dealers.dlvr.adrCode.value + "\" onChange=\"this.value = this.value.trim().toUpperCase(); PRESBOU.fields.dealers.dlvr.change();\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);
	PRESBOU.fields.dealers.dlvr.change();	
	
	// Concessionnaire facturation
	$("#PRESBOU_FctrtDealer_FRRCode_Cell").html("<input type=\"text\" id=\"PRESBOU_FctrtDealer_FRRCode\" name=\"PRESBOU_FctrtDealer_FRRCode\" value=\"" + PRESBOU.fields.dealers.fctrt.frrCode.value + "\" onChange=\"this.value = this.value.trim().toUpperCase(); PRESBOU.fields.dealers.fctrt.change();\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);
	$("#PRESBOU_FctrtDealer_AdrCode_Cell").html("<input type=\"text\" id=\"PRESBOU_FctrtDealer_AdrCode\" name=\"PRESBOU_FctrtDealer_AdrCode\" value=\"" + PRESBOU.fields.dealers.fctrt.adrCode.value + "\" onChange=\"this.value = this.value.trim().toUpperCase(); PRESBOU.fields.dealers.fctrt.change();\">").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);
	PRESBOU.fields.dealers.fctrt.change();	

	// Commentaires
	$("#PRESBOU_Comments_Cell").html("<textarea id=\"PRESBOU_Comments\" name=\"PRESBOU_Comments\" style=\"width: 100%\" rows=\"3\">" + PRESBOU.fields.comments.value.br2nl() + "</textarea>").parents("tr").eq(0).find("td").eq(0).attr("valign", "middle").html(strMandatoryImg);

	// Sauvegarde des prestations
	var jqoTmp = $("#PRESBOU_Prestations tbody");
	PRESBOU.fields.prestationRef.originalBodyHTML = jqoTmp.html();
	
	var jqoTmp = $("#PRESBOU_Prestations tfoot td");
	PRESBOU.fields.prestationRef.originalFootHTML = "<tr><td style=\"text-align: right; background-color: #C2EFFF; font-weight: bold;\" colspan=\"2\">" + l_PRESBOU_Prestations_Total + "</td><td style=\"background-color: #C2EFFF;\">" + jqoTmp.eq(1).html() + "</td><td style=\"background-color: #C2EFFF;\">" + jqoTmp.eq(2).html() + "</td></tr>";
	
	
	// Construction du tableau de saisie
	var strHTML = "";
	for(i = 1; i <= 20; i++) {
		strHTML += "<tr><td><select id=\"PRESBOU_Prestation_Ref_" + i + "\" name=\"PRESBOU_Prestations_Ref\" onChange=\"PRESBOU.fields.prestationRef.change(this);\"></select></td><td></td><td style=\"text-align: right;\"></td><td style=\"text-align: right;\"></td></tr>";
	}
	$("#PRESBOU_Prestations tbody").html(strHTML);
	PRESBOU.utils.prestations.load();


	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 
	
};

// Annulation de la modification
PRESBOU.actions.cancelEdit = function() {
	var strDBPath = window.location.href.strLeft(".nsf") + ".nsf";

	// Switch de l'IHM
	$("#ButtonsTop_1").show();
	$("#ButtonsTop_2").hide();
	$("#ButtonsBottom_1").show();
	$("#ButtonsBottom_2").hide();

	// Switch des champs
	$("#PRESBOU_Country_Cell").html(Forms_Countries[CurrentUserLng][PRESBOU.fields.country.value]).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_Site_Cell").html(FMR_Sites_By3Code[PRESBOU.fields.site.value]).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_Marche_Cell").html(PRESBOU.fields.marche.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_CAF_Cell").html(PRESBOU.fields.caf.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_ClientRef_Cell").html(PRESBOU.fields.clientRef.value);
	$("#PRESBOU_PDVDeliveryDate_Cell").html(PRESBOU.fields.pdvDeliveryDate.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_Silhouette_Cell").html(PRESBOU.fields.silhouette.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_Version_Cell").html(PRESBOU.fields.version.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_DlvrDealer_FRRCode_Cell").html(PRESBOU.fields.dealers.dlvr.frrCode.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_DlvrDealer_AdrCode_Cell").html(PRESBOU.fields.dealers.dlvr.adrCode.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_DlvrDealer_Name_Cell").html(PRESBOU.fields.dealers.dlvr.name.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_DlvrDealer_City_Cell").html(PRESBOU.fields.dealers.dlvr.city.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_FctrtDealer_FRRCode_Cell").html(PRESBOU.fields.dealers.fctrt.frrCode.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_FctrtDealer_AdrCode_Cell").html(PRESBOU.fields.dealers.fctrt.adrCode.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_FctrtDealer_Name_Cell").html(PRESBOU.fields.dealers.fctrt.name.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_FctrtDealer_City_Cell").html(PRESBOU.fields.dealers.fctrt.city.value).parents("tr").eq(0).find("td").eq(0).html("");
	$("#PRESBOU_Comments_Cell").html(PRESBOU.fields.comments.value.nl2br()).parents("tr").eq(0).find("td").eq(0).html("");

	// Reconstruction du tableau des prestations
	$("#PRESBOU_Prestations tbody").empty().html(PRESBOU.fields.prestationRef.originalBodyHTML);
	$("#PRESBOU_Prestations tfoot").empty().html(PRESBOU.fields.prestationRef.originalFootHTML);

};


// Soumission
PRESBOU.actions.submitedit = function() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Pays
	if($("#PRESBOU_Country").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Country", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Country + "\" !"); return false; }

	// Site
	if($("#PRESBOU_Site").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Site", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Site + "\" !"); return false; }

	// Marché, existant
	if($("#PRESBOU_Marche").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Marche", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Marche + "\" !"); return false; }
	if(!PRESBOU.fields.marche.validate()) { DisplayErrMsgOnField("PRESBOU_Marche", l_PRESBOU_Marche_ErrDoesntExists); return false; }

	// CAF
	if($("#PRESBOU_CAF").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_CAF", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_CAF + "\" !"); return false; }

	// Date de livraison PDV
	var strTmp = $("#PRESBOU_PDVDeliveryDate").val().trim();
	if(strTmp == "") { DisplayErrMsgOnField("PRESBOU_PDVDeliveryDate", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_PDVDeliveryDate + "\" !"); return false; }
	var DateFormat = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;
	if(!DateFormat.test(strTmp)) { DisplayErrMsgOnField("PRESBOU_PDVDeliveryDate", l_Forms_Err_DateFormat); return false; }

	// Silhouette
	if($("#PRESBOU_Silhouette").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Silhouette", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Silhouette + "\" !"); return false; }

	// Version
	if($("#PRESBOU_Version").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Version", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Version + "\" !"); return false; }


	// Code FRR client livraison
	var strFRRCode = $("#PRESBOU_DlvrDealer_FRRCode").val().trim();
	if(strFRRCode == "") { DisplayErrMsgOnField("PRESBOU_DlvrDealer_FRRCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_DlvrDealer_FRRCode + "\" !"); return false; }
	
	// Code adresse livraison
	var strAdrCode = $("#PRESBOU_DlvrDealer_AdrCode").val().trim(); 
	if(strAdrCode == "") { DisplayErrMsgOnField("PRESBOU_DlvrDealer_AdrCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_DlvrDealer_AdrCode + "\" !"); return false; }

	// Existance du concessionnaire livraison
	if(!PRESBOU.utils.dealer.validate(strFRRCode, strAdrCode)) { DisplayErrMsgOnField("PRESBOU_DlvrDealer_FRRCode", l_PRESBOU_DlvrDealer_ErrDoesntExists); return false; }


	// Code FRR client facturation
	strFRRCode = $("#PRESBOU_FctrtDealer_FRRCode").val().trim();
	if(strFRRCode == "") { DisplayErrMsgOnField("PRESBOU_FctrtDealer_FRRCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_FctrtDealer_FRRCode + "\" !"); return false; }

	// Code adresse facturation
	strAdrCode = $("#PRESBOU_FctrtDealer_AdrCode").val().trim();
	if(strAdrCode == "") { DisplayErrMsgOnField("PRESBOU_FctrtDealer_AdrCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_FctrtDealer_AdrCode + "\" !"); return false; }

	// Existance du concessionnaire livraison
	if(!PRESBOU.utils.dealer.validate(strFRRCode, strAdrCode)) { DisplayErrMsgOnField("PRESBOU_FctrtDealer_FRRCode", l_PRESBOU_FctrtDealer_ErrDoesntExists); return false; }


	// Comments
	if($("#PRESBOU_Comments").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Comments", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Comments + "\" !"); return false; }


	// Pas de prestations existantes
	if(PRESBOU.fields.prestationRef.available.length == 0) { DisplayErrMsgOnField("PRESBOU_Country", l_PRESBOU_Prestations_ErrNothingFound); return false; }

	// Au moins une prestation choisie
	var boolTmp = false
	$("select[name=PRESBOU_Prestations_Ref]").each(function() {
		if($(this).val().trim() != "") {
			boolTmp = true;
			return false;
		}
	});
	if(!boolTmp) { DisplayErrMsgOnField("PRESBOU_Country", l_PRESBOU_Prestations_ErrAtLeastOne); return false; }
		

	// Soumission
	fmr.document.submit({action: "modifier"});
};

// Calendrier "Date"
PRESBOU.fields.pdvDeliveryDate = PRESBOU.fields.pdvDeliveryDate || {};
PRESBOU.fields.pdvDeliveryDate.datePicker = function(caller) {

	// Nom du champ
	if(caller.tagName.toUpperCase() == "IMG")
		var strFieldName = $(caller).parents("td").find("input").attr("id");
	else
		var strFieldName = caller.id;
	
	// Calendrier
	calendrier_heure.hidePopup();
	calendrier_datejou.hidePopup();
	calendrier_datejou.disabledDatesExpression = "";
	calendrier_datejou.select(document.getElementById(strFieldName), strFieldName, "dd/MM/yyyy");
}

// Validation de l'existance d'un marché
PRESBOU.fields.marche = PRESBOU.fields.marche || {};
PRESBOU.fields.marche.validate = function() {
	var strCountry = $("#PRESBOU_Country").val().toLowerCase();
	if(strCountry == "") return false;
	var strSite = $("#PRESBOU_Site").val().toLowerCase();
	if(strSite == "") return false;
	var strMarche = $("#PRESBOU_Marche").val().toLowerCase();
	if(strMarche == "") return false;
	
	var strKey = strCountry + "§" + strSite + "§" + strMarche;
	var boolTmp = false;
	$.ajax({
		url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Marche_Lookup_ForForm?ReadViewEntries&StartKey=" + strKey + "&Count=1",
		type: 'GET', dataType: 'xml', cache: false, timeout: 30000, async: false,

		// Echec de la requête
		error: function() {
			alert(l_Forms_Err_AJAX);
		},

		// Réussite de la requête
		success: function(xml) {
			var jqoTmp = $(xml).find("entrydata[name=Key]");
			if(jqoTmp.length != 0) {
				if(jqoTmp.text().trim().toLowerCase() == strKey) boolTmp = true; 
			}
		}
	});
	return boolTmp;
};

// Choix d'un concessionnaire pour livraison
PRESBOU.fields.dealers = PRESBOU.fields.dealers || {}; 
PRESBOU.fields.dealers.dlvr = PRESBOU.fields.dealers.dlvr || {}; 
PRESBOU.fields.dealers.dlvr.change = function() {

	// Code FRR
	var strFRRCode = $("#PRESBOU_DlvrDealer_FRRCode").val().trim();
	if(strFRRCode == "") return;
	
	// Code Adresse
	var strAdrCode = $("#PRESBOU_DlvrDealer_AdrCode").val().trim();
	if(strAdrCode == "") return;

	// Chargement des infos du concessionnaire  
	PRESBOU.utils.dealer.getInfos({
		frrCode: strFRRCode,
		adrCode: strAdrCode,
		success: function(oDealer) {
			$("#PRESBOU_DlvrDealer_Name").val(oDealer.name);
			$("#PRESBOU_DlvrDealer_Name_Cell").html(oDealer.name);
			$("#PRESBOU_DlvrDealer_City").val(oDealer.city);
			$("#PRESBOU_DlvrDealer_City_Cell").html(oDealer.city);
		},
		failure: function() {
			$("#PRESBOU_DlvrDealer_Name").val("");
			$("#PRESBOU_DlvrDealer_Name_Cell").html("");
			$("#PRESBOU_DlvrDealer_City").val("");
			$("#PRESBOU_DlvrDealer_City_Cell").html("");
		}
	});
};

// Choix d'un concessionnaire pour facturation
PRESBOU.fields.dealers.fctrt = PRESBOU.fields.dealers.fctrt || {}; 
PRESBOU.fields.dealers.fctrt.change = function() {

	// Code FRR
	var strFRRCode = $("#PRESBOU_FctrtDealer_FRRCode").val().trim();
	if(strFRRCode == "") return;
	
	// Code Adresse
	var strAdrCode = $("#PRESBOU_FctrtDealer_AdrCode").val().trim();
	if(strAdrCode == "") return;

	// Chargement des infos du concessionnaire  
	PRESBOU.utils.dealer.getInfos({
		frrCode: strFRRCode,
		adrCode: strAdrCode,
		success: function(oDealer) {
			$("#PRESBOU_FctrtDealer_Name").val(oDealer.name);
			$("#PRESBOU_FctrtDealer_Name_Cell").html(oDealer.name);
			$("#PRESBOU_FctrtDealer_City").val(oDealer.city);
			$("#PRESBOU_FctrtDealer_City_Cell").html(oDealer.city);
		},
		failure: function() {
			$("#PRESBOU_FctrtDealer_Name").val("");
			$("#PRESBOU_FctrtDealer_Name_Cell").html("");
			$("#PRESBOU_FctrtDealer_City").val("");
			$("#PRESBOU_FctrtDealer_City_Cell").html("");
		}
	});
};

// Chargement des informations d'un concessionnaire
// En options: frrCode, adrCode, success(), failure()
PRESBOU.utils.dealer = PRESBOU.utils.dealer || {};
PRESBOU.utils.dealer.getInfos = function(options) {
	if(!options || (typeof options != "object")) return false; 

	// Paramètre incorrects
	if(!options.frrCode || (typeof options.frrCode != "string") || options.frrCode == "" ||
	   !options.adrCode || (typeof options.adrCode != "string") || options.adrCode == "") {
	
		// Callback d'échec
		if(options.failure && (typeof options.failure == "function")) options.failure();
	}
	else {
	
		// Requète AJAX	
		var strKey = options.frrCode.trim().toLowerCase() + "§" + options.adrCode.trim().toLowerCase(); 
		$.ajax({
			url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Dealer_Lookup_ForForm?ReadViewEntries&StartKey=" + strKey + "&Count=1",
			type: 'GET', dataType: 'xml', cache: false, timeout: 30000,

			// Echec de la requête
			error: function() {
				alert(l_Forms_Err_AJAX);

				// Callback d'échec
				if(options.failure && (typeof options.failure == "function")) options.failure();
			},

			// Réussite de la requête
			success: function(xml) {
			
				// Un concessionnaire est retourné
				var boolSuccess = false;
				if($(xml).find("viewentry").length > 0) {
			
					// Si il correspond à la clé
					var jqoTmp = $(xml).find("entrydata[name='Key'] text");
					if((jqoTmp.length > 0) && (jqoTmp.eq(0).text().trim().toLowerCase() == strKey)) {
						
						// Construction d'un objet représentant le concessionnaire
						var oTmp = {};
						jqoTmp = $(xml).find("entrydata[name='Name'] text");
						if(jqoTmp.length > 0) oTmp.name = jqoTmp.eq(0).text()
						jqoTmp = $(xml).find("entrydata[name='City'] text");
						if(jqoTmp.length > 0) oTmp.city = jqoTmp.eq(0).text()

						// Callback de réussite
						boolSuccess = true;
						if(options.success && (typeof options.success == "function")) options.success(oTmp);
					}
				}
				 
				// Callback d'échec
				if(!boolSuccess && options.failure && (typeof options.failure == "function")) options.failure();
			}
		});
	}
};

// Validation de l'existance d'un concessionnaire
PRESBOU.utils.dealer.validate = function(strFRRCode, strAdrCode) {

	// Vérification des paramètres
	if(!strFRRCode || (typeof strFRRCode != "string")) return false;
	strFRRCode = strFRRCode.trim().toLowerCase();
	if(strFRRCode == "") return false;
	
	if(!strAdrCode || (typeof strAdrCode != "string")) return false;
	strAdrCode = strAdrCode.trim().toLowerCase();
	if(strAdrCode == "") return false;

	
	// Requète AJAX	
	var strKey = strFRRCode + "§" + strAdrCode; 
	var boolReturn = false;
	$.ajax({
		url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Dealer_Lookup_ForForm?ReadViewEntries&StartKey=" + strKey + "&Count=1",
		type: 'GET', dataType: 'xml', cache: false, timeout: 30000, async: false,

		// Echec de la requête
		error: function() {
			alert(l_Forms_Err_AJAX);
		},

		// Réussite de la requête
		success: function(xml) {
			
			// Un concessionnaire est retourné, et correspond à la clé
			var jqoTmp = $(xml).find("entrydata[name='Key'] text");
			if((jqoTmp.length > 0) && (jqoTmp.eq(0).text().trim().toLowerCase() == strKey)) boolReturn = true;
		}
	});
	return boolReturn;					
};

// Chargement des prestations pour des pays, site, marché et silhouette
PRESBOU.utils.prestations = PRESBOU.utils.prestations || {}; 
PRESBOU.utils.prestations.load = function() {

	// Masquage du tableau des prestations
	var hidePrestationsTable = function() {

		// Mise à niveau du Namespace
		PRESBOU.fields.prestationRef = PRESBOU.fields.prestationRef || {};
		PRESBOU.fields.prestationRef.available = {length: 0};

		// Boucle sur les listes déroulantes
		$("select[name=PRESBOU_Prestations_Ref]").each(function() {
			$(this).html("");
		});

		// Masquage du tableau des prestations
		$("#PRESBOU_Prestations").parents("tr").eq(0).hide().prev().hide();
	};


	// Pays, site, marché et silhouette
	var strCountry = $("#PRESBOU_Country").val().trim();
	var strSite = $("#PRESBOU_Site").val().trim();
	var strMarche = $("#PRESBOU_Marche").val().trim();
	var strSilhouette = $("#PRESBOU_Silhouette").val().trim();

	// Si il manque des informations, on masque le tableau des prestations
	if(strCountry == "" || strSite == "" || strMarche == "" || strSilhouette == "") {
		hidePrestationsTable();
		return;
	}


	// Requete AJAX
	var strKey = (strCountry + "§" + strSite + "§" + strMarche + "§" + strSilhouette).toLowerCase();
	$.ajax({
		url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Prestation_Lookup_ForForm?ReadViewEntries&RestrictToCategory=" + strKey + "&Count=1000",
		type: 'GET', dataType: 'xml', cache: false, timeout: 30000,

		// Echec de la requête
		error: function() {
			alert(l_Forms_Err_AJAX);
			hidePrestationsTable();
		},

		// Réussite de la requête
		success: function(xml) {

			// Des prestations sont retournés
			var jqoTmp = $(xml).find("viewentry");
			if(jqoTmp.length > 0) {

				// Mise à niveau de Namespace
				PRESBOU.fields.prestationRef = PRESBOU.fields.prestationRef || {};
				PRESBOU.fields.prestationRef.available = {length: 0};
				PRESBOU.fields.prestationRef.selected = PRESBOU.fields.prestationRef.selected || [];

				// Boucle sur les prestations
				var strOptions = "<option></option>";
				var strLabel, strRef, strTempsIndi, strPrice1, strPrice2;
				jqoTmp.each(function() {
					
					// Récupération des données
					strLabel = $(this).find("entrydata[name=Label]").find("text").text().trim();
					strRef = $(this).find("entrydata[name=Ref]").find("text").text().trim().toUpperCase();
					strTempsIndi = $(this).find("entrydata[name=TempsIndi]").find("text").text();
					strPrice1 = $(this).find("entrydata[name=Price1]").find("text").text();
					strPrice2 = $(this).find("entrydata[name=Price2]").find("text").text();

					// Mise à niveau du Namespace
					PRESBOU.fields.prestationRef.available[strRef] = {label: strLabel, tempsIndi: strTempsIndi, price1: strPrice1, price2: strPrice2};
					PRESBOU.fields.prestationRef.available.length++;

					// Option
					strOptions = strOptions + "<option value=\"" + strRef + "\">" + strLabel + "</option>";										
				});

				// Bug IE7-9: le tableau n'est pas redimentionné à la taille des <select>
				// On corrige en re-ecrivant le html. Mais sur Firefox, le JavaScript dans thead est réexecut ce qui n'est pas souhaitable
				// Donc on limite au tbody
				var jqoTmp = $("#PRESBOU_Prestations").find("tbody");
				jqoTmp.html(jqoTmp.html());

				// Boucle sur les listes déroulantes
				$("select[name=PRESBOU_Prestations_Ref]").each(function(index) {

					// Ajout des options
					jqoTmp = $(this).html(strOptions);
					
					// Si la clé actuelle correspond à la clé du document, on est sur un modèle/brouillon, on tente de choisir la valeur enregistrée
					if((strKey == (PRESBOU.fields.country.value + "§" + PRESBOU.fields.site.value + "§" + PRESBOU.fields.marche.value + "§" + PRESBOU.fields.silhouette.value).toLowerCase()) && (PRESBOU.fields.prestationRef.selected[index] != undefined)) jqoTmp.val(PRESBOU.fields.prestationRef.selected[index]);											
					
					// Simulation du choix
					jqoTmp.change();				
				});
				
				// Affichage du tableau des prestations
				$("#PRESBOU_Prestations").parents("tr").eq(0).show();

			}
			// Pas de prestations retournées
			else {
				hidePrestationsTable();
			}
		}
	});	
};

// Choix d'une prestation
PRESBOU.fields.prestationRef = PRESBOU.fields.prestationRef || {}
PRESBOU.fields.prestationRef.change = function(caller) {
	var strRef = $(caller).val().trim().toUpperCase();
	
	// Addition des float avec précision
	// /!\ 0.1 + 0.2 = 0.30000000000000004
	function add(a, b, precision) {
	    var x = Math.pow(10, precision || 2);
    	return (Math.round(a * x) + Math.round(b * x)) / x;
	}
	
	// Formatage des décimales
	var formatPrice = function(price) {
		price = String(price).replace(/\./gi, ",");
		if(price.indexOf(",") == -1) {
			price = price + ",00";			
		}
		else if(price.strRight(",").length == 1){
			price = price + "0";
		}
		return price;
	};
	
	// Valeur choisie
	if(strRef != "") {
		var oTmp = PRESBOU.fields.prestationRef.available[strRef];
		if ($("#PRESBOU_DispTempsIndi").val () == "1") {
			$(caller).parents("td").eq(0).next().html(strRef).next().html(oTmp.tempsIndi).next().html(formatPrice(oTmp.price2));
		} else {
		  	$(caller).parents("td").eq(0).next().html(strRef).next().html(formatPrice(oTmp.price1)).next().html(formatPrice(oTmp.price2));
		}
	}
	// Pas de valeur
	else {
		$(caller).parents("td").eq(0).next().html("").next().html("").next().html("");
	}
	
	// Mise à jour des totaux
	// Boucle sur les lignes
	var totalTempsIndi = 0, totalPrice1 = 0, totalPrice2 = 0, jqoTmp, fTmp;
	$(caller).parents("tbody").eq(0).find("tr").each(function() {
		jqoTmp = $(this).find("td");
		if(jqoTmp.length >= 4) {
			if ($("#PRESBOU_DispTempsIndi").val () == "1") {
				fTmp = parseInt(jqoTmp.eq(2).text().replace(/,/gi, "."));
				if(!isNaN(fTmp)) totalTempsIndi = add(totalTempsIndi, fTmp, 2);
			} else {
				fTmp = parseFloat(jqoTmp.eq(2).text().replace(/,/gi, "."));
				if(!isNaN(fTmp)) totalPrice1 = add(totalPrice1, fTmp, 2);
			}
			
			fTmp = parseFloat(jqoTmp.eq(3).text().replace(/,/gi, "."));
			if(!isNaN(fTmp)) totalPrice2 = add(totalPrice2, fTmp, 2);
		}
	});
	
	// Ecriture dans le pied de tableau
	jqoTmp = $(caller).parents("table").eq(0).find("tfoot").find("td");
	if(jqoTmp.length >= 3) {
		if ($("#PRESBOU_DispTempsIndi").val () == "1") {
			jqoTmp.eq(1).html(totalTempsIndi);
		} else {
			jqoTmp.eq(1).html(formatPrice(totalPrice1));
		}
		jqoTmp.eq(2).html(formatPrice(totalPrice2));
	}
	
};