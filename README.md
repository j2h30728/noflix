![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=NOFLIX&fontSize=50)

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</p>

<br/>

## 🐹 프로젝트 내용

The Movie Database (TMDB) API 를 활용한 넷플릭스 클론 코딩 프로젝트

## 🗓️ 프로젝트 제작 및 리팩토링 구현 기간

### 제작 : 2023.3.6 ~ 2023.4.8 (3일)

#### 1) 구현항목

1. 현재 상영중인 / 개봉예정 / 평점 높은 순의 영화/tv 를 슬라이더로 확인 가능
2. 영화/tv 제목으로 검색할 수 있는 기능
3. 슬라이더에 존재하는 영화/tv 를 클릭 할 경우, 모달 디자인으로 상세페이지 구현
4. framer motion 라이브러리를 사용해 상세피이지 확인 시 애니메이션, 슬라이더를 캐러셀로 구현

#### 2) 구현내용

- **recoil 도입 이유**

  - route path 를 `movies/:movieId` , `tvs/:tvId` 로 사용해 사용자가 어떤 list type의 slider 의 영화/tv를 클릭 하였는지 확인이 했다.
  - 당시 컴포넌트 구조는 `<Slider>` 컴포넌트와 `<Modal>` 컴포넌트가 병렬적으로 구성되어있으며, 사용자가 어떤 list type의 slider에서 클릭 하였는지 확인 하기위해 recoil 을 사용했다.

    - 사용자가 `<Slider>` 내에 존재하는 영화/tv 를 클릭하면 recoil 을 사용해 list type을 저장
    - reoil 에 저장된 list type을 이용한 조건문을 통해 현재 클릭한 영화/tv 의 슬라이더(list type)에 해당되는 api 데이터를 불러옴

    ```tsx
    <AnimatePresence>
      {isMatchedModalMovie ? (
        <ModalMovieDetailInfo
          movietype={movietype}
          movieId={movieId}
          movies={
            //  해당 타입은 타입스크립틔 enum 을 사용하였음.
            movietype === movieType.now_playing
              ? nowPlaying.data?.results
              : movietype === movieType.upcoming
              ? upComing.data?.results
              : movietype === movieType.top_rated
              ? topRated.data?.results
              : []
          }
          scrollY={scrollY.get()}
        />
      ) : null}
    </AnimatePresence>
    ```

<br/>

