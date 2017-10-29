// Ouverture
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 });
	
	// Masquage des champs
	// Section Creation
	$("#TELEFON_Creation_Header").parents("tr").eq(0).hide();
	$("#TELEFON_Building").parents("tr").eq(0).hide();
	$("#TELEFON_Stage").parents("tr").eq(0).hide();		
	$("#TELEFON_Office").parents("tr").eq(0).hide();
	$("#TELEFON_Pilar").parents("tr").eq(0).hide();
	$("#TELEFON_NetCxNumber").parents("tr").eq(0).hide();
	$("#TELEFON_RequestStation").parents("tr").eq(0).hide();
	$("#TELEFON_RequestMultiUserPost").parents("tr").eq(0).hide();
	$("#TELEFON_RequestComments").parents("tr").eq(0).hide();
	$("#TELEFON_WishedDateStart").parents("tr").eq(0).hide();
	$("#TELEFON_CallLevel").parents("tr").eq(0).hide();
	$("#TELEFON_AccessComments").parents("tr").eq(0).hide();
	$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).hide();
	$("#TELEFON_CallFilter").parents("tr").eq(0).hide();
	$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
	$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
	$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).hide();
	$("#TELEFON_CallCenter").parents("tr").eq(0).hide();
	$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
	$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).hide();
	$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).hide();
	$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).hide();
	$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
	// Section Update
	$("#TELEFON_Update_Header").parents("tr").eq(0).hide();
	$("#TELEFON_UpdCallNumber").parents("tr").eq(0).hide();
	$("#TELEFON_UpdMACAddress").parents("tr").eq(0).hide();
	$("#TELEFON_UpdCallLevel").parents("tr").eq(0).hide();
	$("#TELEFON_UpdNewCallLevel").parents("tr").eq(0).hide();
	$("#TELEFON_UpdAccessComments").parents("tr").eq(0).hide();
	$("#TELEFON_UpdChangeOwner").parents("tr").eq(0).hide();
	$("#TELEFON_UpdOldOwner").parents("tr").eq(0).hide();
	$("#TELEFON_UpdNewOwner").parents("tr").eq(0).hide();
	$("#TELEFON_UpdComments").parents("tr").eq(0).hide();
	$("#TELEFON_UpdChangeType").parents("tr").eq(0).hide();
	$("#TELEFON_UpdCurrentType").parents("tr").eq(0).hide();
	$("#TELEFON_UpdNewType").parents("tr").eq(0).hide();
	$("#TELEFON_UpdNewTypeComments").parents("tr").eq(0).hide();
	$("#TELEFON_UpdVoiceMail").parents("tr").eq(0).hide();
	$("#TELEFON_UpdVoiceMailComments").parents("tr").eq(0).hide();
	$("#TELEFON_UpdOtherRequest").parents("tr").eq(0).hide();
	// Section Removal
	$("#TELEFON_Removal_Header").parents("tr").eq(0).hide();
	$("#TELEFON_RemCallNumber").parents("tr").eq(0).hide();
	$("#TELEFON_RemCallNumberPoste").parents("tr").eq(0).hide();
	$("#TELEFON_RemMACAddress").parents("tr").eq(0).hide();
	$("#TELEFON_RemMACAddressPoste").parents("tr").eq(0).hide();
	$("#TELEFON_RemCxNumber").parents("tr").eq(0).hide();
	$("#TELEFON_RemComments").parents("tr").eq(0).hide();
	$("#TELEFON_RemAction").parents("tr").eq(0).hide();
	$("#TELEFON_RemStation").parents("tr").eq(0).hide();
	$("#TELEFON_RemMACAddressNew").parents("tr").eq(0).hide();
	$("#TELEFON_RemBuildingNew").parents("tr").eq(0).hide();
	$("#TELEFON_RemStageNew").parents("tr").eq(0).hide();
	$("#TELEFON_RemOfficeNew").parents("tr").eq(0).hide();
	$("#TELEFON_RemPilarNew").parents("tr").eq(0).hide();
	$("#TELEFON_RemNetCxNumberNew").parents("tr").eq(0).hide();
	// Section Deletion
	$("#TELEFON_Deletion_Header").parents("tr").eq(0).hide();
	$("#TELEFON_DelCallNumber").parents("tr").eq(0).hide();
	$("#TELEFON_DelMACAddress").parents("tr").eq(0).hide();	
	
	// Masquage des messages
	$("#TELEFON_Msg_1a").parents("tr").eq(0).hide();
	$("#TELEFON_Msg_1b").parents("tr").eq(0).hide();
	$("#TELEFON_Msg_2a").parents("tr").eq(0).hide();
	$("#TELEFON_Msg_3a").parents("tr").eq(0).hide();
	$("#TELEFON_Msg_3b").parents("tr").eq(0).hide();
	$("#TELEFON_Msg_3c").parents("tr").eq(0).hide();
	$("#TELEFON_Msg_4").parents("tr").eq(0).hide();
	$("#TELEFON_Msg_5").parents("tr").eq(0).hide();
		
	// Initialisation via LDAP
	if((typeof(JSONLDAP) !== "undefined") && (JSONLDAP[0] !== undefined)) {
	
		// reinit des zones alimentés par le LDAP
		$("#TELEFON_EmployeeType").val("");
		$("#TELEFON_BudgetingCenter").val("");
		$("#TELEFON_EntityRattach").val("");
		$("#TELEFON_SiteRattach").val("");
		$("#TELEFON_Country").val("");
		$("#TELEFON_Hierar").val("");
	
		if ($("#TELEFON_Beneficiary").val() == "" ){
			$("#TELEFON_Beneficiary").val(f_Demandeur)
		}
	
		// Beneficiary
		if((JSONLDAP[0].getFirstName !== undefined) && (JSONLDAP[0].getLastName !== undefined) && (JSONLDAP[0].getUid !== undefined)) {
			$("#TELEFON_Beneficiary").val(JSONLDAP[0].getFirstName + " " + JSONLDAP[0].getLastName + " - " + JSONLDAP[0].getUid + "/" + HierarchyOnly);
		}
		
		// Contract Type
		if(JSONLDAP[0].getEmployeeType !== undefined) {
			if(JSONLDAP[0].getEmployeeType == "I") {
				$("#TELEFON_EmployeeType").val(l_TELEFON_ContractIn);				
			}
			else {
				$("#TELEFON_EmployeeType").val(l_TELEFON_ContractOut);			
			}
		}
		else {
			$("#TELEFON_EmployeeType").disabled="";
		}

		// Centre de budget
		if(JSONLDAP[0].getBudgetingCenter !== undefined) {
			$("#TELEFON_BudgetingCenter").val(JSONLDAP[0].getBudgetingCenter);
		}

		// Direction
		if(JSONLDAP[0].getDirection !== undefined) {
			$("#TELEFON_EntityRattach").val(JSONLDAP[0].getDirection);
		}
		
		// Beneficiary workplace
		if(JSONLDAP[0].getWorkPlace.getAcronym !== undefined) {
			$("#TELEFON_SiteRattach").val(JSONLDAP[0].getWorkPlace.getAcronym);
		}
		
		// Beneficiary Country
		if(JSONLDAP[0].getPays !== undefined) {
			$("#TELEFON_Country").val(TELEFON_Country2_Transcodification[JSONLDAP[0].getPays]);
		}

		// N+1
		if((JSONLDAP[0].getManager !== undefined) && (JSONLDAP[0].getManager.getCN !== undefined))
			$("#TELEFON_Hierar").val(JSONLDAP[0].getManager.getCN + "/" + HierarchyOnly);
	}
	$("#TELEFON_RequestType").change();
	
	if($("#TELEFON_RequestType").val() == "CRE") {
		if($("#TELEFON_RequestStation").val().trim() !== "") {
			$("#TELEFON_RequestStation").change();

			var jqoTmp = $("input[name=TELEFON_CallLevel]:checked");
			if(jqoTmp.length > 0) {
				jqoTmp.eq(0).click();				
			}		
	
			var jqoTmp = $("input[name=TELEFON_CallFilter]:checked");
			if(jqoTmp.length > 0) {
				jqoTmp.eq(0).click();
			}		

			var jqoTmp = $("input[name=TELEFON_InterceptCallFixe]:checked");
			if(jqoTmp.length > 0) {
				jqoTmp.eq(0).click();
			}

			var jqoTmp = $("input[name=TELEFON_CallCenter]:checked");
			if(jqoTmp.length > 0) {
				jqoTmp.eq(0).click();
			}	
		}
	}

	if($("#TELEFON_RequestType").val() == "UPD") {
		// Nouveau droit d'appel ?
		var jqoTmp = $("input[name=TELEFON_UpdCallLevel]:checked");
		if(jqoTmp.length > 0) {
			jqoTmp.eq(0).click();
			if ($("input[name='TELEFON_UpdCallLevel']:checked").val() == "Y") {
				$("#TELEFON_UpdNewCallLevel").change();
			}
		}	
		
		// Nouveau propriétaire ?
		var jqoTmp = $("input[name=TELEFON_UpdChangeOwner]:checked");
		if(jqoTmp.length > 0) {
			jqoTmp.eq(0).click();
			if ($("input[name='TELEFON_UpdChangeOwner']:checked").val() == "Y") {
				$("#TELEFON_UpdChangeOwner").change();
			}
		}
		
		// Nouveau type de poste ?
		var jqoTmp = $("input[name=TELEFON_UpdChangeType]:checked");
		if(jqoTmp.length > 0) {
			jqoTmp.eq(0).click();
			if ($("input[name='TELEFON_UpdChangeType']:checked").val() == "Y") {
				$("#TELEFON_UpdChangeType").change();
			}
			var jqoTmp = $("input[name=TELEFON_UpdNewType]:checked");
			if(jqoTmp.length > 0) {
				jqoTmp.eq(0).click();
				if ($("input[name='TELEFON_UpdNewType']:checked").val() == "DECT") {
					$("#TELEFON_UpdNewType").change();
				}
			}	
		}

		// Modification messagerie ?
		var jqoTmp = $("input[name=TELEFON_UpdVoiceMail]:checked");
		if(jqoTmp.length > 0) {
			jqoTmp.eq(0).click();
			if ($("input[name='TELEFON_UpdVoiceMail']:checked").val() == "ADD") {
				$("#TELEFON_UpdVoiceMail").change();
			}
		}
	
	}
		
});


