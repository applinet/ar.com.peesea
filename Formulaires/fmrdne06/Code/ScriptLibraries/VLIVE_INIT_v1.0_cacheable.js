// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 
	// /!\ Il y a un bug sur les textearea redimentionnables masqués. On doit les redéfinir lors de leur affichage pour que ".show()" fonctionne

	// Type de Tchat et Lien vers la documentation Tchat affichée/masquée selon le type d’événement
	var jqoTmp = $("input[name='VLIVE_TypeEvenement']:checked");
	if ((jqoTmp.length > 0) && (jqoTmp.val().toUpperCase().trim() == "TCHAT")) {
		$("#VLIVE_TypeTchat").parents("tr").eq(0).show();
		$("#VLIVE_LienTchat").parents("tr").eq(0).show();
	}
	else {
		$("input[name='VLIVE_TypeTchat']").removeAttr("checked").parents("tr").eq(0).hide();
		$("#VLIVE_LienTchat").parents("tr").eq(0).hide();
	}
	
	// Nom du prestataire, Numéro de téléphone du prestataire et Nom du contact équipe audiovisuel PSA affichée/masquée selon le moyen de capture vidéo
	var jqoTmp = $("input[name='VLIVE_MoyenCapture']:checked");
	if (jqoTmp.length == 0) {
		$("#VLIVE_NomPrestataire").val("").parents("tr").eq(0).hide();
		$("#VLIVE_TelPrestataire").val("").parents("tr").eq(0).hide();
		$("#VLIVE_EquipeVideoPSA").val("").parents("tr").eq(0).hide();
	}
	else {
		if ((jqoTmp.length > 0) && (jqoTmp.val().toUpperCase().trim() == "Y")) {
			$("#VLIVE_NomPrestataire").val("").parents("tr").eq(0).hide();
			$("#VLIVE_TelPrestataire").val("").parents("tr").eq(0).hide();
			$("#VLIVE_EquipeVideoPSA").parents("tr").eq(0).show();
		}
		else {
			$("#VLIVE_NomPrestataire").parents("tr").eq(0).show();
			$("#VLIVE_TelPrestataire").parents("tr").eq(0).show();
			$("#VLIVE_EquipeVideoPSA").val("").parents("tr").eq(0).hide();
		}
	}
	
});


