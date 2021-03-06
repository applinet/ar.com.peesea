// Variables globales à toutes les fonctions
// Champs en cours d'utilisation
gActiveField = "";
gActiveStartDateField = "";
gActiveEndDateField = "";

// On va lancer une boucle de scrutation, pour desélectionner le champs quand le calendrier sera masqué
// C'est bourin (technique inspiré des boucles de génération d'image DirectX), mais cela évite de modifier le calendrier
var Interval1;



// Cette fonction écrit un texte dans le document.
function Print(pTxt) {
	document.write(pTxt);
}


// Cette fonction supprime les espaces surnuméraires
function Trim(pStr) {
	try {

		Ereg = /  /;
		while(Ereg.test(pStr)) {
			pStr = pStr.replace(/  /gi, " ");
		}

		pStr = pStr.replace(/^\s/gi, "");
		pStr = pStr.replace(/\s$/gi, "");
		pStr = pStr.replace(/^\r/gi, "");
		pStr = pStr.replace(/\r$/gi, "");
		pStr = pStr.replace(/^\n/gi, "");
		pStr = pStr.replace(/\n$/gi, "");
		
		return pStr;
	}
	catch(Err) {
		return pStr;
	}
}


// Cette fonction vérifie si un champs texte est vide
function IsTextFieldEmpty(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}

		if(Field != undefined) {
			if(Trim(Field.value) == "") {
				return true;
			}
		}
	
		return false;
	}
	catch(Err) {
		return false;
	}
}


// Cette fonction vérifie si un champs texte contient une date valide
function IsADate(pFieldName) {
	try {

		var DateFormat = /^\d\d\/\d\d\/\d\d\d\d$/;

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}

		if(Field != undefined) {
			if(!IsTextFieldEmpty(pFieldName) & DateFormat.test(Field.value)) return true;
		}
		
		return false;
	}
	catch(Err) {
		return false;
	}
}


// Cette fonction vérifie si un champs texte contient un nombre
function IsANumber(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}
		
		if(Field != undefined) {
			if(!IsTextFieldEmpty(pFieldName) & !isNaN(Trim(Field.value))) return true;
		}
		
		return false;
	}
	catch(Err) {
		return false;
	}
}


// Cette fonction vérifie si un champs texte contient un entier
function IsAnInteger(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}
		
		if(Field != undefined) {
			var RegExp = /^[0-9]+$/;
			if(RegExp.test(Trim(Field.value))) return true;
		}
		
		return false;
	}
	catch(Err) {
		return false;
	}
}


// Cette fonction vérifie si le texte de l'option sélectionnée dans une liste est vide
function IsSelectFieldTextEmpty(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}

		if(Field != undefined) {
			if(Trim(Field.options[Field.selectedIndex].text) == "") {
				return true;
			}
		}

		return false;
	}
	catch(Err) {
		return false;
	}
}


// Cette fonction vérifie si un bouton est sélectionné parmis des boutons radios
function IsRadioButtonChecked(pFieldName) {
	try {

		Fields = document.getElementsByName(pFieldName);
		if((Fields != undefined) && (Fields.length > 1)) {
			
			// On boucle sur les choix
			for(var i = 0; i < Fields.length; i++) {
				if(Fields[i].checked) return true;
			}
		}

		return false;
	}
	catch(Err) {
		return false;
	}
}


// Cette fonction affiche un message d'erreur sur un champs et lui donne le focus
function DisplayErrMsgOnField(pFieldName, pMsg) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}
	
		if(Field != undefined) {
			Field.focus();
			alert(pMsg);
		}
	}
	catch(Err) {
	}
}


// Cette fonction renvoi le texte de l'option sélectionnée dans une liste
function GetSelectedOptionText(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}

		if(Field != undefined) {
			return Field.options[Field.selectedIndex].text;
		}
		
		return "";
	}
	catch(Err) {
		return "";
	}
}

// Cette fonction sélectionne un option dans un liste, en ce basant sur le texte de l'option
function SelectOptionByText(pFieldName, pText) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}

		if(Field != undefined) {
			for(var i = 0; i < Field.options.length; i++) {
				if(Field.options[i].text == pText) {
					Field.selectedIndex = i;
				}
			}
		}

	}
	catch(Err) {
	}
}