// Fonction de soumission
function TELEFON_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;
	
	// Expressions régulières
	var regexpDate = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;

	// champs obligatorie - mandatory fields
	// Beneficiaire
	if($("#TELEFON_Beneficiary").val().trim() == "") { DisplayErrMsgOnField("TELEFON_Beneficiary", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_Beneficiary + "\" !"); return false; };
	// Budgeting Center
	if($("#TELEFON_BudgetingCenter").val().trim() == "") { DisplayErrMsgOnField("TELEFON_BudgetingCenter", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_BudgetingCenter + "\" !"); return false; };
	// Entity
	if($("#TELEFON_EntityRattach").val().trim() == "") { DisplayErrMsgOnField("TELEFON_EntityRattach", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_EntityRattach + "\" !"); return false; };
	// Country
	if($("#TELEFON_Country").val().trim() == "") { DisplayErrMsgOnField("TELEFON_Country", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_Country + "\" !"); return false; };
	// Site
	if($("#TELEFON_SiteRattach").val().trim() == "") { DisplayErrMsgOnField("TELEFON_SiteRattach", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_SiteRattach + "\" !"); return false; };
	// Manager
	if($("#TELEFON_Hierar").val().trim() == "") { DisplayErrMsgOnField("TELEFON_Hierar", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_Hierar + "\" !"); return false; };
	// Request Type
	if($("#TELEFON_RequestType").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RequestType", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RequestType + "\" !"); return false; };

	// Request Type : Creation
	if($("#TELEFON_RequestType").val() == "CRE") { 
		// Building - Batiment
		if($("#TELEFON_Building").val().trim() == "") { DisplayErrMsgOnField("TELEFON_Building", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_Building + "\" !"); return false; };
		// Stage - Etage
		if($("#TELEFON_Stage").val().trim() == "") { DisplayErrMsgOnField("TELEFON_Stage", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_Stage + "\" !"); return false; };
		// Office  Bureau
		if($("#TELEFON_Office").val().trim() == "") { DisplayErrMsgOnField("TELEFON_Office", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_Office + "\" !"); return false; };
		// Pilar - Pilier
		if($("#TELEFON_Pilar").val().trim() == "") { DisplayErrMsgOnField("TELEFON_Pilar", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_Pilar + "\" !"); return false; };
		// NetCxNumber - N° de bandeau
		if($("#TELEFON_NetCxNumber").val().trim() == "") { DisplayErrMsgOnField("TELEFON_NetCxNumber", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_NetCxNumber + "\" !"); return false; };
		// Request Station - Poste demandé
		if($("#TELEFON_RequestStation").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RequestStation", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RequestStation + "\" !"); return false; };
		// Request Multiuser?
		if(($("input[name='TELEFON_RequestMultiUserPost']:checked").val() == "") || ($("input[name='TELEFON_RequestMultiUserPost']:checked").val() == undefined) ) { DisplayErrMsgOnField("TELEFON_RequestMultiUserPost", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RequestMultiUserPost + "\" !"); return false; };
		// Request Comments - Justification de la demande
		if($("#TELEFON_RequestComments").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RequestComments", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RequestComments + "\" !"); return false; };
		
		// Date de réalisation souhaitée 
		var strTmp = $("#TELEFON_WishedDateStart").val().trim();
		if(strTmp == "") { DisplayErrMsgOnField("TELEFON_WishedDateStart", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_WishedDateStart + "\""); return false; }
		if(!regexpDate.test(strTmp)) { DisplayErrMsgOnField("TELEFON_WishedDateStart", l_Forms_Err_DateFormat); return false; }
		// Date au plus tôt >= J  (supèrieure ou égale à la date du jour)
		var dateToday = new Date();
		dateToday.setHours(0);
		dateToday.setMinutes(0);
		dateToday.setSeconds(0);
		dateToday.setMilliseconds(0);
		var dateEarliest = new Date(strTmp.strRightBack("/"), strTmp.strRight("/").strLeft("/") - 1, strTmp.strLeft("/"), 0, 0, 0);
		if(dateEarliest.getTime() < dateToday.getTime()) { DisplayErrMsgOnField("TELEFON_WishedDateStart", l_TELEFON_WishedDateStart_ErrTooLow); return false; }

		// Call level - Droits d'appel
		if (($("input[name='TELEFON_CallLevel']:checked").val() == "")||($("input[name='TELEFON_CallLevel']:checked").val() == undefined)) { DisplayErrMsgOnField("TELEFON_CallLevel", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_CallLevel + "\" !"); return false; };

		// Access Comments - Justification d'accès international
		if ($("input[name='TELEFON_CallLevel']:checked").val() == "INTERNATIONAL") {
			if($("#TELEFON_AccessComments").val().trim() == "") { DisplayErrMsgOnField("TELEFON_AccessComments", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_AccessComments + "\" !"); return false; };
 		}
 	}
 	
 	// Request Type : Update
	if($("#TELEFON_RequestType").val() == "UPD") {
		// Numéro d'appel
		if($("#TELEFON_UpdCallNumber").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdCallNumber", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdCallNumber + "\" !"); return false; };

		// MAC Address
		if($("#TELEFON_UpdMACAddress").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdMACAddress", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdMACAddress + "\" !"); return false; };

		// Update Call Level - Nouveau droit d'appel
		if ($("input[name='TELEFON_UpdCallLevel']:checked").val() == "Y") {
			if($("#TELEFON_UpdNewCallLevel_Value").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdNewCallLevel", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdNewCallLevel + "\" !"); return false; };
			if( $("#TELEFON_UpdNewCallLevel_Value").val().trim() == "INTERNATIONAL" ) {
				if($("#TELEFON_UpdAccessComments").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdAccessComments", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdAccessComments + "\" !"); return false; };
			}
 		}
 		
 		// Nouveau propriétaire du poste
 		if ($("input[name='TELEFON_UpdChangeOwner']:checked").val() == "Y") {
				if($("#TELEFON_UpdNewOwner").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdNewOwner", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdNewOwner + "\" !"); return false; };
				if($("#TELEFON_UpdNewOwner").val().trim() == $("#TELEFON_UpdOldOwner").val().trim()) { DisplayErrMsgOnField("TELEFON_UpdNewOwner", l_TELEFON_UpdNewOwner + "\"" + l_TELEFON_UpdNewOwner_ctrl + "\" !"); return false; };
				if($("#TELEFON_UpdComments").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdComments", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdComments + "\" !"); return false; };
		}

 		// Changement de type de poste
 		if ($("input[name='TELEFON_UpdChangeType']:checked").val() == "Y") {
				if (($("input[name='TELEFON_UpdCurrentType']:checked").val() == "")||($("input[name='TELEFON_UpdCurrentType']:checked").val() == undefined)) { DisplayErrMsgOnField("TELEFON_UpdCurrentType", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdCurrentType + "\" !"); return false; };
				if (($("input[name='TELEFON_UpdNewType']:checked").val() == "")||($("input[name='TELEFON_UpdNewType']:checked").val() == undefined)) { DisplayErrMsgOnField("TELEFON_UpdNewType", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdNewType + "\" !"); return false; };
				if (($("input[name='TELEFON_UpdNewType']:checked").val()) == ($("input[name='TELEFON_UpdCurrentType']:checked").val())) { DisplayErrMsgOnField("TELEFON_UpdNewType", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdNewType_ctrl + "\" !"); return false; };
				if($("#TELEFON_UpdNewTypeComments").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdNewTypeComments", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdNewTypeComments + "\" !"); return false; };
		}

 		// Modification messagerie vocale
 		if ($("input[name='TELEFON_UpdVoiceMail']:checked").val() == "ADD") {				
				if($("#TELEFON_UpdVoiceMailComments").val().trim() == "") { DisplayErrMsgOnField("TELEFON_UpdVoiceMailComments", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_UpdVoiceMailComments + "\" !"); return false; };
		}
	}
		
 	// Request Type : Removal 
	if($("#TELEFON_RequestType").val() == "REM") {
	
		// Type déménagement
		var jqoAct = $("input[name='TELEFON_RemAction']:checked").val();
		if ((jqoAct == "") || (jqoAct == undefined)) {
			DisplayErrMsgOnField("TELEFON_RemAction", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemAction + "\" !"); return false;
		} else if (jqoAct == "POSTE") {
		
			if($("#TELEFON_RemCallNumberPoste").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemCallNumberPoste", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemCallNumberPoste + "\" !"); return false; };
			// if($("#TELEFON_RemMACAddressPoste").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemMACAddressPoste", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemMACAddressPoste + "\" !"); return false; };

		} else if (jqoAct == "NUMERO") {
		
			if($("#TELEFON_RemCallNumber").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemCallNumber", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemCallNumber + "\" !"); return false; };
			if($("#TELEFON_RemMACAddress").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemMACAddress", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemMACAddress + "\" !"); return false; };
			if($("#TELEFON_RemMACAddressNew").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemMACAddressNew", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemMACAddressNew + "\" !"); return false; };
		}
		
		if ($("#TELEFON_RemStation").val().trim() == "") {
			DisplayErrMsgOnField("TELEFON_RemStation", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemStation + "\" !"); 
			return false;		
		}		
		
		if($("#TELEFON_RemBuildingNew").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemBuildingNew", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemBuildingNew + "\" !"); return false; };
		if($("#TELEFON_RemStageNew").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemStageNew", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemStageNew + "\" !"); return false; };
		if($("#TELEFON_RemOfficeNew").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemOfficeNew", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemOfficeNew + "\" !"); return false; };
		if($("#TELEFON_RemPilarNew").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemPilarNew", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemPilarNew + "\" !"); return false; };
		// if($("#TELEFON_RemNetCxNumberNew").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemNetCxNumberNew", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemNetCxNumberNew + "\" !"); return false; };
		
		if($("#TELEFON_RemComments").val().trim() == "") { DisplayErrMsgOnField("TELEFON_RemComments", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_RemComments + "\" !"); return false; };
		
	}

 	// Request Type : Deletion 
	if($("#TELEFON_RequestType").val() == "DEL") {
		
		if($("#TELEFON_DelCallNumber").val().trim() == "") { DisplayErrMsgOnField("TELEFON_DelCallNumber", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_DelCallNumber + "\" !"); return false; };		
		if($("#TELEFON_DelMACAddress").val().trim() == "") { DisplayErrMsgOnField("TELEFON_DelMACAddress", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_DelMACAddress + "\" !"); return false; };		
	}

	// Confirmation de la soumission
	if(confirm(l_Conf_Submit)) {
		FormHasBeenSent = true;
		$("#f_ActionAFaire").val("soumettre");
		document.forms[0].submit();
	}	
	
};


