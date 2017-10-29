// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 

	// Simulation click sur avis au rechargement
	var jqoTmp = $("input[name='Forms_E2_Avis']:checked");
	if(jqoTmp.length != 0) jqoTmp.click();

	// Valeur par défaut de la fin de validité
	var dateDefault = new Date();
	dateDefault = new Date(dateDefault.getFullYear(), dateDefault.getMonth() + STIM01_Partner_DateValid_Months, dateDefault.getDate(), 0, 0, 0);
	$("#STIM01_Partner_DateValid").val(dateDefault.getDate().toString().padLeft("0", 2) + "/" + (dateDefault.getMonth()+1).toString().padLeft("0", 2) + "/" + dateDefault.getFullYear());
});

// Soumission
function STIM01_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Avis obligatoire
	if($("input[name=Forms_E2_Avis]:checked").length < 1) { DisplayErrMsgOnField("Forms_E2_Avis", l_Forms_Err_AvisObligatoire); return false; }
	
	// Validation
	if($("input[name=Forms_E2_Avis]:checked").eq(0).val() == "1") {

		// Niveau de confiance
		if($("input[name=STIM01_Partner_ConfidenceLevel]:checked").length < 1) { DisplayErrMsgOnField("STIM01_Partner_ConfidenceLevel", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_Partner_ConfidenceLevel + "\""); return false; }	

		// Date
		var strTmp = $("#STIM01_Partner_DateValid").val().trim();
		if(strTmp == "") { DisplayErrMsgOnField("STIM01_Partner_DateValid", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_Partner_DateValid + "\""); return false; }
		var DateFormat = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;
		if(!DateFormat.test(strTmp))	{ DisplayErrMsgOnField("STIM01_Partner_DateValid", l_Forms_Err_DateFormat); return false; }
		var dateStart = new Date(strTmp.substr(6, 4), Number(strTmp.substr(3, 2)) - 1, strTmp.substr(0, 2), 0, 0, 0);
		var dateNow = new Date();
		dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
		if(dateStart.getTime() < dateNow.getTime()) { DisplayErrMsgOnField("STIM01_Partner_DateValid", l_STIM01_Partner_DateValid_ErrWrongDate); return false; }

		// Confirmation
		if(confirm(l_Conf_Submit)) {
			fmr.document.hasBeenSent = true;
			$("#f_ActionAFaire").val("Soumettre");
			document.forms[0].submit();
		}
	}
	// Refus
	else if($("input[name=Forms_E2_Avis]:checked").eq(0).val() == "0") {

		// Commentaire obligatoire
		if($("#Forms_E2_Comments").val().trim() == "") { DisplayErrMsgOnField("Forms_E2_Comments", l_Forms_Err_CommentairesRefus); return false; }

		// Confirmation
		if(confirm(l_Conf_Submit)) {
			fmr.document.hasBeenSent = true;
			$("#f_ActionAFaire").val("Refuser");
			document.forms[0].submit();
		}
	}	
}

// Calendrier "Date"
function STIM01_Partner_DateValid_DatePicker(nodeThis) {

	// Nom du champ
	if(nodeThis.tagName.toUpperCase() == "IMG")
		var strFieldName = $(nodeThis).parents("td").find("input").attr("id");
	else
		var strFieldName = nodeThis.id;
	
	// Minimum: date du jour
	var dateMin = new Date();
	dateMin.setTime(dateMin.getTime() - 24*60*60*1000);

	// Calendrier
	calendrier_heure.hidePopup();
	calendrier_datejou.hidePopup();
	calendrier_datejou.disabledDatesExpression = "";
	calendrier_datejou.addDisabledDates(null, (dateMin.getMonth() + 1).toString().padLeft("0", 2) + "/" + dateMin.getDate().toString().padLeft("0", 2) + "/" + dateMin.getFullYear());
	calendrier_datejou.select(document.getElementById(strFieldName), strFieldName, "dd/MM/yyyy");
}