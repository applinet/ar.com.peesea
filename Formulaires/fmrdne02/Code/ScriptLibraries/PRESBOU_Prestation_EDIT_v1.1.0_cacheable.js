// A l'ouverture de la page
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });

	// Tri des pays et sites
	fmr.ui.sortDropdownByText(document.getElementById("PRESBOU_Country"))
	fmr.ui.sortDropdownByText(document.getElementById("PRESBOU_Site"))

	// Chargement de la liste des marchés
	PRESBOU_Marche_Populate();
});

// Chargement de la liste des marchés
function PRESBOU_Marche_Populate() {
	var strCountry = $("#PRESBOU_Country").val().trim().toUpperCase();
	var strSite = $("#PRESBOU_Site").val().trim().toUpperCase();

	// Pas de pays ou de site
	if(strCountry == "" || strSite == "") {
		$("#PRESBOU_Marche").empty().parents("tr").eq(0).hide();
		$("#PRESBOU_Prestation_NoMarcheFound").hide();
	}
	else {
	
		// Chargement des marchés pour le pays et le site
		$.ajax({
			url: window.location.href.strLeft(".nsf") + ".nsf/v_PRESBOU_Marche_Lookup_ByCountryNSite?ReadViewEntries&RestrictToCategory=" + strCountry + "§" + strSite + "&Count=1000",
			type: 'GET', dataType: 'xml', cache: false, timeout: 30000,

			// Echec de la requête
			error: function() {
				alert(l_Forms_Err_AJAX);
			},

			// Réussite de la requête
			success: function(xml) {
	
				// Des marché sont retournés
				var jqoTmp = $(xml).find("entrydata[name='Marche'] text");
				if(jqoTmp.length > 0) {

					// Boucle sur les marchés
					strHTML = "<option></option>";
					jqoTmp.each(function() {
						strTmp = $(this).text();
						strHTML += "<option value=\"" + strTmp + "\"" + (strTmp.trim().toLowerCase() == PRESBOU.marche.trim().toLowerCase() ? " selected" : "") + ">" + strTmp + "</option>";
					});
					$("#PRESBOU_Prestation_NoMarcheFound").hide();
					$("#PRESBOU_Marche").html(strHTML).show().parents("tr").eq(0).show();
				}
				else {
					$("#PRESBOU_Marche").empty().hide().parents("tr").eq(0).show();
					$("#PRESBOU_Prestation_NoMarcheFound").show();
				}
			}
		});	
	}
}

// Soumission
function PRESBOU_Submit() {
	if($("#PRESBOU_Country").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Country", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Country + "\" !"); return false; }
	if($("#PRESBOU_Site").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Site", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Site + "\" !"); return false; }
	if($("#PRESBOU_Marche").val() == null || $("#PRESBOU_Marche").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Marche", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Marche + "\" !"); return false; }
	if($("#PRESBOU_Silhouette").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Silhouette", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Silhouette + "\" !"); return false; }
	if($("#PRESBOU_Prestation_Label").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Prestation_Label", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Prestation_Label + "\" !"); return false; }
	if($("#PRESBOU_Prestation_Ref").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Prestation_Ref", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Prestation_Ref + "\" !"); return false; }
	if($("#PRESBOU_Prestation_Actions").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Prestation_Actions", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Prestation_Actions + "\" !"); return false; }
	if($("#PRESBOU_Prestation_CheckList").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Prestation_CheckList", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Prestation_CheckList + "\" !"); return false; }
	if($("#PRESBOU_Prestation_TempsIndi").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Prestation_TempsIndi", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Prestation_TempsIndi + "\" !"); return false; }
	if($("#PRESBOU_Prestation_Price1").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Prestation_Price1", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Prestation_Price1 + "\" !"); return false; }
	if($("#PRESBOU_Prestation_Price2").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Prestation_Price2", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Prestation_Price2 + "\" !"); return false; }
}