// Choix du type d'équipement
function TELEFON_RequestType_OnChange(pThis) {
	if($(pThis).val().trim().toUpperCase() == "CRE") {
		// Déselection du bouton radio 	
		//$('input[name="TELEFON_UpdCallLevel"]').attr("checked", false);
		//$('input[name="TELEFON_VoiceMailFixe"]').attr("checked", false);	
		//$('input[name="TELEFON_CallFilter"]').attr("checked", false);	
		//$('input[name="TELEFON_InterceptCallFixe"]').attr("checked", false);	
		//$('input[name="TELEFON_CallCenter"]').attr("checked", false);		
		
		// Affichage des champs
		$("#TELEFON_Creation_Header").parents("tr").eq(0).show();
		$("#TELEFON_Building").parents("tr").eq(0).show();
		$("#TELEFON_Stage").parents("tr").eq(0).show();		
		$("#TELEFON_Office").parents("tr").eq(0).show();
		$("#TELEFON_Pilar").parents("tr").eq(0).show();
		$("#TELEFON_NetCxNumber").parents("tr").eq(0).show();
		$("#TELEFON_RequestStation").parents("tr").eq(0).show();
		$("#TELEFON_RequestMultiUserPost").parents("tr").eq(0).show();
		$("#TELEFON_RequestComments").parents("tr").eq(0).show();
		$("#TELEFON_WishedDateStart").parents("tr").eq(0).show();
		$("#TELEFON_Msg_4").parents("tr").eq(0).show();
		
		// Masquage des champs
		// Section Update
		$("#TELEFON_Update_Header").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_UpdMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdAccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOldOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCurrentType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewTypeComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMail").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMailComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOtherRequest").parents("tr").eq(0).hide();
						
		// Section Removal
		$("#TELEFON_Removal_Header").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RemNetCxNumberNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemPilarNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemOfficeNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemStageNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemBuildingNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumberPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemStation").parents("tr").eq(0).hide();
		$("#TELEFON_RemAction").parents("tr").eq(0).hide();
		$("#TELEFON_RemComments").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_5").parents("tr").eq(0).hide();

		// Section Deletion
		$("#TELEFON_Deletion_Header").parents("tr").eq(0).hide();	
		$("#TELEFON_DelCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_DelMACAddress").parents("tr").eq(0).hide();
	}	

	if($(pThis).val().trim().toUpperCase() == "UPD") {
		$("#TELEFON_RequestStation").val("");
		
		// création de la liste déroulante des nouveaux droits d'appel
		
		var strHTML = "<select id=\"TELEFON_UpdNewCallLevel_Value\" name=\"TELEFON_UpdNewCallLevel\" onChange=\"TELEFON_UpdNewCallLevel_OnChange(this);\">";
		strHTML += "<option value=\"\"> </option>";
		strHTML += "<option value=\"INTERNE\">" + l_TELEFON_CallLevel1 + "</option>";
		strHTML += "<option value=\"NATIONAL\">" + l_TELEFON_CallLevel2 + "</option>";
		strHTML += "<option value=\"INTERNATIONAL\">" + l_TELEFON_CallLevel3 + "</option>";
		strHTML += "</select>";
		$("#TELEFON_UpdNewCallLevel").html(strHTML);

		// Affichage des champs		
		$("#TELEFON_Update_Header").parents("tr").eq(0).show();
		$("#TELEFON_UpdCallNumber").parents("tr").eq(0).show();
		$("#TELEFON_UpdMACAddress").parents("tr").eq(0).show();
		$("#TELEFON_UpdCallLevel").parents("tr").eq(0).show();
		$("#TELEFON_UpdChangeOwner").parents("tr").eq(0).show();
		$("#TELEFON_UpdChangeType").parents("tr").eq(0).show();
		$("#TELEFON_UpdVoiceMail").parents("tr").eq(0).show();
		$("#TELEFON_UpdOtherRequest").parents("tr").eq(0).show();
		$("#TELEFON_Msg_4").parents("tr").eq(0).show();
			
		// Masquage des champs
		// Section Creation		
		$("#TELEFON_Creation_Header").parents("tr").eq(0).hide();
		$("#TELEFON_Building").parents("tr").eq(0).hide();
		$("#TELEFON_Stage").parents("tr").eq(0).hide();		
		$("#TELEFON_Office").parents("tr").eq(0).hide();
		$("#TELEFON_Pilar").parents("tr").eq(0).hide();
		$("#TELEFON_NetCxNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RequestStation").parents("tr").eq(0).hide();
		$("#TELEFON_RequestMultiUserPost").parents("tr").eq(0).hide();
		$("#TELEFON_RequestComments").parents("tr").eq(0).hide();
		$("#TELEFON_WishedDateStart").parents("tr").eq(0).hide();
		$("#TELEFON_CallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_AccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallFilter").parents("tr").eq(0).hide();
		$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
		$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallCenter").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).hide();
		$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3a").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3b").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3c").parents("tr").eq(0).hide();
		
		// Section Removal
		$("#TELEFON_Removal_Header").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RemNetCxNumberNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemPilarNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemOfficeNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemStageNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemBuildingNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumberPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemStation").parents("tr").eq(0).hide();
		$("#TELEFON_RemAction").parents("tr").eq(0).hide();
		$("#TELEFON_RemComments").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_5").parents("tr").eq(0).hide();
		
		// Section Deletion
		$("#TELEFON_Deletion_Header").parents("tr").eq(0).hide();
		$("#TELEFON_DelCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_DelMACAddress").parents("tr").eq(0).hide();
	}
		
	if($(pThis).val().trim().toUpperCase() == "REM") {
		$("#TELEFON_RequestStation").val("");
		
		// Affichage des champs
		// Section Removal
		$("#TELEFON_Removal_Header").parents("tr").eq(0).show();
		$("#TELEFON_RemCxNumber").parents("tr").eq(0).show();
		$("#TELEFON_RemComments").parents("tr").eq(0).show();
		$("#TELEFON_Msg_5").parents("tr").eq(0).show();
		$("#TELEFON_Msg_4").parents("tr").eq(0).show();
		$("#TELEFON_RemAction").parents("tr").eq(0).show();
		$("#TELEFON_RemStation").parents("tr").eq(0).show();
		$("#TELEFON_RemNetCxNumberNew").parents("tr").eq(0).show();
		$("#TELEFON_RemPilarNew").parents("tr").eq(0).show();
		$("#TELEFON_RemOfficeNew").parents("tr").eq(0).show();
		$("#TELEFON_RemStageNew").parents("tr").eq(0).show();
		$("#TELEFON_RemBuildingNew").parents("tr").eq(0).show();

		// Masquage des champs
		// Section Creation	
		$("#TELEFON_Creation_Header").parents("tr").eq(0).hide();	
		$("#TELEFON_Building").parents("tr").eq(0).hide();
		$("#TELEFON_Stage").parents("tr").eq(0).hide();		
		$("#TELEFON_Office").parents("tr").eq(0).hide();
		$("#TELEFON_Pilar").parents("tr").eq(0).hide();
		$("#TELEFON_NetCxNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RequestStation").parents("tr").eq(0).hide();
		$("#TELEFON_RequestMultiUserPost").parents("tr").eq(0).hide();
		$("#TELEFON_RequestComments").parents("tr").eq(0).hide();
		$("#TELEFON_WishedDateStart").parents("tr").eq(0).hide();
		$("#TELEFON_CallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_AccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallFilter").parents("tr").eq(0).hide();
		$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
		$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallCenter").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).hide();
		$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3a").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3b").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3c").parents("tr").eq(0).hide();
		
		// Section Update
		$("#TELEFON_Update_Header").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_UpdMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdAccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOldOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCurrentType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewTypeComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMail").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMailComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOtherRequest").parents("tr").eq(0).hide();
		
		// Section Deletion
		$("#TELEFON_Deletion_Header").parents("tr").eq(0).hide();
		$("#TELEFON_DelCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_DelMACAddress").parents("tr").eq(0).hide();
	}

	if($(pThis).val().trim().toUpperCase() == "DEL") {
		$("#TELEFON_RequestStation").val("");
	
		// Affichage des champs
		// Section Deletion
		$("#TELEFON_Deletion_Header").parents("tr").eq(0).show();
		$("#TELEFON_DelCallNumber").parents("tr").eq(0).show();
		$("#TELEFON_Msg_4").parents("tr").eq(0).show();
		$("#TELEFON_DelMACAddress").parents("tr").eq(0).show();

		// Masquage des champs
		// Section Creation	
		$("#TELEFON_Creation_Header").parents("tr").eq(0).hide();	
		$("#TELEFON_Building").parents("tr").eq(0).hide();
		$("#TELEFON_Stage").parents("tr").eq(0).hide();		
		$("#TELEFON_Office").parents("tr").eq(0).hide();
		$("#TELEFON_Pilar").parents("tr").eq(0).hide();
		$("#TELEFON_NetCxNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RequestStation").parents("tr").eq(0).hide();
		$("#TELEFON_RequestMultiUserPost").parents("tr").eq(0).hide();
		$("#TELEFON_RequestComments").parents("tr").eq(0).hide();
		$("#TELEFON_WishedDateStart").parents("tr").eq(0).hide();
		$("#TELEFON_CallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_AccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallFilter").parents("tr").eq(0).hide();
		$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
		$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallCenter").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).hide();
		$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3a").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3b").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3c").parents("tr").eq(0).hide();
		
		// Section Update
		$("#TELEFON_Update_Header").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_UpdMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdAccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOldOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCurrentType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewTypeComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMail").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMailComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOtherRequest").parents("tr").eq(0).hide();
		
		// Section Removal
		$("#TELEFON_Removal_Header").parents("tr").eq(0).hide();	
		$("#TELEFON_RemAction").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RemNetCxNumberNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemPilarNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemOfficeNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemStageNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemBuildingNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumberPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemStation").parents("tr").eq(0).hide();
		$("#TELEFON_RemComments").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_5").parents("tr").eq(0).hide();
		
	}
	if($(pThis).val().trim().toUpperCase() == "") {
		$("#TELEFON_RequestStation").val("");
		
		// Masquage des champs
		// Section Creation	
		$("#TELEFON_Creation_Header").parents("tr").eq(0).hide();	
		$("#TELEFON_Building").parents("tr").eq(0).hide();
		$("#TELEFON_Stage").parents("tr").eq(0).hide();		
		$("#TELEFON_Office").parents("tr").eq(0).hide();
		$("#TELEFON_Pilar").parents("tr").eq(0).hide();
		$("#TELEFON_NetCxNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RequestStation").parents("tr").eq(0).hide();
		$("#TELEFON_RequestMultiUserPost").parents("tr").eq(0).hide();
		$("#TELEFON_RequestComments").parents("tr").eq(0).hide();
		$("#TELEFON_WishedDateStart").parents("tr").eq(0).hide();
		$("#TELEFON_CallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_AccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallFilter").parents("tr").eq(0).hide();
		$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
		$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).hide();
		$("#TELEFON_CallCenter").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).hide();
		$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).hide();
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3a").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3b").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_3c").parents("tr").eq(0).hide();
		
		// Section Update
		$("#TELEFON_Update_Header").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_UpdMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdAccessComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOldOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdChangeType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdCurrentType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewTypeComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMail").parents("tr").eq(0).hide();
		$("#TELEFON_UpdVoiceMailComments").parents("tr").eq(0).hide();
		$("#TELEFON_UpdOtherRequest").parents("tr").eq(0).hide();

		// Section Removal
		$("#TELEFON_Removal_Header").parents("tr").eq(0).hide();	
		$("#TELEFON_RemAction").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RemNetCxNumberNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemPilarNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemOfficeNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemStageNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemBuildingNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressNew").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumberPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemStation").parents("tr").eq(0).hide();
		$("#TELEFON_RemComments").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_5").parents("tr").eq(0).hide();

		// Section Deletion
		$("#TELEFON_Deletion_Header").parents("tr").eq(0).hide();
		$("#TELEFON_DelCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_4").parents("tr").eq(0).hide();		
	}
	
}

