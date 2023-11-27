# React-CRA-Boilerplate-v1

Create-React-App를 기본으로 한 atomic 디자인패턴 구조의 프로젝트 boiler-plate입니다.
해당 프로젝트를 GitLab에서 import한 뒤 명칭을 변경하여 사용하시면 됩니다.
기본적인 폴더 구조이며 추가 업데이트 되는 내용도 반영할 예정입니다.

## 사용법

우선 yarn 명령어를 통해 pakage.json에 기록된 라이브러리들을 설치합니다.
포트 초기 설정은 3000번 포트입니다.
구동 명령어는 yarn start를 실행시켜 주세요.

## 디렉토리 구조 설명

### pulbic

CRA 배포파일로 index.html 및 favicon 등의 파일이 존재합니다.
-> Note that we only recommend to use `public` folder as an escape hatch 주석 발췌

### services

API 요청에 관한 폴더입니다. axios 라이브러리를 기반으로 합니다.

### assets

사진이나 폰트등의 정적인 파일들이 존재합니다.
(파이썬의 resource 폴더 같은 역할)

### components

아래와 같은 3가지 폴더구조가 존재합니다. 기존의 atomic

atoms: Logo, Text, Input, Button 등 더이상 나눌 수 없는 컴포넌트 들 (html의 시멘틱 태그같은 경우)
blocks: UserForm, Header, Siderbar 등 (어느정도 재사용이 가능한 구조)
pages: Home, Login 등 페이지 단위 (프로젝트 당 재사용이 힘듦)

각 폴더에는 index.js, [name].js 가 존재합니다.
예시) index.js(Js 로직이 존재), Home.js(html, css 존재)

참조: https://www.youtube.com/watch?v=exf4enLbVm4&t=218s

### constants

상수값들이 존재합니다. 주로 ENUM으로 사용되는 값들이 존재합니다.
(다만, color 같은 경우 tailwind의 config 파일에서 사용할 듯)

### hook

커스텀 hook이 존재하는 폴더입니다. 반복되는 로직을 useState, useEffect 등의 조합으로 구현할 것들이 존재합니다.
참고: https://react.vlpt.us/basic/21-custom-hook.html

### store

클라이언트 전역 상태관리 관련 폴더입니다. redux, recoil 관련 폴더가 존재합니다.

### util

전역적으로 자주 사용하는 함수들이 존재하는 폴더입니다.
예시) regEmail 처럼 email을 정규표현식으로 검사하는 함수들

## 라이브러리

### 스타일

tailwind: 향상된 부트스트랩 형태로 빠른 생산성 보장과 반응형 UI를 사용하기 위함.
styled-components: 순수 커스텀 css에 용이 및 네이밍을 통한 명시성 제공

### 상태관리

react-query: 서버 데이터 state 관리 라이브러리
recoil: 클라이언트 전역 상태관리 라이브러리(redux 대신 recoil 사용)


### 기타

react-hook-form: form 데이터 사용 라이브러리


## 설정 파일

### .eslintrc.js
작성한 코드의 스타일을 검사합니다. waring, error로 표시를 해주지만 코드를 바꾸진 않습니다. airbnb 스타일을 기본으로 합니다.

### .prettierrc
prettier 설정 파일로 파일 저장시, 지정된 규칙으로 코드를 포맷팅 합니다. 

이 파일들을 통해 일관된 기본적인 코딩스타일을 표준화 합니다.

