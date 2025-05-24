/***
 * dialogId - The ID of the div or span to be configured.
 * 
 * Dialog class expects the following convention:
 * dialog-id.html - The dialog must be stored within an HTML file that consists of the following:
 * - The content of the dialog enclosed by the dialog tag  in which the dialog tag ID attribute
 * is set into dialog-id.
 * The content of the dialog box expects a close button under button tag with the id dialog-id-close.
 * - A modal div with class set to "modal" and calls the closeDialog() function.
 * - Each html page in general is expected to have at least 1 modal div.
 */
class Dialog{
    constructor(dialogId){
        this.dialogId = dialogId;
    }

    onLoadDialog(){
        this.dialog = document.getElementById(this.dialogId);

        this.modal = document.getElementById("modal");

        // console.log(this.modal);

        this.closeBtn = document.getElementById(this.dialogId + "-close");

        // Create a function object named closeFunction.
        const closeFunction = function(){
            imgDialog.closeDialog(this.dialog);
        };

        // Set the callback function into onclick events of close button and the modal.
        this.closeBtn.onclick = closeFunction;
        this.modal.onclick = closeFunction;
    }

    openDialog(){
        this.onLoadDialog();

        this.dialog.style.display = "block";
        this.modal.style.display = "block";
    }

    closeDialog(){
        if(this.dialog != null){
            this.dialog.style.display = "none";
            this.modal.style.display = "none";
        }
    }
}

class ImageDialog extends Dialog{
    constructor(){
        super('image-dialog');
    }

    openDialog(div){
        super.openDialog();

        // console.log(this.dialog);
        // console.log(this.dialogId + '-img');
        const dialogImg = this.dialog.querySelector("#" + this.dialogId + '-img');
        const dialogParagraph = this.dialog.querySelector("#" + this.dialogId + '-alt');

        const img = div.querySelector('img');

        dialogImg.setAttribute('src', img.getAttribute('src'));
        dialogImg.setAttribute('alt', "An image displayed on a dialog box");
        
        dialogParagraph.innerHTML =  img.getAttribute('alt');
    }
}

var imgDialog = new ImageDialog();

document.addEventListener("DOMContentLoaded", function(){
    // Add onclick event to each image-dialog-opener.
    // ============================================================================
    var imageDialogOpener = document.getElementsByClassName("image-dialog-opener");
    
    for(let clickable of imageDialogOpener){
        clickable.onclick = () => {
            imgDialog.openDialog(clickable);
        };
        // console.log(clickable.querySelector('img').getAttribute('alt'));
    }
});