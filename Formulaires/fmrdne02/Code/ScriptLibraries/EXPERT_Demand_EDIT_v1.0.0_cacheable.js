// A l'ouverture de la page
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });

	// Tri des listes déroulantes
	fmr.ui.sortDropdownByText(document.getElementById("EXPERT_Demand_ExpertLevel"));
	fmr.ui.sortDropdownByText(document.getElementById("EXPERT_Demand_Sector"));

	// Chargement des domaines
	document.getElementById("EXPERT_Demand_Sector").onchange();

});

// Soumission
function EXPERT_Submit() {

	// Année
	var strTmp = document.getElementById("EXPERT_Demand_Year").value.trim();
	if(strTmp == "") { DisplayErrMsgOnField("EXPERT_Demand_Year", l_Forms_Err_ChampObligatoire + "\"" + l_EXPERT_Demand_Year + "\" !"); return false; }
	
	// Année numérique
	var ereg = /^20[0-9]{2}$/
	if(!ereg.test(strTmp)) { DisplayErrMsgOnField("EXPERT_Demand_Year", l_EXPERT_Demand_Year_ErrWrongFormat); return false; }
	
	// Année supérieure ou égale à l'année en cour
	var now = new Date();
	if(Number(strTmp) < now.getFullYear()) { DisplayErrMsgOnField("EXPERT_Demand_Year", l_EXPERT_Demand_Year_ErrWrongFormat); return false; }	

	// Titre
	var oTmp = document.getElementById("EXPERT_Demand_ExpertLevel");
	if(oTmp.options[oTmp.selectedIndex].value.trim() == "") { DisplayErrMsgOnField("EXPERT_Demand_ExpertLevel", l_Forms_Err_ChampObligatoire + "\"" + l_EXPERT_Demand_ExpertLevel + "\" !"); return false; }

	// Filière
	var oTmp = document.getElementById("EXPERT_Demand_Sector");
	if(oTmp.options[oTmp.selectedIndex].value.trim() == "") { DisplayErrMsgOnField("EXPERT_Demand_Sector", l_Forms_Err_ChampObligatoire + "\"" + l_EXPERT_Demand_Sector + "\" !"); return false; }

	// Domaine
	var oTmp = document.getElementById("EXPERT_Demand_Domain");
	if(oTmp.options[oTmp.selectedIndex].value.trim() == "") { DisplayErrMsgOnField("EXPERT_Demand_Domain", l_Forms_Err_ChampObligatoire + "\"" + l_EXPERT_Demand_Domain + "\" !"); return false; }

	// Sous domaine (uniquement si il y en a)
	var oTmp = document.getElementById("EXPERT_Demand_SubDomain");
	if(oTmp.options.length != 0) {
		if(oTmp.options[oTmp.selectedIndex].value.trim() == "") { DisplayErrMsgOnField("EXPERT_Demand_SubDomain", l_Forms_Err_ChampObligatoire + "\"" + l_EXPERT_Demand_SubDomain + "\" !"); return false; }
	}

	// Argumentaire
	if(document.getElementById("EXPERT_Demand_Label").value.trim() == "") { DisplayErrMsgOnField("EXPERT_Demand_Label", l_Forms_Err_ChampObligatoire + "\"" + l_EXPERT_Demand_Label + "\" !"); return false; }

}

// Choix d'une filière
function EXPERT_Demand_Sector_OnChange(pThis) {

	// URL de la base courante
	var strDBPath = window.location.href.strLeft(".nsf") + ".nsf";

	// Recherche de la ligne mère
	// TODO: a mettre dans fmr
	var findParentTR = function(oTmp) {
		while(oTmp.nodeName.toLowerCase() != "tr") {
			oTmp = oTmp.parentElement;
		}
		return oTmp;
	}

	// Liste déroulante des domaines
	var selectDomain = document.getElementById("EXPERT_Demand_Domain");
		
	// Si une filière est choisie
	var strSector = pThis.options[pThis.selectedIndex].value;
	if(strSector != "") {

		// Requete AJAX pour charger les domaines de la filière
		fmr.ajax({
			url: strDBPath + "/v_EXPERT_Domain_Lookup_BySector?ReadViewEntries&RestrictToCategory=" + strSector,
			type: "GET", async: true, cache: false,

			// Echec de la requète
			error: function() {
				alert(l_Forms_Err_AJAX);
			},

			// Réussite de la requète
			success: function(data) {
				var i, j, k, l, m, n;

				// Vidage de la liste déroulante
				for(i = 0, j = selectDomain.options.length; i < j; i++) {
					selectDomain.remove(0);
				}

				// Ajout d'une option vide
				selectDomain.add(new Option("", "", false, false));

				// Boucle sur les documents (i.e. "viewentry")
				var viewEntries = data.getElementsByTagName("viewentry");
				for(i = 0, j = viewEntries.length; i < j; i++) {
					
					// Code du domaine
					var strCode = viewEntries[i].getElementsByTagName("entrydata")[0].getElementsByTagName("text")[0].firstChild.nodeValue;

					// Ajout de l'option, sélection du domaine correspondant à celui du document (modèle/brouillon)
					selectDomain.options.add(new Option(EXPERT_Domain_Translations[strSector][strCode], strCode, false, (strSector == EXPERT_Demand_Sector) && (strCode == EXPERT_Demand_Domain)));
				}

				// Tri des options
				fmr.ui.sortDropdownByText(selectDomain);

				// Affichage de la ligne qui contient le champ
				findParentTR(selectDomain).style.display = "";
	
				// Chargement des sous domaines
				selectDomain.onchange();
			}
		});
	}
	// Aucune valeur choisie
	else {

		// Masquage des lignes "Domaine" et "Sous domaine"
		findParentTR(selectDomain).style.display = "none";
		findParentTR(document.getElementById("EXPERT_Demand_SubDomain")).style.display = "none";
	}
}

