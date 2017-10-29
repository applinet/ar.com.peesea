// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });
	
	// Hide conditional fields
	$("#TELEFON_StxNumberStation").parents("tr").eq(0).hide();
	$("#TELEFON_StxSDAStation").parents("tr").eq(0).hide();
	$("#TELEFON_StxMac").parents("tr").eq(0).hide();
	$("#TELEFON_StxTechnicalLocal").parents("tr").eq(0).hide();
	$("#TELEFON_StxEquipmentNum").parents("tr").eq(0).hide();
	$("#TELEFON_StxCxNum").parents("tr").eq(0).hide();
	$("#TELEFON_StxConnector").parents("tr").eq(0).hide();
	$("#TELEFON_StxDirector").parents("tr").eq(0).hide();
	$("#TELEFON_StxDateStart").parents("tr").eq(0).hide();
	$("#Forms_E3_Comments").parents("tr").eq(0).hide();
	$("#TELEFON_StxRefusalReason").parents("tr").eq(0).hide();
	 
});

// Soumission
function TELEFON_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;
	
	// Action for submission
	var actionSubmit = "";

	// Expressions régulières
	var regexpDate = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;
	
	if (($("input[name='Forms_E3_Avis']:checked").val() == "") || ($("input[name='Forms_E3_Avis']:checked").val() == undefined))
		{ DisplayErrMsgOnField("Forms_E3_Avis", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_ConfirmRequest + "\" !"); return false; };
	
	if ($("input[name='Forms_E3_Avis']:checked").val() == "1") { // Confirmed
		
		// Nº interne du poste
		if($("#TELEFON_StxNumberStation").val().trim() == "") { DisplayErrMsgOnField("TELEFON_StxNumberStation", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_StxNumberStation + "\" !"); return false; };

		// Nº SDA du poste
		if($("#TELEFON_StxSDAStation").val().trim() == "") { DisplayErrMsgOnField("TELEFON_StxSDAStation", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_StxSDAStation + "\" !"); return false; };

		// Réalisateur
		if($("#TELEFON_StxDirector").val().trim() == "") { DisplayErrMsgOnField("TELEFON_StxDirector", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_StxDirector + "\" !"); return false; };
	
		// Date de réalisation STX (supèrieure ou égale à la date du jour) 
		var strTmp = $("#TELEFON_StxDateStart").val().trim();
		if(strTmp == "") { DisplayErrMsgOnField("TELEFON_StxDateStart", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_StxDateStart + "\""); return false; }
		if(!regexpDate.test(strTmp)) { DisplayErrMsgOnField("TELEFON_StxDateStart", l_Forms_Err_DateFormat); return false; }
	
		// Date au plus tôt >= J
		var dateToday = new Date();
		dateToday.setHours(0);
		dateToday.setMinutes(0);
		dateToday.setSeconds(0);
		dateToday.setMilliseconds(0);
		var dateEarliest = new Date(strTmp.strRightBack("/"), strTmp.strRight("/").strLeft("/") - 1, strTmp.strLeft("/"), 0, 0, 0);
		if(dateEarliest.getTime() < dateToday.getTime()) { DisplayErrMsgOnField("TELEFON_StxDateStart", l_TELEFON_StxDateStart_ErrTooLow); return false; }
		
		actionSubmit = "soumettre";
		
	} else { // Refused 
		// Motif de réfus
		if($("#TELEFON_StxRefusalReason").val().trim() == "") 
			{ DisplayErrMsgOnField("TELEFON_StxRefusalReason", l_Forms_Err_ChampObligatoire + "\"" 
				+ l_TELEFON_StxRefusalReason + "\" !"); return false; };
		actionSubmit = "refuser";
	}

	// Confirmation de la soumission
	if(confirm(l_Conf_Submit)) {
		FormHasBeenSent = true;
		$("#f_ActionAFaire").val(actionSubmit);
		document.forms[0].submit();
	}
}

// Calendrier date de réalisation STX (minimum date du jour)
function TELEFON_StxDateStart_DatePicker() {
	var dateMin = new Date();
	dateMin.setTime(dateMin.getTime() - 24*60*60*1000);
	var Day = dateMin.getDate();
	if(Day < 10) Day = "0" + Day;
	var Month = dateMin.getMonth() + 1;
	if(Month < 10) Month = "0" + Month;
	calendrier_datejou.disabledDatesExpression = "";
	calendrier_datejou.addDisabledDates(null, Month + "/" + Day + "/" + dateMin.getFullYear());
	calendrier_heure.hidePopup();
	calendrier_datejou.hidePopup();
	calendrier_datejou.select(document.getElementById("TELEFON_StxDateStart"), "TELEFON_StxDateStart", "dd/MM/yyyy");
}

function Forms_E3_Avis_OnClick(){
	if ($("input[name='Forms_E3_Avis']:checked").val() == "1") {
			$("#TELEFON_StxNumberStation").parents("tr").eq(0).show();
			$("#TELEFON_StxSDAStation").parents("tr").eq(0).show();
			$("#TELEFON_StxMac").parents("tr").eq(0).show();
			$("#TELEFON_StxTechnicalLocal").parents("tr").eq(0).show();
			$("#TELEFON_StxEquipmentNum").parents("tr").eq(0).show();
			$("#TELEFON_StxCxNum").parents("tr").eq(0).show();
			$("#TELEFON_StxConnector").parents("tr").eq(0).show();
			$("#TELEFON_StxDirector").parents("tr").eq(0).show();
			$("#TELEFON_StxDateStart").parents("tr").eq(0).show();
			$("#Forms_E3_Comments").parents("tr").eq(0).show();
			$("#TELEFON_StxRefusalReason").parents("tr").eq(0).hide();
	} else {
			$("#TELEFON_StxNumberStation").parents("tr").eq(0).hide();
			$("#TELEFON_StxSDAStation").parents("tr").eq(0).hide();
			$("#TELEFON_StxMac").parents("tr").eq(0).hide();
			$("#TELEFON_StxTechnicalLocal").parents("tr").eq(0).hide();
			$("#TELEFON_StxEquipmentNum").parents("tr").eq(0).hide();
			$("#TELEFON_StxCxNum").parents("tr").eq(0).hide();
			$("#TELEFON_StxConnector").parents("tr").eq(0).hide();
			$("#TELEFON_StxDirector").parents("tr").eq(0).hide();
			$("#TELEFON_StxDateStart").parents("tr").eq(0).hide();
			$("#Forms_E3_Comments").parents("tr").eq(0).hide();
			$("#TELEFON_StxRefusalReason").parents("tr").eq(0).show();
	}
}