class Query{
    constructor(){
        this.list = [];
    }

    get(key){
        return this.list[key];
    }

    enabled(key){
        return this.list[key].enabled;
    }

    // Returns:
    // - true if matching string is found.
    // - false if no matching string is found.
    // - null if key is not enabled.
    match(key, query){
        const currentKey = this.get(key);

        if(currentKey.enabled == false){
            return null;
        }

        if(currentKey.value.search(query) > -1){
            return true;
        }else{
            return false;
        }
    }

    put(key, value, enabled){
        this.list[key] = {
            value: value,
            enabled: enabled
        };
    }

    value(key){
        return this.list[key].value;
    }
}