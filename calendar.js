function Calendarize() {
    return {
        buildYearCalendar: function(el, year,monthTobuild) {


            var $calendar = document.getElementById("calendarHolder");
            
            if (typeof($calendar !=  'undefined') && $calendar !=  null)
            {
                $calendar.parentNode.removeChild($calendar)
            }                                                                                                                                                                                                                                                   
                          
                var _this=this;
            var $alltyears=_this.buildYear(year);
            var $calendarHolder=document.createElement('div');
            $calendarHolder.setAttribute("id","calendarHolder");
            $calendarHolder.appendChild($alltyears);
            document.getElementsByTagName("body")[0].appendChild($calendarHolder);
            var $coOrdinates=_this.getOffset(el);
            var $calendar = document.getElementById("calendarHolder");
            
            _this.setOffset($calendar,$coOrdinates,el)
            $calendar.style.display="show";
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
        buildYear:function(year)
        {
            
            var date=year;
            var $yearNodeParent=document.createElement('div');
            var $titleNode = document.createElement('h3');

            var $previousYears = document.createElement('span');
            $previousYears.classList.add('previousYears');
            $previousYears.innerHTML='&lt;'
            $previousYears.addEventListener("click", this.previousYears);
            
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
            
            $titleNode.innerHTML ='<span>'+years[0]+'-'+years[12]+'</span>';
            $titleNode.insertBefore($previousYears,$titleNode.childNodes[0]);

            var $nextYears = document.createElement('span');
            $nextYears.classList.add('nextYears');
            $nextYears.innerHTML='&gt;'
            $nextYears.addEventListener("click", this.nextYears);
            $titleNode.appendChild($nextYears);
            return $yearNodeParent;
        },
        buildOnlyYears:function(year)
        {
                var $yearNode = document.createElement('div');
                $yearNode.classList.add('year');
                $yearNode.setAttribute("data-year",year);
                $yearNode.innerHTML = year;
                $yearNode.addEventListener("click", this.selectYear);
                return $yearNode;
        },
        previousYears:function()
        {
            var allYears=document.getElementsByClassName("year");
            var lastYear=allYears[allYears.length-12].innerHTML;
            var yearToPass=parseInt(lastYear)-6;
            calendarize.buildYearCalendar($calendar,yearToPass);
        },
        nextYears:function()
        {
            var allYears=document.getElementsByClassName("year");
            var lastYear=allYears[allYears.length-1].innerHTML;
            var yearToPass=parseInt(lastYear)+6
            
            calendarize.buildYearCalendar($calendar,yearToPass );
        },
        selectYear:function(e)
        {
            $calendar.value=e.target.innerHTML;
            document.getElementById("calendarHolder").style.display="none";
        }
    }
}