// Calendrier date de rlisation souhaitée - Création d'un poste (minimum date du jour)
function TELEFON_WishedDateStart_DatePicker() {
	var dateMin = new Date();
	dateMin.setTime(dateMin.getTime() - 24*60*60*1000);
	var Day = dateMin.getDate();
	if(Day < 10) Day = "0" + Day;
	var Month = dateMin.getMonth() + 1;
	if(Month < 10) Month = "0" + Month;
	calendrier_datejou.disabledDatesExpression = "";
	calendrier_datejou.addDisabledDates(null, Month + "/" + Day + "/" + dateMin.getFullYear());
	calendrier_heure.hidePopup();
	calendrier_datejou.hidePopup();
	calendrier_datejou.select(document.getElementById("TELEFON_WishedDateStart"), "TELEFON_WishedDateStart", "dd/MM/yyyy");
}

function TELEFON_RequestStation_OnChange() {
	// Liste droit d'appel
	$("#TELEFON_CallLevel").html(
		"<input type=\"radio\" name=\"TELEFON_CallLevel\" id=\"TELEFON_CallLevel\" value=\"INTERNE\" checked=\"checked\" onclick=\"TELEFON_CallLevel_OnClick(this)\")><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel1 + "</label>"
		+"<input type=\"radio\" name=\"TELEFON_CallLevel\" id=\"TELEFON_CallLevel\" value=\"NATIONAL\" checked=\"checked\" onclick=\"TELEFON_CallLevel_OnClick(this)\")><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel2 + "</label>"
		+"<input type=\"radio\" name=\"TELEFON_CallLevel\" id=\"TELEFON_CallLevel\" value=\"INTERNATIONAL\" checked=\"checked\" onclick=\"TELEFON_CallLevel_OnClick(this)\")><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel3 + "</label>"
	);
	// Décoche des options sélectionnées auparavant
	$('input[name="TELEFON_CallLevel"]').attr("checked", false);	
	
	// on affiche pour tous les cas 
	$("#TELEFON_CallLevel").parents("tr").eq(0).show();

	$("#TELEFON_AccessComments").parents("tr").eq(0).hide();
	
	if($("#TELEFON_RequestStation").val().trim() == "FIXE") {
		$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).show();
		$("#TELEFON_CallFilter").parents("tr").eq(0).show();
		$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).show();
		$("#TELEFON_CallCenter").parents("tr").eq(0).show();
		//$("#TELEFON_CallLevel").parents("tr").eq(0).show();
		$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).show();
		$("#TELEFON_CallFilter").parents("tr").eq(0).show();
				
		$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
		$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).hide();
		$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).hide();
		$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).hide();	
		$("#TELEFON_Msg_1a").parents("tr").eq(0).hide();
		
	}
	else {
		$('input[name="TELEFON_UpdCallLevel"]').attr("checked", false);
		$('input[name="TELEFON_VoiceMailFixe"]').attr("checked", false);	
		$('input[name="TELEFON_CallFilter"]').attr("checked", false);	
		$('input[name="TELEFON_InterceptCallFixe"]').attr("checked", false);	
		$('input[name="TELEFON_CallCenter"]').attr("checked", false);		
		
		if($("#TELEFON_RequestStation").val().trim() == "DECT") {
			$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).show();
			$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).show();
			$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).show();
			$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).show();
			$("#TELEFON_Msg_1a").parents("tr").eq(0).show();
			
			$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).hide();
			$("#TELEFON_CallFilter").parents("tr").eq(0).hide();
			$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).hide();
			$("#TELEFON_CallCenter").parents("tr").eq(0).hide();
			$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
			$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
			$("#TELEFON_Msg_2a").parents("tr").eq(0).hide();
		}
		else {
			// Option choix
			// On masque le Call Level si aucun choix sélectionné
			if($("#TELEFON_RequestStation").val().trim() == "") {
				$("#TELEFON_CallLevel").parents("tr").eq(0).hide();
			}						
			$("#TELEFON_VoiceMailFixe").parents("tr").eq(0).hide();
			$("#TELEFON_CallFilter").parents("tr").eq(0).hide();
			$("#TELEFON_InterceptCallFixe").parents("tr").eq(0).hide();
			$("#TELEFON_CallCenter").parents("tr").eq(0).hide();		
			$("#TELEFON_VoiceMailDECT").parents("tr").eq(0).hide();
			$("#TELEFON_MultiSiteDECT").parents("tr").eq(0).hide();
			$("#TELEFON_ReceptMiniMsg").parents("tr").eq(0).hide();
			$("#TELEFON_InterceptCallDECT").parents("tr").eq(0).hide();		
			$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
			$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
			$("#TELEFON_Msg_1a").parents("tr").eq(0).hide();
			$("#TELEFON_Msg_2a").parents("tr").eq(0).hide();
			$("#TELEFON_Msg_3a").parents("tr").eq(0).hide();
			$("#TELEFON_Msg_3b").parents("tr").eq(0).hide();
		}		
	}	
}

