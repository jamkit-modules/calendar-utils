CalendarUtils = (function() {
    return {}
})();

CalendarUtils.get_days = function(year, month) {
    var first_day = this._get_first_day(year, month);
    var last_day  = this._get_last_day(year, month);
    var weeks = []

    for (var day = first_day; day <= last_day; day = this._get_next_day(day)) {
        if (day.getDay() == 0) {
            weeks.push([])
        }
        weeks[weeks.length-1].push(day)
    }

    return weeks;
}

CalendarUtils.format_date = function(date, format) {
	var self = this;

    return format.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
        switch ($1) {
            case "yyyy": return date.getFullYear();
            case "yy": return this._zf(date.getFullYear() % 1000, 2);
            case "MM": return this._zf(date.getMonth() + 1, 2);
            case "dd": return this._zf(date.getDate(), 2);
            case "HH": return this._zf(date.getHours(), 2);
            case "hh": return this._zf((h = date.getHours() % 12) ? h : 12, 2);
            case "mm": return this._zf(date.getMinutes(), 2);
            case "ss": return this._zf(date.getSeconds(), 2);
            default: return $1;
        }
    });
}

CalendarUtils._get_first_day = function(year, month) {
    var first_day = new Date(year, (month - 1), 1);

    return new Date(year, (month - 1), 1 - first_day.getDay());
}

CalendarUtils._get_last_day = function(year, month) {
    var last_day  = new Date(year, (month - 1) + 1, 0);

    return new Date(year, (month - 1) + 1, 6 - last_day.getDay());
}

CalendarUtils._get_next_day = function(day) {
    return new Date(day.getTime() + 24 * 60 * 60 * 1000);
}

CalendarUtils._zf = function(number, length) {
    return "0".repeat(length - number.toString().length) + number.toString();
}

__MODULE__ = CalendarUtils;