// Choix d'un domaine
function EXPERT_Demand_Domain_OnChange(pThis) {

	// URL de la base courante
	var strDBPath = window.location.href.strLeft(".nsf") + ".nsf";

	// Recherche de la ligne mère
	var findParentTR = function(oTmp) {
		while(oTmp.nodeName.toLowerCase() != "tr") {
			oTmp = oTmp.parentElement;
		}
		return oTmp;
	}

	// Liste déroulante des sous-domaines
	var selectSubDomain = document.getElementById("EXPERT_Demand_SubDomain");
		
	// Si un domaine est choisi
	var strDomain = pThis.options[pThis.selectedIndex].value;
	if(strDomain != "") {

		// Filière sélectionnée
		var oTmp = document.getElementById("EXPERT_Demand_Sector");
		var strSector = oTmp.options[oTmp.selectedIndex].value;

		// Requete AJAX pour charger les sous domaines du domaine
		fmr.ajax({
			url: strDBPath + "/v_EXPERT_SubDomain_Lookup_BySectorNDomain?ReadViewEntries&RestrictToCategory=" + strSector + "§" + strDomain,
			type: "GET", async: true, cache: false,

			// Echec de la requète
			error: function() {
				alert(l_Forms_Err_AJAX);
			},

			// Réussite de la requète
			success: function(data) {
				var i, j, k, l, m, n;

				// Vidage de la liste déroulante
				for(i = 0, j = selectSubDomain.options.length; i < j; i++) {
					selectSubDomain.remove(0);
				}

				// Si il y a des documents (i.e. "viewentry")
				var viewEntries = data.getElementsByTagName("viewentry");
				if(viewEntries.length != 0) {
				
					// Ajout d'une option vide
					selectSubDomain.add(new Option("", ""));

					// Boucle sur les documents (i.e. "viewentry")
					for(i = 0, j = viewEntries.length; i < j; i++) {
					
						// Code du sous domaine
						var strCode = viewEntries[i].getElementsByTagName("entrydata")[0].getElementsByTagName("text")[0].firstChild.nodeValue;

						// Ajout de l'option, sélection du sous domaine correspondant à celui du document (modèle/brouillon)
						selectSubDomain.options.add(new Option(EXPERT_SubDomain_Translations[strSector][strDomain][strCode], strCode, false, (strSector == EXPERT_Demand_Sector) && (strDomain == EXPERT_Demand_Domain) && (strCode == EXPERT_Demand_SubDomain)));
				
					}

					// Tri des options
					fmr.ui.sortDropdownByText(selectSubDomain);

					// Affichage de la ligne qui contient le champ
					findParentTR(selectSubDomain).style.display = "";

				}
				// Si il n'y a pas de documents
				else {
				
					// Masquage de la ligne qui contient le champ
					findParentTR(selectSubDomain).style.display = "none";
					for(i = 0, j = selectSubDomain.options.length; i < j; i++) {
						selectSubDomain.remove(0);
					}
					selectSubDomain.add(new Option("", "-", false, true));

				}
			}
		});
	}
	// Aucune valeur choisie
	else {

		// Masquage de la ligne qui contient le champ
		findParentTR(selectSubDomain).style.display = "none";
		for(i = 0, j = selectSubDomain.options.length; i < j; i++) {
			selectSubDomain.remove(0);
		}
		selectSubDomain.add(new Option("", "-", false, true));
	}
}