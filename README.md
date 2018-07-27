
# TAGS FFS

Tags For _Forks_ Sake is less than 300 lines of Javascript that create a tag input that is very customizable. 

- Its designed to be tiny, 
- Easy to use
- Framework independent. 

No modern CSS or modern JS was used in its creation, so it should be trustworthy to run in a toaster, or some other primitive setting.

The minified version is really small... around ~4 Kb, tiny.

## [Demo](https://code.patxipierce.com/tags-ffs/tests.html) ...

Showing Tags-ffs in action.

## Usage

```js
<div class="tags-ffs">
    <input type="hidden" class="hidden-tags-ffs">
</div>

<script src="path/to/tags-ffs.js"></script>
<script>
    window.onload = tags_ffs.init;
</script>
```

Or with bells and whistles:

```js
<div class="tags-ffs">
    <input type="hidden" class="hidden-tags-ffs">
</div>

<script src="path/to/tags-ffs.js"></script>
<script>
/**
*   Run tags_ffs
*   Values shown are the libraries defaults
**/
window.onload = tags_ffs.init({
    // container element class
    container_class  : 'tags-ffs',
    // hidden input class
    hidden_class : 'hidden-tags-ffs',
    // class of the created input
    input_class   : 'input-ffs',
    // class for the created tag box where tags are put
    holder_class  : 'holder-ffs',
    // individual created tags will have this class
    tag_class     : 'tag-ffs',

    // crated input placeholder,
    input_placeholder : 'Comma, Separated, Tags',
    // Add tags when Enter key is pressed
    add_on_enter : true,
    // HTML or character to use for tag deletion
    delete_icon   : 'x',
    // Plugin default css 
    css : '',

    // Callbacks
    on_add : function(f){ return f; },
    on_del : function(f){ return f; },
    on_create_input : function(el){ return el; },
    on_create_holder : function(el){ return el; },
});
</script>
```

## Methods

- `init : function(settings)` - Called to construct the tag inputs.

- `holder_create : function(el)` - Creates a div that holds the tag elements.

- `input_create : function(el)` - Creates the text input field to enter and remove tags.

- `input_listen : function(holder, input, e)` - Adds listeners to the input and holder.

- `del_item : function(item)` - Delete a tag. Item is the tag element.

- `add_item : function(item, holder, allow_duplicates)` - Add a tag to holder and hidden inputs.

## Options

- `input_placeholder` : string - The placeholder text for the tag input box.

- `add_on_enter` : boolean - If set to true, tags can be added by pressing enter as well as by comma.

- `delete_icon` : string - The image, or text to be assigned to the "delete tag" icon.

- `css` : string - CSS styles more on this in the [Styling](#styling) section.

## Callbacks

- `on_add : function(f){ return f; }` - Called at the end of add item.

- `on_del : function(f){ return f; }` - Called at the end of delete item.

- `on_create_input : function(el){ return el; }` - Called when text input is created.

- `on_create_holder : function(el){ return el; }` - Called when the holder is created.

## Styling

Default styles on FFS are rudimentary at best. But this is easy to fix given you have some experience with CSS.

To set your own styles you will have to set the the default ones to `false`:

```js
// Remove default styles
tags_ffs.init({css : false});

```

And then you can add your own styles to the header or to the css option, note that if you are changing any of the default class names your CSS should change accordingly.

Here is an example of the default CSS used by tags-ffs:

```css
.tags-ffs {
    border: 1px solid;
    width: 100%;
    overflow: hidden;
    clear: both;
}
.tags-ffs .input-ffs {
    border-color: transparent;
    background-color: transparent;
    color: inherit;
    padding: 15px 10px;
    width: 100%;
    float: left;
    box-sizing: border-box;
}
.tags-ffs .holder-ffs {
    float: left;
    min-height: 24px;
}
.tags-ffs .holder-ffs span {
    position: relative;
    display: inline-block;
    line-height: 30px;
    border: 1px solid;
    border-radius: 3px;
    padding: 2px 15px 2px 0;
    margin: 3px;
    max-width: 320px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.tags-ffs .holder-ffs span u {
    position: absolute;
    top: 2px;
    right: 2px;
    cursor: pointer;
    text-decoration: none;
    opacity: .5;
}
.tags-ffs .holder-ffs span.pre-delete{
    border-color: #c00;
}
```

## Bugs

Found a bug? That's a good thing. Please rise an issue [here](https://github.com/patxipierce/tags-ffs/issues).

## To Do

- A "real" inline tag-box would be nice to have in the test page.

## Changelog
- 0.0.5 - Added generate_css() to generate css using custom classes, (override with `tags_ffs.settings.css`)
- 0.0.4 - Pasted comma bug fixed (again).
- 0.0.3 - Started using data-tag attribute to store the tags, added "submit_on_enter" option.
- 0.0.2 - Squashed bug related to pasting text containing commas.
- 0.0.1 - Initial release.