function TELEFON_CallLevel_OnClick() {
	if ($("input[name='TELEFON_CallLevel']:checked").val() == "INTERNATIONAL") {
		$("#TELEFON_AccessComments").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_AccessComments").parents("tr").eq(0).hide();		
	}	
}

function TELEFON_CallFilter_OnClick() {
	if ($("input[name='TELEFON_CallFilter']:checked").val() == "Y") {
		$("#TELEFON_NumFilterer").parents("tr").eq(0).show();
		$("#TELEFON_NumFiltered").parents("tr").eq(0).show();
		$("#TELEFON_Msg_2a").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_NumFilterer").parents("tr").eq(0).hide();
		$("#TELEFON_NumFiltered").parents("tr").eq(0).hide();
		$("#TELEFON_Msg_2a").parents("tr").eq(0).hide();
	}	
}

function TELEFON_InterceptCallFixe_OnClick() {
	if ($("input[name='TELEFON_InterceptCallFixe']:checked").val() == "Y") {
		$("#TELEFON_Msg_3a").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_Msg_3a").parents("tr").eq(0).hide();
	}	
}

function TELEFON_InterceptCallDECT_OnClick() {
	if ($("input[name='TELEFON_InterceptCallDECT']:checked").val() == "Y") {
		$("#TELEFON_Msg_3c").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_Msg_3c").parents("tr").eq(0).hide();
	}	
}

