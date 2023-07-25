![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=dam-wiiter&fontSize=50)

<p>
<img src="https://img.shields.io/badge/Next.js-000?style=flat-square&logo=next.js&logoColor=white"/>

<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/SWR-eee?style=flat-square&logo=swr&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white"/>
</p>

## 🐹 프로젝트 개요

트위터 클론 코딩 기반 커뮤니티 프로젝트

## 🚀 프로젝트 확인 해보기

[배포 페이지로 이동하기](https://dam-witter.vercel.app)<br/>

## 🗓️ 프로젝트 제작

### 제작 : 2023.7.17 ~ 7.25

#### 1) 구현항목

| 기능 구분 | 내용                                    |
| --------- | --------------------------------------- |
| Auth      | 회원가입<br/>로그인<br/>로그아웃        |
| User      | 내 정보 조회<br/>내 정보 수정<br/>      |
| Tweet     | 트윗 추가 및 조회, 삭제<br/>좋아요 기능 |
| Comment   | 코멘트 추가 및 조회, 삭제               |

#### 2) 구현내용

- 쿠키를 확인하여 인증상태를 확인. next.js의 middleware를 사용하여 라우팅 요청마다 인증상태 따라 라우팅을 조정함.
- 좋아요 및 코멘트 삭제 기능을 낙관적 업데이트를 사용하여 사용자에게 즉각적인 반응을 줌

## 👀 홈페이지 프리뷰

#### 메인화면(로그인 유저인 경우)

<img width="400px" src="https://cdn.discordapp.com/attachments/757868773616255046/1133408168827965511/image.png" alt="메인화면" >

<details>
<summary>Auth : 회원가입 / 로그인</summary>
<div markdown="2">

#### 로그인

<img width="400px" src="https://cdn.discordapp.com/attachments/757868773616255046/1133409037111795782/image.png" alt="로그인"/>

#### 회원가입

<img width="400px" src="https://cdn.discordapp.com/attachments/757868773616255046/1133409091100885052/image.png" alt="회원가입" >

</div>
</details>
<br/>
<details>
<summary>User : 마이페이지 / 내정보수정</summary>
<div markdown="1">

#### 마이페이지

<img width="400px" src="https://cdn.discordapp.com/attachments/757868773616255046/1133409628726755369/image.png"/>

#### 내정보수정

<img width="400px" src="https://cdn.discordapp.com/attachments/757868773616255046/1133409929022152784/image.png"/>
</div>
</details>
<br/>

<details>
<summary>Tweet : 트윗 상세 / 트윗 작성 / 트윗삭제</summary>
<div markdown="3">

#### 트윗 상세

<img width="400px" src="https://cdn.discordapp.com/attachments/757868773616255046/1133411378800119918/image.png"/>

#### 트윗 작성

<img width="400px" src="https://cdn.discordapp.com/attachments/757868773616255046/1133410867753537617/image.png"/>
</details>
<br/>

## 📌 프로젝트 실행 방법

1. Clone the repo

```javascript
$ git clone https://github.com/j2h30728/dam-witter.git
```

2. Install NPM packages

```javascript
$ npm install
```

4. 환경 변수 설정

```javascript
//.env 생성 후, 아래의 설정값 추가
COOKIE_PASSWORD=/*최소 32 이상 랜덤 글자 설정*/
CLOUDFLARE_API_TOKEN=/* cloudflare API token 설정 */
CLOUDFLARE_ACCOUNT_ID=/* cloudflare Account Id 설정 */
DATABASE_URL=/* 데이터베이스 url 설정 */

```

1. Getting Started

```javascript
$ npm run dev
```

<br/>
