CalendarUtils = (function() {
    return {}
})();

CalendarUtils.get_days = function(year, month) {
    var first_day = CalendarUtils.__get_first_day(year, month);
    var last_day  = CalendarUtils.__get_last_day(year, month);
    var weeks = []

    for (var day = first_day; day <= last_day; day = CalendarUtils.__get_next_day(day)) {
        if (day.getDay() == 0) {
            weeks.push([])
        }
        weeks[weeks.length-1].push(day)
    }

    return weeks;
}

CalendarUtils.format_date = function(date, format) {
    return format.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
        switch ($1) {
            case "yyyy": return date.getFullYear();
            case "yy": return CalendarHelper.__zf(date.getFullYear() % 1000, 2);
            case "MM": return CalendarHelper.__zf(date.getMonth() + 1, 2);
            case "dd": return CalendarHelper.__zf(date.getDate(), 2);
            case "HH": return CalendarHelper.__zf(date.getHours(), 2);
            case "hh": return CalendarHelper.__zf((h = date.getHours() % 12) ? h : 12, 2);
            case "mm": return CalendarHelper.__zf(date.getMinutes(), 2);
            case "ss": return CalendarHelper.__zf(date.getSeconds(), 2);
            default: return $1;
        }
    });
}

CalendarUtils.__get_first_day = function(year, month) {
    var first_day = new Date(year, (month - 1), 1);

    return new Date(year, (month - 1), 1 - first_day.getDay());
}

CalendarUtils.__get_last_day = function(year, month) {
    var last_day  = new Date(year, (month - 1) + 1, 0);

    return new Date(year, (month - 1) + 1, 6 - last_day.getDay());
}

CalendarUtils.__get_next_day = function(day) {
    return new Date(day.getTime() + 24 * 60 * 60 * 1000);
}

CalendarUtils.__zf = function(number, length) {
    return "0".repeat(length - number.toString().length) + number.toString();
}

__MODULE__ = CalendarUtils;