// Cette fonction retourne un objet date depuis un champs
function GetDateFromField(pFieldName) {
	try{

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}

		if(Field != undefined) {

			// Si la date est saisie et au bon format
			if(!IsTextFieldEmpty(pFieldName) & IsADate(pFieldName))
				return new Date(Field.value.substr(6, 4), Field.value.substr(3, 2) - 1, Field.value.substr(0, 2));			
			else
				return null;
		}
	}
	catch(Err) {
		return null;
	}
}


// Cette fonction retourne un nombre depuis un champs
function GetNumberFromField(pFieldName) {
	try{

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}

		if(Field != undefined) {
		
			// Si le nombre est saisie et au bon format
			if(!IsTextFieldEmpty(pFieldName) & IsANumber(pFieldName))
				return Number(Trim(Field.value));
		}

		return NaN;
	}
	catch(Err) {
		return NaN;
	}
}


// Cette fonction renvoie l'indice du bouton radio coché
function GetCheckedRadioButtonIndex(pFieldName) {
	try {

		Fields = document.getElementsByName(pFieldName);
		if((Fields != undefined) && (Fields.length > 1)) {
			
			// On boucle sur les choix
			for(var i = 0; i < Fields.length; i++) {
				if(Fields[i].checked) return i;
			}
		}

		return null;
	}
	catch(Err) {
		return null;
	}
}


// Cette fonction retourne la valeur d'un champs texte
function GetTextFieldValue(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}
		if(Field != undefined) return Field.value;

	}
	catch(Err) {
	}
}

// Cette fonction définie la valeur d'un champs texte
function SetTextFieldValue(pFieldName, pValue) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Fields = document.getElementsByName(pFieldName);
			if(Fields.length > 0) Field = Fields[0];
		}
		if(Field != undefined) Field.value = pValue;

	}
	catch(Err) {
	}
}


// Cette fonction converti les virgules en point (pour les champs numériques)
function ConvertCommaToDot(pString) {
	try {
		return pString.replace(/,/, ".");
	}
	catch(Err) {
		return pString;
	}
}

function FieldFocusAndClick(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field != undefined) 
		{
			Field.focus();
			Field.click();
		}
	
	}
	catch(Err) {
	}
}

function FieldFocus(pFieldName) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field != undefined) 
		{
			Field.focus();
			Field.click();
		}
	
	}
	catch(Err) {
	}
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//										FONCTIONS GENERIQUES JAVASCRIPT
//								17/11/08 : 
//											Version 1 : Sylvain DIDELOT
//
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//									DEFINITION DES CONSTANTES
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var END_WITHOUT_ERROR = 0;
var UNDEFINED_ID = -1;
var NOT_A_FIELD_HOUR = -2;
var NOT_A_FIELD_DATE = -3;
var NOT_A_FORMAT_HOUR = -4;
var NOT_A_FORMAT_DATE = -5;
var NO_ITEM_SELECTED = -6;
var EMPTY_FIELD = -7;
var FALSE_COMPARISON = -8;
var TRY_CATCH_ERROR = -9

// On passe le debug_mod à 0 (par défaut on n'affiche aucune alert)
var debug_mod = 0;

// Variables globales pour les heures
gMessageError = "";
gType = "";
gOtherField = "";

// Dates du jour
// Dates avec un décalage d'un jour (pour l'affichage du calendrier)
var TodayFakeDate;
var TodayFake;

// Dates actuelles, sans décalage
var TodayDate;
var Today;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//									Heure actuelle
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
var Today = new Date();
Hour = Today.getHours()+":"+Today.getMinutes()

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//									Dates du jour
//				Calculs des dates du jour qui seront utilisées 
//						par la suite dans toutes les fonctions 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Calcul de la date du jour - 1 jour (utilie à l'affichage pour le calendrier)
var TodayFakeDate = new Date();
// mise au format des éléments de date
var Day = TodayFakeDate.getDate()-1;
if(Day < 10) Day = "0" + Day;

var Month = TodayFakeDate.getMonth() +1;
if(Month < 10) Month = "0" + Month;

