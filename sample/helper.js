const select_animation = "run-select-animation";
// ? TAG Editor
const tagEditor = exampleTagEditor;
const TagEditor_HasDoubles = document.getElementById("TagEditor_HasDoubles");

// For Reset tags
function ResetTagEditor() {
  let tags = tagEditor.Tags;
  tagEditor.Tags = [];
  tags.forEach((tagname) => {
    tagEditor.AddTag(tagname);
  });

  tagEditor.domElement_TagEditorDiv.classList.remove(select_animation);
  tagEditor.domElement_TagEditorDiv.offsetWidth;
  tagEditor.domElement_TagEditorDiv.classList.add(select_animation);
}

TagEditor_HasDoubles.addEventListener("change", (e) => {
  tagEditor.config.HasDoubles = e.target.checked;
  ResetTagEditor();
});

const TagEditor_ToLower = document.getElementById("TagEditor_ToLower");

TagEditor_ToLower.addEventListener("change", (e) => {
  tagEditor.config.ToLower = e.target.checked;
  ResetTagEditor();
});

const TagEditor_MaxTags = document.getElementById("TagEditor_MaxTags");

TagEditor_MaxTags.addEventListener("change", (e) => {
  tagEditor.config.MaxTagsCount = e.target.value;
  ResetTagEditor();
});

const TagEditorFormContainer = document.getElementById(
  "TagEditorFormContainer"
);
let TagEditorMethodRadioButtons = document.getElementsByName("TagEditorMethod");
let TagEditorEndpoint_tb = document.getElementById("TagEditorEndpoint");

TagEditorMethodRadioButtons.forEach((rb) => {
  rb.addEventListener("change", (e) => {
    if (e.target.checked) {
      TagEditorFormContainer.setAttribute("method", e.target.value);
    }
  });
});

TagEditorEndpoint_tb.addEventListener("change", (e) => {
  TagEditorFormContainer.setAttribute("action", e.target.value);
});
