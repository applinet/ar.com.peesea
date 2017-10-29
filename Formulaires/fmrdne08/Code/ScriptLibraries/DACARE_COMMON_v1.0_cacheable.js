// Choix "Reprend les droits..."
function DACARE_InheritAccess_OnClick(pThis) {
	if((pThis !== undefined) && (pThis.value == "Y"))
		$("#DACARE_InheritFrom").parents("tr").show();
	else
		$("#DACARE_InheritFrom").parents("tr").hide();
}

// Choix du profil
function DACARE_Profil_OnChange(pThis) {
	$("#DACARE_Profil_Applis_View").empty();

	// Profil sélectionné, construction de la liste des applis
	var strProfil = $(pThis).val().trim().toUpperCase();
	if(strProfil != "") {
		$("#DACARE_Profil_Applis_AJAXLoader").show();

		var URL = window.location.href; 
		$.ajax({
			url: URL.strLeft("://") + "://" + URL.substring(URL.indexOf("://") + 3, URL.length).strLeft("/") + "/" + $("#ParamDB_Path").val() + "/DACARE_Applis_Lookup_ByProfil?OpenAgent&profil=" + strProfil,
			type: 'GET', dataType: 'xml', timeout: 30000, cache: false,
				
			// Echec de la requête
			error: function() {
				$("#DACARE_Profil_Applis_AJAXLoader").hide();
				alert(l_Forms_Err_AJAX);
			},

			// Réussite de la requête
			success: function(xml) {
			
				// Si on trouve des applications			
				var jqoTmp = $(xml).find("app label");
				if(jqoTmp.length != 0) {

					// Ouverture de la liste
					var strHTML = "<ul class=\"NoBullets\">";

					jqoTmp.each(function() {
						strHTML += "<li><span class=\"Bullet\">&#149;</span>" + $(this).text() + "</li>";
					});

					// Fermeture de la liste et écriture du HTML
					strHTML += "</ul>";
					$("#DACARE_Profil_Applis_View").html(strHTML);
				}
				$("#DACARE_Profil_Applis_AJAXLoader").hide();
			}
		});
	}
}