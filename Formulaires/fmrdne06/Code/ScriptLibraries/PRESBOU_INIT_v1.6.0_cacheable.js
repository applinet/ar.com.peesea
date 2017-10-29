// Namespace
var PRESBOU = PRESBOU || {};
PRESBOU.actions = PRESBOU.actions || {};
PRESBOU.fields = PRESBOU.fields || {};
PRESBOU.utils = PRESBOU.utils || {};


// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 

	// Tri des pays et sites
	fmr.ui.sortDropdownByText(document.getElementById("PRESBOU_Country"))
	fmr.ui.sortDropdownByText(document.getElementById("PRESBOU_Site"))

	// Chargement des concessionnaires
	PRESBOU.fields.dealers.dlvr.change();
	PRESBOU.fields.dealers.fctrt.change();

	// Chargement des prestations
	PRESBOU.utils.prestations.load();

});


// Soumission
PRESBOU.actions.submit = function() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Pays
	if($("#PRESBOU_Country").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Country", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Country + "\" !"); return false; }

	// Site
	if($("#PRESBOU_Site").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Site", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Site + "\" !"); return false; }

	// Marché, existant
	if($("#PRESBOU_Marche").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Marche", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Marche + "\" !"); return false; }
	if(!PRESBOU.fields.marche.validate()) { DisplayErrMsgOnField("PRESBOU_Marche", l_PRESBOU_Marche_ErrDoesntExists); return false; }

	// CAF
	if($("#PRESBOU_CAF").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_CAF", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_CAF + "\" !"); return false; }

	// Date de livraison PDV
	var strTmp = $("#PRESBOU_PDVDeliveryDate").val().trim();
	if(strTmp == "") { DisplayErrMsgOnField("PRESBOU_PDVDeliveryDate", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_PDVDeliveryDate + "\" !"); return false; }
	var DateFormat = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;
	if(!DateFormat.test(strTmp)) { DisplayErrMsgOnField("PRESBOU_PDVDeliveryDate", l_Forms_Err_DateFormat); return false; }
	var datePDVDelivery = new Date(strTmp.substr(6, 4), Number(strTmp.substr(3, 2)) - 1, strTmp.substr(0, 2), 0, 0, 0);

	var dateMin = new Date();
	dateMin.setHours(0); dateMin.setMinutes(0); dateMin.setSeconds(0, 0);
	var dateMax = new Date();
	dateMax = dateMax.adjustYear(1);
	dateMax.setHours(0); dateMax.setMinutes(0); dateMax.setSeconds(0, 0);
	if((datePDVDelivery < dateMin) || (datePDVDelivery > dateMax)) { DisplayErrMsgOnField("PRESBOU_PDVDeliveryDate", l_PRESBOU_PDVDeliveryDate_ErrWrongDate); return false; }


	// Silhouette
	if($("#PRESBOU_Silhouette").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Silhouette", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Silhouette + "\" !"); return false; }

	// Version
	if($("#PRESBOU_Version").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Version", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Version + "\" !"); return false; }


	// Code FRR client livraison
	var strFRRCode = $("#PRESBOU_DlvrDealer_FRRCode").val().trim();
	if(strFRRCode == "") { DisplayErrMsgOnField("PRESBOU_DlvrDealer_FRRCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_DlvrDealer_FRRCode + "\" !"); return false; }
	
	// Code adresse livraison
	var strAdrCode = $("#PRESBOU_DlvrDealer_AdrCode").val().trim(); 
	if(strAdrCode == "") { DisplayErrMsgOnField("PRESBOU_DlvrDealer_AdrCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_DlvrDealer_AdrCode + "\" !"); return false; }

	// Existance du concessionnaire livraison
	if(!PRESBOU.utils.dealer.validate(strFRRCode, strAdrCode)) { DisplayErrMsgOnField("PRESBOU_DlvrDealer_FRRCode", l_PRESBOU_DlvrDealer_ErrDoesntExists); return false; }


	// Code FRR client facturation
	strFRRCode = $("#PRESBOU_FctrtDealer_FRRCode").val().trim();
	if(strFRRCode == "") { DisplayErrMsgOnField("PRESBOU_FctrtDealer_FRRCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_FctrtDealer_FRRCode + "\" !"); return false; }

	// Code adresse facturation
	strAdrCode = $("#PRESBOU_FctrtDealer_AdrCode").val().trim();
	if(strAdrCode == "") { DisplayErrMsgOnField("PRESBOU_FctrtDealer_AdrCode", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_FctrtDealer_AdrCode + "\" !"); return false; }

	// Existance du concessionnaire livraison
	if(!PRESBOU.utils.dealer.validate(strFRRCode, strAdrCode)) { DisplayErrMsgOnField("PRESBOU_FctrtDealer_FRRCode", l_PRESBOU_FctrtDealer_ErrDoesntExists); return false; }


	// Comments
	if($("#PRESBOU_Comments").val().trim() == "") { DisplayErrMsgOnField("PRESBOU_Comments", l_Forms_Err_ChampObligatoire + "\"" + l_PRESBOU_Comments + "\" !"); return false; }


	// Pas de prestations existantes
	if(PRESBOU.fields.prestationRef.available.length == 0) { DisplayErrMsgOnField("PRESBOU_Country", l_PRESBOU_Prestations_ErrNothingFound); return false; }

	// Au moins une prestation choisie
	var boolTmp = false
	$("select[name=PRESBOU_Prestations_Ref]").each(function() {
		if($(this).val().trim() != "") {
			boolTmp = true;
			return false;
		}
	});
	if(!boolTmp) { DisplayErrMsgOnField("PRESBOU_Country", l_PRESBOU_Prestations_ErrAtLeastOne); return false; }
		

	// Soumission
	fmr.document.submit();
};

