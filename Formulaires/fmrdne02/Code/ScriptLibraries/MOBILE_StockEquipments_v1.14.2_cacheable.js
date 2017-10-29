// Création de la popup "Nouvel équipement"
function MOBILE_NewEquipmentDialog_CreateDialog() {
	var strDBPath = window.location.href.strLeft(".nsf") + ".nsf";
	
	// Construction de la popup "Nouvel équipement"
	var strHTML = "<form id=\"MOBILE_NewEquipment_Form\" style=\"margin: 0px; padding: 0px;\" action=\"" + strDBPath + "/m_MOBILE_NewEquipment?CreateDocument\" method=\"post\" enctype=\"multipart/form-data\">";
	strHTML += "<table style=\"width: 100%;\" border=\"0\" cellspacing=\"2\">";
	strHTML += "<colgroup><col width=\"16\"><col width=\"80\"><col width=\"*\"></colgroup>";

	// Type d'équipement
	var strTemp = "<option></option>";
	if(MOBILE_Infra != "M12") strTemp += "<option value=\"MODEM3G\">" + l_MOBILE_StockEquipments_Type_Modem3G + "</option>";
	strTemp += "<option value=\"PHONE\">" + l_MOBILE_StockEquipments_Type_Phone + "</option>";
	strTemp += "<option value=\"SIM\">" + l_MOBILE_StockEquipments_Type_SIM + "</option>";
	strHTML += "<tr><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_NewEquipmentDialog_Type +"</td><td><select id=\"MOBILE_Equipment_Type\" name=\"MOBILE_Equipment_Type\" onChange=\"MOBILE_Equipment_Type_OnChange(this);\">" + strTemp + "</select></td></tr>";

	// Pays
	strHTML += "<tr><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_Country + "</td><td><select id=\"MOBILE_Country\" name=\"MOBILE_Country\" onChange=\"MOBILE_Country_OnChange(this);\"></select></td></tr>"
	
	// FlotteID
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_FlotteID + "</td><td><select id=\"MOBILE_FlotteID\" name=\"MOBILE_FlotteID\"></select></td></tr>"

	// Site
	strHTML += "<tr><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_Site + "</td><td><select id=\"MOBILE_Site\" name=\"MOBILE_Site\" onChange=\"MOBILE_Site_OnChange();\"></select></td></tr>"

	// Site transcodifié
	strHTML += "<tr style=\"display: none;\"><td></td><td class=\"FieldLegend\"></td><td><select id=\"MOBILE_TrueSite\" name=\"MOBILE_TrueSite\"></select></td></tr>"

	// Type de téléphone
	strTemp = "<input type=\"radio\" value=\"GSM\" name=\"MOBILE_Phone_Type\" id=\"MOBILE_Phone_Type_GSM\" onClick=\"MOBILE_Phone_Type_OnClick(this);\"><label for=\"MOBILE_Phone_Type_GSM\">" + l_MOBILE_Phone_Type_GSM + "</label>";
	strTemp += "<input type=\"radio\" value=\"SMARTPHONE\" name=\"MOBILE_Phone_Type\" id=\"MOBILE_Phone_Type_SMARTPHONE\" onClick=\"MOBILE_Phone_Type_OnClick(this);\"><label for=\"MOBILE_Phone_Type_SMARTPHONE\">" + l_MOBILE_Phone_Type_Smartphone + "</label>";
	strTemp += "<input type=\"radio\" value=\"AUTRE\" name=\"MOBILE_Phone_Type\" id=\"MOBILE_Phone_Type_AUTRE\" onClick=\"MOBILE_Phone_Type_OnClick(this);\"><label for=\"MOBILE_Phone_Type_AUTRE\">" + l_MOBILE_Phone_Type_Autre + "</label>";
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_Phone_Type +"</td><td>" + strTemp + "</td></tr>";

	// IMEI
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\" id=\"MOBILE_IMEI_MandatoryImg\"></td><td class=\"FieldLegend\">" + l_MOBILE_IMEI +"</td><td><input id=\"MOBILE_IMEI\" name=\"MOBILE_IMEI\" maxlength=\"15\" size=\"17\"></td></tr>";

	// Modèle de smartphone
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_SmartphoneModel +"</td><td><select id=\"MOBILE_SmartphoneModel\" name=\"MOBILE_SmartphoneModel\"></select></td></tr>";
	
	// Modèle de modem 3G
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_Modem3GModel +"</td><td><select id=\"MOBILE_Modem3GModel\" name=\"MOBILE_Modem3GModel\"></select></td></tr>";

	// Libellé du téléphone 
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_Phone_Label +"</td><td><input id=\"MOBILE_Phone_Label\" name=\"MOBILE_Phone_Label\"></td></tr>";

	// Type de SIM
	if(MOBILE_Infra == "M12") {
		strTemp = "<input type=\"radio\" value=\"SIMPHONE\" name=\"MOBILE_SIM_Type\" id=\"MOBILE_SIM_Type_SIMPHONE\" onClick=\"MOBILE_SIM_Type_OnClick(this);\" checked=\"checked\"><label for=\"MOBILE_SIM_Type_SIMPHONE\">" + l_MOBILE_SIM_Type_SIMPHONE + "</label>";
	}
	else {
		strTemp = "<input type=\"radio\" value=\"SIM3G\" name=\"MOBILE_SIM_Type\" id=\"MOBILE_SIM_Type_SIM3G\" onClick=\"MOBILE_SIM_Type_OnClick(this);\"><label for=\"MOBILE_SIM_Type_SIM3G\">" + l_MOBILE_SIM_Type_SIM3G + "</label>";
		strTemp += "<input type=\"radio\" value=\"MICROSIM3G\" name=\"MOBILE_SIM_Type\" id=\"MOBILE_SIM_Type_MICROSIM3G\" onClick=\"MOBILE_SIM_Type_OnClick(this);\"><label for=\"MOBILE_SIM_Type_MICROSIM3G\">" + l_MOBILE_SIM_Type_MICROSIM3G + "</label>";
		strTemp += "<input type=\"radio\" value=\"SIMPHONE\" name=\"MOBILE_SIM_Type\" id=\"MOBILE_SIM_Type_SIMPHONE\" onClick=\"MOBILE_SIM_Type_OnClick(this);\"><label for=\"MOBILE_SIM_Type_SIMPHONE\">" + l_MOBILE_SIM_Type_SIMPHONE + "</label>";
	}
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_SIM_Type +"</td><td>" + strTemp + "</td></tr>";
	
	// Option Smartphone
	strTemp = "<input type=\"radio\" value=\"Y\" name=\"MOBILE_SIM_Smartphone\" id=\"MOBILE_SIM_Smartphone_Y\" onClick=\"MOBILE_SIM_Smartphone_OnClick(this);\"><label for=\"MOBILE_SIM_Smartphone_Y\">" + l_YesLong + "</label>";
	strTemp += "<input type=\"radio\" value=\"N\" name=\"MOBILE_SIM_Smartphone\" id=\"MOBILE_SIM_Smartphone_N\" onClick=\"MOBILE_SIM_Smartphone_OnClick(this);\"><label for=\"MOBILE_SIM_Smartphone_N\">" + l_NoLong + "</label>";
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_SIM_Smartphone +"</td><td>" + strTemp + "</td></tr>";

	// USIM
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_USIM +"</td><td><input id=\"MOBILE_USIM\" name=\"MOBILE_USIM\" maxlength=\"20\" size=\"22\"></td></tr>";

	// N° de téléphone
	strHTML += "<tr style=\"display: none;\"><td><img src=\"/icons/ecblank.gif\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_SIM_PhoneNumber +"</td><td><input id=\"MOBILE_SIM_PhoneNumber\" name=\"MOBILE_SIM_PhoneNumber\"></td></tr>";

	// PUK
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_PUK +"</td><td><input id=\"MOBILE_PUK\" name=\"MOBILE_PUK\"></td></tr>";

	// Roaming
	strTemp = "<input type=\"radio\" value=\"Y\" name=\"MOBILE_SIM_Roaming\" id=\"MOBILE_SIM_Roaming_Y\"><label for=\"MOBILE_SIM_Roaming_Y\">" + l_YesLong + "</label>";
	strTemp += "<input type=\"radio\" value=\"N\" name=\"MOBILE_SIM_Roaming\" id=\"MOBILE_SIM_Roaming_N\"><label for=\"MOBILE_SIM_Roaming_N\">" + l_NoLong + "</label>";
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_SIM_Roaming +"</td><td>" + strTemp + "</td></tr>";

	// Tethering (désactivé temporairement)
	/*
	strTemp = "<input type=\"radio\" value=\"Y\" name=\"MOBILE_SIM_Tethering\" id=\"MOBILE_SIM_Tethering_Y\"><label for=\"MOBILE_SIM_Tethering_Y\">" + l_YesLong + "</label>";
	strTemp += "<input type=\"radio\" value=\"N\" name=\"MOBILE_SIM_Tethering\" id=\"MOBILE_SIM_Tethering_N\"><label for=\"MOBILE_SIM_Tethering_N\">" + l_NoLong + "</label>";
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_SIM_Tethering +"</td><td>" + strTemp + "</td></tr>";
	*/
	
	// SIM prêtable
	strTemp = "<input type=\"radio\" value=\"Y\" name=\"MOBILE_SIM_Lendable\" id=\"MOBILE_SIM_Lendable_Y\"><label for=\"MOBILE_SIM_Lendable_Y\">" + l_YesLong + "</label>";
	strTemp += "<input type=\"radio\" value=\"N\" name=\"MOBILE_SIM_Lendable\" id=\"MOBILE_SIM_Lendable_N\"><label for=\"MOBILE_SIM_Lendable_N\">" + l_NoLong + "</label>";
	strHTML += "<tr style=\"display: none;\"><td><img src=\"" + strDBPath + "/mandatoryfield.gif?OpenImageResource\" width=\"16\" height=\"16\" align=\"top\"></td><td class=\"FieldLegend\">" + l_MOBILE_SIM_Lendable +"</td><td>" + strTemp + "</td></tr>";

	// Fin de la popup
	strHTML += "</table>";
	strHTML += "<input type=\"hidden\" value=\"" + window.location.href.urlQueryString("RestrictToCategory") + "\" name=\"MOBILE_RestrictToCategory\" id=\"MOBILE_RestrictToCategory\">";
	strHTML += "<input type=\"hidden\" id=\"MOBILE_FAN\" name=\"MOBILE_FAN\">";
	strHTML += "<input type=\"hidden\" id=\"MOBILE_Infra\" name=\"MOBILE_Infra\" value=\"" + (MOBILE_Infra == "M14" ? "MOBI2014" : "MOBI2012") + "\">";
	strHTML += "<input type=\"hidden\" id=\"MOBILE_SIM_Tethering\" name=\"MOBILE_SIM_Tethering\" value=\"N\">";
	strHTML += "</form>";

	
	// Message "Patientez..."
	strHTML += "<div style=\"text-align: center; display: none;\" id=\"MOBILE_NewEquipment_WaitingMsg\">" + l_MOBILE_StockEquipments_Waiting + "</div>"

	$("#MOBILE_NewEquipmentDialog").append(strHTML);

	// Définition des événements de la popup "Nouvel équipement"
	$("#MOBILE_NewEquipmentDialog").dialog({
		bgiframe: true, autoOpen: false, modal: true, resizable: false, title: l_MOBILE_NewEquipmentDialog_Title, width: 450,
		buttons: {

			// Bouton OK
			OK: function() {

				// Type d'équipement
				if($("#MOBILE_Equipment_Type").val().trim() == "") { $("#MOBILE_Equipment_Type").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_NewEquipmentDialog_Type + "\""); return false; }
				
				// Pays
				if($("#MOBILE_Country").val().trim() == "") { $("#MOBILE_Country").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Country + "\""); return false; }
				
				// FlotteID
				if($("#MOBILE_FlotteID").val().trim() == "") { $("#MOBILE_FlotteID").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_FlotteID + "\""); return false; }
				
				// Site
				var strSite = $("#MOBILE_Site").val().trim().toUpperCase();
				if(strSite == "") { $("#MOBILE_Site").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }

				var strIMEI = $("#MOBILE_IMEI").val().trim();
				var strUSIM = $("#MOBILE_USIM").val().trim();

				// Selon le type d'équipement
				var strEquipmentType = $("#MOBILE_Equipment_Type").val().toUpperCase().trim()
				switch(strEquipmentType) {

					// Téléphones
					case "PHONE":
						
						// Type de téléphone
						if($("input[name=MOBILE_Phone_Type]:checked").length == 0) { $("input[name=MOBILE_Phone_Type]").eq(0).focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Phone_Type + "\""); return false; }
						var strPhoneType = $("input[name=MOBILE_Phone_Type]:checked").val();

						// Site transcodifié si besoin
						if(strPhoneType == "SMARTPHONE") {
							var jqoTmp = $("#MOBILE_TrueSite");
							if(jqoTmp.parents("tr").eq(0).css("display") != "none") {
								if(jqoTmp.val().trim() == "") { $("#MOBILE_TrueSite").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }
							}
						}

						if(strPhoneType != "AUTRE") {
							if(strIMEI == "") { $("#MOBILE_IMEI").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_IMEI + "\""); return false; }
							var ereg = /^\d{15}$/;
							if(ereg.test(strIMEI) == false) { $("#MOBILE_IMEI").focus(); alert(l_MOBILE_IMEI_ErrWrongFormat + "\""); return false; }
						}
						else {
							if($("#MOBILE_Phone_Label").val().trim() == "") { $("#MOBILE_Phone_Label").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Phone_Label + "\""); return false; }
						}
						
						// Modèle de smartphone
						if((strPhoneType == "SMARTPHONE") && ($("#MOBILE_SmartphoneModel").val().trim() == "")) { $("#MOBILE_SmartphoneModel").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SmartphoneModel + "\""); return false; }

						break;
					
					// Modem 3G
					case "MODEM3G":
						
						// IMEI
						if(strIMEI == "") { $("#MOBILE_IMEI").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_IMEI + "\""); return false; }
						var ereg = /^\d{15}$/;
						if(!ereg.test(strIMEI)) { $("#MOBILE_IMEI").focus(); alert(l_MOBILE_IMEI_ErrWrongFormat + "\""); return false; }
						
						// Modèle
						if($("#MOBILE_Modem3GModel").val().trim() == "") { $("#MOBILE_Modem3GModel").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Modem3GModel + "\""); return false; }
						
						break;
					
					// SIM
					case "SIM":
						var boolSmartphone = false;

						// Site transcodifié si besoin
						var jqoTmp = $("#MOBILE_TrueSite");
						if(jqoTmp.parents("tr").eq(0).css("display") != "none") {
							if(jqoTmp.val().trim() == "") { $("#MOBILE_TrueSite").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_Site + "\""); return false; }
						}

						// Type de SIM
						if($("input[name=MOBILE_SIM_Type]:checked").length == 0) { $("input[name=MOBILE_SIM_Type]").eq(0).focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Type + "\""); return false; }
						if($("input[name=MOBILE_SIM_Type]:checked").val() == "SIMPHONE") {

							// Option smartphone
							var jqoTmp = $("input[name=MOBILE_SIM_Smartphone]:checked");
							if(jqoTmp.length == 0) { $("input[name=MOBILE_SIM_Smartphone]").eq(0).focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Smartphone + "\""); return false; }
							boolSmartphone = jqoTmp.val().trim().toUpperCase() == "Y";
						}

						// USIM obligatoire
						if(strUSIM == "") { $("#MOBILE_USIM").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_USIM + "\""); return false; }
						
						// Test du format d'USIM, sauf à l'international
						if(strSite != "INT") {
							//var ereg = /^89\d{17,18}$/;
							var ereg = /^[0-9]{13,20}$/
							if(!ereg.test(strUSIM)) { $("#MOBILE_USIM").focus(); alert(l_MOBILE_USIM_ErrWrongFormat + "\""); return false; }
							//if(!luhn10(strUSIM)) { $("#MOBILE_USIM").focus(); alert(l_MOBILE_USIM_ErrLuhn10); return false; }
						}
						
						// Numéro de téléphone
						var strTmp = $("#MOBILE_SIM_PhoneNumber").val();
						if(strTmp.trim() != "") {
							var ereg = /[^0-9]/;
							if(ereg.test(strTmp)) { $("#MOBILE_SIM_PhoneNumber").focus(); alert(l_MOBILE_SIM_PhoneNumber_ErrWrongFormat); return false; }
						}
						
						// PUK
						if($("#MOBILE_PUK").val().trim() == "") { $("#MOBILE_PUK").focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_PUK + "\""); return false; }
						
						// Options
						if($("input[name=MOBILE_SIM_Roaming]:checked").length == 0) { $("input[name=MOBILE_SIM_Roaming]").eq(0).focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Roaming + "\""); return false; }
						//if(boolSmartphone && ($("input[name=MOBILE_SIM_Tethering]:checked").length == 0)) { $("input[name=MOBILE_SIM_Tethering]").eq(0).focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Tethering + "\""); return false; }
						if($("input[name=MOBILE_SIM_Lendable]:checked").length == 0) { $("input[name=MOBILE_SIM_Lendable]").eq(0).focus(); alert(l_Forms_Err_ChampObligatoire + "\"" + l_MOBILE_SIM_Lendable + "\""); return false; }
						break;
				}
				
				// Vérification de l'unicité de l'équipement
				var boolDuplicate = false;
				if((strIMEI != "") || (strUSIM != "")) {

					if(strEquipmentType == "MODEM3G")
						var strURL = window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_Modem3G_Lookup_ByIMEI?ReadViewEntries&StartKey=" + strIMEI + "&Count=1"
					else if(strEquipmentType == "PHONE")
						var strURL = window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_Phone_Lookup_ByIMEI?ReadViewEntries&StartKey=" + strIMEI + "&Count=1"
					else if(strEquipmentType == "SIM")
						var strURL = window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_SIM_Lookup_ByUSIM?ReadViewEntries&StartKey=" + strUSIM + "&Count=1"

					$.ajax({
						url: strURL, type: 'GET', async: false, cache: false, dataType: 'xml', timeout: 30000,

						// Echec de la requête
						error: function() { alert(l_Forms_Err_AJAX); return false; },

						// Réussite de la requête
						success: function(xml) {

							if(strEquipmentType == "MODEM3G")
								var jqoTmp = $(xml).find("entrydata[name='MOBILE_IMEI']");
							else if(strEquipmentType == "PHONE")
								var jqoTmp = $(xml).find("entrydata[name='MOBILE_IMEI']");
							else if(strEquipmentType == "SIM")
								var jqoTmp = $(xml).find("entrydata[name='MOBILE_USIM']");

							if(jqoTmp.length != 0) {
								jqoTmp = jqoTmp.find("text");
								if(jqoTmp.length != 0) {
									if((strEquipmentType == "MODEM3G") && (jqoTmp.text().trim().toUpperCase() == strIMEI)) {
											$("#MOBILE_IMEI").focus(); alert(l_MOBILE_Modem_Err_AlreadyExists); boolDuplicate = true;
									}							
									else if((strEquipmentType == "PHONE") && (jqoTmp.text().trim().toUpperCase() == strIMEI)) {
											$("#MOBILE_IMEI").focus(); alert(l_MOBILE_Phone_Err_AlreadyExists); boolDuplicate = true;
									}							
									else if((strEquipmentType == "SIM") && (jqoTmp.text().trim().toUpperCase() == strUSIM)) {
											$("#MOBILE_USIM").focus(); alert(l_MOBILE_SIM_Err_AlreadyExists); boolDuplicate = true;
									}							
								}
							}
						}
					});
				}
					
				
				// Soumission
				if(!boolDuplicate) {
					if(confirm(l_MOBILE_NewEquipmentDialog_ConfirmCreate)) {

						// Desactivation du bouton "Créer"
						$("#MOBILE_NewEquipment_Btn_OK").addClass("ui-state-disable").removeClass("ui-state-default").attr("disabled", "disabled");
						$("#MOBILE_NewEquipment_Form").hide();
						$("#MOBILE_NewEquipment_WaitingMsg").show();

						// Smartphone, interfacage avec REFLEX
						if((strEquipmentType == "PHONE") && (strPhoneType == "SMARTPHONE")) {
						
							// Site transcodifié, on l'utilise pour Reflex
							var jqoTmp = $("#MOBILE_TrueSite");
							if(jqoTmp.parents("tr").eq(0).css("display") != "none") {
								strSite = jqoTmp.val().trim().toUpperCase();
							}						
						
							// Transcodification REFLEX disponible ?
							var strReflexSite = MOBILE_GetReflexSite(strSite)
							if(strReflexSite == "") {
								alert(l_MOBILE_StockEquipments_Err_NoTranscodifREFLEX);
								$("#MOBILE_NewEquipment_Btn_OK").removeClass("ui-state-disable").addClass("ui-state-default").removeAttr("disabled");
								$("#MOBILE_NewEquipment_WaitingMsg").hide();
								$("#MOBILE_NewEquipment_Form").show();
								return false;
							}

							// Mise en forme de l'IMEI
							var strIMEI = $("#MOBILE_IMEI").val();

							// Chargement du FAN
							$.ajax({
								url: MOBILE_WS_CreateStock.replace("%imei%", strIMEI).replace("%model%", $("#MOBILE_SmartphoneModel").val().trim()).replace("%site%", MOBILE_TranscodifREFLEX[strSite]),
								async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

								// Echec de la requête
								error: function() { 
									alert(l_Forms_Err_AJAX);
									$("#MOBILE_NewEquipment_Btn_OK").removeClass("ui-state-disable").addClass("ui-state-default").removeAttr("disabled");
									$("#MOBILE_NewEquipment_WaitingMsg").hide();
									$("#MOBILE_NewEquipment_Form").show();
								},

								// Réussite de la requête
								success: function(xml) {
								
									// Code retour
									var strCR = $(xml).find("RC").text().trim();
								
									// OK
									if(strCR == "0") {
										
										// FAN KO
										var strFAN = $(xml).find("Fan").text().trim();
										// var ereg = /^[0-9]{6}$/; Change by Elda Damiani July 2016
										var ereg = /^\w{6,15}$/;
										if((strFAN == "") || (!ereg.test(strFAN))) {
											alert(l_MOBILE_WS_CreateStock_NoFAN);
											$("#MOBILE_NewEquipment_Btn_OK").removeClass("ui-state-disable").addClass("ui-state-default").removeAttr("disabled");
											$("#MOBILE_NewEquipment_WaitingMsg").hide();
											$("#MOBILE_NewEquipment_Form").show();
										}
										// FAN OK
										else {
										
											// Enregistrement du FAN
											$("#MOBILE_FAN").val(strFAN);
								
											// Soumission
											$("#MOBILE_NewEquipment_Form").submit();
										}
									}
									// KO
									else {
										if(strCR == "1") {
											alert(l_MOBILE_WS_CreateStock_KOCR_1.replace("%cr%", strCR));
										}
										else if(strCR == "2") {
											alert(l_MOBILE_WS_CreateStock_KOCR_2.replace("%cr%", strCR));
										}
										else if(strCR == "3") {
											alert(l_MOBILE_WS_CreateStock_KOCR_3.replace("%cr%", strCR));
										}
										else {
											alert(l_MOBILE_WS_CreateStock_NoCR.replace("%cr%", strCR));
										}
										$("#MOBILE_NewEquipment_Btn_OK").removeClass("ui-state-disable").addClass("ui-state-default").removeAttr("disabled");
										$("#MOBILE_NewEquipment_WaitingMsg").hide();
										$("#MOBILE_NewEquipment_Form").show();
									}
								}
							});
						}
						// Pas un smartphone
						else {
							$("#MOBILE_NewEquipment_Form").submit();
						}
					}
				}
			},

			// Bouton "Annuler"
			Cancel: function() {
				$(this).dialog("close");
			}
		},
		open: function() {
			// A l'ouverture, changement dynamique des libellés des boutons (en dur par jQuery)
			$(this).parents(".ui-dialog").find("button:contains('OK')").attr("id", "MOBILE_NewEquipment_Btn_OK").text(l_Views_ButtonCreate_Label);
			$(this).parents(".ui-dialog").find("button:contains('Cancel')").attr("id", "MOBILE_NewEquipment_Btn_Cancel").text(l_Views_ButtonCancel_Label);

			// Reset
			$("#MOBILE_Equipment_Type").val("").change();
			$("#MOBILE_FlotteID").empty().parents("tr").eq(0).hide();
			$("#MOBILE_IMEI").val("");
			$("#MOBILE_USIM").val("");

			// Chargement de la liste des pays
			$.ajax({
				url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_Country_Lookup_By3Code?ReadViewEntries&Count=1000",
				type: 'GET', async: false, dataType: 'xml', timeout: 30000,

				// Echec de la requête
				error: function() { alert(l_Forms_Err_AJAX); },

				// Réussite de la requête
				success: function(xml) {

					// Formattage [[code1, label1], [code2, label2], [code3, label3]...]
					var arrTmp = new Array();
					$(xml).find("entrydata").find("text").each(function() {
						var strTmp = $(this).text();
						arrTmp.push([strTmp, Forms_Countries[CurrentUserLng][strTmp]]);
					});

					// Tri par libellé
					arrTmp.sort(function(a, b) { return (a[1] > b[1] ? 1 : -1); });
					
					// Construction des options
					var strOptions = "<option></option>";
					for(var i = 0, j = arrTmp.length; i < j; i++) {
						strOptions += "<option value=\"" + arrTmp[i][0] + "\">" + arrTmp[i][1] + "</option>";
					}
					$("#MOBILE_Country").empty().append(strOptions);					
				}
			});


			// Chargement de la liste des sites
			$.ajax({
				url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_Site_Lookup_By3Code?ReadViewEntries&Count=1000",
				type: 'GET', async: false, dataType: 'xml', timeout: 30000,

				// Echec de la requête
				error: function() { alert(l_Forms_Err_AJAX); },

				// Réussite de la requête
				success: function(xml) {
					
					// Formattage [[code1, label1], [code2, label2], [code3, label3]...]
					var arrTmp = new Array();
					$(xml).find("entrydata").find("text").each(function() {
						var strTmp = $(this).text();
						arrTmp.push([strTmp, FMR_Sites_By3Code[strTmp]]);
					});

					// Tri par libellé
					arrTmp.sort(function(a, b) { return (a[1] > b[1] ? 1 : -1); });
					
					// Construction des options
					var strOptions = "<option></option>";
					for(var i = 0, j = arrTmp.length; i < j; i++) {
						strOptions += "<option value=\"" + arrTmp[i][0] + "\">" + arrTmp[i][1] + "</option>";
					}
					$("#MOBILE_Site").empty().append(strOptions);
				}
			});
			

			// Champ numéro de téléphone numérique
			$("#MOBILE_SIM_PhoneNumber").change(function() {
				$(this).val($(this).val().replace(/[^0-9]/gi, ""));
			});	
		}
	});
}

