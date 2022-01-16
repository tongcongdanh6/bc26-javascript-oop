function FoodMenu() {

    this.saveDataToLocalStorage = function(arrData) {
        // ***********************
        // Đây là hàm lưu dữ liệu của FoodMenu sang Local Storage
        // @param {Array} - Mảng 1 chiều chứa Object
        // @returns : không
        // ***********************

        // Convert sang JSON string để lưu vào Local Storage
        var dataStr = JSON.stringify(arrData);
        // Lưu vào Local Storage
        localStorage.setItem('dataMonAn', dataStr);
    }

    this.getFoodList = function() {
        // ***********************
        // Đây là hàm lấy dữ liệu các món có trong FoodMenu từ Local Storage
        // @param : không
        // @returns {Array} - Mảng 1 chiều các object chứa các dữ liệu về món ăn đang có trong FoodMenu
        // ***********************

        if(!localStorage.getItem('dataMonAn')) {
            return [];
        }

        return JSON.parse(localStorage.getItem('dataMonAn'));
    }

    this.addNewFood = function(__id, __name, __price, __thumbnailUrl) {
        // ***********************
        // Đây là hàm thêm món mới vào FoodMenu
        // @param {string} __id - id món ăn
        // @param {string} __name - tên món ăn
        // @param {string} __price - đơn giá, giá bán của món ăn
        // @param {string} __thumbnailUrl - đường dẫn chứa hình ảnh, ảnh đại diện của món ăn, chỉ chấp nhận filetype sau: JPG, JPEG, PNG, WEBP
        // @returns : không
        // ***********************

        // Tạo instance Food
        var food = new Food(__id, __name, __price, __thumbnailUrl);

        // Láy data chứa dữ liệu đang có của FoodMenu từ Local Storage
        var arrFood = this.getFoodList();

        // Thêm món mới vào mảng
        arrFood.push(food);

        // Lưu vào local Storage
        this.saveDataToLocalStorage(arrFood);

    }

    this.deleteFood = function(__id) {
        // ***********************
        // Đây là hàm xóa món từ FoodMenu
        // @param {string} __id - id món ăn
        // @returns {boolean} : trạng thái xóa thành công hay là không, TRUE là thành công và ngược lại
        // ***********************

        // Láy data chứa dữ liệu đang có của FoodMenu từ Local Storage
        var data = this.getFoodList();

        // Tìm index của món ăn có __id trong mảng data
        var idx = data.findIndex((e) => e.id === __id);

        // Nếu idx = -1 thì tức là id không tồn tại trong mảng thì không xóa và return false
        if(idx === -1) {
            return false;
        }
        else {
            // Tìm thấy món ăn trong mảng thì thực hiện xóa
            data.splice(idx, 1);
            // Lưu lại vào local storage
            this.saveDataToLocalStorage(data);
            return true;
        }
    } 
}