// Calendrier "Date"
PRESBOU.fields.pdvDeliveryDate = PRESBOU.fields.pdvDeliveryDate || {};
PRESBOU.fields.pdvDeliveryDate.datePicker = function(caller) {

	// Nom du champ
	if(caller.tagName.toUpperCase() == "IMG")
		var strFieldName = $(caller).parents("td").find("input").attr("id");
	else
		var strFieldName = caller.id;
	
	// Minimum, date du jour
	var dateMin = new Date();
	dateMin.setTime(dateMin.getTime() - 24*60*60*1000);
	
	// Maximum, date du jour + 1an
	var dateMax = new Date();
	dateMax.setTime(dateMax.getTime() + 24*60*60*1000);
	dateMax = dateMax.adjustYear(1);
	
	// Calendrier
	calendrier_heure.hidePopup();
	calendrier_datejou.hidePopup();
	calendrier_datejou.disabledDatesExpression = "";
	calendrier_datejou.addDisabledDates(null, (dateMin.getMonth() + 1).toString().padLeft("0", 2) + "/" + dateMin.getDate().toString().padLeft("0", 2) + "/" + dateMin.getFullYear());
	calendrier_datejou.addDisabledDates((dateMax.getMonth() + 1).toString().padLeft("0", 2) + "/" + dateMax.getDate().toString().padLeft("0", 2) + "/" + dateMax.getFullYear(), null);
	calendrier_datejou.select(document.getElementById(strFieldName), strFieldName, "dd/MM/yyyy");
}

// Validation de l'existance d'un marché
PRESBOU.fields.marche = PRESBOU.fields.marche || {};
PRESBOU.fields.marche.validate = function() {
	var strCountry = $("#PRESBOU_Country").val().toLowerCase();
	if(strCountry == "") return false;
	var strSite = $("#PRESBOU_Site").val().toLowerCase();
	if(strSite == "") return false;
	var strMarche = $("#PRESBOU_Marche").val().toLowerCase();
	if(strMarche == "") return false;
	
	var strKey = strCountry + "§" + strSite + "§" + strMarche;
	var boolTmp = false;
	$.ajax({
		url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Marche_Lookup_ForForm?ReadViewEntries&StartKey=" + strKey + "&Count=1",
		type: 'GET', dataType: 'xml', cache: false, timeout: 30000, async: false,

		// Echec de la requête
		error: function() {
			alert(l_Forms_Err_AJAX);
		},

		// Réussite de la requête
		success: function(xml) {
			var jqoTmp = $(xml).find("entrydata[name=Key]");
			if(jqoTmp.length != 0) {
				if(jqoTmp.text().trim().toLowerCase() == strKey) boolTmp = true; 
			}
		}
	});
	return boolTmp;
};

