// jQuery$(document).ready(function() {	// Définition des textareas redimentionnables	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 	// /!\ Il y a un bug sur les textearea redimentionnables masqués. On doit les redéfinir lors de leur affichage pour que ".show()" fonctionne	// Direction à jour	var jqoTmp = $("input[name='DACARE_DirUpToDate']:checked");	if(jqoTmp.length != 0)		jqoTmp.click();	else		$("#DACARE_DirUpdated").parents("tr").eq(0).hide();			// Rechargement, simulation click sur "Reprendre les droits..."	var jqoTmp = $("input[name='DACARE_InheritAccess']:checked");	if(jqoTmp.length != 0)		jqoTmp.click();	else		DACARE_InheritAccess_OnClick(undefined);	// Rechargement des applications du profil	$("#DACARE_Profil").change();});// Soumissionvar FormHasBeenSent = false;function DACARE_Submit() {	// Anti double clic	if(FormHasBeenSent) return false;	// Expressions régulières	var DateFormat = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;	// Bénéficiaire	if($("#DACARE_Beneficiary").val().trim() == "") { DisplayErrMsgOnField("DACARE_Beneficiary", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_Beneficiary + "\""); return false; }	// Direction à jour	var jqoTmp = $("input[name='DACARE_DirUpToDate']:checked"); 	if(jqoTmp.length == 0) { DisplayErrMsgOnField("DACARE_DirUpToDate", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_DirUpToDate + "\""); return false; }	// Nouvelle direction, si direction pas à jour	if(jqoTmp.val().trim().toUpperCase() == "N") {		if($("#DACARE_DirUpdated").val().trim() == "") { DisplayErrMsgOnField("DACARE_DirUpdated", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_DirUpdated + "\""); return false; }	}		if (DACARE_GetDO () == "") {		DisplayErrMsgOnField("DACARE_DirUpToDate", l_DACARE_DirDO_NotFound); 		return false;	}	//else alert ("ok");	// Site	if($("#DACARE_Site").val().trim() == "") { DisplayErrMsgOnField("DACARE_Site", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_Site + "\""); return false; }		// Justification de la demande	if($("#DACARE_Justif").val().trim() == "") { DisplayErrMsgOnField("DACARE_Justif", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_Justif + "\""); return false; }	// Date souhaitée	var strTmp = $("#DACARE_WishedDate").val().trim();	if(strTmp == "") { DisplayErrMsgOnField("DACARE_WishedDate", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_WishedDate + "\""); return false; }	if(!DateFormat.test(strTmp)) { DisplayErrMsgOnField("DACARE_WishedDate", l_Forms_Err_DateFormat); return false; }	// Hiérarchique	if($("#DACARE_Hierar").val().trim() == "") { DisplayErrMsgOnField("DACARE_Hierar", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_Hierar + "\""); return false; }	// Reprend les droits	var jqoTmp = $("input[name='DACARE_InheritAccess']:checked"); 	if(jqoTmp.length == 0) { DisplayErrMsgOnField("DACARE_InheritAccess", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_InheritAccess + "\""); return false; }	// Prédécesseur, si neccessaire	if(jqoTmp.val().trim().toUpperCase() == "Y") {		if($("#DACARE_InheritFrom").val().trim() == "") { DisplayErrMsgOnField("DACARE_InheritFrom", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_InheritFrom + "\""); return false; }	}	// Profil	if($("#DACARE_Profil").val().trim() == "") { DisplayErrMsgOnField("DACARE_Profil", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_Profil + "\""); return false; }	// Périmètre de gestion	if($("#DACARE_PerimGest").val().trim() == "") { DisplayErrMsgOnField("DACARE_PerimGest", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_PerimGest + "\""); return false; }				// Confirmation de la soumission	if(confirm(l_Conf_Submit)) {		FormHasBeenSent = true;		$("#f_ActionAFaire").val("soumettre");		document.forms[0].submit();	}}// Choix direction à jourfunction DACARE_DirUpToDate_OnClick(pThis) {	if($(pThis).val().trim().toUpperCase() == "N")		$("#DACARE_DirUpdated").parents("tr").eq(0).show();	else		$("#DACARE_DirUpdated").parents("tr").eq(0).hide();}// Calendrier "Date souhaitée"function DACARE_WishedDate_DatePicker(nodeThis) {	// Nom du champ	if(nodeThis.tagName.toUpperCase() == "IMG")		var strFieldName = $(nodeThis).parents("td").find("input").attr("id");	else		var strFieldName = nodeThis.id;		// Calendrier	calendrier_heure.hidePopup();	calendrier_datejou.hidePopup();	calendrier_datejou.disabledDatesExpression = "";	calendrier_datejou.select(document.getElementById(strFieldName), strFieldName, "dd/MM/yyyy");}// Get Donneur d'ordrefunction DACARE_GetDO() {	var URL = window.location.href;	var Proto = URL.substring(0, URL.indexOf("://"));	var Domain = URL.substring(URL.indexOf("://") + 3, URL.length);	Domain = Domain.substring(0, Domain.indexOf("/"));		var strDir;	var jqoTmp = $("input[name='DACARE_DirUpToDate']:checked"); 	if(jqoTmp.val().trim().toUpperCase() == "N") {		strDir = $("#DACARE_DirUpdated").val().trim();	}	else {		strDir = $("#DACARE_Dir").val().trim();	}		var strResult = "";	var strDir_array = strDir.split ("/");	strResult = DACARE_GetDOByDir(strDir_array.join ("/"));	var intLoopLimit = 0;		while (strResult == "" && strDir_array.length > 1 && intLoopLimit < 20) {		strDir_array.splice (strDir_array.length-1, 1);		strResult = DACARE_GetDOByDir(strDir_array.join ("/"));		intLoopLimit++;	}		if (intLoopLimit == 20) alert ("Looping limit has been reached");	return (strResult);}// Get Donneur d'ordrefunction DACARE_GetDOByDir(strDir_prm) {	var URL = window.location.href;	var Proto = URL.substring(0, URL.indexOf("://"));	var Domain = URL.substring(URL.indexOf("://") + 3, URL.length);	Domain = Domain.substring(0, Domain.indexOf("/"));		var strDir;	//Replace slash by html encoding	strDir = strDir_prm.replace (/\//g, "%2F");	//Add dashes as a workaround to the fact that the RestrictToCategory works in Partial Match mode	strDir = "-" + strDir + "-";		var strAjaxUrl = Proto + "://" + Domain + "/" + $("#ParamDB_Path").val();	strAjaxUrl += "/v_DACARE_DO_LookUp?ReadViewEntries&RestrictToCategory=";	strAjaxUrl += strDir;		var strResult = "";		$.ajax({		url: strAjaxUrl,		async: false,		cache: false,		type: 'GET',		dataType: 'xml',		timeout: 30000,		// Echec de la requête		error: function() {			alert(l_Forms_Err_AJAX);		},		// Réussite de la requête, lecture du XML, construction des options		success: function(xml) {						if ($(xml).find("viewentry").length < 1) {				strResult = "";			}						//In theory there will be just 1 result.			$(xml).find("viewentry").each(function() {				strResult = $(this).find("entrydata[name='DACARE_DO_Name']").find("text").text().trim();							});		}	});	return (strResult);}