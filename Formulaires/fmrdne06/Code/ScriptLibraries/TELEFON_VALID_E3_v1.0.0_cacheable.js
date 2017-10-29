// jQuery
$(document).ready(function() {

	// Définition des textareas redimentionnables
	$("textarea").addClass("ui-widget-content").resizable( { handles: "s", minHeight: 50 }); 
});

// Soumission
function TELEFON_Submit() {

	// Anti double clic
	if(fmr.document.hasBeenSent) return false;

	// Expressions régulières
	var regexpDate = /^(([3][0-1])|([0-2][0-9]))\/(([1][0-2])|([0][0-9]))\/((19)|(20))[0-9][0-9]$/;

	// Réalisateur
	if($("#TELEFON_StxDirector").val().trim() == "") { DisplayErrMsgOnField("TELEFON_StxDirector", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_StxDirector + "\" !"); return false; };

	// Date de réalisation STX (supèrieure ou égale à la date du jour) 
	var strTmp = $("#TELEFON_StxDateStart").val().trim();
	if(strTmp == "") { DisplayErrMsgOnField("TELEFON_StxDateStart", l_Forms_Err_ChampObligatoire + "\"" + l_TELEFON_StxDateStart + "\""); return false; }
	if(!regexpDate.test(strTmp)) { DisplayErrMsgOnField("TELEFON_StxDateStart", l_Forms_Err_DateFormat); return false; }

	// Date au plus tôt >= J
	var dateToday = new Date();
	dateToday.setHours(0);
	dateToday.setMinutes(0);
	dateToday.setSeconds(0);
	dateToday.setMilliseconds(0);
	var dateEarliest = new Date(strTmp.strRightBack("/"), strTmp.strRight("/").strLeft("/") - 1, strTmp.strLeft("/"), 0, 0, 0);
	if(dateEarliest.getTime() < dateToday.getTime()) { DisplayErrMsgOnField("TELEFON_StxDateStart", l_TELEFON_StxDateStart_ErrTooLow); return false; }
	
	// Confirmation de la soumission
	if(confirm(l_Conf_Submit)) {
		FormHasBeenSent = true;
		$("#f_ActionAFaire").val("soumettre");
		document.forms[0].submit();
	}
}

// Calendrier date de réalisation STX (minimum date du jour)
function TELEFON_StxDateStart_DatePicker() {
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
	calendrier_datejou.select(document.getElementById("TELEFON_StxDateStart"), "TELEFON_StxDateStart", "dd/MM/yyyy");
}