// Choix d'un concessionnaire pour livraison
PRESBOU.fields.dealers = PRESBOU.fields.dealers || {}; 
PRESBOU.fields.dealers.dlvr = PRESBOU.fields.dealers.dlvr || {} 
PRESBOU.fields.dealers.dlvr.change = function() {

	// Code FRR
	var strFRRCode = $("#PRESBOU_DlvrDealer_FRRCode").val().trim();
	if(strFRRCode == "") return;
	
	// Code Adresse
	var strAdrCode = $("#PRESBOU_DlvrDealer_AdrCode").val().trim();
	if(strAdrCode == "") return;

	// Chargement des infos du concessionnaire  
	PRESBOU.utils.dealer.getInfos({
		frrCode: strFRRCode,
		adrCode: strAdrCode,
		success: function(oDealer) {
			$("#PRESBOU_DlvrDealer_Name").val(oDealer.name);
			$("#PRESBOU_DlvrDealer_Name_Cell").html(oDealer.name);
			$("#PRESBOU_DlvrDealer_City").val(oDealer.city);
			$("#PRESBOU_DlvrDealer_City_Cell").html(oDealer.city);
		},
		failure: function() {
			$("#PRESBOU_DlvrDealer_Name").val("");
			$("#PRESBOU_DlvrDealer_Name_Cell").html("");
			$("#PRESBOU_DlvrDealer_City").val("");
			$("#PRESBOU_DlvrDealer_City_Cell").html("");
		}
	});
};

// Choix d'un concessionnaire pour facturation
PRESBOU.fields.dealers.fctrt = PRESBOU.fields.dealers.fctrt || {} 
PRESBOU.fields.dealers.fctrt.change = function() {

	// Code FRR
	var strFRRCode = $("#PRESBOU_FctrtDealer_FRRCode").val().trim();
	if(strFRRCode == "") return;
	
	// Code Adresse
	var strAdrCode = $("#PRESBOU_FctrtDealer_AdrCode").val().trim();
	if(strAdrCode == "") return;

	// Chargement des infos du concessionnaire  
	PRESBOU.utils.dealer.getInfos({
		frrCode: strFRRCode,
		adrCode: strAdrCode,
		success: function(oDealer) {
			$("#PRESBOU_FctrtDealer_Name").val(oDealer.name);
			$("#PRESBOU_FctrtDealer_Name_Cell").html(oDealer.name);
			$("#PRESBOU_FctrtDealer_City").val(oDealer.city);
			$("#PRESBOU_FctrtDealer_City_Cell").html(oDealer.city);
		},
		failure: function() {
			$("#PRESBOU_FctrtDealer_Name").val("");
			$("#PRESBOU_FctrtDealer_Name_Cell").html("");
			$("#PRESBOU_FctrtDealer_City").val("");
			$("#PRESBOU_FctrtDealer_City_Cell").html("");
		}
	});
};

// Chargement des informations d'un concessionnaire
// En options: frrCode, adrCode, success(), failure()
PRESBOU.utils.dealer = PRESBOU.utils.dealer || {};
PRESBOU.utils.dealer.getInfos = function(options) {
	if(!options || (typeof options != "object")) return false; 

	// Paramètre incorrects
	if(!options.frrCode || (typeof options.frrCode != "string") || options.frrCode == "" ||
	   !options.adrCode || (typeof options.adrCode != "string") || options.adrCode == "") {
	
		// Callback d'échec
		if(options.failure && (typeof options.failure == "function")) options.failure();
	}
	else {
	
		// Requète AJAX	
		var strKey = options.frrCode.trim().toLowerCase() + "§" + options.adrCode.trim().toLowerCase(); 
		$.ajax({
			url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Dealer_Lookup_ForForm?ReadViewEntries&StartKey=" + strKey + "&Count=1",
			type: 'GET', dataType: 'xml', cache: false, timeout: 30000,

			// Echec de la requête
			error: function() {
				alert(l_Forms_Err_AJAX);

				// Callback d'échec
				if(options.failure && (typeof options.failure == "function")) options.failure();
			},

			// Réussite de la requête
			success: function(xml) {
			
				// Un concessionnaire est retourné
				var boolSuccess = false;
				if($(xml).find("viewentry").length > 0) {
			
					// Si il correspond à la clé
					var jqoTmp = $(xml).find("entrydata[name='Key'] text");
					if((jqoTmp.length > 0) && (jqoTmp.eq(0).text().trim().toLowerCase() == strKey)) {
						
						// Construction d'un objet représentant le concessionnaire
						var oTmp = {};
						jqoTmp = $(xml).find("entrydata[name='Name'] text");
						if(jqoTmp.length > 0) oTmp.name = jqoTmp.eq(0).text()
						jqoTmp = $(xml).find("entrydata[name='City'] text");
						if(jqoTmp.length > 0) oTmp.city = jqoTmp.eq(0).text()

						// Callback de réussite
						boolSuccess = true;
						if(options.success && (typeof options.success == "function")) options.success(oTmp);
					}
				}
				 
				// Callback d'échec
				if(!boolSuccess && options.failure && (typeof options.failure == "function")) options.failure();
			}
		});
	}
};

