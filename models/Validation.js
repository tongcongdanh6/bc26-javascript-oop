function Validation() {
    const ONLY_LETTERS = "Chỉ chấp nhận giá trị là chữ alphabet";
    const ONLY_NUMBERS = "Chỉ chấp nhận giá trị là số";
    const NOT_ALLOW_EMPTY = "Không được rỗng";
    const INVALID_VALUE_RANGE = "Miền giá trị không hợp lệ";
    const VALUE_RANGE_IS = "Miền giá trị chấp nhận: ";
    const LENGTH_CHARACTERS = "Số lượng ký tự: ";
    const DUPLICATE = "Dữ liệu nhập trùng với dữ liệu đã lưu";
    const URL_FORMAT_INVALID = 'Định dạng URL không hợp lệ';
    const TYPE_IMAGE_INVALID = 'Định dạng hình ảnh chỉ chấp nhận JPG, JPEG, WEBP, PNG'


    this.checkEmpty = function(value, selectorError) {
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML  = NOT_ALLOW_EMPTY;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkAllLetters = function(value, selectorError) {
        var regexAllLetters = /^[A-Z a-z]+$/;
        if(!regexAllLetters.test(removeVietnameseTones(value).trim())) {
            document.querySelector(selectorError).innerHTML  = ONLY_LETTERS;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    
    this.checkAllNumbers = function(value, selectorError) {
        var regexAllNumbers = /^-?[0-9]\d*(\.\d+)?$/;
        if(!regexAllNumbers.test(value.trim())) {
            document.querySelector(selectorError).innerHTML  = ONLY_NUMBERS;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkValueRange = function(value, selectorError, min, max) {
        if(Number(value) > max || Number(value) < min) {
            document.querySelector(selectorError).innerHTML  = INVALID_VALUE_RANGE + ". " + VALUE_RANGE_IS + `[${min}, ${max}]`;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkLength = function(value, selectorError, min, max) {
        if(value.length > max || value.length < min) {
            document.querySelector(selectorError).innerHTML  = LENGTH_CHARACTERS + `tối thiểu ${min} ký tự - tối đa ${max} ký tự`;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkDuplicate = function(value, selectorError, arrData, key) {

        for(var i = 0; i < arrData.length; i++) {
            if(value === arrData[i][key]) {
                document.querySelector(selectorError).innerHTML = DUPLICATE;
                return false;
            }
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;        
    }

    this.checkIsValidUrl = function(value, selectorError) {
        var regexEmail = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        if(!regexEmail.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = URL_FORMAT_INVALID;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkValidImageTypeInUrl = function(value, selectorError) {
        var regexTypeImage = /\.(?:jpg|jpeg|webp|png)$/i;
        if(!regexTypeImage.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = TYPE_IMAGE_INVALID;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}