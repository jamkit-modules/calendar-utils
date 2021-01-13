var module = (function() {
    function _get_first_day(year, month) {
        var first_day = new Date(year, (month - 1), 1);
    
        return new Date(year, (month - 1), 1 - first_day.getDay());
    }
    
    function _get_last_day(year, month) {
        var last_day  = new Date(year, (month - 1) + 1, 0);
    
        return new Date(year, (month - 1) + 1, 6 - last_day.getDay());
    }
    
    function _get_next_day(day) {
        return new Date(day.getTime() + 24 * 60 * 60 * 1000);
    }
    
    function _zf(number, length) {
        return "0".repeat(length - number.toString().length) + number.toString();
    }
    
    return {
        get_days: function(year, month) {
            var first_day = _get_first_day(year, month);
            var last_day  = _get_last_day(year, month);
            var weeks = []
        
            for (var day = first_day; day <= last_day; day = _get_next_day(day)) {
                if (day.getDay() == 0) {
                    weeks.push([])
                }
                weeks[weeks.length-1].push(day)
            }
        
            return weeks;
        },

        format_date: function(date, format) {
            return format.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
                switch ($1) {
                    case "yyyy": return date.getFullYear();
                    case "yy": return _zf(date.getFullYear() % 1000, 2);
                    case "MM": return _zf(date.getMonth() + 1, 2);
                    case "dd": return _zf(date.getDate(), 2);
                    case "HH": return _zf(date.getHours(), 2);
                    case "hh": return _zf((h = date.getHours() % 12) ? h : 12, 2);
                    case "mm": return _zf(date.getMinutes(), 2);
                    case "ss": return _zf(date.getSeconds(), 2);
                    default: return $1;
                }
            });
        },
    }
})();

__MODULE__ = module;
