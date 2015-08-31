#레알날씨(Real Weather)
> 왜 일기예보는 맞는 날보다 틀리는 날이 많아 보이는 걸까?
> 지금 비가 오는지, 환절기에 사람들은 반팔을 입었는지 긴팔을 입었는지, 단순한 일기예보만으로는 알기가 어렵다.

"거기 날씨 어때?" 라고 친구에게 물어보듯 알 수 있는 날씨 정보!
우리들이 만들어가는 날씨 정보! **레알날씨**

##특징
* 간단한 입력을 통해 현재 지역의 날씨 정보를 제공할 수 있다.
* 입력한 날씨 정보는 해당 지역 날씨 그래프에 실시간으로 반영된다.
* 내가 있는 지역, 알고 싶은 지역의 날씨 실시간 그래프를 확인할 수 있다.
* (+) 현재 날씨 외에도 사람들의 옷차림, 우산 유무, 출퇴근/등하교 길 풍경과 같은 이야기를 나눌 수 있다. (날씨기반 생활 정보 SNS)
* (+) 기상청 정보가 얼마나 맞았나 통계 정보

##사용 기술
* Javascript, Node.js(Websocket Server), Spring+Hibernate, MYSQL
* HTML5 (svg, WebSocket, Geolocation...)

##Environment
* Development : Mac os, mongoDB
   - Front-End : HTML/CSS/Javascript
   - Back-End : Node.js, Java

* Operation : Ubuntu, Apache Tomcat, mongoDB

##Data model
```
Weather{ 
	id : 1L,
	latitude : "37.4876400000", 
	longtitude : "126.9879200000", 
	city : "서울", 
	country : "서초구", 
	village : "방배4동", 
	datetime : "2015-09-07 17:30:00", 
	sky : "맑음", 
	temperature : "선선"
}

Photo{
	weatherId : 1L,
	url : "/users/.../1509071730000001.jpg"
}
```


##Schedule
* DB week01(~September 8) : DB 구조 설계, 프로젝트 틀 잡기, mongoDB 공부
* DB week02(~September 15) : Front-to-Server data 저장, Server-to-Front data 전송 구현
* DB week03(~September 22) : 마무리