// Choix du type du nouvel équipement
function MOBILE_Equipment_Type_OnChange(pThis) {
	switch(pThis.value.toUpperCase().trim()) {
		case "MODEM3G":
			$("input[name='MOBILE_Phone_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_IMEI").parents("tr").eq(0).show();
			$("#MOBILE_SmartphoneModel").parents("tr").eq(0).hide();
			$("#MOBILE_Modem3GModel").empty().append(MOBILE_GetModem3GModelOptions($("#MOBILE_Country").val())).parents("tr").eq(0).show();
			$("#MOBILE_Phone_Label").parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Smartphone']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_USIM").parents("tr").eq(0).hide();
			$("#MOBILE_SIM_PhoneNumber").parents("tr").eq(0).hide();
			$("#MOBILE_PUK").parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Roaming']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Tethering']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Lendable']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_TrueSite").empty().append("<option></option>").parents("tr").hide();
			break;
		case "PHONE":
			$("input[name='MOBILE_Phone_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).show();
			$("#MOBILE_IMEI").parents("tr").eq(0).show();
			$("#MOBILE_SmartphoneModel").parents("tr").eq(0).hide();
			$("#MOBILE_Modem3GModel").parents("tr").eq(0).hide();
			$("#MOBILE_Phone_Label").parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Smartphone']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_USIM").parents("tr").eq(0).hide();
			$("#MOBILE_SIM_PhoneNumber").parents("tr").eq(0).hide();
			$("#MOBILE_PUK").parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Roaming']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Tethering']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Lendable']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_TrueSite").empty().append("<option></option>").parents("tr").hide();
			break;
		case "SIM":
			$("input[name='MOBILE_Phone_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_IMEI").parents("tr").eq(0).hide();
			$("#MOBILE_SmartphoneModel").parents("tr").eq(0).hide();
			$("#MOBILE_Modem3GModel").parents("tr").eq(0).hide();
			$("#MOBILE_Phone_Label").parents("tr").eq(0).hide();
	
			if(MOBILE_Infra == "M12") {
				$("input[name='MOBILE_SIM_Smartphone']").removeAttr("checked").eq(0).parents("tr").eq(0).show();
				$("input[name='MOBILE_SIM_Type']").attr("checked", "checked").eq(0).parents("tr").eq(0).show();
			}
			else {
				$("input[name='MOBILE_SIM_Smartphone']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
				$("input[name='MOBILE_SIM_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).show();				
			}
			
			$("#MOBILE_USIM").parents("tr").eq(0).show();
			$("#MOBILE_SIM_PhoneNumber").parents("tr").eq(0).show();
			$("#MOBILE_PUK").parents("tr").eq(0).show();
			$("input[name='MOBILE_SIM_Roaming']").removeAttr("checked").eq(0).parents("tr").eq(0).show();
			$("input[name='MOBILE_SIM_Tethering']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Lendable']").removeAttr("checked").eq(0).parents("tr").eq(0).show();
			$("#MOBILE_Site").change();
			break;
		default:
			$("input[name='MOBILE_Phone_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_IMEI").parents("tr").eq(0).hide();
			$("#MOBILE_SmartphoneModel").parents("tr").eq(0).hide();
			$("#MOBILE_Modem3GModel").parents("tr").eq(0).hide();
			$("#MOBILE_Phone_Label").parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Type']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Smartphone']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_USIM").parents("tr").eq(0).hide();
			$("#MOBILE_SIM_PhoneNumber").parents("tr").eq(0).hide();
			$("#MOBILE_PUK").parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Roaming']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Tethering']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("input[name='MOBILE_SIM_Lendable']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
			$("#MOBILE_TrueSite").empty().append("<option></option>").parents("tr").hide();
	}
}

