function renderTable(selectorTable, data) {
    // idTable là selector mà cần render
    // data là array data
    var strHtml = '';
    for(var i = 0; i < data.length; i++) {
        strHtml += `
            <tr>
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>
                <td>${formatCurrency(data[i].price, 'vi-VN', 'VND')}</td>
                <td><img src="${data[i].thumbnailUrl}" style="height: 100px; width: 100px"></td>
                <td><button class="btn btn-danger" onclick="deleteFood('${data[i].id}')">Xóa</button></td>
            </tr>
        `;
    }

    document.querySelector(selectorTable).innerHTML = strHtml;
}


// BÀI TẬP 1
document.querySelector("#btnAddFood").onclick = function() {
    // Lấy dữ liệu từ người dùng nhập
    var fId = document.querySelector("#maMonAn").value;
    var fName = document.querySelector("#tenMonAn").value;
    var fPrice = document.querySelector("#giaTien").value;
    var fThumbnailUrl = document.querySelector("#linkAnh").value;

    // Validate dữ liệu 
    var isValid = true; // flag check

    // Tạo instace validator từ prototype Validation
    var validator = new Validation();

    // Kiểm tra rỗng
    isValid &= validator.checkEmpty(fId, '#validate_fId_empty')
    & validator.checkEmpty(fName, '#validate_fName_empty')
    & validator.checkEmpty(fPrice, '#validate_fPrice_empty')
    & validator.checkEmpty(fThumbnailUrl, '#validate_fThumbnailUrl_empty');

    // Kiểm tra không được chứa kí tự đặc biệt
    isValid &= validator.checkAllLetters(fName, '#validate_fName_allLetters');

    // Kiểm tra chỉ được chứa số
    isValid &= validator.checkAllNumbers(fPrice, '#validate_fPrice_allNumbers')
    & validator.checkAllNumbers(fId, '#validate_fId_allNumbers');

    // Kiểm tra giá tiền không được là con số âm
    isValid &= validator.checkValueRange(fPrice, '#validate_fPrice_valueRange', 0, 1000000000);

    // Kiểm tra URL hợp lệ
    isValid &= validator.checkIsValidUrl(fThumbnailUrl, '#validate_fThumbnailUrl_validURL');

    // Kiểm tra định dạng ảnh trong URL chỉ chấp nhận JPG, PNG, JPEG, WEBP
    isValid &= validator.checkValidImageTypeInUrl(fThumbnailUrl, '#validate_fThumbnailUrl_validImageType');

    // Kiểm tra duplicate primary key là id món ăn
    isValid &= validator.checkDuplicate(fId, '#validate_fId_duplicate', (new FoodMenu()).getFoodList(), 'id');


    if(isValid) {
        var foodMenu = new FoodMenu();
        foodMenu.addNewFood(fId, fName, fPrice, fThumbnailUrl);

        // Render bảng
        renderTable('.tblDanhMucMonAn', foodMenu.getFoodList());

        // Clear Input để tiện cho người dùng nhập món mới
        clearAllInput('#maMonAn', '#tenMonAn', '#giaTien', '#linkAnh');
    }
}

function deleteFood(fId) {
   var foodMenu = new FoodMenu();
   if((foodMenu.deleteFood(fId))) {
        renderTable('.tblDanhMucMonAn', foodMenu.getFoodList());
        return true;
   }
   else {
        alert(`Xóa thất bại`);
        return false;
   }
}


document.addEventListener('DOMContentLoaded', function() {
    renderTable('.tblDanhMucMonAn', (new FoodMenu()).getFoodList());
});




var arrMonAn = [
    {maMonAn:1,tenMonAn:'Nước lẩu haidilao',giaTien:100},
    {maMonAn:2,tenMonAn:'Mì cay thành đô',giaTien:200},
    {maMonAn:3,tenMonAn:'Mực bạch ngọc',giaTien:300},
]