function TELEFON_CallCenter_OnClick() {
	if ($("input[name='TELEFON_CallCenter']:checked").val() == "Y") {
		$("#TELEFON_Msg_3b").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_Msg_3b").parents("tr").eq(0).hide();
	}	
}

function TELEFON_UpdCallLevel_OnClick() {
	if ($("input[name='TELEFON_UpdCallLevel']:checked").val() == "Y") {
		$("#TELEFON_UpdNewCallLevel").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_UpdNewCallLevel").parents("tr").eq(0).hide();
		$("#TELEFON_UpdAccessComments").parents("tr").eq(0).hide();
	}	
}

function TELEFON_UpdNewCallLevel_OnChange() {
	if($("#TELEFON_UpdNewCallLevel_Value").val().trim() == "INTERNATIONAL"){
		$("#TELEFON_UpdAccessComments").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_UpdAccessComments").parents("tr").eq(0).hide();
	}
}

function TELEFON_UpdChangeOwner_OnClick() {
	if ($("input[name='TELEFON_UpdChangeOwner']:checked").val() == "Y") {
		$("#TELEFON_UpdOldOwner").parents("tr").eq(0).show();
		$("#TELEFON_UpdNewOwner").parents("tr").eq(0).show();
		$("#TELEFON_UpdComments").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_UpdOldOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewOwner").parents("tr").eq(0).hide();
		$("#TELEFON_UpdComments").parents("tr").eq(0).hide();
	}	
}

