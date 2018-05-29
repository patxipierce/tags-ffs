
# TAGS FFS

Tags For Forks Sake is a library of less than 300 lines that creates a tag input that is very customizable.

## Usage

```markup
<div class="tags-ffs">
    <input type="hidden" class="hidden-tags-ffs">
</div>

<script src="path/to/tags-ffs.js">
<script>
    window.onload = tags_ffs.init;
</script>
```

Or with bells and whistles:

```js
<div class="tags-ffs">
    <input type="hidden" class="hidden-tags-ffs">
</div>

<script src="path/to/tags-ffs.js">
<script>
// Values shown are the libraries defaults
window.onload = tags_ffs.init({
    // container element class
    container_class  : 'tags-ffs',
    // hidden input class
    hidden_class : 'hidden-tags-ffs',
    // class of the created input
    input_class   : 'input-ffs',
    // crated input placeholder
    input_placeholder : 'Comma, Separated, Tags',
    // class for the created tag box where tags are put
    holder_class  : 'holder-ffs',
    // individual created tags will have this class
    tag_class     : 'tag-ffs',
    // HTML or character to use for tag deletion
    delete_icon   : 'x',
    // Plugin default css 
    // (If you change a class name you will have to change this too)
    css : [
        '.tags-ffs { border: 1px solid; width: 100%; overflow: hidden; clear: both; }',
        '.input-ffs { border-color: transparent; background-color: transparent; color: inherit; padding: 15px 10px; width: 100%; float: left; box-sizing: border-box; }',
        '.holder-ffs { float: left; min-height: 24px; }',
        '.holder-ffs span { position: relative; display: inline-block; line-height: 30px; border: 1px solid; border-radius: 3px; padding: 2px 15px 2px 0; margin: 3px; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
        '.holder-ffs span u { position: absolute; top: 2px; right: 2px; cursor: pointer; text-decoration: none; opacity: .5; }',
        '.holder-ffs span.pre-delete{ border-color: #c00; }'
    ].join(''),
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

- `del_item : function(item)` - Delete a tag

- `add_item : function(item, holder, allow_duplicates)` - Add a tag to holder and hidden inputs


## Callbacks

- `on_add : function(f){ return f; }` - Called at the end of add item.

- `on_del : function(f){ return f; }` - Called at the end of delete item.

- `on_create_input : function(el){ return el; }` - Called when text input is created.

- `on_create_holder : function(el){ return el; }` - Called when the holder is created.

## Bugs

Found a bug? That's a good thing. Please rise an issue here.

## To Do

- Needs to use data-attribute on deletion
- More CSS styles for light and dark themes