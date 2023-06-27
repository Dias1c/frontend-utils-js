const select_animation = "run-select-animation";
// ? TAG Editor
const tagEditor = exampleTagEditor
const TagEditor_HasDoubles = document.getElementById("TagEditor_HasDoubles");

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


const TagEditor_ToLower = document.getElementById("TagEditor_ToLower");

TagEditor_ToLower.addEventListener('change', (e) => {
    tagEditor.SToLower = e.target.checked;
    ResetTagEditor();
});


const TagEditor_MaxTags = document.getElementById("TagEditor_MaxTags");

TagEditor_MaxTags.addEventListener('change', (e) => {
    tagEditor.SMaxTags = e.target.value;
    ResetTagEditor();
});

const TagEditorFormContainer = document.getElementById("TagEditorFormContainer");
let TagEditorMethodRadioButtons = document.getElementsByName("TagEditorMethod");
let TagEditorEndpoint_tb = document.getElementById("TagEditorEndpoint");

TagEditorMethodRadioButtons.forEach((rb)=>{
    rb.addEventListener('change', (e) => {
        if (e.target.checked) {
            TagEditorFormContainer.setAttribute("method", e.target.value);
        }
    })
});

TagEditorEndpoint_tb.addEventListener("change", (e) => {
    TagEditorFormContainer.setAttribute("action", e.target.value);
});