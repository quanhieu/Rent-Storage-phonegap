(function($, doc){
    const notepage = "#addnote";

    $("#addnote form button").on("tap", note);

    function note(){
        let data = extract.extractForm(notepage);
        storageHandler.addNote(data);
        $(notepage).dialog("close");
    }
}(jQuery, document));