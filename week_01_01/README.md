# Week 1-1 과제

    React와 History API 사용하여 SPA Router 기능 구현하기

## 요구사항

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```

## 설명

### 폴더구조

```
src
 ┣ assets
 ┣ components
 ┃ ┣ Route.tsx
 ┃ ┗ Router.tsx
 ┣ hooks
 ┃ ┗ useRouter.tsx
 ┣ pages
 ┃ ┣ About.tsx
 ┃ ┗ Home.tsx
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts
```

### 코드 설명

```tsx
import { useState, useEffect, ReactNode, Children, ReactElement } from "react";
import { RouteProps } from "./Route";

interface RouterProps {
  children: ReactNode;
}

export const Router = ({ children }: RouterProps) => {
  const [path, setPath] = useState(location.pathname); // 현재 경로를 관리하는 상태

  // 자식 요소들을 배열로 변환하고, 타입을 제한하여 RouteProps를 갖는 ReactElement 배열로 캐스팅
  const routes = Children.toArray(children) as ReactElement<RouteProps>[];

  useEffect(() => {
    // popstate 이벤트가 발생할 때마다 경로 업데이트
    const handleSetPath = () => {
      setPath(window.location.pathname);
    };

    // popstate 이벤트 리스너 등록
    window.addEventListener("popstate", handleSetPath);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("popstate", handleSetPath);
  }, []);

  // 현재 경로와 일치하는 라우트를 찾아 반환하거나, 일치하는 라우트가 없으면 null 반환
  return routes.find((route) => route.props.path === path) || null;
};

// Router.tsx
```

```tsx
export const useRouter = () => {
  const push = (path: string): void => {
    // path로 페이지 이동
    window.history.pushState(null, "", path);

    // popstate 이벤트를 수동으로 디스패치하여 라우터를 업데이트
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const pop = (): void => {
    // 이전 페이지로 이동
    window.history.back();

    // popstate 이벤트를 수동으로 디스패치하여 라우터를 업데이트
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return { push, pop };
};

/*
=> 왜 수동으로 디스패치할까?

브라우저의 history.pushState() 및 history.back() 메서드가 실행되면
브라우저는 자동으로 popstate 이벤트를 발생시키지 않.기. 때문

따라서 라우터가 이동된 경로를 감지하고 업데이트하기 위해서는 수동으로 popstate 이벤트를 디스패치해야 함
*/

// useRouter.ts
```

## 시행착오

> 프로젝트 init 이후 아래와 같은 에러 발생하였다.

**1) main.tsx**

```tsx
import React from 'react' // Error
...
```

This module is declared with 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.

**2) tsconfig.json**

```json
...
    /* Bundler mode */
    "moduleResolution": "bundler", // Error
...
```

Option '--resolveJsonModule' cannot be specified without 'node' module resolution strategy.ts

### 해결

구글링을 통해 한 블로그 글에서 정답을 찾을 수 있었다. VSCode 1.77.3 이전 버전에서 발생하는 버그라고 한다

VSCode 업데이트 이후에 에러들은 깨끗하게 사라졌다 ^\_\_^

[tsconfig 설정하기](https://velog.io/@otterji/Vite-tsconfig-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
