// BÀI TẬP 1
function renderMenuTable(data) {
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

    document.querySelector('.tblDanhMucMonAn').innerHTML = strHtml;
}

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

    // Kiểm tra giới hạn ký tự
    isValid &= validator.checkLength(fId, '#validate_fId_length', 1, 9)
    & validator.checkLength(fName, '#validate_fName_length', 6, 255)
    & validator.checkLength(fThumbnailUrl, '#validate_fThumbnailUrl_length', 16, 512);

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
        renderMenuTable(foodMenu.getFoodList());

        // Clear Input để tiện cho người dùng nhập món mới
        clearAllInput('#maMonAn', '#tenMonAn', '#giaTien', '#linkAnh');
    }
}

function deleteFood(fId) {
   var foodMenu = new FoodMenu();
   if((foodMenu.deleteFood(fId))) {
    renderMenuTable(foodMenu.getFoodList());
        return true;
   }
   else {
        alert(`Xóa thất bại`);
        return false;
   }
}


// BÀI TẬP 2
// Data cho sẵn
var arrMonAn = [
    {maMonAn:1, tenMonAn:'Nước lẩu haidilao', giaTien: 100},
    {maMonAn:2, tenMonAn:'Mì cay thành đô', giaTien: 200},
    {maMonAn:3, tenMonAn:'Mực bạch ngọc', giaTien: 300},
]

function renderMenuTable2() {
    // Đây là hàm render ra bảng Menu của bài tập 2
    var strHtml = `
        <div class="row">
            <div class="col-3 font-weight-bold">Mã món</div>
            <div class="col-3 font-weight-bold">Tên món</div>
            <div class="col-3 font-weight-bold">Giá tiền</div>
            <div class="col-3 font-weight-bold">
                Thao tác
            </div>
        </div>
    `;

    arrMonAn.forEach((e) => {
        strHtml += `
            <div class="row mt-3">
                <div class="col-3">${e.maMonAn}</div>
                <div class="col-3">${e.tenMonAn}</div>
                <div class="col-3">${formatCurrency(e.giaTien, 'vi-VN', 'VND')}</div>
                <div class="col-3">
                    <button class="bg-danger text-white btn" onclick="handleQuantity('${e.maMonAn}', true)">+</button>
                    <button class="bg-danger text-white btn" onclick="handleQuantity('${e.maMonAn}', false)">-</button>
                </div>
            </div>        
        `;
    });

    document.querySelector('.baiTap2 .card-body').innerHTML = strHtml;
}

function renderInvoice() {
    // Đây là hàm render ra bảng Hóa Đơn
    var invoice = new Invoice();
    var strHtml = '';
    invoice.getFoodList().forEach((e) => {
        var itemInInvoice = new ItemInInvoice(e.id, e.name, e.quantity, e.unitPrice);
        strHtml += `
            <tr>
                <td>${itemInInvoice.id}</td>
                <td>${itemInInvoice.name}</td>
                <td>${itemInInvoice.quantity}</td>
                <td>${formatCurrency(itemInInvoice.calculateAmount(), 'vi-VN', 'VND')}</td>
            </tr>
        `;
    });
    document.querySelector('#tblHoaDon').innerHTML = strHtml;
    document.querySelector('#txtThanhTien').innerHTML = formatCurrency(invoice.totalAmount(),'vi-VN','VND');
}

function handleQuantity(id, state) {
    //************************************
    // Đây là hàm để hiệu chỉnh số lượng của một món (quantity) trong hóa đơn (Invoice)
    // Trigger Event: là onclick vào button + hoặc - của Menu món ăn
    // @param {string} id - Id món ăn được truyền vào
    // @param {boolean} state - Tham số operator, TRUE là thêm quantity, FALSE là bớt quantity
    // @returns : không có kết quả trả về
    
    // Các bước thực hiện:
    // 1. Tạo instance của prototype Invoice
    // 2. Gọi method changeQuantity() của instance đó
    // 3. Render lại Invoice ra cho người dùng xem.
    //************************************
    (new Invoice()).changeQuantity(id, state);
    renderInvoice();
}


document.addEventListener('DOMContentLoaded', function() {
    // Khi Document Loaded thì render ra các table cho 2 bài tập
    renderMenuTable((new FoodMenu()).getFoodList());
    renderMenuTable2();
    renderInvoice();
});