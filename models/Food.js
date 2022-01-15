function Food(__id, __name, __price, __thumbnailUrl) {
    /*
        Prototype có các thuộc tính (attribute) sau:
            1. Mã món (id : string ) [primary key]
            2. Tên món (name : string)
            3. Giá (price : string)
            4. Đường dẫn ảnh thu nhỏ (thumbnailUrl : string)
    */
    this.id = __id;
    this.name = __name;
    this.price = __price;
    this.thumbnailUrl = __thumbnailUrl;

    
}