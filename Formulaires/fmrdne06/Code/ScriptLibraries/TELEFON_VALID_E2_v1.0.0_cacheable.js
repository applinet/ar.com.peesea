// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 
	
	// Liste droit d'appel 
	if(TELEFON_RequestType == "CRE") {
		if(TELEFON_RequestStation == "SERV") {
			var strHTML = "<input type=\"radio\" name=\"TELEFON_CallLevel\" id=\"TELEFON_CallLevel\" value=\"INTERNE\"" + (TELEFON_CallLevel == "INTERNE" ? " checked" : "")  + " ><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel1 + "</label>";
			strHTML += "<input type=\"radio\" name=\"TELEFON_CallLevel\" id=\"TELEFON_CallLevel\" value=\"NATIONAL\"" + (TELEFON_CallLevel == "NATIONAL" ? " checked" : "")  + " ><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel2 + "</label>";
			strHTML += "<input type=\"radio\" name=\"TELEFON_CallLevel\" id=\"TELEFON_CallLevel\" value=\"INTERNATIONAL\"" + (TELEFON_CallLevel == "INTERNATIONAL" ? " checked" : "")  + " ><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel3 + "</label>";
		}	
		else { 
			var strHTML = "<input type=\"radio\" value=\"INTERNE\" id=\"TELEFON_CallLevel\" name=\"TELEFON_CallLevel\"" + (TELEFON_CallLevel == "INTERNE" ? " checked" : "") + " onclick=\"TELEFON_CallLevel_OnClick(this)\")><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel1 + "</label>";
			strHTML += "<input type=\"radio\" value=\"NATIONAL\" id=\"TELEFON_CallLevel\" name=\"TELEFON_CallLevel\"" + (TELEFON_CallLevel == "NATIONAL" ? " checked" : "") + " onclick=\"TELEFON_CallLevel_OnClick(this)\")><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel2 + "</label>";
			strHTML += "<input type=\"radio\" value=\"INTERNATIONAL_LIMITED\" id=\"TELEFON_CallLevel\" name=\"TELEFON_CallLevel\"" + (TELEFON_CallLevel == "INTERNATIONAL_LIMITED" ? " checked" : "") + " onclick=\"TELEFON_CallLevel_OnClick(this)\")><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel4 + "</label>";
			strHTML += "<input type=\"radio\" value=\"INTERNATIONAL_FULL\" id=\"TELEFON_CallLevel\" name=\"TELEFON_CallLevel\"" + (TELEFON_CallLevel == "INTERNATIONAL_FULL" ? " checked" : "") + " onclick=\"TELEFON_CallLevel_OnClick(this)\")><label for=\"TELEFON_CallLevel\">" + l_TELEFON_CallLevel5 + "</label>";
		}
		// on affiche pour tous les cas 
		$("#TELEFON_CallLevel").html(strHTML).parents("tr").eq(0).show();
		
	}	
		
	if(TELEFON_RequestType == "UPD") {
	
		// création de la liste déroulante des nouveaux droits d'appel en sélectionnant la valeur précédemment choisie
		var strHTML = "<select id=\"TELEFON_UpdNewCallLevel_Value\" name=\"TELEFON_UpdNewCallLevel\";\">";
		strHTML += "<option" + (TELEFON_UpdNewCallLevel == "INTERNE" ? " selected" : "") + " value=\"INTERNE\">" + l_TELEFON_CallLevel1 + "</option>";
		strHTML += "<option" + (TELEFON_UpdNewCallLevel == "NATIONAL" ? " selected" : "") + " value=\"NATIONAL\">" + l_TELEFON_CallLevel2 + "</option>";
		strHTML += "<option" + (TELEFON_UpdNewCallLevel == "INTERNATIONAL_LIMITED" ? " selected" : "") + " value=\"INTERNATIONAL_LIMITED\">" + l_TELEFON_CallLevel4 + "</option>";
		strHTML += "<option" + (TELEFON_UpdNewCallLevel == "INTERNATIONAL_FULL" ? " selected" : "") + " value=\"INTERNATIONAL_FULL\">" + l_TELEFON_CallLevel5 + "</option>";		
		strHTML += "</select>";

		// on affiche pour tous les cas
		$("#TELEFON_UpdNewCallLevel").html(strHTML).parents("tr").eq(0).show();
	}


});

// Soumission
function TELEFON_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;
	
	if(TELEFON_RequestStation == "SERV") {
		// Call level - Droits d'appel
		if (($("input[name='TELEFON_CallLevel']:checked").val() == "")||($("input[name='TELEFON_CallLevel']:checked").val() == undefined)) { DisplayErrMsgOnField("TELEFON_CallLevel", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_CallLevel + "\" !"); return false; };
	}

	if(TELEFON_RequestStation == "SERV") {
		// Call level - Droits d'appel
		if (($("input[name='TELEFON_CallLevel']:checked").val() == "")||($("input[name='TELEFON_CallLevel']:checked").val() == undefined)) { DisplayErrMsgOnField("TELEFON_CallLevel", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_CallLevel + "\" !"); return false; };
	}

	
	// Confirmation de la soumission
	if(confirm(l_Conf_Submit)) {
		FormHasBeenSent = true;
		$("#f_ActionAFaire").val("soumettre");
		document.forms[0].submit();
	}
}

function TELEFON_CallLevel_OnClick() {
	if (($("input[name='TELEFON_CallLevel']:checked").val() == "INTERNATIONAL_LIMITED")||($("input[name='TELEFON_CallLevel']:checked").val() == "INTERNATIONAL_FULL")) {
		$("#TELEFON_AccessComments").parents("tr").eq(0).show();
	}
	else {
		$("#TELEFON_AccessComments").parents("tr").eq(0).hide();		
	}	
}

