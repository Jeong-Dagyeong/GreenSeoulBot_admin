# ♻️ Green Seoul Bot 

<div align=center>
  
### 🛠️ Tech Stack 🛠️
![next](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![Type](https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=Typescript&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>


### 💡 서비스 개요 
###### ICT콤플렉스 SW개발 공모전(피우다 프로젝트)에 본선진출한 개발물 입니다.

React chatbotify 오픈 API를 활용한 서울시 재활용품 정책 및 대형폐기물 수수료 정보 안내 챗봇을 기획하였습니다.

Green Seoul Bot은 서울시 재활용품 관련 지원 정책에 특화된 AI 기술로, 시민들이 보다 쉽게 고품질의 분리배출을 실천할 수 있도록 도와줍니다.
각 지역마다 다른 재활용품 수거 품목과 기준, 그리고 보상품 정보를 친절하게 안내하며, 사용자가 이미지를 첨부하면 대형폐기물의 수수료 정보도 간편하게 제공해 드립니다.

누구나 편리하게 이용할 수 있도록, 고대비 모드와 음성인식 기능 같은 다양한 접근성 강화 기술이 적용되어 있습니다. 특히 배리어프리 환경을 고려해 설계했기 때문에 더 많은 사람들이 쉽게 사용할 수 있습니다.

또한, AI 기반의 자연어 처리 기술을 활용해 사용자 질문에 실시간으로 맞춤형 답변을 제공합니다. 앞으로는 전국으로 서비스를 확장하여 지역별로 특화된 폐기물 처리 정보를 제공할 계획이며, 기업이나 환경단체와의 협력을 통해 다양한 재활용 캠페인에도 활용될 예정입니다.

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
|재활용 정책|`post`|`/chatbot/policy`|
|사진 업로드|`post`|`/chatbot/upload`|

### 📋 구현 내용

- #### 서울시 25개 구의 재활용품 지원정책 안내 기능
  1. 서울시 25개 지역구의 버튼 중 사용자가 특정 구를 선택하면 해당 구의 재활용품 지원정책을 상세히 안내
  2. 지원정책과 함께 해당 지역구의 홈페이지 url도 함께 제공하여 필요한 추가 정보에 쉽게 접근 할 수 있도록함
  3. 버튼을 이용한 방식 외에도 대화창에 특정 구 이름을 입력하거나 구 이름을 포함하여 재활용 정책을 입력하면 그에 맞는 재활용품 지원정책을 제공
 
  __차별성__

  구청 웹사이트에서 정책을 찾는 번거로움을 해소해 빠르고 직접적인 정보 제공이 가능하며, 사용자 맞춤형 정   보 접근을 도움
  
- #### 이미지 첨부를 통한 대형폐기물 수수료 안내 기능
  1. 서울시 25개 지역구의 버튼 중 원하는 구를 선택 후, 폐기물 이미지를 첨부하면 AI 모델이 대형폐기물 유형을 분류하고 해당 폐기물에 부과되는 수수료 안내
  2. 폐기물 처리정보와 함께 해당 지역구의 폐기물 정보 페이지 url도 함께 제공하여 필요한 추가 정보에 쉽게 접근할 수 있도록함
 
   __차별성__

  구청 사이트에서 복잡한 단계를 거쳐 정보를 찾는 방식을 개선하여 사용자가 이미지 한 장으로 폐기물 수수료   를 빠르게 확인할 수 있도록함

- #### 배리어프리(장애인과 비장애인) 환경을 고려한 세부 기능
  1. 저시력자를 위한 챗봇 확대 기능
 
       챗봇을 처음시작할 때 '챗봇 확대하기' 버튼을 생성하여 클릭 시 챗봇 사이즈와 텍스트 크기가 커지도록      하여 가독성을 높임
  2. 시각적 접근성 배려자(저시력자, 색맹, 노인)를 위한 고대비 모드(다크 모드) 기능
 
       챗봇 하단에 고대비 모드(다크 모드) 버튼을 통해 화면을 고대비로 전환하여 화면에 나타나는 색의 대비를 높여 텍스트와 화면 요소를 더 쉽게 인식할 수 있도록함
  3. 음성인식 기능
 
     음성 명령을 통해 텍스트 입력이 어려운 사용자도 음성 인식을 통해 사용자 질문을처리하고 답변을 제공하도록함
  4. 유니버셜 디자인 서체 적용
 
     '한국 장애인 개발원'에서 개발된 'KoddiUD 온고딕'을 사용하여 고령자, 노안, 저시력자 등의 오독 가능성을 줄이고 가독성을 높임


### 🎥 Green Seoul Bot 시연 영상 
[시연 영상](<https://youtu.be/NjjlrxQ1qb4?si=l7-dheWBtPiZNkH3>)

### 🎨 Green Seoul Bot 피그마 
[Figma](<https://www.figma.com/design/7dJt5U5QbMwwsBoiVEK5f3/Green-Seoul-Bot?node-id=0-1&t=A2BzgizBRsGz4Dhb-1>)

#### Green Seoul Bot 메인
<img width="1417" alt="스크린샷 2025-01-06 오후 11 24 21" src="https://github.com/user-attachments/assets/6e815104-e384-4d29-b077-285d2b9ac912" />

#### Green Seoul Bot 고대비 모드(다크모드)
<img width="1426" alt="스크린샷 2025-01-06 오후 11 32 45" src="https://github.com/user-attachments/assets/d645502e-a00c-4fb0-8462-3c188d610409" />
