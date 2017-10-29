// Suppression d'un brouillon
function Views_DeleteDraft(DocId) {
	if(confirm(l_Views_Confirm_DraftDeletion))
		window.location.href = window.location.href.strLeft(".nsf") + ".nsf/Views_DeleteDraftOrModel?OpenAgent&DocId=" + DocId + "&Goto=" + window.location.href;
}
// Suppression d'un modèle
function Views_DeleteModel(DocId) {
	if(confirm(l_Views_Confirm_ModelDeletion))
		window.location.href = window.location.href.strLeft(".nsf") + ".nsf/Views_DeleteDraftOrModel?OpenAgent&DocId=" + DocId + "&Goto=" + window.location.href;
}