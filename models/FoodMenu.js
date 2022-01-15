function FoodMenu() {

    this.saveDataToLocalStorage = function(arrData) {
        // Convert sang JSON string để lưu vào Local Storage
        var dataStr = JSON.stringify(arrData);
        // Lưu vào Local Storage
        localStorage.setItem('dataMonAn', dataStr);
    }

    this.addNewFood = function(__id, __name, __price, __thumbnailUrl) {
        // Tạo instace mới
        var food = new Food(__id, __name, __price, __thumbnailUrl);
        // Láy data từ local storage
        var arrFood = this.getFoodList();
        // Push món mới vào mảng
        arrFood.push(food);

        // Lưu vào local Storage
        this.saveDataToLocalStorage(arrFood);

    }

    this.deleteFood = function(__id) {
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

    this.clearFoodMenu = function() {
        localStorage.removeItem('dataMonAn');
    }

    this.getFoodList = function() {
        if(!localStorage.getItem('dataMonAn')) {
            return [];
        }

        return JSON.parse(localStorage.getItem('dataMonAn'));
    }

    
}