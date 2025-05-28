class ItemList{
    constructor(){
        this.beginRange = 0;
        //this.endRange = 15;
        this.stepRange = 0;
        this.count = 0;
        this.rangeSize = 16;
        this.query = null;
    }

    nextPage(location){
        if(this.beginRange <= this.count){
            this.onLoadElements(this.query);
            window.location.href = location;
        }
    }

    prevPage(location){
        if(this.beginRange >= 0){
            this.beginRange -= this.stepRange;

            this.onLoadElements(this.query);
            window.location.href = location;
        }
    }
}