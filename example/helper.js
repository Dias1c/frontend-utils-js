const select_animation = "run-select-animation";
// ? TAG Editor
var tagEditor = exampleTagEditor
var TagEditor_HasDoubles = document.getElementById("TagEditor_HasDoubles");

// For Reset tags
function ResetTagEditor() {
    let tags = tagEditor.STags
    tagEditor.STags = []
    tags.forEach((tagname) => {
        tagEditor.AddTag(tagname);
    });

    tagEditor.B_TagEditor.classList.remove(select_animation);
    tagEditor.B_TagEditor.offsetWidth;
    tagEditor.B_TagEditor.classList.add(select_animation);
}

TagEditor_HasDoubles.addEventListener('change', (e) => {
    tagEditor.SHasDoubles = e.target.checked;
    ResetTagEditor();
});


var TagEditor_ToLower = document.getElementById("TagEditor_ToLower");

TagEditor_ToLower.addEventListener('change', (e) => {
    tagEditor.SToLower = e.target.checked;
    ResetTagEditor();
});


var TagEditor_MaxTags = document.getElementById("TagEditor_MaxTags");

TagEditor_MaxTags.addEventListener('change', (e) => {
    tagEditor.SMaxTags = e.target.value;
    ResetTagEditor();
});
