# ♻️ Green Seoul Bot 

<div align=center>
  
### 🛠️ Tech Stack 🛠️
![next](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![Type](https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=Typescript&logoColor=white)
![materialui](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>


### 💡 서비스 개요 
###### ICT콤플렉스 SW개발 공모전(피우다 프로젝트)에 본선진출한 개발물 입니다.

React chatbotify 오픈소스 라이브러리를 활용한 서울시 재활용품 정책 및 대형폐기물 수수료 정보 안내 챗봇을 기획하였습니다.

Green Seoul Bot은 서울시 재활용품 관련 지원 정책에 특화된 AI 기술로, 시민들이 보다 쉽게 고품질의 분리배출을 실천할 수 있도록 도와줍니다.
각 지역마다 다른 재활용품 수거 품목과 기준, 그리고 보상품 정보를 친절하게 안내하며, 사용자가 이미지를 첨부하면 대형폐기물의 수수료 정보도 간편하게 제공해 드립니다.

누구나 편리하게 이용할 수 있도록, 고대비 모드와 음성인식 기능 같은 다양한 접근성 강화 기술이 적용되어 있습니다. 특히 배리어프리 환경을 고려해 설계했기 때문에 더 많은 사람들이 쉽게 사용할 수 있습니다.

더 나아가, AI 기반의 자연어 처리 기술을 활용해 사용자 질문에 실시간으로 맞춤형 답변을 제공합니다. 앞으로는 전국으로 서비스를 확장하여 지역별로 특화된 폐기물 처리 정보를 제공할 계획이며, 기업이나 환경단체와의 협력을 통해 다양한 재활용 캠페인에도 활용될 예정입니다.


또한, 정책 관리의 효율성을 높이기 위해 웹 기반의 관리(Admin) 시스템을 도입하였습니다. 이를 통해 챗봇에 저장된 재활용 정책 데이터를 직관적으로 확인할 수 있을 뿐만 아니라, 정책 내용을 쉽게 추가, 수정, 삭제할 수 있습니다.

직관적인 UI와 데이터 관리 기능은 정책 관리의 시간과 비용을 절감하며, 여러 관리자가 협력하여 실시간으로 데이터를 유지보수할 수 있도록 지원합니다.
이러한 기능을 통해 Green Seoul Bot은 사용자 친화적일 뿐만 아니라, 정책 운영 측면에서도 탁월한 효율성과 유연성을 갖춘 더 나은 서비스를 제공하는 데 기여할 것입니다.


### 💻 개발기간 
2024.10.09 ~ 2024.12.03 (55일)

### 👩🏻‍💻 팀원 
|이름|github|담당|
|------|---|---|
|정다경(팀장)|<https://github.com/Jeong-Dagyeong>|Front-end & UX & UI|
|김지현|<https://github.com/jyun-KIM>|Back-end & AI|
|김채린|<https://github.com/Chai-Lynn>|PM|

### 🗂️ 디렉터리 구조 
<details>
  <summary>
      디렉터리 구조
  </summary>

  ```
📦__pycache__
 ┣ 📜crud.cpython-312.pyc
 ┗ 📜main.cpython-312.pyc

📦api
 ┣ 📂__pycache__
 ┃ ┣ 📜crud.cpython-312.pyc
 ┃ ┗ 📜main.cpython-312.pyc
 ┣ 📂db
 ┃ ┣ 📂__pycache__
 ┃ ┃ ┣ 📜database.cpython-312.pyc
 ┃ ┃ ┣ 📜models.cpython-312.pyc
 ┃ ┃ ┗ 📜schemas.cpython-312.pyc
 ┃ ┣ 📜database.py
 ┃ ┣ 📜models.py
 ┃ ┗ 📜schemas.py
 ┣ 📜.env
 ┣ 📜crud.py
 ┗ 📜main.py

📦app
 ┣ 📂context
 ┃ ┗ 📜AuthContext.tsx
 ┣ 📂districts
 ┃ ┣ 📂[district_name]
 ┃ ┃ ┣ 📂delete
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂update
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂list
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂write
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┣ 📜page.tsx
 ┗ 📜theme.ts
```

</details>

### 📑 API 명세 
|기능|method|URL|
|------|---|---|
|관리자 로그인|`post`|`/green-seoul-bot-admin/`|
|관리자 구 선택|`get`|`green-seoul-bot-admin/districts`|
|관리자 구별 정책 리스트|`post`|`/green-seoul-bot-admin/districts?district_name=강남구`|
|관리자 구별 정책 상세|`get`|`/green-seoul-bot-admin/districts/list?districtName=강남구`|
|관리자 구별 정책 수정|`patch`|`green-seoul-bot-admin/districts/강남구/update?district_name=강남구`|

### 📋 구현 내용

- #### 관리자 로그인
  로그인 시 DB에 저장되어 있는 ID와 Password의 일치 유무 확인 후 구 선택 페이지로 이동
- #### 선택한 구 정책정보 리스트 
  해당되는 구 선택 시 정책정보 리스트로 이동
- #### 선택한 구 정책정보 상세
  상세 페이지에는 정책 분류, 제목, 관리자ID, 정책 정보, 작성 시간이 보이도록 구현
- #### 선택한 구 정책정보 수정 
  상세 페이지에서 '수정' 버튼을 누르면 정책정보를 수정하고 정책에 반영 될 수 있도록 구현 


### 🎥 Green Seoul Bot admin 시연 영상 
[시연 영상](<https://youtu.be/d0QEb5VrHSs>)

### 🎨 Green Seoul Bot admin 피그마 
[Figma](<https://www.figma.com/design/7dJt5U5QbMwwsBoiVEK5f3/Green-Seoul-Bot?node-id=93-8&p=f&t=i481hjuhVMp4CdWN-0>)

#### Green Seoul Bot admin
<img width="1430" alt="스크린샷 2025-01-06 오후 11 30 05" src="https://github.com/user-attachments/assets/374febf3-bfa5-41b3-92eb-4e80b0606c38" />