// Choix du pays
function MOBILE_Country_OnChange(pThis) {

	// Pas de pays, déselection et masquage du domaine de facturation
	var jqoCountry = $("#MOBILE_Country");
	if(jqoCountry.val().trim() == "") {
		$("#MOBILE_FlotteID").empty().append("<option></option>").parents("tr").hide();
	}
	// Pays quelconque
	else {
		var strOptions = "";

		// Chargement des domaines actifs
		var strTemp = MOBILE_GetFlotteIDOptions("ON§" + jqoCountry.val().trim().toUpperCase());
		if(strTemp != "") strOptions += "<optgroup label=\"" + l_MOBILE_DomFact_StatusOn + "\">" + strTemp + "</optgroup>";

		// Chargement des domaines inactifs
		var strTemp = MOBILE_GetFlotteIDOptions("OFF§" + jqoCountry.val().trim().toUpperCase());
		if(strTemp != "") strOptions += "<optgroup label=\"" + l_MOBILE_DomFact_StatusOff + "\">" + strTemp + "</optgroup>";

		// Ajout des options
		if(strOptions != "")
			$("#MOBILE_FlotteID").empty().append("<option></option>" + strOptions).parents("tr").show();
		else
			$("#MOBILE_FlotteID").empty().append("<option></option>").parents("tr").hide();
	}

	// Si smartphone, chargement des modèles (click sur l'option du type)
	if($("#MOBILE_Equipment_Type").val() == "PHONE") {
		var jqoTmp = $("input[name=MOBILE_Phone_Type]:checked");
		if(jqoTmp.length != 0) jqoTmp.click();
	}
	
	// Si modem 3G, chargement des modèles
	if($("#MOBILE_Equipment_Type").val() == "MODEM3G") {
		$("#MOBILE_Modem3GModel").empty().append(MOBILE_GetModem3GModelOptions($("#MOBILE_Country").val())).parents("tr").eq(0).show();
	}
}