// Date du jour
TodayFake = Month + "/" + Day + "/" + TodayFakeDate.getFullYear();

// On recré l'objet Date
TodayFakeDate = new Date(TodayFakeDate.getFullYear(),Month,Day,0,0,0);


// Calcul de la date du jour - 1 jour (utilie à l'affichage pour le calendrier)
var TodayDate = new Date();
// mise au format des éléments de date
var Day = TodayDate.getDate();
if(Day < 10) Day = "0" + Day;

var Month = TodayDate.getMonth();
if(Month < 10) Month = "0" + Month;

// Date du jour
Today = Month + "/" + Day + "/" + TodayDate.getFullYear();

// On recré l'objet Date
TodayDate = new Date(TodayDate.getFullYear(),TodayDate.getMonth(),TodayDate.getDay,0,0,0);
var TodayDateWithHour = new Date();


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//													FieldMandatory
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fonction permettant de vérifier si un champ obligatoire contient bien une valeur
// pFieldName	: Nom du champ qui contient la date (sous la forme jj/mm/aaaa) 
// pAction			: Action a exécuter dans le cas d'un champ vide :
//				FocusAndClick :	On focus sur le champ et on clique
//				Focus : 				On focus sur le champ sans cliquer
function FieldMandatory(pFieldName, pAction) {
	try {

		// On donne la priorité à l'attribut id sur l'attribut name
		var Field = document.getElementById(pFieldName);
		if(Field == undefined) {
			var Field = document.getElementsByName(pFieldName);
		}

		if(Field == undefined) { throw UNDEFINED_ID };

			FieldName = eval("l_" + pFieldName);
					

			// Si c'est une liste déroulante
			if(Field.nodeName.toUpperCase() == "SELECT") {

				// Si rien n'est sélectionner
				if(Field.selectedIndex == -1) {

					alert(l_ErrChampObligatoire + "\"" + FieldName + "\"");
					Field.focus();

					// On retourne faux dans la fonction
					throw NO_ITEM_SELECTED;

				}
				// Si l'élément sélectionné à un attribut "value" vide
				else if(Trim(Field.options[Field.selectedIndex].value) == "") {

					alert(l_ErrChampObligatoire + "\"" + FieldName + "\"");
					Field.focus();

					// On retourne faux dans la fonction
					throw EMPTY_FIELD;

				}			
	
			}
			// Si c'est un champ texte
			else {

				if(Trim(Field.value) == "") {
		
					alert(l_ErrChampObligatoire + "\"" + FieldName + "\"");
				
					// Si c'est un simple focus
					if (pAction=="Focus")
						Field.focus();
					// Si on doit également cliqué sur le champ
					else if (pAction=="FocusAndClick") {
								Field.focus();
								Field.onclick();
					}
					// On retourne faux dans la fonction
					throw EMPTY_FIELD;
				}

			}
	
		return END_WITHOUT_ERROR;
	}
	catch(Err) {
		throw Err;
		return false;
	}
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//													CompareWithToday
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fonction permettant de vérifier si la date du champ est supérieure à la date du jour
// pFieldName	: Nom du champ qui contient la date (sous la forme jj/mm/aaaa) 
// pHour				: Nom du champ qui contient l'heure (au format hh:mm). 
//						Dans le cas ou il n'y a pas d'heure, indiquer null
function CompareWithToday(pFieldName,pHour,pSign,pMessageAlert) {
	try {	
		// On récupère le contenu du champ
		var Field = document.getElementById(pFieldName);

		// On teste si le champ est indéfini ou vide. Si c'est le cas, on quitte la fonction
		if( Field == undefined | IsTextFieldEmpty(pFieldName)) { throw EMPTY_FIELD; }
		
		// On teste que le format de la date est bien conforme. Si c'est pas le cas, on retourne une erreur et on quitte la fonction

		if( ! IsADate(pFieldName)) { 
			alert(l_ErrDateFormat);
			Field.focus();
			Field.onclick();
			throw NOT_A_FIELD_DATE; 
		}
		
		// Si on a pas indiqué d'heure
		if(pHour == null) 
		{
			// On forme un objet date avec le contenu du champ		
			var DateField = null;
			DateField = new Date(Field.value.substr(6, 4), Field.value.substr(3, 2) - 1, Field.value.substr(0, 2), 0, 0, 0);
			
			// On effectue le test
			if ( ! eval("DateField"+pSign+"TodayDate")) {
				alert(pMessageAlert);
				Field.focus();
				Field.onclick();
				throw FALSE_COMPARISON; 		
			}
		}
		
		// Si on a indiqué une heure
		else 
		{
			// On forme un objet date avec le contenu du champ		
			// On vérifie que le champ existe 
			var FieldHour = document.getElementById(pHour);
			if (FieldHour == undefined)
				throw UNDEFINED_ID;

			// On vérifie que c'est bien une heure que l'on rentre en paramètre
			var HeureFormat = new RegExp("[0-9]{2}[:][0-9]{2}"); 
			if (! HeureFormat.test(FieldHour.value)) 
				throw NOT_A_FORMAT_HOUR;

			var DateField = null;
			DateField = new Date(Field.value.substr(6, 4), Field.value.substr(3, 2) - 1, Field.value.substr(0, 2), FieldHour.value.substr(0,2), FieldHour.value.substr(3,2), 0);
	

			// On effectue le test
			if ( ! eval("DateField"+pSign+"TodayDateWithHour")) {
				alert(pMessageAlert);
				Field.focus();
				Field.onclick();
				throw FALSE_COMPARISON; 		
			}		
		}
	
	
		return END_WITHOUT_ERROR;
	}
	catch(Err) {
		//alert(Err.toString());
		throw Err;
	}
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//													CompareWithOtherField
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fonction permettant de vérifier si la date du champ est supérieure à la date du jour
// pFieldName1	: Nom du champ qui contient la première date pour la comparaison(sous la forme jj/mm/aaaa) 
// pHour	1			: Nom du champ qui contient la première heure pour la comparaison(au format hh:mm). 
// pFieldName2	: Nom du champ qui contient la deuxième date pour la comparaison(sous la forme jj/mm/aaaa) 
// pHour	2			: Nom du champ qui contient la deuxième heure pour la comparaison(au format hh:mm). 
//						Dans le cas ou il n'y a pas d'heure (pour pHour1 et pHour2), indiquer null
// pSign				: Signe pour la comparaison (admet <, > <= ou =>)
//pMessageAlert	: Message d'alerte dans le cas ou la comparaison n'est pas valide

function CompareWithOtherField(pFieldName1,pHour1,pFieldName2,pHour2,pSign,pMessageAlert) {

try {	

		// On récupère le contenu des champs
		var Field1 = document.getElementById(pFieldName1);
		var Field2 = document.getElementById(pFieldName2);

		// On teste si les champs sont indéfinis ou vide. Si c'est le cas, on quitte la fonction
		if( Field1 == undefined | IsTextFieldEmpty(pFieldName1)) { return false; }
		if( Field2 == undefined | IsTextFieldEmpty(pFieldName2)) { return false; }
		
		// On teste que le format de la date est bien conforme. Si c'est pas le cas, on retourne une erreur et on quitte la fonction
		if( ! IsADate(pFieldName1)) { 
			alert(l_ErrDateFormat);
			Field.focus();
			Field.onclick();
			throw NOT_A_FORMAT_DATE; 
		}
		
		if( ! IsADate(pFieldName2)) { 
			alert(l_ErrDateFormat);
			Field.focus();
			Field.onclick();
			throw NOT_A_FORMAT_DATE; 
		}
		
		// On forme des objets date avec les contenus des champs		
		var DateField1 = null;
		var DateField2 = null;

		// Si on a pas indiqué d'heure
		if(pHour1 == null | pHour2 == null) 
		{
			// On forme un objet date avec le contenu du champ		
			DateField1 = new Date(Field1.value.substr(6, 4), Field1.value.substr(3, 2) - 1, Field1.value.substr(0, 2), 0, 0, 0);
			DateField2 = new Date(Field2.value.substr(6, 4), Field2.value.substr(3, 2) - 1, Field2.value.substr(0, 2), 0, 0, 0);
		
		}
		
		// Si on a indiqué une heure
		else 
		{
			// On forme un objet date avec le contenu du champ		
			// On vérifie que le champ existe 
			var FieldHour1 = document.getElementById(pHour1);
			var FieldHour2 = document.getElementById(pHour2);

			if (FieldHour1 == undefined)
				throw UNDEFINED_ID;
			
			if (FieldHour2 == undefined)
				throw UNDEFINED_ID;
			
			// On vérifie que c'est bien une heure que l'on rentre en paramètre
			var HeureFormat = new RegExp("[0-9]{2}[:][0-9]{2}"); 
			if (! HeureFormat.test(FieldHour1.value)) 
				throw NOT_A_FORMAT_HOUR;

			if (! HeureFormat.test(FieldHour2.value)) 
				throw NOT_A_FORMAT_HOUR;
		
			// On forme un objet date avec le contenu du champ		
			DateField1 = new Date(Field1.value.substr(6, 4), Field1.value.substr(3, 2) - 1, Field1.value.substr(0, 2), FieldHour1.value.substr(0,2), FieldHour1.value.substr(3,2), 0);
			DateField2 = new Date(Field2.value.substr(6, 4), Field2.value.substr(3, 2) - 1, Field2.value.substr(0, 2), FieldHour2.value.substr(0,2), FieldHour2.value.substr(3,2), 0);
		}

		if ( ! eval("DateField1"+pSign+"DateField2")) {
			alert(pMessageAlert);
			Field2.focus();
			Field2.onclick();
			throw FALSE_COMPARISON; 		
		}
		return END_WITHOUT_ERROR;
	}
	catch(Err) {
		throw Err;
	}
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//													CompareWithOtherField
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fonction Javascript permettant de griser des dates dans un calendrier.
// Id : 			Id du champ texte
// DateFrom :  Date de début pour le grisement des dates
// DateTo : 		Date de fin pour le grisement des dates
// Les dates DateFrom et DateTo peuvent être "null".
// oX : 			Offset pour le calendrier (en X) 
// oX : 			Offset pour le calendrier (en Y)

function ClickDate(Id, DateFrom, DateTo, oX, oY) {

	// Reset des dates indisponibles
	calendrier_datejou.disabledDatesExpression = "";

	calendrier_heure.hidePopup();
		

	// On vérifie que les arguments obligatoires soient bien présents
	if (Id == undefined) 
		throw UDEFINED_ID;
		
	// On vérifie le format de la date passée en paramètre
	//if(!DateFormat.test(DateRef) & DateRef != "Today")
	//	return -3;
	
	// On vérifie que les arguments soient bien passés, sinon on utilise des valeurs par défaut
	if (oX == undefined | oY == undefined) {
		// On positionne le calendrier
		calendrier_datejou.offsetX = 0;
		calendrier_datejou.offsetY = 23;
	}
	else {
		// On positionne le calendrier
		calendrier_datejou.offsetX = oX; 
		calendrier_datejou.offsetY = oY;
	}
			
	// On calcule la date de début
	DateFrom = ClickDateFormat(DateFrom);

	// On calcule la date de fin
	DateTo = ClickDateFormat(DateTo);
	
	// On désélectionne les dates d'aujourd'hui jusqu'à oo si les deux champs sont au moins différents de null
	if (DateFrom == null & DateTo == null) {
		calendrier_datejou.addDisabledDates(null,TodayFake);
	} 
	else {
		calendrier_datejou.addDisabledDates(DateFrom,DateTo);
	}
	
	// On affiche le calendrier
	calendrier_datejou.select(document.getElementById(Id),Id,'dd/MM/yyyy'); 

	return false;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fonction appelée par ClickDate qui permet de configurer DateFrom ou DateTo
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function ClickDateFormat(pDate)  {
	// Déclaration des constantes 
	var DateFormat = /^\d\d\/\d\d\/\d\d\d\d$/;

	// Si c'est null, on ne touche à rien
	if (pDate==null) {

	}
	
	// Si on compare avec la date d'aujourd'hui
	else if (pDate=="Today") {
		pDate = TodayFake;
		//alert(TodayFake);
	}

	// Si on compare avec une date (au format __/__/____)
	else if (DateFormat.test(pDate)) {
	}
	
	
	// Sinon peut-être que c'est un champ
	else {
		pDate = document.getElementById(pDate)
		
		// Si aucun champ ne correspond ou le champ est vide
		if (	pDate == undefined)	{
			throw UNDEFINED_ID;
		}
		
		// Alors c'est un champ, on récupère la valeur pour tester son format 
		// Si le champ est vide, c'est normal, on continue
		if (!DateFormat.test(pDate.value) & !pDate.value=="") {
			throw NOT_A_FORMAT_DATE;
		}
		
		// Si le champ est vide, on le passe à null
		if (Trim(pDate.value)=="") {

			pDate=null;
		}
		
		else {
			// Si on arrive là, tout est OK
			// On enlève également un jour à la date pour le masquage des dates
			//var DateField = null;
			//DateField = new Date(pDate.value.substr(6, 4), pDate.value.substr(3, 2), pDate.value.substr(0, 2), 0, 0, 0);
			
			// mise au format des éléments de date
			var Day = pDate.value.substr(0, 2)-1;
			if(Day < 10) Day = "0" + Day;

			var Month = pDate.value.substr(3, 2);
			if(Month < 10) Month = "0" + Month;
			
			pDate = Month + "/"+Day+"/"+pDate.value.substr(6, 4);
		}
	}
	return pDate
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Cette fonction ouvre le calendrier pour "Heure de fin"
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function ClickTime(pId, pType, pOtherField,pMessage) {
	try {

		// Champs en cour d'utilisation
		 gActiveField = pId;

		// "Sélection" du champ
		StartSelectedFieldLookup();

		// On cache le calendrier
		calendrier_datejou.hidePopup();

		// Alignement légérement différent entre IE et FireFox
		if(navigator.appName.indexOf("Microsoft") > -1)	
			calendrier_heure.offsetX = 0;
		else
			calendrier_heure.offsetX = 0;

		calendrier_heure.offsetY = 25;

		// Si tous les arguments pour le contrôle de la date ont été passés, on initialise les variables globales
		if (Trim(pMessage) != undefined & Trim(pType) != undefined & Trim(pOtherField) != undefined) 
		{
			gMessageError = pMessage;
			gType = pType;
			gOtherField = pOtherField;
		}
		else
		{
			gMessageError = "";
			gType = "";
			gOtherField = "";
		}
	
		calendrier_heure.returnTimeFunction = "UpdateTime";
		calendrier_heure.select(document.getElementById(pId), pId, 'HH:mm');
		return false;
	}
	catch(Err) {
		throw Err;
	}
}



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Cette fonction se charge de mettre à jour le champs Heure
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function UpdateTime() {
	try {

		pHour = Number(document.getElementById("selectHours").value);
		pMin = Number(document.getElementById("selectMinutes").value);

		// Mise au bon format
		if(pHour < 10) pHour = "0" + pHour;
		if(pMin < 10) pMin = "0" + pMin;

		// On fait le contrôle nécessaire pour vérifier ce qui a été rentré.
		if (Trim(gMessageError) != "" & Trim(gType) != "" & Trim(gOtherField) != "")
		{

			gOtherField = document.getElementById(gOtherField);
			
			// Si le champ n'existe pas
			if (gOtherField == undefined) throw UNDEFINED_ID;

			// Si le champ est vide, on quitte le if

			if (Trim(gOtherField.value) != "" )
			{
				// On formate les heures pour les comparer	
				var FieldHour = String(pHour)+String(pMin);
				var OtherFieldHour = String(gOtherField.value.substr(0, 2))+ String(gOtherField.value.substr(3, 5));
			
				if (!eval("FieldHour"+gType+"OtherFieldHour"))
				{
					alert	(gMessageError);
					gActiveField = "";
					throw FALSE_COMPARISON;
				}	
			}
		}
		// Modification de la valeur du champ
		document.getElementById(gActiveField).value = pHour + ":" + pMin;
		
		// Reset
		gActiveField = "";
	}
	catch(Err) {
		throw Err;
	}
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Cette fonction se charge de sélectionner un champ
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function StartSelectedFieldLookup(pFieldName) {
	try {

		Field = document.getElementById(pFieldName);
		if(Field != undefined) {
			Field.className = "CalDown";

			// On planifie une scrutation
			Interval1 = window.setInterval(DeselectCalendarFields, 50);

		}
	}
	catch(Err) {
		window.clearInterval(Interval1);
	}
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Cette fonction se charge de dé-sélectionner les champs
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function DeselectCalendarFields() {
	try {

		// Si les calendriers sont masqués
		if((document.getElementById("cal_datjou").style.visibility == "hidden") && (document.getElementById("cal_time").style.visibility == "hidden")) {

			// On boucle sur les champs
			for(var i = 0; i < document.forms[0].elements.length; i++) {

				// Si le champ est sélectionné
				if(document.forms[0].elements[i].className == "CalDown")
					document.forms[0].elements[i].className = "CalUp";
			}

			window.clearInterval(Interval1);
			
		}
	}
	catch(Err) {
		window.clearInterval(Interval1);
	}
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//													CatchError
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fonction Javascript permettant de gérer le cas où il y a des erreurs. Aucune erreur n'est traitée quand debug_mod = 1.
function CatchError(Err) {

	var MessageError;
				//alert(Err)
	if ( debug_mod == 1) 
	{
		switch (Err)
		{
			case END_WITHOUT_ERROR :
				MessageError = "END_WITHOUT_ERROR";
				break;
			case UNDEFINED_ID :
				MessageError = "UNDEFINED_ID";
				break;
			case NOT_A_FIELD_HOUR :
				MessageError = "NOT_A_FIELD_HOUR";
				break;
			case NOT_A_FIELD_DATE :
				MessageError = "NOT_A_FIELD_DATE";
				break;
			case NOT_A_FORMAT_HOUR :
				MessageError = "NOT_A_FORMAT_HOUR";
				break;
			case NOT_A_FORMAT_DATE :
				MessageError = "NOT_A_FORMAT_DATE";
				break;
			case NO_ITEM_SELECTED :
				MessageError = "NO_ITEM_SELECTED";
				break;
			case EMPTY_FIELD :
				MessageError = "EMPTY_FIELD";
				break;
			case FALSE_COMPARISON :
				MessageError = "FALSE_COMPARISON";
				break;
			case TRY_CATCH_ERROR :
				MessageError = "TRY_CATCH_ERROR";
				break;
			default : 
				MessageError = "Message indéfini : \n"+Err.message;
				break
		}
		//MessageError = MessageError + line;
		alert (MessageError);
		return false;
	} 
	else 
		return true;
}

function SelectNABEntry(fName) {
	var pathname = (window.location.pathname);
	var win=window.open(pathname.substring(0,(pathname.lastIndexOf('.nsf')+5))+'m_DlgBoxSelectNAB?OpenForm&Login&Lng='+CurrentUserLng+'&Field='+fName,'Address','status=no,resizable=yes,scrollbars=No,screenX=120,screenY=100,width=800,height=500');	
	win.focus();
}

function SelectSingleNABEntry(fName) {
	var pathname = (window.location.pathname);
	var win=window.open(pathname.substring(0,(pathname.lastIndexOf('.nsf')+5))+'m_DlgBoxSelectSingleNAB?OpenForm&Login&Lng='+CurrentUserLng+'&Field='+fName,'Address','status=no,resizable=yes,scrollbars=No,screenX=120,screenY=100,width=700,height=500');	
     win.focus();
}

function SelectSinglePerson(fName) {
	var url = self.window.location.href;
	var win=window.open(url.substring(0,(url.lastIndexOf('.nsf')+5))+'m_DlgBoxSelectPerson?OpenForm&Login&Lng='+CurrentUserLng+'&Field='+fName,'Address','status=no,resizable=Yes,scrollbars=no,screenX=120,screenY=100,width=400,height=500');	
	win.focus();
}
function SelectOneGroupe(fName) {
	var url = self.window.location.href;
	var win=window.open(url.substring(0,(url.lastIndexOf('.nsf')+5))+'m_DlgBoxSelectGroupe?OpenForm&Login&Lng='+CurrentUserLng+'&Field='+fName,'Address','status=no,resizable=Yes,scrollbars=no,screenX=120,screenY=100,width=400,height=500');	
	win.focus();
}