$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });
	
	// Si il n'y a pas de sites, affichage d'un bloc vide
	if(arrSitesDistants.length == 0) {
		VLIVE_BuildSiteBlock(null, true, true);
	}
});
	
// Soumission
var FormHasBeenSent = false;
function VLIVE_Submit() {
	if(FormHasBeenSent) return false;
	
	// Information sites distants
	var boolUnSite = false
	var boolContinue = false
	$("table.VLIVE_Sites").each(function() {
		boolContinue = false
		
		// Indice du site
		var strTemp = $(this).attr("id");
		var intIndex = Number(strTemp.substring(strTemp.lastIndexOf("_") + 1, strTemp.length));
		
		// Colonne « Sites distants » vides
		if(!boolUnSite) { 
			if ( (jQuery.trim($(this).find("select[name='VLIVE_SitesSite']").val()) == "") && (jQuery.trim($(this).find("input[name='VLIVE_SitesNombre']").val()) == "") && (jQuery.trim($(this).find("input[name='VLIVE_SitesCorrespondants']").val()) == "")) {
				DisplayErrMsgOnField("VLIVE_SitesSite_" + intIndex, l_VLIVE_E4_ErrSitesDistantsVides); return false;
			} else {boolUnSite = true}
		}

		// Sites distants nom
		if(jQuery.trim($(this).find("select[name='VLIVE_SitesSite']").val()) == "") { DisplayErrMsgOnField("VLIVE_SitesSite_" + intIndex, l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_E4_SitesDistants + "\""); return false; }
		
		// Nombre de personnes à suivre l’événement depuis le site
		if(jQuery.trim($(this).find("input[name='VLIVE_SitesNombre']").val()) == "") { DisplayErrMsgOnField("VLIVE_SitesNombre_" + intIndex, l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_E4_NombrePersonnes + "\""); return false; }

		// Correspondants
		if(jQuery.trim($("#VLIVE_SitesCorrespondants_" + intIndex).val()) == "") { DisplayErrMsgOnField("VLIVE_SitesCorrespondants_" + intIndex, l_Forms_Err_ChampObligatoire + "\"" + l_VLIVE_E4_Correspondants + "\""); return false; }

		// Si on arrive ici, on peut continuer les vérifications
		boolContinue = true;

	});
		if(!boolUnSite || !boolContinue) { return false; }

	
	// Confirmation
	if(confirm(l_Conf_Submit)) {
		VLIVE_MemorizeSites()
		FormHasBeenSent = true;
		$("#f_ActionAFaire").val("Soumettre");
		document.forms[0].submit();
	}
}

// Suppression d'un bloc de ressource
function VLIVE_RemoveSiteBlock(pThis) {

	// Bloc supprimé, et son indice	
	var jQueryObjectTemp = $(pThis).parents("table.VLIVE_Sites").eq(0);
	var strTemp = jQueryObjectTemp.attr("id");
	var intIndex = Number(strTemp.substring(strTemp.lastIndexOf("_") + 1, strTemp.length));

	// Suppression du bloc
	jQueryObjectTemp.remove();
	
	// Si il reste des blocs, réindexation des blocs
	var j = $("#VLIVE_E4_Sites table.VLIVE_Sites").length;
	if(j > 0) {
		for(var i = intIndex; i <= j; i++) {
			var jQueryObjectTemp = $("#VLIVE_Sites_" + (i+1));
			jQueryObjectTemp.attr("id", "VLIVE_Sites_" + i);
			jQueryObjectTemp.find("th span.text").html(l_VLIVE_E4_SitesNumberX + i);
			jQueryObjectTemp.find("select[name='VLIVE_SitesSite']").attr("id", "VLIVE_SitesSite_" + i);
			jQueryObjectTemp.find("input[name='VLIVE_SitesNombre']").attr("id", "VLIVE_SitesNombre_" + i);
			jQueryObjectTemp.find("input[name='VLIVE_SitesCorrespondants']").attr("id", "VLIVE_SitesCorrespondants_" + i);
		}
	}
	// Si il n'en reste plus, ajout d'un bloc vide
	else {
		VLIVE_BuildSiteBlock(null, true, true);
	}
}

// Enregistrement des données du tableau des sites dans les champs masqués
function VLIVE_MemorizeSites() {

	// Récupération des champs masqués
	var VLIVE_E4_SitesSites = 				$("#VLIVE_E4_SitesSites");
	var VLIVE_E4_SitesNombres = 			$("#VLIVE_E4_SitesNombres");
	var VLIVE_E4_SitesCorrespondantsList =	$("#VLIVE_E4_SitesCorrespondantsList");
	
	// RAZ des champs masqués
	VLIVE_E4_SitesSites.val("");
	VLIVE_E4_SitesNombres.val("");
	VLIVE_E4_SitesCorrespondantsList.val("");
		
	// Parcour des sites, le contenu de chaque ligne est ajouté dans les champs multi-valués
	// (séparateur "§", éclatement en listes dans les "Conversion d'entrée". L'utilisation du ";" n'est pas possible car cela ne conserve pas les valeurs vides)
	var boolFirst = true
	var strSeparator = "";
	var j = $("#VLIVE_E4_Sites table.VLIVE_Sites").length;
	for(var i = 1; i <= j; i++) {
		strSeparator = (i == boolFirst ? "" : "§");
		VLIVE_E4_SitesSites.val(VLIVE_E4_SitesSites.val() + strSeparator + Trim($("#VLIVE_SitesSite_" + i).val().toUpperCase()));
		VLIVE_E4_SitesNombres.val(VLIVE_E4_SitesNombres.val() + strSeparator + Trim($("#VLIVE_SitesNombre_" + i).val().toUpperCase()));
		VLIVE_E4_SitesCorrespondantsList.val(VLIVE_E4_SitesCorrespondantsList.val() + strSeparator + Trim($("#VLIVE_SitesCorrespondants_" + i).val()));
		
		boolFirst = false;
	}
}