// ? TAG Editor
var tagEditor = exampleTagEditor
var TagEditor_HasDoubles = document.getElementById("TagEditor_HasDoubles");

TagEditor_HasDoubles.addEventListener('change', (e) => {
    tagEditor.SHasDoubles = e.target.checked;
    tagEditor.Clear();
});


var TagEditor_ToLower = document.getElementById("TagEditor_ToLower");

TagEditor_ToLower.addEventListener('change', (e) => {
    tagEditor.SToLower = e.target.checked;
    tagEditor.Clear();
});


var TagEditor_MaxTags = document.getElementById("TagEditor_MaxTags");

TagEditor_MaxTags.addEventListener('change',(e) => {
    tagEditor.SMaxTags = e.target.value;
    tagEditor.Clear();
});
