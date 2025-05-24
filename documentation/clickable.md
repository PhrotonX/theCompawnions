# Creating a clickable item
## Items that open an image dialog box
- To create an item that opens a dialog box, include the class ```.image-dialog-opener``` that can be
invocated by ```dialog.js```.
- It is recommended to include ```clickable``` class as well to enhance visual feedback for clickable
buttons.
```html
<element class="clickable image-dialog-opener">
    <img
        src="../images/pawsAndKnow/general_information/imgDogGenInfoYorkie.jpg"
        alt="Text here..."
    >
    <!-- other items here... (not recommended) -->
</element>
```
- Make sure that the required JavaScript file ```dialog.js``` is loaded. This file ads an ```onclick``` event to all elements that consists of dialog opener classes such as ```image-dialog-opener```.
```html
<script src="../scripts/dialog.js"></script>
```
- Make sure that the required stylesheet ```dialog.css``` is loaded within ```style.css```
```css
@import url('constants.css');

@import url('font.css');
@import url('nav.css');
@import url('fab.css');
@import url('button.css');
@import url('content.css');
@import url('card.css');
@import url('footer.css');
@import url('form.css');
@import url('image.css');

/* This is required. */
@import url('dialog.css'); 

```

- Make sure that the required elements are included before the footer.
```html
        <main>
            <article>
                <!-- Add your content here. -->
            </article>
        </main>
        
        <!-- Div modal and dialog-box are required to make dialog boxes work. -->
        <div id="modal"></div>
        <div id="dialog-box"></div>

        <div id="toolbar-bottom"></div>
    </body>
</html>
```

## FAQ
### All of these information do not work
- Make sure that your branch is updated. To keep your branch updated, perform the following steps in your bash terminal.
    1. ```git stash --all``` (**Note:** only do this if you currently have uncommitted changes).
    2. ```git checkout dev```
    3. ```git pull```
    4. ```git checkout branch_name_you_are_currently_working_on```
    5. ```git rebase dev``` (**Note:** git conflict may arise if some file has been edited by another contributor and your changes are conflicting).
    6. ```git stash apply``` (**Note:** only do this ig you performed the ```git stash --all``` command)
- Make sure you have followed the instructions correctly.
- Make sure you have included the required files correctly.