$(document).ready(function() {	// Définition des textareas redimentionnables	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });	// Simulation click sur avis	var jqoTmp = $("input[name='Forms_E10_Avis']:checked");	if(jqoTmp.length != 0)		jqoTmp.click();	else		DACARE_ToggleValidAvis(undefined);});	// Soumissionvar FormHasBeenSent = false;function DACARE_Submit() {	if(FormHasBeenSent) return false;	// Avis obligatoire	if($("input[name=Forms_E10_Avis]:checked").length < 1) { DisplayErrMsgOnField("Forms_E10_Avis", l_Forms_Err_AvisObligatoire); return false; }		// Validation	if($("input[name=Forms_E10_Avis]:checked").eq(0).val() == "1") {		// Périmètre de gestion		if($("#DACARE_PerimGest").val().trim() == "") { DisplayErrMsgOnField("DACARE_PerimGest", l_Forms_Err_ChampObligatoire + "\"" + l_DACARE_PerimGest + "\""); return false; }		// Confirmation		if(confirm(l_Conf_Submit)) {			FormHasBeenSent = true;			$("#f_ActionAFaire").val("Soumettre");			document.forms[0].submit();		}	}	// Refus	else if($("input[name=Forms_E10_Avis]:checked").eq(0).val() == "0") {		// Commentaire obligatoire		if(jQuery.trim($("#Forms_E10_Comments").val()) == "") { DisplayErrMsgOnField("Forms_E10_Comments", l_Forms_Err_CommentairesRefus); return false; }		// Confirmation		if(confirm(l_Conf_Submit)) {			FormHasBeenSent = true;			$("#f_ActionAFaire").val("Refuser");			document.forms[0].submit();		}	}	}// Avisfunction DACARE_ToggleValidAvis(pThis) {	var strHTML = "<img src=\"" + window.location.href.strLeft(".nsf") + ".nsf/mandatoryfield_cacheable.gif?OpenImageResource\" height=\"16\" width=\"16\" border=\"0\">"	if((pThis !== undefined) && (pThis.value == "0")) {		$("#Forms_E10_Comments").parents("tr").children("td").eq(0).html(strHTML);		$("#DACARE_PerimGest").parents("tr").children("td").eq(0).html("");	}	else {		$("#Forms_E10_Comments").parents("tr").children("td").eq(0).html("");		$("#DACARE_PerimGest").parents("tr").children("td").eq(0).html(strHTML);	}}