function TELEFON_UpdChangeType_OnClick() {
	if ($("input[name='TELEFON_UpdChangeType']:checked").val() == "Y") {
		$("#TELEFON_UpdCurrentType").parents("tr").eq(0).show();
		$("#TELEFON_UpdNewType").parents("tr").eq(0).show();
		$("#TELEFON_UpdNewTypeComments").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_UpdCurrentType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewType").parents("tr").eq(0).hide();
		$("#TELEFON_UpdNewTypeComments").parents("tr").eq(0).hide();
	}	
}

function TELEFON_UpdNewType_OnClick() {
	if ($("input[name='TELEFON_UpdNewType']:checked").val() == "DECT") {
		$("#TELEFON_Msg_1b").parents("tr").eq(0).show();		
	}
	else {
		$("#TELEFON_Msg_1b").parents("tr").eq(0).hide();
	}	
}

function TELEFON_UpdVoiceMail_OnClick() {
	if ($("input[name='TELEFON_UpdVoiceMail']:checked").val() == "ADD") {
		$("#TELEFON_UpdVoiceMailComments").parents("tr").eq(0).show();		
	}
	else {
		$("#TELEFON_UpdVoiceMailComments").parents("tr").eq(0).hide();
	}	
}

function TELEFON_RemAction_OnClick() {
	if ($("input[name='TELEFON_RemAction']:checked").val() == "NUMERO") {
		$("#TELEFON_RemCallNumber").parents("tr").eq(0).show();
		$("#TELEFON_RemMACAddress").parents("tr").eq(0).show();
		$("#TELEFON_RemCallNumberPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressPoste").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddressNew").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_RemCallNumber").parents("tr").eq(0).hide();
		$("#TELEFON_RemMACAddress").parents("tr").eq(0).hide();
		$("#TELEFON_RemCallNumberPoste").parents("tr").eq(0).show();
		$("#TELEFON_RemMACAddressPoste").parents("tr").eq(0).show();
		$("#TELEFON_RemMACAddressNew").parents("tr").eq(0).hide();
	}	
}