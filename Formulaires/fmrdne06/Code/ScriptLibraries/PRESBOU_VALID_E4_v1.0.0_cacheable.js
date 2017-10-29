// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 

	// Simulation click sur avis au rechargement
	var jqoTmp = $("input[name='Forms_E4_Avis']:checked");
	if(jqoTmp.length != 0) jqoTmp.click();

});

// Namespace
var PRESBOU = PRESBOU || {};
PRESBOU.actions = PRESBOU.actions || {};

// Soumission
PRESBOU.actions.submit = function() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Numéro de facture
	if($("#PRESBOU_BillNumber").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_BillNumber", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_BillNumber + "\" !"); return false; }

	// Soumission
	fmr.document.submit();
};