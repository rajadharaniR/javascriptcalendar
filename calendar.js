function Calendarize() {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return {
        getDaysInMonth: function(month, year) {
            var date = new Date(year, month, 1);
            var days = [];
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        },
        getMonthsInYear: function(year) {
            var date = new Date(year, 0, 1);
            
            var months = [];
            var monthCount = 0;
            while (monthCount < 12) {
                months.push(new Date(date));
                date.setMonth(date.getMonth() + 1);
                monthCount++;
            }
            return months;
        },
        buildYearCalendar: function(el, year,monthTobuild) {


            var $calendar = document.getElementById("calendarHolder");
            if (typeof($calendar) !=  'undefined' && $calendar !=  null)
                return true;

            var _this=this;
            var $alltyears=_this.buildYear(year);
            var $calendarHolder=document.createElement('div');
            $calendarHolder.setAttribute("id","calendarHolder");
            $calendarHolder.appendChild($alltyears);
            document.getElementsByTagName("body")[0].appendChild($calendarHolder);
            var $coOrdinates=_this.getOffset(el);
            var $calendar = document.getElementById("calendarHolder");
            _this.setOffset($calendar,$coOrdinates,el)
        },
        getOffset:function( el ) {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        },
        setOffset:function(el,coord,appendElement)
        {
            var d = el;
            var heightOfElement=appendElement.scrollHeight;
            
            d.style.position = "absolute";
            d.style.left = coord.left+'px';
            d.style.top =  (coord.top+heightOfElement)+'px';
            return true;
        },
        setDateOnInput:function(el,$this)
        {
                alert($this.getAttribute("data-date"));
        },
        buildYear:function(year)
        {
            var date = new Date(year);
            var date =new Date().getFullYear();
            //return true;
            var $yearNodeParent=document.createElement('div');
            var $titleNode = document.createElement('h3');
            $yearNodeParent.appendChild($titleNode);
            $yearNodeParent.classList.add('monthHolder');
            
            $yearNodeParent.classList.add('yearHolder');
           
            var years = [];
            var yearCount = 12;
            for(i=5;i>=1;i--)
            {
                
                
                $yearNode=this.buildOnlyYears(date-i)
                $yearNodeParent.appendChild($yearNode);
                years.push(date-i);
            }
            years.push(new Date().getFullYear());
            $yearNode=this.buildOnlyYears(date-i)
            $yearNodeParent.appendChild($yearNode);
                years.push(date-i);
            for(i=1;i<=6;i++)
            {
                years.push(date+i)
               
                $yearNode=this.buildOnlyYears(date+i)
                $yearNodeParent.appendChild($yearNode);
            }
            $titleNode.innerHTML ='<span onclick="selectYears()">'+years[0]+'-'+years[11]+'</span>';
            
            return $yearNodeParent;
        },
        buildDaysAndWeeks:function(el, year,monthTobuild)
        {
            var $calendarHolder = document.getElementById("calendarHolder");
            var _this=this;
            var months = _this.getMonthsInYear(year);
            var d = new Date();
            var n = ( monthTobuild == null)?d.getMonth():monthTobuild;
            var opts = {
                showMonth: true,
                showDaysOfWeek: true,
                showYear: true,
                clickHandler: function(e) {
                    alert("ada")
                    var day = e.target.getAttribute("data-date");
                    alert(day);
                }
            };
            
            var $monthNode = _this.buildMonth(n, year, opts);
           // el.appendChild($monthNode)
           $calendarHolder.innerHTML=$monthNode.innerHTML;
        },
        buildMonthsForYear:function(el, year)
        {
            var $calendarHolder = document.getElementById("calendarHolder");
            var $monthNodeParent=document.createElement('div');
            var $titleNode = document.createElement('h3');
            $monthNodeParent.classList.add('monthHolder');
            $titleNode.innerHTML ='<span onclick="selectYears()">'+year+'</span>';
            $monthNodeParent.appendChild($titleNode);
            monthNames.forEach(function(monthName,monthIndex) {
                var $monthNode = document.createElement('div');
                $monthNode.classList.add('yearAndmonth');
                $monthNode.innerHTML ='<span onclick="openCalendarDays('+year+','+monthIndex+')">'+monthName+'</span>'; monthName;
                $monthNodeParent.appendChild($monthNode);
            });
            //el.appendChild($monthNodeParent)
            $calendarHolder.innerHTML=$monthNodeParent.innerHTML;
        },
        buildOnlyYears:function(year)
        {
                var $yearNode = document.createElement('div');
                $yearNode.classList.add('year');
                $yearNode.setAttribute("data-year",year);
                $yearNode.innerHTML = '<span onclick="openMonths('+year+')">'+year+'</span>';
                return $yearNode;
        },
        buildMonth: function(monthNum, year, opts) {
            var _this = this;
            var dtm = new Date(year, monthNum, 1);
            var dtmMonth = dtm.getMonth();
            var prevM = new Date(dtm.setMonth(dtmMonth - 1));
            var nextM = new Date(dtm.setMonth(dtmMonth + 1));
            var daysInMonth = _this.getDaysInMonth(monthNum, year);
            var daysPrevMonth = _this.getDaysInMonth(prevM.getMonth(), prevM.getFullYear());
            var daysNextMonth = _this.getDaysInMonth(nextM.getMonth(), nextM.getFullYear());
            var $monthNode = document.createElement('div');
            var $titleNode = document.createElement('h3');
            var skipLength = daysInMonth[0].getDay();
            var preLength = daysInMonth.length + skipLength;
            var postLength = function() {
                if (preLength % 7 === 0) {
                    return 0;
                } else {
                    if (preLength < 35) {
                        return 35 - preLength;
                    } else {
                        return 42 - preLength;
                    }
                }
            }
            $monthNode.classList.add('month');
            if (opts.showMonth) { 
                $titleNode.innerHTML ='<span class="prevMonth pointer" onclick="showPrevMon('+prevM.getMonth()+','+prevM.getFullYear()+')"><</span> '+ monthNames[monthNum] + (opts.showYear ? " " + year : '')+' <span class="nextMonth pointer" onclick="showNextMon('+nextM.getMonth()+','+nextM.getFullYear()+')">></span>';
                $monthNode.appendChild($titleNode);
            }
            if (opts.showDaysOfWeek) {
                dayNames.forEach(function(a, b) {
                    var $dayNode = document.createElement('div');
                    $dayNode.classList.add('dow');
                    $dayNode.innerHTML = dayNames[b];
                    $monthNode.appendChild($dayNode);
                });
            }
            for (var i = 0; i < skipLength; i++) {
                var $dayNode = document.createElement('div');
                $dayNode.classList.add('dummy-day');
                $dayNode.innerText = daysPrevMonth.length - (skipLength - (i + 1));
                $monthNode.appendChild($dayNode);
            }
            daysInMonth.forEach(function(c, d) {
                var $dayNode = document.createElement('div');
                $dayNode.classList.add('day');
                //$dayNode.onclick = dynamicEvent;
                $dayNode.setAttribute("data-date", c);
               // $dayNode.innerHTML ='<span onclick="setDateOnElement()">'+ (d + 1)+"</span>";
               $dayNode.innerHTML = (d + 1);
                var dow = new Date(c).getDay();
                if (dow === 0 || dow === 6) $dayNode.classList.add('weekend');
                if (opts.clickHandler) {
                    $dayNode.addEventListener("click", opts.clickHandler);
                   /* $dayNode.onclick=function()
                   {
                       alert("hai");
                   } */
                }
                $monthNode.appendChild($dayNode);
            });
            for (var j = 0; j < postLength(); j++) {
                var $dayNode = document.createElement('div');
                $dayNode.classList.add('dummy-day');
                $dayNode.innerText = j + 1;
                $monthNode.appendChild($dayNode);
            }
            return $monthNode;
        }
    }
}