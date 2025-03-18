# XSS

사용자가 입력한 값을 그대로 활용하면 이는 XSS 공격에 취약합니다. 만약 사용자가 `<script>`같은 스크립트를 실행하는 악성 코드를 심을 경우 사용자의 값을 탈튀하거나, 사용자인 척하는 악용을 할 수 있습니다.

### 이스케이프 처리

`<`, `>` 같은 스크립트를 심는데 사용이 되는 문자열을 이스케이프 처리로 변환합니다.

```ts
const escape = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
```

### html 함수 사용 강제회

이스케이프를 처리하는 [`html`](../src/lib/utils.ts)을 강제화하고나 코어 Component의 template메서드의 반환값을 `HTMLType`으로 선언했습니다. 만약 template메서드의 반환값에 `html`메서드를 사용하지 않을 경우 에러를 발생시킵니다.
