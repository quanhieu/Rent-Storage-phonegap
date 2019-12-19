var extract={
	extractForm: function(selector){
        let listInput = Array.from($(`${selector} form input`));
        let listSelect = Array.from($(`${selector} form select`));
        let testArea = Array.from($(`${selector} form textarea`));
        let fields = [...listSelect, ...listInput, ...testArea];
        return fields.reduce((acc, next) => {
            let name = $(next).attr("name");
            let val = $(next).val();
            acc[$(next).attr("name")] = $(next).val();
            return acc;
        }, {});
    }
}

