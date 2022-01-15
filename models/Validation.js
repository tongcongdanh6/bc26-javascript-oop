function Validation() {
    const ONLY_LETTERS = "Chỉ chấp nhận giá trị là chữ alphabet";
    const ONLY_NUMBERS = "Chỉ chấp nhận giá trị là số";
    const NOT_ALLOW_EMPTY = "Không được rỗng";
    const EMAIL_FORMAT_INVALID = "Định dạng email không hợp lệ";
    const NOT_AFTER_CURRENT_DATE = "Không được sau ngày hiện tại";
    const INVALID_VALUE_RANGE = "Miền giá trị không hợp lệ";
    const VALUE_RANGE_IS = "Miền giá trị chấp nhận: ";
    const LENGTH_CHARACTERS = "Số lượng ký tự: ";
    const DUPLICATE = "Dữ liệu nhập trùng với dữ liệu đã lưu";
    const SELECT_AN_OPTION = "Vui lòng chọn một option";
    const REQUIRE_AGE = "Độ tuổi yêu cầu: ";
    const NOT_EXIST_RECORD = "Không tồn tại dữ liệu này";
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

    this.checkEmail = function(value, selectorError) {
        var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regexEmail.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = EMAIL_FORMAT_INVALID;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkLargerThanCurrentDate = function(value, selectorError) {
        // current date time
        var current = new Date();
        
        // Nếu current.getTime() hiện tại trừ cho tham số truyền vào là số âm thì tức 
        // là date truyền vào đang đi trước so với hiện tại
        if(current.getTime() - new Date(value).getTime() < 0) {
            document.querySelector(selectorError).innerHTML = NOT_AFTER_CURRENT_DATE;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkAge = function(value, selectorError, minAge) {
        var age = Math.floor((new Date().getTime() - new Date(value).getTime())/1000/3600/24/365);
        
        if(age < minAge) {
            document.querySelector(selectorError).innerHTML = REQUIRE_AGE + minAge;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.checkOptionDifferentDefaultValue = function(value, selectorError, defaultValue) {
        if(value.trim() === defaultValue) {
            document.querySelector(selectorError).innerHTML = SELECT_AN_OPTION;
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

    this.checkExistRecord = function(value, selectorError, arrData, key) {
        if(arrData.filter((e) => e[key] === value).length === 0) {
            document.querySelector(selectorError).innerHTML = NOT_EXIST_RECORD;
            return false;
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