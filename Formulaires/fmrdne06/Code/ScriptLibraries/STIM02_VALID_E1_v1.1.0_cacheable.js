// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 

	// Simulation click sur avis au rechargement
	var jqoTmp = $("input[name='Forms_E1_Avis']:checked");
	if(jqoTmp.length != 0) jqoTmp.click();

});

// Soumission
function STIM02_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Nom du protocol
	if($("#STIM02_ProtocolName").val().trim() == "") { DisplayErrMsgOnField("STIM02_ProtocolName", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_ProtocolName + "\" !"); return false; }

	// Avis obligatoire
	if($("input[name=Forms_E1_Avis]:checked").length < 1) { DisplayErrMsgOnField("Forms_E1_Avis", l_Forms_Err_AvisObligatoire); return false; }
	
	// Validation
	if($("input[name=Forms_E1_Avis]:checked").eq(0).val() == "1") {

		// Risques liés au protocol
		if($("#STIM02_ProtocolRisques").val().trim() == "") { DisplayErrMsgOnField("STIM02_ProtocolRisques", l_Forms_Err_ChampObligatoire + "\"" + l_STIM02_ProtocolRisques + "\" !"); return false; }

		// Confirmation
		if(confirm(l_Conf_Submit)) {
			fmr.document.hasBeenSent = true;
			$("#f_ActionAFaire").val("Soumettre");
			document.forms[0].submit();
		}
	}
	// Refus
	else if($("input[name=Forms_E1_Avis]:checked").eq(0).val() == "0") {

		// Commentaire obligatoire
		if($("#Forms_E1_Comments").val().trim() == "") { DisplayErrMsgOnField("Forms_E1_Comments", l_Forms_Err_CommentairesRefus); return false; }

		// Confirmation
		if(confirm(l_Conf_Submit)) {
			fmr.document.hasBeenSent = true;
			$("#f_ActionAFaire").val("Refuser");
			document.forms[0].submit();
		}
	}	
}