// Validation de l'existance d'un concessionnaire
PRESBOU.utils.dealer.validate = function(strFRRCode, strAdrCode) {

	// Vérification des paramètres
	if(!strFRRCode || (typeof strFRRCode != "string")) return false;
	strFRRCode = strFRRCode.trim().toLowerCase();
	if(strFRRCode == "") return false;
	
	if(!strAdrCode || (typeof strAdrCode != "string")) return false;
	strAdrCode = strAdrCode.trim().toLowerCase();
	if(strAdrCode == "") return false;

	
	// Requète AJAX	
	var strKey = strFRRCode + "§" + strAdrCode; 
	var boolReturn = false;
	$.ajax({
		url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Dealer_Lookup_ForForm?ReadViewEntries&StartKey=" + strKey + "&Count=1",
		type: 'GET', dataType: 'xml', cache: false, timeout: 30000, async: false,

		// Echec de la requête
		error: function() {
			alert(l_Forms_Err_AJAX);
		},

		// Réussite de la requête
		success: function(xml) {
			
			// Un concessionnaire est retourné, et correspond à la clé
			var jqoTmp = $(xml).find("entrydata[name='Key'] text");
			if((jqoTmp.length > 0) && (jqoTmp.eq(0).text().trim().toLowerCase() == strKey)) boolReturn = true;
		}
	});
	return boolReturn;					
};

// Chargement des prestations pour des pays, site, marché et silhouette
PRESBOU.utils.prestations = PRESBOU.utils.prestations || {}; 
PRESBOU.utils.prestations.load = function() {

	// Masquage du tableau des prestations
	var hidePrestationsTable = function() {

		// Mise à niveau du Namespace
		PRESBOU.fields.prestationRef = PRESBOU.fields.prestationRef || {};
		PRESBOU.fields.prestationRef.available = {length: 0};

		// Boucle sur les listes déroulantes
		$("select[name=PRESBOU_Prestations_Ref]").each(function() {
			$(this).html("");
		});

		// Masquage du tableau des prestations
		$("#PRESBOU_Prestations").parents("tr").eq(0).hide().prev().hide();
	};


	// Pays, site, marché et silhouette
	var strCountry = $("#PRESBOU_Country").val().trim();
	var strSite = $("#PRESBOU_Site").val().trim();
	var strMarche = $("#PRESBOU_Marche").val().trim();
	var strSilhouette = $("#PRESBOU_Silhouette").val().trim();

	// Si il manque des informations, on masque le tableau des prestations
	if(strCountry == "" || strSite == "" || strMarche == "" || strSilhouette == "") {
		hidePrestationsTable();
		return;
	}


	// Requete AJAX
	var strKey = (strCountry + "§" + strSite + "§" + strMarche + "§" + strSilhouette).toLowerCase();
	$.ajax({
		url: window.location.protocol + "//" + window.location.hostname + "/" + $("#ParamDB_Path").val() + "/v_PRESBOU_Prestation_Lookup_ForForm?ReadViewEntries&RestrictToCategory=" + strKey + "&Count=1000",
		type: 'GET', dataType: 'xml', cache: false, timeout: 30000,

		// Echec de la requête
		error: function() {
			alert(l_Forms_Err_AJAX);
			hidePrestationsTable();
		},

		// Réussite de la requête
		success: function(xml) {

			// Des prestations sont retournés
			var jqoTmp = $(xml).find("viewentry");
			if(jqoTmp.length > 0) {

				// Mise à niveau de Namespace
				PRESBOU.fields.prestationRef = PRESBOU.fields.prestationRef || {};
				PRESBOU.fields.prestationRef.available = {length: 0};
				PRESBOU.fields.prestationRef.selected = PRESBOU.fields.prestationRef.selected || [];

				// Boucle sur les prestations
				var strOptions = "<option></option>";
				var strLabel, strRef, strTempsIndi, strPrice1, strPrice2;
				jqoTmp.each(function() {
					
					// Récupération des données
					strLabel = $(this).find("entrydata[name=Label]").find("text").text().trim();
					strRef = $(this).find("entrydata[name=Ref]").find("text").text().trim().toUpperCase();
					strTempsIndi = $(this).find("entrydata[name=TempsIndi]").find("text").text();
					strPrice1 = $(this).find("entrydata[name=Price1]").find("text").text();
					strPrice2 = $(this).find("entrydata[name=Price2]").find("text").text();

					// Mise à niveau du Namespace
					PRESBOU.fields.prestationRef.available[strRef] = {label: strLabel, tempsIndi: strTempsIndi, price1: strPrice1, price2: strPrice2};
					PRESBOU.fields.prestationRef.available.length++;

					// Option
					strOptions = strOptions + "<option value=\"" + strRef + "\">" + strLabel + "</option>";										
				});

				// Bug IE7-9: le tableau n'est pas redimentionné à la taille des <select>
				// On corrige en re-ecrivant le html. Mais sur Firefox, le JavaScript dans thead est réexecut ce qui n'est pas souhaitable
				// Donc on limite au tbody
				var jqoTmp = $("#PRESBOU_Prestations").find("tbody");
				jqoTmp.html(jqoTmp.html());

				// Boucle sur les listes déroulantes
				$("select[name=PRESBOU_Prestations_Ref]").each(function(index) {

					// Ajout des options
					jqoTmp = $(this).html(strOptions);
					
					// Si la clé actuelle correspond à la clé du document, on est sur un modèle/brouillon, on tente de choisir la valeur enregistrée
					if((strKey == (PRESBOU.fields.country.value + "§" + PRESBOU.fields.site.value + "§" + PRESBOU.fields.marche.value + "§" + PRESBOU.fields.silhouette.value).toLowerCase()) && (PRESBOU.fields.prestationRef.selected[index] != undefined)) jqoTmp.val(PRESBOU.fields.prestationRef.selected[index]);											
					
					// Simulation du choix
					jqoTmp.change();				
				});
				
				// Affichage du tableau des prestations
				$("#PRESBOU_Prestations").parents("tr").eq(0).show();

			}
			// Pas de prestations retournées
			else {
				hidePrestationsTable();
			}
		}
	});	
};

