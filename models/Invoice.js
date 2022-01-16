function Invoice() {

    this.addFood = function(objItemInInvoice) {
        // ***********************
        // Đây là hàm thêm món vào trong hóa đơn
        // @param {ItemInInvoice} objItemInInvoice - object chứa data món ăn cần được thêm vào mảng data
        // @returns : không
        // ***********************

        // Lấy data hiện tại đã có của Invoice (từ Local Storage)
        var data = this.getFoodList();

        // Thêm dữ liệu mới vào array data
        data.push(objItemInInvoice);

        // Lưu vào Local Storage
        this.saveDataToLocalStorage(data);
    }

    this.getFoodList = function() {
        // ***********************
        // Đây là hàm lấy dữ liệu của Invoice từ Local Storage
        // @param : không
        // @returns {Array} - Mảng 1 chiều các object chứa các dữ liệu về món ăn đang có trong Hóa Đơn (Invoice)
        // ***********************

        // Nếu Local Storage chưa có key dataFoodListB2 thì trả về mảng rỗng
        if(!localStorage.getItem('dataFoodListB2')) {
            return [];
        }

        // Nếu Local Storage có data thì parse từ string sang JSON Object rồi trả kết quả về
        return JSON.parse(localStorage.getItem('dataFoodListB2'));
    }

    this.saveDataToLocalStorage = function(arrData) {
        // ***********************
        // Đây là hàm lưu dữ liệu của Invoice sang Local Storage
        // @param {Array} - Mảng 1 chiều chứa Object
        // @returns : không
        // ***********************

        // Convert sang JSON string để lưu vào Local Storage
        var dataStr = JSON.stringify(arrData);
        // Lưu vào Local Storage
        localStorage.setItem('dataFoodListB2', dataStr);
    }

    this.changeQuantity = function(__fId, __state) {
        // ***********************
        // Đây là hàm thay đổi Quantity của một món có trong Invoice
        // @param {string} __fId - Id của món ăn được truyền vào
        // @param {boolean} __state - Tham số operator, TRUE là thêm quantity, FALSE là bớt quantity
        // @returns : không
        // ***********************

        // Lấy data đang có trong Invoice từ Local Storage
        var data = this.getFoodList();

        // Tìm index của món ăn có __fId trong mảng data vừa lấy từ Local Storage
        var idx = data.findIndex((e) => e.id === Number(__fId));

        if(__state) {
            // STATE = TRUE thì + quantity
            if(idx === -1) {
                // Nếu món ăn vừa được chọn chưa có trong invoice thì thêm mới vào mảng data
                // Tìm món ăn có id = __fId của mảng arrMonAn đã được cho
                var item = arrMonAn.find((e) => e.maMonAn === Number(__fId));

                // Tạo instance của prototype item trong invoice
                var itemInInvoice = new ItemInInvoice(item.maMonAn, item.tenMonAn, 1, item.giaTien);

                // Thêm vào mảng data
                this.addFood(itemInInvoice);
            }
            else {
                // Có món trong invoice thì tăng quantity lên 1
                data[idx].quantity++;

                // Lưu vào Local Storage
                this.saveDataToLocalStorage(data);
            }
        }
        else {
            // STATE = FALSE thì - quantity
            if(idx === -1) {
                // Báo lỗi nếu không có món này trong hóa đơn
                alert("Chưa có món này trong hóa đơn nên không thể bớt số lượng");
                return false;
            }
            else {
                if(data[idx].quantity === 1) {
                    // Nếu quantity chỉ có 1, sẽ xóa món ra khỏi Invoice
                    data.splice(idx, 1);
                }
                else {
                    // Có món trong invoice && quantity > 1 thì giảm quantity xuống 1
                    data[idx].quantity--;
                }

                // Lưu vào local storage
                this.saveDataToLocalStorage(data);
            }
        }
    }

    this.totalAmount = function() {
        // ***********************
        // Đây là hàm tính tổng tiền của cả hóa đơn
        // @param : không
        // @returns {Number} - tổng tiền hóa đơn
        // ***********************

        var sum = 0;
        
        // Lấy data từ Local Storage sau đó duyệt từng phần tử (món ăn) đang có trong mảng
        this.getFoodList().forEach((e) => {
            // Tạo instance của prototype ItemInInvoice để gọi được hàm calculateAmount()
            var itemInInvoice = new ItemInInvoice(e.id, e.name, e.quantity, e.unitPrice);
            
            // Cộng dồn biến sum để tính tổng
            sum += itemInInvoice.calculateAmount();
        })

        return sum;
    }
}