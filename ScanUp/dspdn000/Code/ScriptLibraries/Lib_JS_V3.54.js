var scanup = {

    // Tri croissant/décroissant d'une colonne
    sortTable: function(numCol, asc) {
		var myTable = document.getElementById("tableSearchResult").getElementsByTagName("table")[0];
		var myRows = myTable.rows;


		// Boucle sur les lignes du tableau HTML, pour les mettre dans un tableau temporaire
		var arrTemp = [];
		for(var i = 1, j = myRows.length; i < j; i++) {
			arrTemp.push(myRows[i].cloneNode(true));
		}


		// Tri du tableau temporaire
		arrTemp.sort(function(a, b) {
			a.getElementsByTagName("td")[numCol].textContent = a.getElementsByTagName("td")[numCol].textContent || a.getElementsByTagName("td")[numCol].innerText;
			b.getElementsByTagName("td")[numCol].textContent = b.getElementsByTagName("td")[numCol].textContent || b.getElementsByTagName("td")[numCol].innerText;
					
			// Tri sur la colonne
			if(a.getElementsByTagName("td")[numCol].textContent > b.getElementsByTagName("td")[numCol].textContent) {
				return (asc ? 1 : -1);
			}
			else if(a.getElementsByTagName("td")[numCol].textContent < b.getElementsByTagName("td")[numCol].textContent) {
				return (asc ? -1 : 1);
			}
			// Valeur identique
			else {
				
				// Tri secondaire
				a.getElementsByTagName("td")[6].textContent = a.getElementsByTagName("td")[6].textContent || a.getElementsByTagName("td")[6].innerText;
				b.getElementsByTagName("td")[6].textContent = b.getElementsByTagName("td")[6].textContent || b.getElementsByTagName("td")[6].innerText;
				if(a.getElementsByTagName("td")[6].textContent > b.getElementsByTagName("td")[6].textContent) {
					return (asc ? 1 : -1);
				}
				else if(a.getElementsByTagName("td")[6].textContent < b.getElementsByTagName("td")[6].textContent) {
					return (asc ? -1 : 1);
				}
				else {
					return 0;
				}
			}
		});

		// On vide le tableau
		var myTBody = myTable.getElementsByTagName("tbody")[0];
        for(var i = 1, j = myTBody.childNodes.length; i < j; i++) {
			myTBody.removeChild(myTBody.childNodes[1]);
    	}

		// on insert le contenu du tableau trier dans le TBody
        for(var i = 0, j = arrTemp.length; i < j; i++) {
			myTBody.appendChild(arrTemp[i]);     
		}

    },

	// Click sur une colonne
	sortOnClick: function(pThis, numCol) {

		// Reset des images de tri
		var ths = document.getElementsByTagName("table")[1].rows[0].cells;
		for(var i = 1, j = ths.length; i < j; i++) {
			
			// Sauf l'image que l'on vient de cliquer
			if(numCol != i) ths[i].getElementsByTagName("img")[0].src = "/icons/dblsort.gif";
		}
		
		// Détermination de l'image actuellement affichée
		var strTmp = pThis.src;
		strTmp = strTmp.substring(strTmp.lastIndexOf("/") + 1, strTmp.length);

		// Tri ascendant, on tri par ordre décroissant
		if(strTmp == "dblasc.gif") {
			pThis.src = "/icons/dbldesc.gif";
			scanup.sortTable(numCol, false);
		}
		// Pas de tri ou tri decroissant, on tri par ordre croissant
		else {
			pThis.src = "/icons/dblasc.gif";
			scanup.sortTable(numCol, true);
		}
	},
	
	// On rend les colonnes triables
	sortSetup: function() {
		var myTable = document.getElementsByTagName("table")[1];

		// Boucle sur les entêtes des colonnes
		var ths = myTable.getElementsByTagName("th");
		for(var i = 1, j = ths.length; i < j; i++) {
			ths[i].innerHTML += "<img height=\"16\" width=\"16\" src=\"/icons/dblsort.gif\" style=\"cursor: pointer;\" onclick=\"scanup.sortOnClick(this, " + i + ")\">";
		}

	}
	

};
