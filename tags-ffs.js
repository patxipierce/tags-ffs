/*
*   Tags For Fucks Sake
*   
*   I couldn't find a tag library that was less than 1000 lines for something so damn simple...
*   So frameworks shameworks, I'm making my own micro tag input thingy.
*   
*   Usage:
*
*   <div class="tags-ffs">
*       <input type="hidden" class="hidden-tags-ffs">
*   </div>
*   <script src="path/to/tags-ffs.js">
*   <script>window.onload = tags_ffs.init;</script>
*/

var tags_ffs = {
    version : '0.0.1',
    defs : {    // Defaults
        container_class  : 'tags-ffs',
        hidden_class : 'hidden-tags-ffs',
        input_class   : 'input-ffs',
        input_placeholder : 'Comma, Separated, Tags',
        holder_class  : 'holder-ffs',
        tag_class     : 'tag-ffs',
        delete_icon   : 'x',
        css : [
            '.tags-ffs { border: 1px solid; width: 100%; overflow: hidden; clear: both; }',
            '.input-ffs { border-color: transparent; background-color: transparent; color: inherit; padding: 15px 10px; width: 100%; float: left; box-sizing: border-box; }',
            '.holder-ffs { float: left; min-height: 24px; }',
            '.holder-ffs span { position: relative; display: inline-block; line-height: 30px; border: 1px solid; border-radius: 3px; padding: 2px 15px 2px 0; margin: 3px; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
            '.holder-ffs span u { position: absolute; top: 2px; right: 2px; cursor: pointer; text-decoration: none; opacity: .5; }',
            '.holder-ffs span.pre-delete{ border-color: #c00; }'
        ].join(''),
        on_add : function(f){ return f; },
        on_del : function(f){ return f; },
        on_create_input : function(el){ return el; },
        on_create_holder : function(el){ return el; },
    },
    opts : {},  // Options container

    // Start tags
    init : function(settings){
        
        // Merge defaults and options
        if(typeof settings == 'undefined'){
            tags_ffs.opts = tags_ffs.defs;
        }else{
            for(var opt in tags_ffs.defs){
                if(!tags_ffs.defs.hasOwnProperty(opt)) continue;
                tags_ffs.opts[opt] = (settings.hasOwnProperty(opt)) ? settings[opt] : tags_ffs.defs[opt];
            }
        }

        // Crete elements and listeners
        var boxes = document.getElementsByClassName(tags_ffs.opts.container_class);
        if(boxes.length){
            
            if(tags_ffs.opts.css){ // Header style
                var style = document.createElement("style");
                style.type = "text/css";
                style.id = 'tags-ffs-style';
                style.appendChild(document.createTextNode(tags_ffs.opts.css));
                document.getElementsByTagName("head")[0].appendChild(style);
            }

            // Add tag boxes to selected elements
            for (var i = 0; i < boxes.length; i++) {
                var input_el = boxes[i].getElementsByClassName(tags_ffs.opts.hidden_class);
                if(input_el.length){
                    input_el = input_el[0];
                }

                var holder = tags_ffs.holder_create(input_el);
                var input = tags_ffs.input_create(input_el);                

                input.addEventListener('keyup', function(e) {
                    var holder = this
                        .parentNode
                        .getElementsByClassName(tags_ffs.opts.holder_class);
                    
                    tags_ffs.input_listen(holder[0], this, e);
                }, false);
                
                if(input_el.value){
                    var tags = input_el.value.split(',');
                    for (var n = 0; n < tags.length; n++) {
                        tags_ffs.add_item(tags[n], holder, true);
                    }
                }

                boxes[i].addEventListener('click', function(e) {
                    var input = this.getElementsByClassName(tags_ffs.opts.input_class);
                    if(input.length){
                        input[0].focus();
                    }
                }, false);
            }
        }
    },

    // Creates element to add tags to.
    holder_create : function(el){

        var holder = document.createElement('div');
        holder.className = this.opts.holder_class;
        el.parentNode.appendChild(holder);

        this.opts.on_create_holder(holder);
        return holder;
    },

    // Creates element to type into.
    input_create : function(el){

        var input  = document.createElement('input');
        input.type = 'text';
        input.placeholder = this.opts.input_placeholder;
        input.className = this.opts.input_class;
        el.parentNode.appendChild(input);

        this.opts.on_create_input(input);
        return input;
    },

    // Adds listeners to the input and holder
    input_listen : function(holder, input, e){
        // Trim new tag
        var new_val  = input.value.replace(/^\s+|\s+$/g,'');

        var k = (e.keyCode) ? e.keyCode : e.which;
        if(k == 188){ // comma
            input.value = '';        
            if(new_val === ','){
                return;
            }
            tags_ffs.add_item(new_val.slice(0,-1), holder);
        }
        
        if(holder.lastChild){
            
            if(new_val.length){
                // Remove pre-delete (if any)
                holder.lastChild.className = this.opts.tag_class;       
            }else if(k == 8){ // backspace
                
                if(holder.lastChild.className != this.opts.tag_class+' pre-delete'){
                    // One backspaces sets pre-delete
                    holder.lastChild.className = this.opts.tag_class+' pre-delete';
                }else{
                    // Two backspaces deletes the last tag
                    tags_ffs.del_item(holder.lastChild);
                }
            }
        }
    },

    add_item : function(text, holder, allow_duplicates){
        // Add to hidden input
        var hidden = holder
            .parentNode
            .getElementsByClassName(tags_ffs.opts.hidden_class)[0];
        
        // Sanitize by creating text node in tag span
        var s = document.createElement('span');
        s.className = tags_ffs.opts.tag_class;
        s.appendChild(document.createTextNode(
            text.replace(/^\s+|\s+$/g,'') // trim
        ));
        text = s.innerText || s.textContent;

        if(hidden.value.length){
            var arr = hidden.value.split(',');
            var not_found = (arr.indexOf(text) === -1);

            if(not_found || allow_duplicates){
                arr.push(text);
                hidden.value = arr.join(',');
            }else{
                return;
            }
        }else{
            hidden.value = text;
        }

        // Add delete buttons
        if(this.opts.delete_icon){ 
            var u = document.createElement('u');
            u.appendChild(document.createTextNode(
                this.opts.delete_icon
            ));

            u.addEventListener('click', function(e) {
                e.preventDefault();
                tags_ffs.del_item(this.parentNode);
            }, false);

            s.appendChild(u);
        }

        tags_ffs.opts.on_add(s);
        holder.appendChild(s)
    },

    del_item : function(item){

        // Get hidden input
        var hidden = item
            .parentNode
            .parentNode
            .getElementsByClassName(tags_ffs.opts.hidden_class)[0];        

        // Remove close button and get text
        item.removeChild(item.lastChild);
        var txt = item.innerText || item.textContent;

        // TODO: tag text should be stored in data attribute not txt

        // remove values from hidden input
        if(hidden.value){
            var arr = hidden.value.split(',');
            var i = arr.indexOf(txt);
            if (i > -1) {
                arr.splice(i, 1);
            }
            hidden.value = arr.join(',');
        }

        // Remove from holder
        item = this.opts.on_del(item);
        item.parentNode.removeChild(item);
    },
}