// Choix d'une prestation
PRESBOU.fields.prestationRef = PRESBOU.fields.prestationRef || {}
PRESBOU.fields.prestationRef.change = function(caller) {
	var strRef = $(caller).val().trim().toUpperCase();
	
	// Addition des float avec précision
	// /!\ 0.1 + 0.2 = 0.30000000000000004
	function add(a, b, precision) {
	    var x = Math.pow(10, precision || 2);
    	return (Math.round(a * x) + Math.round(b * x)) / x;
	}
	
	// Formatage des décimales
	var formatPrice = function(price) {
		price = String(price).replace(/\./gi, ",");
		if(price.indexOf(",") == -1) {
			price = price + ",00";			
		}
		else if(price.strRight(",").length == 1){
			price = price + "0";
		}
		return price;
	};
	
	// Valeur choisie
	if(strRef != "") {
		var oTmp = PRESBOU.fields.prestationRef.available[strRef];
		if ($("#PRESBOU_DispTempsIndi").val () == "1") {
			$(caller).parents("td").eq(0).next().html(strRef).next().html(oTmp.tempsIndi).next().html(formatPrice(oTmp.price2));
		} else {
		  	$(caller).parents("td").eq(0).next().html(strRef).next().html(formatPrice(oTmp.price1)).next().html(formatPrice(oTmp.price2));
		}
	}
	// Pas de valeur
	else {
		$(caller).parents("td").eq(0).next().html("").next().html("").next().html("");
	}
	
	// Mise à jour des totaux
	// Boucle sur les lignes
	var totalTempsIndi = 0, totalPrice1 = 0, totalPrice2 = 0, jqoTmp, fTmp;
	$(caller).parents("tbody").eq(0).find("tr").each(function() {
		jqoTmp = $(this).find("td");
		if(jqoTmp.length >= 4) {
			if ($("#PRESBOU_DispTempsIndi").val () == "1") {
				fTmp = parseInt(jqoTmp.eq(2).text().replace(/,/gi, "."));
				if(!isNaN(fTmp)) totalTempsIndi = add(totalTempsIndi, fTmp, 2);
			} else {
				fTmp = parseFloat(jqoTmp.eq(2).text().replace(/,/gi, "."));
				if(!isNaN(fTmp)) totalPrice1 = add(totalPrice1, fTmp, 2);
			}
			
			fTmp = parseFloat(jqoTmp.eq(3).text().replace(/,/gi, "."));
			if(!isNaN(fTmp)) totalPrice2 = add(totalPrice2, fTmp, 2);
		}
	});
	
	// Ecriture dans le pied de tableau
	jqoTmp = $(caller).parents("table").eq(0).find("tfoot").find("td");
	if(jqoTmp.length >= 3) {
		if ($("#PRESBOU_DispTempsIndi").val () == "1") {
			jqoTmp.eq(1).html(totalTempsIndi);
		} else {
			jqoTmp.eq(1).html(formatPrice(totalPrice1));
		}
		jqoTmp.eq(2).html(formatPrice(totalPrice2));
	}
	
};