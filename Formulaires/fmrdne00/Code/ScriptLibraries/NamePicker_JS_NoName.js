// Tester l'exécution des fonctions de Callback// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *// Ouverture de la popup PSA Address Book// // Elle va construire un arbre JSON pour le nom sélectionné et le renvoyer// aux fonctions de callback et/ou renseigner les champs en paramètres avec les balises spécifiées// Paramètres://	- pOptions: tableau associatif////		- 'Directory': 'LDAP' ou 'NAB' ou 'View': indique que la popup doit récupérer des informations via l'annuaire LDAP ou le PSA Adress's Books//			 -  NAB par défaut////		- 'Type': 'Balfon'/'Group'/'Person': tableau indiquant les types de noms qui peuvent être choisis: ex "{'Person', 'Balfon'}"//			-  tout type par défaut////		- 'ViewName': Nom de la vue de recherche//			-  aucune valeur par défaut////		- 'RestrictToCategory': Nom de la catégorie de la vue//			-  aucune valeur par défaut////		- 'Database': Chemin suivi du nom de la base pour un appel de Directory = View//			-  aucune valeur par défaut////		- 'Count': entier, qui correspond au nombre de résultat à retourner//			-  20 par défaut////		- 'Multiple': true/false : permet la sélection d'un ou plusieurs noms//			- false par défaut////		- 'MultipleSeparator': chaine de caractères utilisée comme séparateur des valeurs retournées lors d'une sélection multiple.//			- ", " par défaut////		- 'MultipleInitialisationValue': tableau de noms, valeurs par défaut de la liste de sélection multiple.//			- noms "Canonical"////		- 'CallBackFields': tableau associatif,//			- chaque valeur doit correspondre à une "arborecence" JSON.//			******* Si le valeur n'existe pas, il y a une erreur ********////		- 'OKCallBackFunction': fonction de callback appelée lors du clic sur le bouton "OK". Recevra en paramètres://			- la réponse AJAX si tableau multiple//			- le(s) nom(s) au format JSON sinon (chaine ou tableau de chaine selon l'option 'Multiple')////		- 'CancelCallBackFunction': fonction de callback appelée lors du click sur le bouton "Annuler". Recevra en paramètres://			- le(s) nom(s) au format JSON////// Si on fait une recherche simple, le paramètre multiple est à true, l'arbre JSON est de la forme : //		[//			{//				user : "value",//				CallBackFields[0] : "value",//				CallBackFields[1] : "value",//				...				<== il y a une virgule en trop !!!!//			},//			{//				user : "value",//				...				<== il y a une virgule en trop !!!!//			},//			...					<== il y a une virgule en trop !!!!//		]//// Si on fait une recherche simple, le paramètre multiple est à false, l'arbre JSON est de la forme :  //		[//			{//				user : "value",//				CallBackFields[0] : "value",//				CallBackFields[1] : "value",//				...//			},					<== il y a une virgule en trop !!!!//		]//var json;// variable JSON à retourner dans la fonction de CallBackvar SelectedCallBack = new Array();function NamePicker(pOptions) {	SelectedCallBack = new Array();		//  - - - - - - - - - - Vérification de la cohérence des paramètres, Définition des paramètres par défaut, si le paramètre est absent - - - - - - - - - -	// Si on ne reçoit aucuns paramètres	if(pOptions == undefined) return false;			// Valeurs par défaut - Directory	if(pOptions["Directory"] == undefined) pOptions["Directory"] = "NAB";		// Valeurs par défaut - Database et ViewName	if(pOptions["Directory"] == "NAB")	{		pOptions["Database"] = "fmr00/base/fmrdnnam.nsf"		pOptions["ViewName"] = getViewNameForNAB(pOptions["Type"]);	}		// Valeurs par défaut - Count	if(pOptions["Count"] == undefined) pOptions["Count"] = 20;		// Valeurs par défaut - Multiple	if(pOptions["Multiple"] == undefined) pOptions["Multiple"] = false;		// Valeurs par défaut - Séparateur des valeurs	if(pOptions["MultipleSeparator"] == undefined) pOptions["MultipleSeparator"] = ", ";			// - - - - - - - - - - Création de la popup - - - - - - - - - -	var HTML = "<div style=\"display: none;\" id=\"NamePicker\"" + (pOptions["Multiple"] ? "multiple=\"multiple\"" : "") + ">";		HTML += "<table id=\"NamePicker_Layout\" style=\"width: " + (pOptions["Multiple"] ? "734" : "334") + "px;\" cellpadding=\"0\" cellspacing=\"0\">";		HTML += "<tr>";			HTML += "<td id=\"NamePicker_Layout_Cell11\"><label>" + l_NamePicker_SearchWhat + " :</label><input type=\"text\" id=\"NamePicker_FindText\" style=\"width: 8em;\"><button class=\"ui-state-default\" id=\"NamePicker_FindButton\">" + l_NamePicker_Find + "</button></td>";			if(pOptions["Multiple"]) HTML += "<td id=\"NamePicker_Layout_Cell12\"></td>";			if(pOptions["Multiple"]) HTML += "<td id=\"NamePicker_Layout_Cell13\"></td>";		HTML += "</tr>";		HTML += "<tr>";			if((pOptions["Directory"] == "NAB") && (jQuery.inArray("Person", pOptions["Type"]) > -1)) {				HTML += "<td><span class=\"small-help\">" + l_NamePicker_SearchWhat_NAB + "</span></td>";			} else if(pOptions["Directory"] == "LDAP") {				HTML += "<td><span class=\"small-help\">" + l_NamePicker_SearchWhat_LDAP + "</span></td>";			}			if(pOptions["Multiple"]) HTML += "<td></td>";			if(pOptions["Multiple"]) HTML += "<td></td>";		HTML += "</tr>";		HTML += "<tr>";			HTML += "<td id=\"NamePicker_Layout_Cell21\" style=\"width: 334px; vertical-align: top;\"><select id=\"NamePicker_EntryList\" size=\"" + pOptions["Count"] + "\"></select></td>";			if(pOptions["Multiple"]) {				HTML += "<td id=\"NamePicker_Layout_Cell22\">";					HTML += "<button class=\"ui-state-default\" id=\"NamePicker_MultipleAddButton\">&gt;&gt;</button><br>";					HTML += "<button class=\"ui-state-default\" id=\"NamePicker_MultipleRemoveButton\">&lt;&lt;</button>";				HTML += "</td>";				HTML += "<td id=\"NamePicker_Layout_Cell23\" style=\"width: 334px; vertical-align: top;\">";					HTML += "<select id=\"NamePicker_MultipleEntryList\" size=\"" + pOptions["Count"] + "\" multiple=\"multiple\">";					if((pOptions["MultipleInitialisationValue"] != undefined) && (pOptions["MultipleInitialisationValue"] != "")) {						jQuery.each(pOptions["MultipleInitialisationValue"], function(i, val) {							var TempCanonicalString = val;							if(TempCanonicalString.toLowerCase().indexOf("/users/") != -1)								TempCanonicalString = "cn=" + TempCanonicalString.replace(/\/users\//gi, "/ou=users/o=");							else if(TempCanonicalString.toLowerCase().indexOf("/bf/") != -1)								TempCanonicalString = "cn=" + TempCanonicalString.replace(/\/bf\//gi, "/ou=bf/o=");							SelectedCallBack.push(TempCanonicalString.replace(/cn=/gi, "").replace(/ou=/gi, "").replace(/o=/gi, ""));							HTML += "<option value=\"" + TempCanonicalString.replace(/cn=/gi, "").replace(/ou=/gi, "").replace(/o=/gi, "") + "\">" + TempCanonicalString.replace(/cn=/gi, "").replace(/ou=/gi, "").replace(/o=/gi, "") + "</option>";						});					}					HTML += "</select>";				HTML += "</td>";			}		HTML += "</tr>";		HTML += "</tr>";			HTML += "<td id=\"NamePicker_Layout_Cell31\">";				HTML += "<button class=\"ui-state-default\" id=\"NamePicker_PrevButton\">" + l_NamePicker_Prev + "</button>";				HTML += "<button class=\"ui-state-default\" id=\"NamePicker_NextButton\">" + l_NamePicker_Next + "</button>";			HTML += "</td>";			if(pOptions["Multiple"]) {				HTML += "<td id=\"NamePicker_Layout_Cell31\"></td>";				HTML += "<td id=\"NamePicker_Layout_Cell33\">";					HTML += "<button class=\"ui-state-default\" id=\"NamePicker_MultipleClearButton\">" + l_NamePicker_ClearMultipleList + "</button>";				HTML += "</td>";			}		HTML += "</tr>";	HTML += "</table>";	HTML += "<input type=\"hidden\" id=\"NamePicker_EntryListIndex\" value=\"1\">";	HTML += "</div>";	$("body").append(HTML);			// Au clique dans la zone de résultat de la recherche	$("#NamePicker_EntryList").click(function() {		$("#NamePicker_EntryList").removeAttr("disabled");		if ($("#NamePicker").attr("multiple") == "multiple") {			setButtonEnabledMultiple();		} else {			setButtonEnabledSimple()		}	});		// Au clique sur la zone de sélection multiple	$("#NamePicker_MultipleEntryList").click(function() {		$("#NamePicker_EntryList").removeAttr("disabled");		if ($("#NamePicker").attr("multiple") == "multiple") {			setButtonEnabledMultiple();		} else {			setButtonEnabledSimple()		}	});		// - - - - - - - - - - Rechercher - - - - - - - - - -	// Click sur le bouton "Chercher"	$("#NamePicker_FindButton").click(function() {			// Si le champ de recherche est renseigné		if (($("#NamePicker_FindText").val() != "") && ($("#NamePicker_FindText").val().length > 2)) {					//****Ajouter un trim pour la chaine ""*****			// On initialise les paramètres d'appels, puis on lance la requête			NamePicker_LoadData(NamePicker_SetURLparams(pOptions), pOptions["Directory"], pOptions["Type"], pOptions["Count"]);						// On met à jour l'index à 1 pour une recherche LDAP			if((pOptions["Directory"] == "LDAP") && ($("#NamePicker_EntryListIndex").val() > 1)) {				// On ajoute "Count" au nombre de l'index (l'index correspond à la première valeur de la vue des résultats)				$("#NamePicker_EntryListIndex").val(1);			}					// Sinon on affiche un message d'erreur		} else {			alert(l_NamePicker_Err_EmptyFindText);			return false		}			});		// On recupère les entrées du clavier dans le champ de recherche	$("#NamePicker_FindText").keyup(function(e) {		// Si le nombre d'entrée est supérieur ou égal à 3 on autorise la recherche		if ($("#NamePicker_FindText").val().length >= 3) {			// On rend le bouton de recherche actif			$("#NamePicker_FindButton").removeAttr("disabled");			$("#NamePicker_FindButton").removeClass("ui-state-disable");						// "Entrée" dans le champ de recherche			if(e.which == 13) { $("#NamePicker_FindButton").click(); }					// Sinon on la rend inactif		} else {					// On rend le bouton de recherche inactif			$("#NamePicker_FindButton").attr("disabled", "disabled");			$("#NamePicker_FindButton").addClass("ui-state-disable");		}			});	// - - - - - - - - - - Pagination - - - - - - - - - - 	// Click sur le bouton "Précédent"	$("#NamePicker_PrevButton").click(function() {		// On initialise les paramètres d'appels, puis on lance la requête		NamePicker_LoadData(NamePicker_SetURLparams(pOptions, Math.max(1, Number($("#NamePicker_EntryListIndex").val()) - Number(pOptions["Count"]))), pOptions["Directory"], pOptions["Type"], pOptions["Count"]);				// Si LDAP et si on a de nouveaux résultats, on met à jour l'index		if((pOptions["Directory"] == "LDAP") && ($("#NamePicker_EntryListIndex").val() > 1)) {			// On ajoute "Count" au nombre de l'index (l'index correspond à la première valeur de la vue des résultats)			$("#NamePicker_EntryListIndex").val(Math.max(1, Number($("#NamePicker_EntryListIndex").val()) - pOptions["Count"]));		}			});	// Click sur le bouton "Suivant"	$("#NamePicker_NextButton").click(function() {		// On initialise les paramètres d'appels, puis on lance la requête		NamePicker_LoadData(NamePicker_SetURLparams(pOptions, Number($("#NamePicker_EntryListIndex").val()) + Number(pOptions["Count"])), pOptions["Directory"], pOptions["Type"], pOptions["Count"]);		// Si LDAP et si on a de nouveaux résultats, on met à jour l'index		if(pOptions["Directory"] == "LDAP") {			// On ajoute "Count" au nombre de l'index (l'index correspond à la première valeur de la vue des résultats)			$("#NamePicker_EntryListIndex").val(Number($("#NamePicker_EntryListIndex").val()) + pOptions["Count"]);		}			});	// - - - - - - - - - - Traitement popup multiple - - - - - - - - - -	// Click sur le bouton ">>" (ajout à la liste de sélection multiple)	$("#NamePicker_MultipleAddButton").click(function() {		// Nom sélectionné dans la popup		var SelectedName = jQuery.trim($("#NamePicker_EntryList").val());				// Une valeur est sélectionnée		if(SelectedName != "") {						// Si LDAP, la valeur séléctionnée est identifiée par l'attribut indice			if (pOptions["Directory"] == "LDAP")				var Attribut = $("#NamePicker_EntryList option:selected").attr("indice");				// Si PSA's Addresse Book ou Vue spécifique, la valeur séléctionnée est identifiée par l'attribut unid			else				var Attribut = $("#NamePicker_EntryList option:selected").attr("unid");						// on ajoute la valeur séléctionnée à la liste multiple			NamePicker_MultipleEntryList_AddName(SelectedName.replace(/cn=/gi, "").replace(/ou=/gi, "").replace(/o=/gi, ""), pOptions["Directory"], Attribut, SelectedCallBack);		}				// On met à jour l'état des boutons		setButtonEnabledMultiple();	});		// Click sur le bouton "<<" (retrait de la liste de sélection multiple)	$("#NamePicker_MultipleRemoveButton").click(function() {			// On supprime la valeur selectionner de la variable de retour		SelectedCallBack = jQuery.grep(SelectedCallBack, function(value) {			alert(value + "---" + $("#NamePicker_MultipleEntryList").val());			return value != $("#NamePicker_MultipleEntryList").val();		});				// On supprime la valeur sélectionnée		$("#NamePicker_MultipleEntryList option:selected").remove();				// On met à jour l'état des boutons		setButtonEnabledMultiple();	});		// Click sur le bouton "Vider la liste"	$("#NamePicker_MultipleClearButton").click(function() {				// On supprime de la variable de retour		SelectedCallBack = new Array();			// On vide la liste		$("#NamePicker_MultipleEntryList").empty();				// On met à jour l'état des boutons		setButtonEnabledMultiple();	});	// - - - - - - - - - - Comportement de la popup - - - - - - - - - - 	// Définition du comportement de la popup	$("#NamePicker").dialog({		bgiframe: true,		autoOpen: false,		modal: true,		resizable: false,		title: l_NamePicker_Title,		width: (pOptions["Multiple"] ? 750 : 350),		buttons: {			// Bouton OK			OK: function() {								// - - - - - - - - - - récuparation des informations à renvoyer - - - - - - - - - -				// si on doit retourner les informations				if((pOptions["CallBackFields"] != undefined) && (pOptions["Multiple"] == false)){									// Tableau des personnes séléctionnées					var SelectedObject = new Array();					//- - - - - - - - - - Récupération des utilisateurs - - - - - - - - - -					// Si popup simple					SelectedObject.push($("#NamePicker_EntryList option:selected"));									// Si PSA's Adress Book, on appelle l'agent qui retourne du JSON					if(pOptions["Directory"] != "LDAP") {											// - - - - - - - - - - Renvoi des noms au format adéquate - - - - - - - - - -						var DisplayName = new Array();												for(key in pOptions["CallBackFields"]) {							if(pOptions["CallBackFields"][key] == "CanonicalName") {								DisplayName["CanonicalName"] = SelectedObject[0].val();//								pOptions["CallBackFields"][key].val(DisplayName);								delete(pOptions["CallBackFields"][key]);							}							if(pOptions["CallBackFields"][key] == "AbbreviatedName") {								DisplayName["AbbreviatedName"] = SelectedObject[0].val().replace(/cn=/gi, "").replace(/ou=/gi, "").replace(/o=/gi, "");//								pOptions["CallBackFields"][key].val(DisplayName.replace(/cn=/gi, "").replace(/ou=/gi, "").replace(/o=/gi, ""));								delete(pOptions["CallBackFields"][key]);							}							if(pOptions["CallBackFields"][key] == "CommonName") {								DisplayName["CommonName"] = SelectedObject[0].val().substring(0, SelectedObject[0].val().indexOf("/"));//								pOptions["CallBackFields"][key].val(DisplayName.substring(0, DisplayName.indexOf("/")));								delete(pOptions["CallBackFields"][key]);							}						}												// La propriété length n'est pas applicable pour les tableaus associatif, alors on parcour le tableau pour savoir sa taille						var numberFields = 0;						for(var key in pOptions["CallBackFields"]){               							  numberFields++;						}												// Si la taille de pOptions["CallBackFields"] est > 0 on lance la requête à l'agent, sinon on ne fait rien						if(numberFields != 0) {							// - - - - - - - - - - Construction de l'url pour le requête AJAX - - - - - - - - - -							// Eléments pour la reconstruction d'une URL 							var URL = window.location.href;							URL = URL.substring(0, URL.indexOf(".nsf") - 8);							URL = URL + "fmrdne00.nsf";							// On concatène les UniqueIDs du ou des utilisateurs séleectionnés							var Unid = "";							var TempString = "";							var Database = "&Database=" + pOptions["Database"].replace(/\//gi,"§");														// Pour chaque valeur de la liste de nom							for(key in SelectedObject) {								// On recupère l'attribut unid								TempString = SelectedObject[key].attr("unid");																// On ajoute la valeur dans Unid								Unid = Unid + TempString + ",";							}														// Si Unid contient au moins une valeur							if (Unid.length > 0) {								Unid = "&Unid=" + Unid.substring(0, Unid.length - 1);							}														// On concatène les informations à récupérer							var Fields = "";							// Pour chaque CallBackFields							for(key in pOptions["CallBackFields"]) {								Fields = Fields + pOptions["CallBackFields"][key] + ",";							}							Fields =  "&Fields=" + Fields.substring(0, Fields.length - 1);														URL = URL + "/NamePicker_GetNameJSONInfos?OpenAgent" + Database + Unid + Fields;							// - - - - - - - - - - Requête AJAX - - - - - - - - - - 							$.ajax({								url: URL,								async: false,								type: 'GET',								dataType: 'json',								timeout: 30000,								// Echec de la requête								error: function(XMLHttpRequest, textStatus, errorThrown) {									alert(l_NamePicker_Err_AJAX);								},								// Réussite de la requête								success: function(json) {																		// on retourne les informations de la variable json									SelectedCallBack = json;										}							});						}												if (SelectedCallBack[0] == undefined) {							SelectedCallBack[0] = new Array();						}						// Pour chaque CallBackFields						for(key in DisplayName) {							SelectedCallBack[0][key] = DisplayName[key];						}											} else if(pOptions["Directory"] == "LDAP") {						SelectedCallBack.push(eval("json[" + SelectedObject[0].attr('indice') + "]"));					}				}				// - - - - - - - - - - Appelle de la fonction de CallBack ***				// Fonction de callback				if(pOptions["OKCallBackFunction"] != undefined) {					pOptions["OKCallBackFunction"].call("", SelectedCallBack);				}								// Fermeture de la popup				$("#NamePicker").dialog("close");			},			// Bouton "Annuler"			Cancel: function() {							// - - - - - - - - - - Appelle de la fonction de CallBack - - - - - - - - - - 				if(pOptions["CancelCallBackFunction"] != undefined) {					pOptions["CancelCallBackFunction"].call("");				}								$(this).dialog("close");							}		},		open: function() {				// A l'ouverture, changement dynamique des libellés des boutons (en dur par jQuery)			$(this).parents(".ui-dialog").find("button:contains('OK')").attr("id", "NamePicker_OKButton");			$("#NamePicker_OKButton").text(l_NamePicker_OK);			$(this).parents(".ui-dialog").find("button:contains('Cancel')").attr("id", "NamePicker_CancelButton");			$("#NamePicker_CancelButton").text(l_NamePicker_Cancel);						// On met le focus sur le champs de rechercher			$("#NamePicker_FindText").focus();						// On met à jour l'état des boutons			if ($("#NamePicker").attr("multiple") == "multiple") {				setButtonEnabledMultiple();			} else {				setButtonEnabledSimple();			}			$("#NamePicker_PrevButton").attr("disabled", "disabled");			$("#NamePicker_PrevButton").addClass("ui-state-disable");			$("#NamePicker_NextButton").attr("disabled", "disabled");			$("#NamePicker_NextButton").addClass("ui-state-disable");			$("#NamePicker_FindButton").attr("disabled", "disabled");			$("#NamePicker_FindButton").addClass("ui-state-disable");						// Interrogation de la vue si la directory est View			if (pOptions["Directory"] == "View") {				NamePicker_LoadData(NamePicker_SetURLparams(pOptions), pOptions["Directory"], pOptions["Type"], pOptions["Count"]);			}					},		close: function() {					// Destruction de la popup pour forcer sa reconstruction. En effet, sinon les événements ne sont pas reconstruits,			// et donc la popup se baserait toujours sur les options reçues à la première ouverture...			$("#NamePicker").dialog("destroy");			$("#NamePicker").remove();		}	});		// Ouverture de la popup	$("#NamePicker").dialog("open");}//******************************************************************// On rend inactif les boutons de la popup//******************************************************************function setButtonDisabled() {	// bouton précédent	$("#NamePicker_PrevButton").attr("disabled", "disabled");	$("#NamePicker_PrevButton").addClass("ui-state-disable");		// bouton suivant	$("#NamePicker_NextButton").attr("disabled", "disabled");	$("#NamePicker_NextButton").addClass("ui-state-disable");		// bouton OK	$("#NamePicker_OKButton").attr("disabled", "disabled");	$("#NamePicker_OKButton").addClass("ui-state-disable");		if($("#NamePicker").attr("multiple") == "multiple") {		// bouton >>		$("#NamePicker_MultipleAddButton").attr("disabled", "disabled");		$("#NamePicker_MultipleAddButton").addClass("ui-state-disable");			// bouton <<		$("#NamePicker_MultipleRemoveButton").attr("disabled", "disabled");		$("#NamePicker_MultipleRemoveButton").addClass("ui-state-disable");			// bouton Vider		$("#NamePicker_MultipleClearButton").attr("disabled", "disabled");		$("#NamePicker_MultipleClearButton").addClass("ui-state-disable");	}}//******************************************************************// On rend actif les boutons de la popup simple//******************************************************************function setButtonEnabledSimple() {		// bouton OK	if ($("#NamePicker_EntryList option:selected").val() != undefined) {		$("#NamePicker_OKButton").removeAttr("disabled");		$("#NamePicker_OKButton").removeClass("ui-state-disable");	} else {		$("#NamePicker_OKButton").attr("disabled", "disabled");		$("#NamePicker_OKButton").addClass("ui-state-disable");	}}//******************************************************************// On rend actif les boutons de la popup multiple//******************************************************************function setButtonEnabledMultiple() {	// bouton >>	// Si une valeur est sélectionnée dans la zone de résultat	if ($("#NamePicker_EntryList option:selected").val() != undefined) {		$("#NamePicker_MultipleAddButton").removeAttr("disabled");		$("#NamePicker_MultipleAddButton").removeClass("ui-state-disable");	} else {		$("#NamePicker_MultipleAddButton").attr("disabled", "disabled");		$("#NamePicker_MultipleAddButton").addClass("ui-state-disable");	}	// bouton <<	// Sinon, une valeur est sélectionnée dans la zone multiple	if ($("#NamePicker_MultipleEntryList option:selected").val() != undefined) {		$("#NamePicker_MultipleRemoveButton").removeAttr("disabled");		$("#NamePicker_MultipleRemoveButton").removeClass("ui-state-disable");	} else {		$("#NamePicker_MultipleRemoveButton").attr("disabled", "disabled");		$("#NamePicker_MultipleRemoveButton").addClass("ui-state-disable");	}	// bouton Vider	// Si la zone est vide, on cache la bouton "OK"	if ($("#NamePicker_MultipleEntryList option").val() != undefined) {		$("#NamePicker_MultipleClearButton").removeAttr("disabled");		$("#NamePicker_MultipleClearButton").removeClass("ui-state-disable");	} else {		$("#NamePicker_MultipleClearButton").attr("disabled", "disabled");		$("#NamePicker_MultipleClearButton").addClass("ui-state-disable");	}		// bouton OK	$("#NamePicker_OKButton").removeAttr("disabled");	$("#NamePicker_OKButton").removeClass("ui-state-disable");}//******************************************************************// On active/désactive les boutons "Précédent", "Suivant"//******************************************************************function setPaginationButton(pCount) {	// bouton Précédent	if (Number($("#NamePicker_EntryListIndex").val()) == 1) {		$("#NamePicker_PrevButton").attr("disabled", "disabled");		$("#NamePicker_PrevButton").addClass("ui-state-disable");	} else {		$("#NamePicker_PrevButton").removeAttr("disabled");		$("#NamePicker_PrevButton").removeClass("ui-state-disable");	}		// bouton Suivant	if ($("#NamePicker_EntryList option").length < pCount) {		$("#NamePicker_NextButton").attr("disabled", "disabled");		$("#NamePicker_NextButton").addClass("ui-state-disable");	} else {		$("#NamePicker_NextButton").removeAttr("disabled");		$("#NamePicker_NextButton").removeClass("ui-state-disable");	}}//******************************************************// Formater les paramètre de l'url, pour les appels AJAX//******************************************************function NamePicker_SetURLparams(pOptions, pIndex) {	var pURLparams;		// - - - - - - - - - - Annuaire LDAP - - - - - - - - - - 	if (pOptions["Directory"] == "LDAP") {		// Si on n'a pas de valeur d'index, alors on l'initialise à 1 pour afficher les premiers résultats de la recherche		if (pIndex == null)			pIndex = 1;				// on initialise la servlet qu'on appelle		var Servlet = "/servlet/ServletLDAP";				// On concatène les valeurs de CallBackFields séparer par ","		var Fields = "";		for(key in pOptions["CallBackFields"]) {			Fields = Fields + pOptions["CallBackFields"][key] + ",";		}				// On supprime la dernière virgule en trop		Fields = Fields.substring(0, Fields.length - 1);				// Chaine de paramètre pour l'appelle LDAP		if (Fields.length > 0) {			pURLparams = Servlet + "?Find=" + $("#NamePicker_FindText").val() + "&Index=" + pIndex + "&Count=" + pOptions["Count"] + "&Fields=" + Fields;		} else {			pURLparams = Servlet + "?Find=" + $("#NamePicker_FindText").val() + "&Index=" + pIndex + "&Count=" + pOptions["Count"];		}		// - - - - - - - - - - PSA's Address Book  ou vue quelconque- - - - - - - - - - 	} else {		// On détermine la vue sur laquelle on doit chercher		var Vue = "/" + pOptions["Database"] + "/" + pOptions["ViewName"] + "?ReadViewEntries";				if (pOptions["RestrictToCategory"] != undefined) {			Vue = Vue + "&RestrictToCategory=" + pOptions["RestrictToCategory"];		}				// Si on n'a pas de valeur d'index, alors on chercher sur le nom		if (pIndex == null)			pURLparams = Vue + "&StartKey=" + $("#NamePicker_FindText").val() + "&Count=" + pOptions["Count"];		// Sinon, on se déplace directement à l'index demandé		else			pURLparams = Vue + "&Start=" + pIndex + "&Count=" + pOptions["Count"];	}		return pURLparams}//************************************// Appels AJAX, chargement des entrées//************************************function NamePicker_LoadData(pURLparams, pDirectory, pType, pCount) {	// On rend les boutons inactifs	setButtonDisabled();	// On vide la liste	$("#NamePicker_EntryList").empty();	$("#NamePicker_EntryList").append("<option value=\"\">" + l_NamePicker_Loading + "</option>");	$("#NamePicker_EntryList").attr("disabled","disabled");	// Eléments pour la reconstruction d'une URL 	var URL = window.location.href;	var Proto = URL.substring(0, URL.indexOf("://"));	var Domain = URL.substring(URL.indexOf("://") + 3, URL.length);	Domain = Domain.substring(0, Domain.indexOf("/"));	URL = Proto + "://" + Domain + pURLparams;		// Requête AJAX	$.ajax({		url: URL,		type: 'GET',		dataType: (pDirectory == "LDAP" ? 'json' : 'xml'),		timeout: 30000,		// Echec de la requête		error: function(XMLHttpRequest, textStatus, errorThrown) {			alert(l_NamePicker_Err_AJAX);		},		// Réussite de la requête		success: function(back) {					// On vide la zone de résultat			$("#NamePicker_EntryList").empty();			// Si on appelle l'annuaire LDAP			if (pDirectory == "LDAP") {				// On initialise l'index après l'appelle de la fonction "NamePicker_LoadData"							// On met le retour de la requête dans la variable globale json				json = back;								// Pour toutes les personnes retournées par la requête				for(i in json) {					// On ajoute l'élément à la liste avec l'attribut indice qui contient la position de l'utilisateur dans la variable globale					var user = json[i].user;					var Option = "<option value=\"" + user + "\"" + "indice=\"" + i + "\"" + " >" + user + "</option>"											$("#NamePicker_EntryList").append(Option);				}							// Si on appelle le PSA's Address Book			} else {							// On initialise l'index en récupérant la position du premier résultat				$("#NamePicker_EntryListIndex").val($(back).find("viewentry").eq(0).attr("position"));							if (pDirectory == "NAB") {					var Name = "DisplayInPicker";				}								// Pour chaque résultat de la requête				$(back).find("viewentry").each(function() {									// On ajoute l'élément à la liste avec l'attribut unid qui contient l'id unique de l'utilisateur					var unid = $(this).attr("unid");					var text = $(this).find("entrydata[name=" + Name + "]").text();					var Option = "<option value=\"" + text + "\"" + "unid=\"" + unid + "\">" + text + "</option>"										$("#NamePicker_EntryList").append(Option);				});			}						// Double clic sur les options sélectionnés			$("#NamePicker_EntryList option").dblclick(function() {				// Si popup multiple				if($("#NamePicker").attr("multiple") == "multiple") {					$("#NamePicker_MultipleAddButton").click();				// Si popup simple				} else {					$("#NamePicker_OKButton").click();				}			});						// On met à jour l'état des boutons Suivant et Précédent			setPaginationButton(pCount);		},		// On met à jour l'état des autres boutons		complete: function() {			$("#NamePicker_EntryList").removeAttr("disabled");			if ($("#NamePicker").attr("multiple") == "multiple") {				setButtonEnabledMultiple();			} else {				setButtonEnabledSimple()			}		}	});}//******************************************************************// Vérification de la cohérence d'un nom sélectionné (type autorisé)//******************************************************************function NamePicker_CheckNameType(pName, pAllowedTypes) {	// Si le "OU" est égale à "USERS", c'est une personne	// Si le "OU" est égal à "BF", c'est une boite fonctionnelle	// Type du nom sélectionné dans la popup	if((pName.toLowerCase().indexOf("ou=users") != -1) || (pName.toLowerCase().indexOf("/users") != -1))	{	var pNameType = "Person"; }	else if((pName.toLowerCase().indexOf("ou=bf") != -1) || (pName.toLowerCase().indexOf("/bf") != -1))		{	var pNameType = "Balfon"; }			// Boite fonctionnelle sélectionnée, et boites fonctionnelles pas autorisées	if((pNameType == "Balfon") && (jQuery.inArray("Balfon", pAllowedTypes) == -1)) {		// Si uniquement les personnes sont autorisées		if(jQuery.inArray("Person", pAllowedTypes) != -1) {			alert(l_NamePicker_BalfonWhereAsPersonOnly_Alert); return false;		}	}	// Personne sélectionnée, et personnes pas autorisées	else if((pNameType == "Person") && (jQuery.inArray("Person", pAllowedTypes) == -1)) {		// Si uniquement les personnes sont autorisées		if(jQuery.inArray("Balfon", pAllowedTypes) != -1) {			alert(l_NamePicker_PersonWhereAsBalfonOnly_Alert); return false;		}	}		// Arrivé ici, tout va bien	return true;}//******************************************************************// Récupération de la vue à appelé en fonction du type défini//******************************************************************function getViewNameForNAB(pType){	// Personne	if(jQuery.inArray("Person", pType) != -1) {		// On affiche le text d'aide		$(".small-help").text(l_NamePicker_SearchWhat_NAB);				// Si les boites fonctionnelles et group sont présent		if((jQuery.inArray("Balfon", pType) != -1) && (jQuery.inArray("Group", pType) != -1))			return "$PeopleAndBalfonAndGroups";					// Si les boites fonctionnelles sont dans la place		else if(jQuery.inArray("Balfon", pType) != -1)			return "$PeopleAndBalfon";					// Si les groups sont here man		else if(jQuery.inArray("Group", pType) != -1)			return "$PeopleAndGroups";					// Sinon Personne sans amis		else			return "$People";	}	// Boite fonctionnelle	else if(jQuery.inArray("Balfon", pType) != -1) {		// On supprime le text d'aide		$(".small-help").text("");				// Si les groupes sont aussi présents		if(jQuery.inArray("Group", pType) != -1)			return "$BalfonAndGroups";					// Sinon Balfon solo		else			return "$Balfon";	}	// Groupe	else if(jQuery.inArray("Group", pType) != -1) {			// On supprime le text d'aide		$(".small-help").text("");				return "$Groups";	}}//******************************************************************************************// Ajout d'une entrée dans la liste de sélection multiple (insertion par ordre alphabétique)//******************************************************************************************function NamePicker_MultipleEntryList_AddName(pName, pDirectory, Attribut, SelectedCallBack) {	// Si le nom n'est pas déja présent dans la liste	if($("#NamePicker_MultipleEntryList option[value='" + pName.replace(/\'/gi, "&quot;") + "']").length == 0) {		var OptionAdded = false;		// Option a insérer		if (pDirectory == "NAB") {			var OptionHTML = "<option value=\"" + pName + "\"" + "unid=\"" + Attribut + "\">" + pName + "</option>";			SelectedCallBack.push(pName);		} else if(pDirectory == "LDAP") {			var OptionHTML = "<option value=\"" + pName + "\"" + "indice=\"" + Attribut + "\">" + pName + "</option>";			SelectedCallBack.push(eval("json[" + Attribut + "].user"));		} else if(pDirectory == "View") {			var OptionHTML = "<option value=\"" + pName + "\"" + "unid=\"" + Attribut + "\">" + pName + "</option>";			SelectedCallBack.push(pName);		}		// Si il y a déjà des options		if($("#NamePicker_MultipleEntryList option").length != 0) {			// Parcour des options existantes			$("#NamePicker_MultipleEntryList option").each(function() {				if(jQuery.trim($(this).val()) > jQuery.trim(pName)) {					$(this).before(OptionHTML);					OptionAdded = true;					return false;				}			});						// Si l'option n'a pas été ajoutée, ajout à la fin de la liste			if(!OptionAdded)				$("#NamePicker_MultipleEntryList").append(OptionHTML);					}		// Si il n'y a pas d'options, ajout de la nouvelle		else{			$("#NamePicker_MultipleEntryList").append(OptionHTML);		}				// Double clic sur les options		$("#NamePicker_MultipleEntryList option").dblclick(function() {			$("#NamePicker_MultipleRemoveButton").click();		});					}}