// Choix du site
function MOBILE_Site_OnChange() {

	// Pas de site, ou pas un smartphone ni une SIM, déselection et masquage du site transcodifié
	var strSite = $("#MOBILE_Site").val().trim().toUpperCase();
	if((strSite == "") || (($("#MOBILE_Equipment_Type").val() != "SIM") && (($("#MOBILE_Equipment_Type").val() != "PHONE") || !$("#MOBILE_Phone_Type_SMARTPHONE").attr("checked")))) {
		$("#MOBILE_TrueSite").empty().append("<option></option>").parents("tr").hide();
	}
	// Site quelconque
	else {
		var strOptions = "";

		// Chargement des sites transcodifiés
		var strOptions = MOBILE_GetTrueSiteOptions(strSite);

		// Valeur précédente du site réel
		var strTrueSite = $("#MOBILE_TrueSite").val();

		// Ajout des options
		if(strOptions != "")
			$("#MOBILE_TrueSite").empty().append("<option></option>" + strOptions).val(strTrueSite).parents("tr").show();
		else
			$("#MOBILE_TrueSite").empty().append("<option></option>").parents("tr").hide();
	}
}

// Choix du type de téléphone
function MOBILE_Phone_Type_OnClick(pThis) {
	if(pThis.value == "SMARTPHONE") {
		$("#MOBILE_Site").change();
		$("#MOBILE_Phone_Label").parents("tr").eq(0).hide();
		$("#MOBILE_IMEI_MandatoryImg").show();
		$("#MOBILE_SmartphoneModel").empty().append(MOBILE_GetSmartphoneModelOptions($("#MOBILE_Country").val())).parents("tr").eq(0).show();
	}
	else if(pThis.value == "AUTRE") {
		$("#MOBILE_TrueSite").empty().append("<option></option>").parents("tr").eq(0).hide();
		$("#MOBILE_SmartphoneModel").empty().append("<option></option>").parents("tr").eq(0).hide();
		$("#MOBILE_IMEI_MandatoryImg").hide();
		$("#MOBILE_Phone_Label").parents("tr").eq(0).show();
	}
	else {
		$("#MOBILE_TrueSite").empty().append("<option></option>").parents("tr").eq(0).hide();
		$("#MOBILE_Phone_Label").parents("tr").eq(0).hide();
		$("#MOBILE_IMEI_MandatoryImg").show();
		$("#MOBILE_SmartphoneModel").empty().append("<option></option>").parents("tr").eq(0).hide();
	}
}

