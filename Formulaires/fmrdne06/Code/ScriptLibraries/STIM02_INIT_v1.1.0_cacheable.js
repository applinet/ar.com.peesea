// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable({ handles: "s", minHeight: 50 }); 
});

// Soumission
function STIM02_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Bénéficiaire MOA
	if($("#STIM02_BenefMOA").val().trim() == "") { DisplayErrMsgOnField("STIM02_BenefMOA", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_BenefMOA + "\" !"); return false; }

	// Bénéficiaire MOE
	if($("#STIM02_BenefMOE").val().trim() == "") { DisplayErrMsgOnField("STIM02_BenefMOE", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_BenefMOE + "\" !"); return false; }

	// Date
	var strTmp = $("#STIM02_Date").val().trim();
	if(strTmp == "") { DisplayErrMsgOnField("STIM02_Date", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_Date + "\""); return false; }
	var DateFormat = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;
	if(!DateFormat.test(strTmp)) { DisplayErrMsgOnField("STIM02_Date", l_Forms_Err_DateFormat); return false; }
	var dateStart = new Date(strTmp.substr(6, 4), Number(strTmp.substr(3, 2)) - 1, strTmp.substr(0, 2), 0, 0, 0);
	var dateNow = new Date();
	dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
	if(dateStart.getTime() < dateNow.getTime()) { DisplayErrMsgOnField("STIM02_Date", l_STIM02_Date_ErrWrongDate); return false; }
		
	// Nom du protocol
	if($("#STIM02_ProtocolName").val().trim() == "") { DisplayErrMsgOnField("STIM02_ProtocolName", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_ProtocolName + "\" !"); return false; }

	// Type de protocol
	if($("#STIM02_ProtocolType").val().trim() == "") { DisplayErrMsgOnField("STIM02_ProtocolType", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_ProtocolType + "\" !"); return false; }

	// N° de port de départ
	var strPortFrom = $("#STIM02_Port_From").val().trim(); 
	if(strPortFrom == "") { DisplayErrMsgOnField("STIM02_Port_From", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_Port + "\" !"); return false; }
	eregPort = /\D/gi;
	if(eregPort.test(strPortFrom) || (Number(strPortFrom) < 0) || (Number(strPortFrom) > 65535)) { DisplayErrMsgOnField("STIM02_Port_From", l_STIM02_Port_ErrFormat); return false; }

	// N° de port de fin
	var strPortTo = $("#STIM02_Port_To").val().trim(); 
	if(strPortTo != "") {
		if(eregPort.test(strPortTo) || (Number(strPortTo) < 0) || (Number(strPortTo) > 65535)) { DisplayErrMsgOnField("STIM02_Port_To", l_STIM02_Port_ErrFormat); return false; }
		if(Number(strPortFrom) > Number(strPortTo)) { DisplayErrMsgOnField("STIM02_Port_To", l_STIM02_Port_ErrOrder); return false; } 
	}

	// Informations complentaires
	if($("#STIM02_Infos").val().trim() == "") { DisplayErrMsgOnField("STIM02_Infos", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_Infos + "\" !"); return false; }

	// Confirmation de la soumission
	if(confirm(l_Conf_Submit)) {
		fmr.document.hasBeenSent = true;
		$("#f_ActionAFaire").val("soumettre");
		document.forms[0].submit();
	}
}

// Calendrier "Date"
function STIM02_Date_DatePicker(nodeThis) {

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