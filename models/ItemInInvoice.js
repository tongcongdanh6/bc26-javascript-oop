function ItemInInvoice(__id, __name, __quantity, __unitPrice) {
    this.id = __id;
    this.name = __name;
    this.quantity = __quantity;
    this.unitPrice = __unitPrice;

    this.calculateAmount = function() {
        // ********************
        // Đây là hàm tính tổng tiền của 1 món ăn
        // @param: không có
        // @returns {number} - tổng tiền của món ăn

        // Cách tính: lấy đơn giá * số lượng món
        // ********************
        return this.unitPrice * this.quantity;
    }

}