> **💡 개선이 필요한 사항 검토**
>
> - 병렬구조를 가졌던 `<Slider>` 컴포넌트와 `<Modal>` 컴포넌트에서 `<Slider>` 컴포넌트 내부에 `<Modal>` 컴포넌트를 포함시키게 되면 recoil의 필요가 없어짐을 깨닫고 리팩토링을 필요하다는 것을 깨달음
> - [당시 첫 제작후, 노마드코드 리액트 스터디 주간회의에서 회고발표 내용](https://www.notion.so/NOFLIX-79ddf97fb6c840f990933e9170d2bf35)

<bt/>

### 1차 리팩토링 : 2023.3.23 (3일)

#### 리팩토링 내용

- **recoil 삭제**

  - 병렬적 구조를 변경해, `useState`로 변경하고 데이터를 props 로 전달시켰다.<br/>(`page -> <Slider> -> <Modak>` 순으로 props 전달)
  - `clickedListType`에 사용자가 영화/tv를 클릭한 list type 이 저장되고 해당 타입의 api 데이터를 불러오게된다.
    - 즉, `movieType.default` 값에서 `movieType.클릭한타입` 으로 저장됨.
      ```tsx
      <AnimatePresence>
        {clickedListType !== movieType.default ? (
          <ModalMovieDetailInfo
            listType={listType}
            clickedListType={clickedListType}
            setClickedListType={setClickedListType}
            movieId={movieId + clickedListType}
            movies={movies}
          />
        ) : null}
      </AnimatePresence>
      ```
  - 아래의 코드와 같이 모달을 띄우는 기준은 `clickedListType` 이 `movieType.default` 이 아니고 변경된 리스트 타입의 슬라이더에서 데이터를 가져와 모달을 띄운다.
    ```tsx
    <AnimatePresence>
      {clickedListType !== movieType.default ? (
        <ModalMovieDetailInfo
          listType={listType}
          clickedListType={clickedListType}
          setClickedListType={setClickedListType}
          movieId={movieId + clickedListType}
          movies={movies}
        />
      ) : null}
    </AnimatePresence>
    ```

> **💡 개선이 필요한 사항 검토**
>
> - 현재 사용되는 route 방식은 사용자가 url 로 접근할 수 없다.<br/> 페이지에서 사용자가 직접 하나의 슬라이드 중 하나의 영화/tv를 클릭해야만, `clickedListType`이 `movieType.default`에서 클릭한 타입으로 변경되기 때문에 클릭하지않으면 아무런 모달을 띄워 주지않는다.
>   그러므로 route 수정이 필요하다.
> - `movies/:listType/:movieId` 으로 listType URL parameter 추가 필요

<br/>

#### 기능 추가

- 검색창 debounce 기능 추가

  - **이전 기능** :<br/>
    사용자가 검색어를 타이핑 한후 엔터를 쳐야만 검색이 가능했다.
    이는 사용자가 제목의 키워드를 정확하게 알고있다는 가정을 한다는 생각에 입력을 하면서도 검색결과를 부여주는 것은 어떨까 고민했다.
    <br/>
  - **추가 기능** :<br/>
    사용자가 800ms 간격을 둘정도로 검색어가 생각이 나질 않을때 바로 화면 상으로 결과 값 확인 가능 해졌다.
    이 기능을 추가해 검색어를 바로 알고 검색하는 경우와 그렇지 않은 경우의 두가지 사용자의 유형을 고려한 기능을 만들게 되었다.

> - [당시 첫 리팩토링 후, 회고한 내용](https://understood-driver-5af.notion.site/7-b12e334a02e34ed08d90928f4882f7e5)

<br/>

### 2차 리팩토링 : 2023.5.7 (3일)

#### 리팩토링 내용

- **CSS 오류 제거** :<br/>
  `<Modal>` 컴포넌트를 `<Slider>` 컴포넌트에 포함시키면서 계층간 CSS 충돌이 난 디자인 에러를 제거했다.
- **URL parameter 추가**:<br/>
  List type URL parameter 을 추가하여 사용자가 URL만으로도 상세페이지에 접근 가능 하게끔 변경했다.
  <br/>

> **3차 리팩토링 예정 (미정) :**
>
> 1.  재사용 가능함 함수와 컴포넌트 고려 필요
> 2.  관심사 분리
> 3.  추가 기능 구현(Auth / 검색페이지를 슬라이더가 아닌 무한 스크롤 기능 추가해보기)
> 4.  디자인 보완 : 현재 검색결과전에 보여주는 로딩 페이지 디자인이 이쁘게 되어있지않음

## 📝 프로젝트 회고 내용

[회고내용이 담긴 블로그 글](https://velog.io/@rachel28/10weeks#noflix)
<br/>

## 🚀 배포

[넷플릭스 클론 코딩 배포 사이트](https://noflix-mlsgfzjdi-j2h30728.vercel.app/)<br/>
(23.05.18 변경 사항 :<br/>
기본적으로 CI/CD 가 설정되어있는 편리성을 위해 깃헙페이지에서 버셀로 배포를 변경함.<br/>
vercel.json 에서 rewrites 를 선언해주어, 기존에 존재하는 배포페이지에서 새로고침시 404오류를 함께 해결함.)

## 👀 홈페이지 프리뷰

<img width="1170" alt="메인화면" src="https://i.ibb.co/KDsqz0m/2023-05-18-8-12-32.png">
<details>
<summary>메인 화면 내 슬라이더 부분</summary>
<div markdown="1">
<img src="https://i.ibb.co/Fbs6RDy/2023-05-18-8-12-49.png"/>
</div>
</details>
<br/>
<details>
<summary>상세페이지</summary>
<div markdown="2">

#### 슬라이더로 접근하는 상세페이지

<img src="https://i.ibb.co/QQDS9qH/2023-05-18-8-13-07.png"/>

#### 배너로 접근하는 상세페이지

<img src="https://i.ibb.co/nbYPynQ/2023-05-18-8-21-21.png"/>
</div>
</details>
<br/>
<details>
<summary>검색 페이지</summary>
<div markdown="3">

#### ca 로 검색

<img src="https://i.ibb.co/kcjndKS/2023-05-18-8-13-39.png"/>

#### 검색 슬라이더로 접근하는 상세페이지

<img src="https://i.ibb.co/BVbhdhw/2023-05-18-8-20-38.png" >
</details>
<br/>

## 📌 프로젝트 실행 방법

1. Clone the repo

```javascript
$ git clone https://github.com/j2h30728/noflix.git
```

2. Install NPM packages

```javascript
$ npm install
```

3. Getting Started

```javascript
$ npm run dev
```

<br/>
