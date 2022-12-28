window.onload = function() {
    const sections = document.querySelectorAll('.section');
    const sectionsCount = sections.length;
    
    sections.forEach(function(item, index) {
      item.addEventListener('mousewheel', function(event) {
        // 고유 동작 중단
        event.preventDefault();

        
        let delta = 0;

        // 휠 이벤트 처리하는 함수
        if (!event){
            event = window.event;
        }
            
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;  // IE/Chrome/Opera 
            if (window.opera)
                // firefox : detail
                delta = -delta;
        } 
        else if (event.detail){
            delta = -event.detail / 3;  // Mozilla case
        }
            

        let moveTop = window.scrollY;
        let secSelector = sections[index];


        // 휠 내리기 : 다음 영역으로 넘기기
        if (delta < 0) {
          if (secSelector !== sectionsCount-1) {
            try {
              moveTop = window.pageYOffset + secSelector.nextElementSibling.getBoundingClientRect().top;
            } catch(e){}
          }
        }

        // 휠 올리기 : 이전 영역으로 넘기기
        else {
          if (secSelector !== 0) {
            try {
              moveTop = window.pageYOffset + secSelector.previousElementSibling.getBoundingClientRect().top;
            } catch(e){}
          }
        }

        const body = document.querySelector('html');
        window.scrollTo({
            left:0,
            top:moveTop,
            behavior:'smooth'
        });

      });
    });
  }