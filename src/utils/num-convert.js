// 数字转大写字母
const toChinesNum = (num) => {
    const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
    const unit = ['', '十', '百', '千', '万'];
    num = parseInt(num);
    const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse();
        let newNum = '';
        for (var i = 0; i < strArr.length; i++) {
            newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
        }
        return newNum;
    };
    const overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = '0' + noWan;
    return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
};

// 大写字母转数字
const cnnumtonum = (chnStr) => {
    if (!isNaN(chnStr)) return chnStr;
    const chnNumChar = {
        零: 0,
        一: 1,
        二: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9
    };
    const chnNameValue = {
        十: { value: 10, secUnit: false },
        百: { value: 100, secUnit: false },
        千: { value: 1000, secUnit: false },
        万: { value: 10000, secUnit: true },
        亿: { value: 100000000, secUnit: true }
    };
    const expNumChar = { 十: 10, 十一: 11, 十二: 12, 十三: 13, 十四: 14, 十五: 15, 十六: 16, 十七: 17, 十八: 18, 十九: 19 };
    if (expNumChar[chnStr]) {
        return expNumChar[chnStr];
    }
    let rtn = 0;
    let section = 0;
    let number = 0;
    let secUnit = false;
    const str = chnStr.split('');
    for (let i = 0; i < str.length; i++) {
        const num = chnNumChar[str[i]];
        if (typeof num !== 'undefined') {
            number = num;
            if (i === str.length - 1) {
                section += number;
            }
        } else {
            const cunit = chnNameValue[str[i]];
            if (typeof cunit === 'undefined') {
                return false;
            }
            const unit = chnNameValue[str[i]].value;
            secUnit = chnNameValue[str[i]].secUnit;
            if (secUnit) {
                section = (section + number) * unit;
                rtn += section;
                section = 0;
            } else {
                section += (number * unit);
            }
            number = 0;
        }
    }
    return rtn + section;
};

export {
    toChinesNum,
    cnnumtonum
};