// Choix du type de SIM
function MOBILE_SIM_Type_OnClick(pThis) {
	if(pThis.value == "SIMPHONE") {
		$("input[name='MOBILE_SIM_Smartphone']").eq(0).parents("tr").eq(0).show();
	}
	else {
		$("input[name='MOBILE_SIM_Smartphone']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
//		$("input[name='MOBILE_SIM_Tethering']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
	}
}

// Choix de l'option Smartphone
function MOBILE_SIM_Smartphone_OnClick(pThis) {
/*
	if(pThis.value == "Y")
		$("input[name='MOBILE_SIM_Tethering']").eq(0).parents("tr").eq(0).show();
	else
		$("input[name='MOBILE_SIM_Tethering']").removeAttr("checked").eq(0).parents("tr").eq(0).hide();
*/
}

// Renvoi des <option> (FlotteID) pour une clé "status§pays" de domaines de facturation
function MOBILE_GetFlotteIDOptions(strKey) {
	var strReturn = "";
	$.ajax({
		url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_DomFact_Lookup_ForApprob?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase() + "&Count=1000",
		async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

		// Echec de la requête
		error: function() { alert(l_Forms_Err_AJAX); },

		// Réussite de la requête, lecture du XML, construction des options
		success: function(xml) {
			$(xml).find("viewentry").each(function() {
				var strFlotteID = $(this).find("entrydata[name='FlotteID']").find("text").text().trim().toUpperCase();
				strReturn += "<option value=\"" + strFlotteID + "\">" + strFlotteID + "</option>";				
			});
		}
	});
	return strReturn;
}

// Renvoi des <option> (Modèle de smartphone) pour un pays
function MOBILE_GetSmartphoneModelOptions(strKey) {

	// Si pas de pays sélectionné
	if(strKey == "") {
		return "<option>" + l_MOBILE_ChooseACountry + "</option>";
	}
	else {
		var strReturn = "";

		// Chargement des modèles
		$.ajax({
			url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_SmartphoneModel_Lookup_ByCountry?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase() + "&Count=1000",
			async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

			// Echec de la requête
			error: function() { alert(l_Forms_Err_AJAX); },

			// Réussite de la requête, lecture du XML, construction des options
			success: function(xml) {
				$(xml).find("viewentry").each(function() {
					var strSmartphoneModel = $(this).find("entrydata[name='MOBILE_SmartphoneModel']").find("text").text().trim();
					strReturn += "<option value=\"" + strSmartphoneModel + "\">" + strSmartphoneModel + "</option>";				
				});
			}
		});
		return "<option></option>" + strReturn;
	}
}

// Renvoi des <option> (Modèle de modem 3G) pour un pays
function MOBILE_GetModem3GModelOptions(strKey) {

	// Si pas de pays sélectionné
	if(strKey == "") {
		return "<option>" + l_MOBILE_ChooseACountry + "</option>";
	}
	else {
		var strReturn = "";

		// Chargement des modèles
		$.ajax({
			url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_Modem3GModel_Lookup_ByCountry?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase() + "&Count=1000",
			async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

			// Echec de la requête
			error: function() { alert(l_Forms_Err_AJAX); },

			// Réussite de la requête, lecture du XML, construction des options
			success: function(xml) {
				$(xml).find("viewentry").each(function() {
					var strModem3GModel = $(this).find("entrydata[name='MOBILE_Modem3GModel']").find("text").text().trim();
					strReturn += "<option value=\"" + strModem3GModel + "\">" + strModem3GModel + "</option>";				
				});
			}
		});
		return "<option></option>" + strReturn;
	}
}

// Suppression d'un équipement
function MOBILE_DeleteEquipment(strMsg, strDocID) {
	if(confirm(strMsg)) {
		
		// Présence d'un troisième argument, string, c'est un FAN à détruire dans Reflex
		var boolContinue = true;
		if((arguments[2] !== undefined) && (typeof arguments[2] == "string")) {

			// Destruction du FAN
			$.ajax({
				url: MOBILE_WS_SetDestruction.replace("%fan%", arguments[2]).replace("%comment%", "Stock"),
				async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

				// Echec de la requête
				error: function() { 
					alert(l_Forms_Err_AJAX);
					boolContinue = false;
				},

				// Réussite de la requête
				success: function(xml) {
								
					// Code retour
					var strCR = $(xml).find("RC").text().trim();
								
					// KO
					if(strCR != "0") {
						alert(l_MOBILE_WS_SetDestruction_NoCR.replace("%cr%", strCR));
						boolContinue = false;
					}
				}
			});
		}
		
		// Suppression
		if(boolContinue) {
			var strTemp = window.location.href;
			window.location.href = strTemp.strLeft(".nsf") + ".nsf/v_toutes/" + strDocID + "?DeleteDocument&Goto=v_MOBILE_StockEquipments_" + MOBILE_Infra + "?OpenView&RestrictToCategory=" + strTemp.urlQueryString("RestrictToCategory");
		}
	}
}

// Récupération du code site REFLEX (on s'assure que l'on reçoit bien 3 caractères avant de faire la requete AJAX)
function MOBILE_GetReflexSite(strKey) {
	strKey = strKey.trim().toUpperCase();
	if(strKey.length != 3) return "";	
	
	var strReturn = "";
	$.ajax({
		url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_TranscodifREFLEX_Lookup_ForStock?ReadViewEntries&RestrictToCategory=" + strKey + "&Count=1",
		async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

		// Echec de la requête
		error: function() { alert(l_Forms_Err_AJAX); },

		// Réussite de la requête, lecture du XML
		success: function(xml) {
			var jqoTmp = $(xml).find("entrydata[name='MOBILE_TranscodifREFLEX_REFLEX']");
			if(jqoTmp.length == 1) strReturn = jqoTmp.find("text").text().trim().toUpperCase();
		}
	});
	return strReturn;
}

// Renvoi des <option> (site transcodifié) pour un site "chapeau"
function MOBILE_GetTrueSiteOptions(strKey) {
	var strReturn = "";
	$.ajax({
		url: window.location.href.strLeft(".nsf") + ".nsf/v_MOBILE_TranscodifLDAP_Lookup_ForStock?ReadViewEntries&RestrictToCategory=" + strKey.trim().toUpperCase() + "&Count=1000",
		async: false, cache: false, type: 'GET', dataType: 'xml', timeout: 30000,

		// Echec de la requête
		error: function() { alert(l_Forms_Err_AJAX); },

		// Réussite de la requête, lecture du XML, construction des options
		success: function(xml) {
			$(xml).find("viewentry").each(function() {
				var strSiteCode = $(this).find("entrydata[name='MOBILE_TranscodifLDAP_LDAP']").find("text").text().trim().toUpperCase();
				var strSiteLabel = $(this).find("entrydata[name='MOBILE_TranscodifLDAP_Label']").find("text").text();
				strReturn += "<option value=\"" + strSiteCode + "\">" + strSiteLabel + " (" + strSiteCode + ")</option>";				
			});
		}
	});
	return strReturn;
}