// Soumission
var FormHasBeenSent = false;
function VLIVE_Submit() {

	// Anti double clic
	if(FormHasBeenSent) return false;

	// Expressions régulières
	var DateFormat = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;
	var TimeFormat = /^(([0-1][0-9])|(2[0-4])):([0-5][0-9])$/
	var NomEvenementFormat = /([^0-9A-Z_\-])/i;
	
	// Aujourd'hui
	var dateNow = new Date();
	dateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0);

	// Backup != demandeur
	if($("#Forms_RequesterBackup").val() != "") {
		var arrRequesterBackup = $("#Forms_RequesterBackup").val().toUpperCase().split("\n");
		if(jQuery.inArray(jQuery.trim(Form["Requester"]["AbbreviatedName"]).toUpperCase(), arrRequesterBackup) != -1) { DisplayErrMsgOnField("Forms_RequesterBackup", l_Forms_Err_RequesterCantBeOwnBackup); return false; }
	}

	// Nom de l’événement
	if($("#VLIVE_NomEvenement").val().trim() == "") { DisplayErrMsgOnField("VLIVE_NomEvenement", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_NomEvenement + "\""); return false; }

	// Nom de l’événement (Alphanumérique, "_" ou "-")
	if(NomEvenementFormat.test($("#VLIVE_NomEvenement").val())) { DisplayErrMsgOnField("VLIVE_NomEvenement", l_ErrVLIVE_Invalid_NomEvenement + "\"" + l_VLIVE_NomEvenement + "\""); return false; }
	
	// Description (contexte)
	if($("#VLIVE_Description").val().trim() == "") { DisplayErrMsgOnField("VLIVE_Description", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_Description + "\""); return false; }

	// Type d’événement
	if($("input[name=VLIVE_TypeEvenement]:checked").length < 1) { DisplayErrMsgOnField("VLIVE_TypeEvenement", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_TypeEvenement + "\""); return false; }

	// Type de Tchat
	if($("input[name=VLIVE_TypeEvenement]:checked").val().toUpperCase().trim() == "TCHAT") {
		if($("input[name=VLIVE_TypeTchat]:checked").length < 1) { DisplayErrMsgOnField("VLIVE_TypeTchat", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_TypeTchat + "\""); return false; }
	}
	
	// Site de l’événement
	if($("#VLIVE_SiteEvenement").val().trim() == "") { DisplayErrMsgOnField("VLIVE_SiteEvenement", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_SiteEvenement + "\""); return false; }

	// Salle de l’événement
	if($("#VLIVE_SalleEvenement").val().trim() == "") { DisplayErrMsgOnField("VLIVE_SalleEvenement", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_SalleEvenement + "\""); return false; }

	// Date de début de diffusion
	if($("#VLIVE_DateDiffusion").val().trim() == "") { DisplayErrMsgOnField("VLIVE_DateDiffusion", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_DateDiffusion + "\""); return false; }
	if(!DateFormat.test($("#VLIVE_DateDiffusion").val().trim())) { DisplayErrMsgOnField("VLIVE_DateDiffusion", l_Forms_Err_DateFormat); return false; }

	var strDateStart = $("#VLIVE_DateDiffusion").val().trim();
	var dateStart = new Date(strDateStart.substr(6, 4), Number(strDateStart.substr(3, 2)) - 1, strDateStart.substr(0, 2), 0, 0, 0);
	var dateMin = new Date();
	
	// Si l'utilisateur n'est pas le POA du formulaire, la date de début de diffusion doit être supérieure à la date du jour + 8.
	// Sinon, la date doit être supérieure à la date du jour
	if (!booResponsable) {
		dateMin.setTime(dateMin.getTime() + 8*24*60*60*1000);
		if(dateStart.getTime() <= dateMin.getTime()) { DisplayErrMsgOnField("VLIVE_DateDiffusion", l_ErrVLIVE_Invalid_StartDate); return false; }
	}
	else {
		if(dateStart.getTime() <= dateMin.getTime()) { DisplayErrMsgOnField("VLIVE_DateDiffusion", l_ErrVLIVE_Invalid_StartDatePOA); return false; }
	}
	
	// Heure de début de diffusion
	if($("#VLIVE_HeureDebutDiffusion").val().trim() == "") { DisplayErrMsgOnField("VLIVE_HeureDebutDiffusion", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_HeureDebutDiffusion + "\""); return false; }
	
	// Heure de début de diffusion au bon format si saisie
	var strTimeStart = $("#VLIVE_HeureDebutDiffusion").val().trim();
	if(strTimeStart != "") {
		if(!TimeFormat.test(strTimeStart)) { DisplayErrMsgOnField("VLIVE_HeureDebutDiffusion", l_Forms_Err_TimeFormat); return false; }
	}
	
	// Heure de fin de diffusion
	if($("#VLIVE_HeureFinDiffusion").val().trim() == "") { DisplayErrMsgOnField("VLIVE_HeureFinDiffusion", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_HeureFinDiffusion + "\""); return false; }
	
	// Heure de début de diffusion au bon format si saisie
	var strTimeEnd = $("#VLIVE_HeureFinDiffusion").val().trim();
	if(strTimeEnd != "") {
		if(!TimeFormat.test(strTimeEnd)) { DisplayErrMsgOnField("VLIVE_HeureFinDiffusion", l_Forms_Err_TimeFormat); return false; }
	}
	
	// L'heure de fin doit être supérieure à l'heure de début
	var dateStart = new Date(strDateStart.substr(6, 4), Number(strDateStart.substr(3, 2)) - 1, strDateStart.substr(0, 2), strTimeStart.strLeft(":"), strTimeStart.strRight(":"), 0);
	var dateEnd =   new Date(strDateStart.substr(6, 4), Number(strDateStart.substr(3, 2)) - 1, strDateStart.substr(0, 2), strTimeEnd.strLeft(":"), strTimeEnd.strRight(":"), 0);
	if(dateEnd.getTime() <= dateStart.getTime()) { DisplayErrMsgOnField("VLIVE_HeureFinDiffusion", l_ErrVLIVE_Invalid_FinHeure); return false; }
	
	// Responsable le jour de l’événement
	if($("#VLIVE_Responsable").val().trim() == "") { DisplayErrMsgOnField("VLIVE_Responsable", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_Responsable + "\""); return false; }
	
	// Moyen de capture vidéo
	if($("input[name=VLIVE_MoyenCapture]:checked").length < 1) { DisplayErrMsgOnField("VLIVE_MoyenCapture", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_MoyenCapture + "\""); return false; }
	
	// Type de Tchat
	if($("input[name=VLIVE_MoyenCapture]:checked").val() == "Y") {
		// Nom du contact équipe audiovisuel PSA
		if($("#VLIVE_EquipeVideoPSA").val().trim() == "") { DisplayErrMsgOnField("VLIVE_EquipeVideoPSA", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_EquipeVideoPSA + "\""); return false; }
	}
	else {
		// Nom du prestataire
		if($("#VLIVE_NomPrestataire").val().trim() == "") { DisplayErrMsgOnField("VLIVE_NomPrestataire", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_NomPrestataire + "\""); return false; }
		// Numéro de téléphone du prestataire
		if($("#VLIVE_TelPrestataire").val().trim() == "") { DisplayErrMsgOnField("VLIVE_TelPrestataire", l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_TelPrestataire + "\""); return false; }
	}
	

	// Confirmation de la soumission
	if(confirm(l_Conf_Submit)) {
		FormHasBeenSent = true;
		$("#f_ActionAFaire").val("soumettre");
		document.forms[0].submit();
	}
}


// Calendrier pour la date de début
function VLIVE_DateDiffusion_DatePicker() {
	var dateMin = new Date();
	// Si l'utilisateur n'est pas le POA du formulaire, la date de début de diffusion doit être supérieure à la date du jour + 8.
	// Sinon, la date doit être supérieure à la date du jour
	if (!booResponsable) dateMin.setTime(dateMin.getTime() + 8*24*60*60*1000);	
	
	var Day = dateMin.getDate();
	if(Day < 10) Day = "0" + Day;
	var Month = dateMin.getMonth() +1;
	if(Month < 10) Month = "0" + Month;
	calendrier_datejou.disabledDatesExpression = "";
	calendrier_datejou.addDisabledDates(null, Month + "/" + Day + "/" + dateMin.getFullYear());
	calendrier_heure.hidePopup();
	calendrier_datejou.hidePopup();
	calendrier_datejou.offsetX = 0;
	calendrier_datejou.offsetY = 25;
	calendrier_datejou.select(document.getElementById("VLIVE_DateDiffusion"), "VLIVE_DateDiffusion", "dd/MM/yyyy");
}



// Calendrier "Heure de début/fin" pour le tableau "Trajet"
function VLIVE_TimePicker(strFieldName) {
	var strFieldName = strFieldName;
	calendrier_datejou.hidePopup();
	calendrier_heure.offsetX = 0;
	calendrier_heure.offsetY = 25;
	calendrier_heure.select(document.getElementById(strFieldName),strFieldName,'HH:mm');
}