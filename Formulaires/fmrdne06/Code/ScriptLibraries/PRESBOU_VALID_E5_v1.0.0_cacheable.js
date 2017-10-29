// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 

	// Simulation click sur avis au rechargement
	var jqoTmp = $("input[name='Forms_E5_Avis']:checked");
	if(jqoTmp.length != 0) jqoTmp.click();

});

// Namespace
var PRESBOU = PRESBOU || {};
PRESBOU.actions = PRESBOU.actions || {};

// Soumission
PRESBOU.actions.submit = function() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Numéro de bordereau
	if($("#PRESBOU_SlipNumber").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_SlipNumber", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_SlipNumber + "\" !"); return false; }

	// Soumission
	fmr.document.submit();

};