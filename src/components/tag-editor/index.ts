import { HelperDOM } from "../../utils/HelperDOM"

export interface ConfigTagEditor {
  SelectorNameTagEditor: string// = "#block_TagEditor"
  SelectorNameOutput: string// = "#output_TagEditor"

  HasDoubles: boolean// = false
  ToLower: boolean// = true
  MaxTagsCount: number// = 0
  MaxTagLength: number// = 0
  DefaultTags: string[]// = []
  Separators: string[]// = [" "]
}

export class TagEditor {
  private domElement_TagEditorDiv: HTMLDivElement;
  private domElement_TagEditorInput: HTMLInputElement;
  private domElement_TagsOutput: HTMLInputElement;

  private config: ConfigTagEditor

  public Tags: string[] = []


  private setConfig = (config: ConfigTagEditor) => {
    if (config.SelectorNameTagEditor == undefined) config.SelectorNameTagEditor = '#block_TagEditor'
    if (config.SelectorNameOutput == undefined) config.SelectorNameOutput = '#output_TagEditor'
    if (config.HasDoubles == undefined) config.HasDoubles = false
    if (config.ToLower == undefined) config.ToLower = true
    if (config.MaxTagsCount == undefined) config.MaxTagsCount = 0
    if (config.MaxTagLength == undefined) config.MaxTagLength = 0
    if (config.DefaultTags == undefined) config.DefaultTags = []
    if (config.Separators == undefined) config.Separators = [" "]
    this.Tags = config.DefaultTags ?? []
    this.config = config
  }

  constructor(config: ConfigTagEditor) {
    this.setConfig(config)

    try {
      {
        const { element, error } = HelperDOM.GetElementBySelector(this.config.SelectorNameOutput ?? "#output_TagEditor")
        if (error) console.warn(`GetElementBySelector: ${error.message}`)
        this.domElement_TagsOutput = element as HTMLInputElement
      }
      {
        const { element, error } = HelperDOM.GetElementBySelector(this.config.SelectorNameTagEditor ?? "#block_TagEditor")
        if (error) throw new Error(`GetElementBySelector: ${error.message}`)
        this.domElement_TagEditorDiv = element as HTMLDivElement

        if (this.domElement_TagEditorDiv.querySelector("input") == null) this.domElement_TagEditorDiv.appendChild(document.createElement("input"));
        this.domElement_TagEditorInput = this.domElement_TagEditorDiv.querySelector("input");

        // Add Events
        this.domElement_TagEditorInput.addEventListener("keyup", (e) => {
          const separators = this.config.Separators
          if (separators.includes(e.key))
            this.domElement_TagEditorInput.value = "";
        });

        this.domElement_TagEditorInput.addEventListener("keydown", (e) => {
          const separators = this.config.Separators
          if (separators.includes(e.key) || e.key === "Enter") {
            let tagname = this.domElement_TagEditorInput.value;
            this.AddTag(tagname);
            this.domElement_TagEditorInput.value = "";
          } else if (e.key === "Backspace" && this.domElement_TagEditorInput.value == "") {
            let tagname = this.RemoveLastTag();
            this.domElement_TagEditorInput.value = tagname + " ";
          }
        });

        this.domElement_TagEditorInput.addEventListener("focusout", (e) => {
          let tagname = this.domElement_TagEditorInput.value;
          this.AddTag(tagname);
          this.domElement_TagEditorInput.value = "";
        });

        this.AddTag(this.domElement_TagEditorInput.value);
        this.domElement_TagEditorInput.value = "";
      }
    } catch (error: any) {
      console.error("TagEditor.constructor throws error:", error.message)
      return
    }
  }

  public IsValidName(name: string) {
    if (this.config.ToLower)
      name = name.toLowerCase();

    if (name == "")
      return false;
    else if (this.config.MaxTagsCount != 0 && this.Tags.length >= this.config.MaxTagsCount)
      return false;
    else if (!this.config.HasDoubles && this.Tags.includes(name))
      return false;
    else if (this.config.MaxTagLength != 0 && this.config.MaxTagLength < name.length)
      return false;

    return true;
  }
  // Add Tag to TagEditor
  public AddTag(name: string) {
    let tags: string[] = [name]
    // let notAddedTags: string[] = []
    for (let i = 0; i < this.config.Separators.length; i++) {
      const sep = this.config.Separators[i];

      let newTags: string[] = []
      for (let j = 0; j < tags.length; j++) {
        const tag = tags[j];

        const splitted = tag.split(sep);
        for (let k = 0; k < splitted.length; k++) {
          let splittedEl = splitted[k];
          if (!this.IsValidName(splittedEl)) continue
          if (this.config.ToLower) splittedEl = splittedEl.toLowerCase();
          newTags.push(splittedEl)
        }
      }

      tags = newTags
    }

    tags = tags.filter((value, index, array) => {
      return array.indexOf(value) === index;
    })

    this.Tags.push(...tags)
    this.RefreshTags();
  }
  // Removes last tag from TagEditor
  public RemoveLastTag() {
    let name = this.Tags.pop();
    this.RefreshTags();
    return name != null ? name : "";
  }
  // Removes tag by name from TagEditor
  public RemoveTag(name: string) {
    this.Tags = this.Tags.filter(function (value, index, arr) {
      return value != name;
    });
    this.RefreshTags();
    return name != null ? name : "";
  }
  // Sets Tags to TagEditor by STags
  public RefreshTags() {
    while (this.domElement_TagEditorDiv.firstChild != this.domElement_TagEditorInput) {
      this.domElement_TagEditorDiv.removeChild(this.domElement_TagEditorDiv.firstChild);
    }
    this.Tags.slice()
      .reverse()
      .forEach((tagname, index) => {
        const newtag = TagEditor.CreateTag(tagname, () => {
          this.RemoveTag(tagname);
        });
        this.domElement_TagEditorDiv.prepend(newtag);
      });

    this.domElement_TagsOutput.value = this.Tags.join(" ");
  }

  // Clears all Tags
  public Clear() {
    this.Tags = [];
    this.RefreshTags();
  }

  // CreateTag - returns (tag) HTMLDivElement
  // name - tag name
  // btn_remove_click - function wich work on click remove tag
  public static CreateTag(name: string, btn_remove_click: any) {
    const btn_tag = document.createElement("div");
    btn_tag.setAttribute("class", "btn-tag");
    const tag_name = document.createElement("span");
    tag_name.innerHTML = name;
    const btn_remove = document.createElement("span");
    btn_remove.setAttribute("class", "remove");
    btn_remove.innerHTML = "×";
    btn_remove.addEventListener(
      "click",
      btn_remove_click != null
        ? function () {
          btn_remove_click();
          btn_tag.remove();
        }
        : () => {
          btn_tag.remove();
        }
    );
    // Construct tag
    btn_tag.appendChild(tag_name);
    btn_tag.appendChild(btn_remove);
    return btn_tag;
  }

}