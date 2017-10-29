// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 

	// Initialisation via LDAP
	if((typeof(JSONLDAP) != "undefined") && (JSONLDAP[0] != undefined)) {

		// N+1
		if((JSONLDAP[0].getManager !== undefined) && (JSONLDAP[0].getManager.getCN !== undefined) && ($("#STIM01_Hierar").val() === ""))
			$("#STIM01_Hierar").val(JSONLDAP[0].getManager.getCN + "/" + HierarchyOnly);
	}
});

// Soumission
function STIM01_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Bénéficiaire MOA
	if($("#STIM01_BenefMOA").val().trim() == "") { DisplayErrMsgOnField("STIM01_BenefMOA", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_BenefMOA + "\" !"); return false; }

	// Bénéficiaire MOE
	if($("#STIM01_BenefMOE").val().trim() == "") { DisplayErrMsgOnField("STIM01_BenefMOE", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_BenefMOE + "\" !"); return false; }

	// Date de validité
	var strTmp = $("#STIM01_Date").val().trim();
	if(strTmp == "") { DisplayErrMsgOnField("STIM01_Date", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_Date + "\""); return false; }
	var DateFormat = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;
	if(!DateFormat.test(strTmp))	{ DisplayErrMsgOnField("STIM01_Date", l_Forms_Err_DateFormat); return false; }
	var dateStart = new Date(strTmp.substr(6, 4), Number(strTmp.substr(3, 2)) - 1, strTmp.substr(0, 2), 0, 0, 0);
	var dateNow = new Date();
	dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);
	if(dateStart.getTime() < dateNow.getTime()) { DisplayErrMsgOnField("STIM01_Date", l_STIM01_Date_ErrWrongDate); return false; }
		
	// Nom du partenaire
	if($("#STIM01_Partner_Name").val().trim() == "") { DisplayErrMsgOnField("STIM01_Partner_Name", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_Partner_Name + "\" !"); return false; }

	// Localisation de la société
	if($("#STIM01_Partner_Location").val().trim() == "") { DisplayErrMsgOnField("STIM01_Partner_Location", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_Partner_Location + "\" !"); return false; }

	// Au moins une pièce jointe
	if((Attachments["E0"] == undefined) || (Attachments["E0"].length == 0)) { DisplayErrMsgOnField("STIM01_E0_Attach", l_Attach_Err_Mandatory); return false; }

	// Hiérarchique
	if($("#STIM01_Hierar").val().trim() == "") { DisplayErrMsgOnField("STIM01_Hierar", l_Forms_Err_ChampObligatoire + "\"" + l_STIM01_Hierar + "\" !"); return false; }
	if($("#STIM01_Hierar").val().trim().toUpperCase() == Form.Requester.AbbreviatedName.trim().toUpperCase()) { DisplayErrMsgOnField("STIM01_Hierar", l_Forms_Err_RequesterCantValidate); return false; }

	// Confirmation de la soumission
	if(confirm(l_Conf_Submit)) {
		fmr.document.hasBeenSent = true;
		$("#f_ActionAFaire").val("soumettre");
		document.forms[0].submit();
	}
}

// Calendrier "Date"
function STIM01_Date_DatePicker(nodeThis) {

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

// Ouverture de la liste des partenaires existants
function STIM01_OpenPartnersPopup() {
	var url = window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val();
	var PopupHeight = 450;
	var PopupWidth = 600;
	var PopupTop = (screen.height - PopupHeight)/2;
	var PopupLeft = (screen.width - PopupWidth)/2;
	var win=window.open(url + "/v_STIMxx_Partner_Popup?OpenView", "PartnersPopup", "status=no,resizable=Yes,scrollbars=Yes,width=" + PopupWidth + ",height=" + PopupHeight + ",top=" + PopupTop + ",left=" + PopupLeft);
	win.focus();
}