$(document).ready(function() {	// Définition des textareas redimentionnables	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });});	// Soumissionvar FormHasBeenSent = false;function VLIVE_Submit() {	if(FormHasBeenSent) return false;	// Avis obligatoire	if($("input[name=Forms_E9_Avis]:checked").length < 1) { DisplayErrMsgOnField("Forms_E9_Avis", l_Forms_Err_AvisObligatoire); return false; }		// Validation	if($("input[name=Forms_E9_Avis]:checked").eq(0).val() == "1") {		// Confirmation		if(confirm(l_Conf_Submit)) {			FormHasBeenSent = true;			$("#f_ActionAFaire").val("Soumettre");			document.forms[0].submit();		}	}}