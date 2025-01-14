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

Green Seoul Bot의 Admin 페이지 입니다.

정책 관리의 효율성을 높이기 위해 웹 기반의 관리(Admin) 시스템을 도입하였습니다. 

이를 통해 챗봇에 저장된 재활용 정책 데이터를 직관적으로 확인할 수 있을 뿐만 아니라, 정책 내용을 쉽게 추가, 수정, 삭제할 수 있습니다.

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

  ![로그인(admin)](https://github.com/user-attachments/assets/417b0bc2-d5bb-44a4-b195-a72c2f9d3665)

- #### 구 선택
  로그인 후 구를 선택할 때, 중복 선택을 못하도록 처리 및 1개의 구를 선택 했을 때 선택된 구의 정책정보 리스트 페이지로 이동

  ![구선택(admin)](https://github.com/user-attachments/assets/486208ab-d67e-4ec9-ae93-c2a85c686258)
  
- #### 선택한 구 정책정보 리스트 
  해당되는 구 선택 시 정책정보 리스트로 이동

  ![정책정보리스트(admin)](https://github.com/user-attachments/assets/407f2f91-6f3a-492b-9746-54d8f83e90ac)
  
- #### 선택한 구 정책정보 상세
  상세 페이지에는 정책 분류, 제목, 관리자ID, 정책 정보, 작성 시간이 보이도록 구현

  ![정책정보상세(admin)](https://github.com/user-attachments/assets/3cd549c7-5f10-4562-912e-007838cecfee)
  
- #### 선택한 구 정책정보 수정 
  상세 페이지에서 '수정' 버튼을 누르면 정책정보를 수정하고 정책에 반영 될 수 있도록 구현

  ![정책정보수정(admin)](https://github.com/user-attachments/assets/17c23f5a-b716-4bfd-a31b-44b38240d90a)

- #### 정책정보 삭제
  상세 페이지에서 '삭제' 버튼을 누르면 정책정보를 삭제하고 정책에 반영 될 수 있도록 구현
  
  ![정책정보삭제(admin)](https://github.com/user-attachments/assets/8443c22c-6b62-44c3-af87-4b2687602c95)

- #### 대형폐기물 수수료 상세, 수정, 삭제

  ![대형폐기물(admin)](https://github.com/user-attachments/assets/2e98a904-07f3-42f3-99b3-6a74012c0a9d)
  
### 🎥 Green Seoul Bot admin 시연 영상 
[시연영상](<https://youtu.be/d0QEb5VrHSs>)

### 🎨 Green Seoul Bot admin 피그마 
[Figma](<https://www.figma.com/design/7dJt5U5QbMwwsBoiVEK5f3/Green-Seoul-Bot?node-id=93-8&p=f&t=i481hjuhVMp4CdWN-0>)

#### Green Seoul Bot admin
<img width="1430" alt="스크린샷 2025-01-06 오후 11 30 05" src="https://github.com/user-attachments/assets/374febf3-bfa5-41b3-92eb-4e80b0606c38" />
